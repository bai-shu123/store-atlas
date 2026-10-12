import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
const url = Deno.env.get('SUPABASE_URL')!;
const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const service = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

const normalize = (value: unknown) => String(value ?? '').trim().toLocaleLowerCase();
const sha256 = async (value: string) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)))).map((part) => part.toString(16).padStart(2, '0')).join('');
const internalEmail = async (username: string) => `staff-${(await sha256(normalize(username))).slice(0, 32)}@store-atlas.invalid`;

async function profileByUsername(username: string) {
  const { data } = await service.from('staff_profiles').select('*').ilike('username', normalize(username)).is('deleted_at', null).maybeSingle();
  return data;
}

async function caller(req: Request) {
  const token = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!token) return null;
  const { data: userData } = await service.auth.getUser(token);
  if (!userData.user) return null;
  const { data: profile } = await service.from('staff_profiles').select('*').eq('id', userData.user.id).is('deleted_at', null).maybeSingle();
  return profile?.is_active ? { user: userData.user, profile, token } : null;
}

async function log(profile: any, action: string, entityId = '', summary = '', details: Record<string, unknown> = {}) {
  await service.from('audit_logs').insert({ actor_id: profile?.id ?? null, actor_username: profile?.username ?? null, actor_name: profile?.display_name ?? null, action, entity_type: 'account', entity_id: entityId || null, summary, details });
}

async function rememberDevice(profile: any, deviceToken: string, deviceLabel = '', browserLabel = '') {
  if (!deviceToken) return false;
  const deviceHash = await sha256(deviceToken);
  const { error } = await service.from('trusted_devices').upsert({ user_id: profile.id, device_token_hash: deviceHash, device_label: deviceLabel, browser_label: browserLabel, last_seen_at: new Date().toISOString(), revoked_at: null }, { onConflict: 'user_id,device_token_hash' });
  if (error) console.warn('Unable to update device record', error.message);
  return !error;
}

async function login(body: any) {
  const profile = await profileByUsername(body.username);
  const generic = () => json({ error: 'invalid_credentials' }, 401);
  if (!profile || !profile.is_active) { await log(profile, 'auth.login_failed', profile?.id, 'Inactive or unknown account'); return generic(); }
  if (profile.locked_until && new Date(profile.locked_until) > new Date()) return json({ error: 'locked', lockedUntil: profile.locked_until }, 423);
  const { data: userData } = await service.auth.admin.getUserById(profile.id);
  if (!userData.user?.email) return generic();
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { apikey: anonKey, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: userData.user.email, password: String(body.password || '') }) });
  if (!response.ok) {
    const attempts = Number(profile.failed_attempts || 0) + 1;
    const lockedUntil = attempts >= 5 ? new Date(Date.now() + 15 * 60_000).toISOString() : null;
    await service.from('staff_profiles').update({ failed_attempts: attempts >= 5 ? 0 : attempts, locked_until: lockedUntil }).eq('id', profile.id);
    await log(profile, lockedUntil ? 'auth.locked' : 'auth.login_failed', profile.id, lockedUntil ? 'Locked for 15 minutes' : 'Invalid password');
    return lockedUntil ? json({ error: 'locked', lockedUntil }, 423) : generic();
  }
  const authResult = await response.json();
  await service.from('staff_profiles').update({ failed_attempts: 0, locked_until: null }).eq('id', profile.id);
  await rememberDevice(profile, body.deviceToken, body.deviceLabel, body.browserLabel);
  await log(profile, 'auth.login_success', profile.id, 'Signed in');
  return json({ ...authResult, profile });
}

async function authenticatedAction(req: Request, action: string, body: any) {
  const actor = await caller(req);
  if (!actor) return json({ error: 'unauthorized' }, 401);
  const isAdmin = ['owner', 'admin'].includes(actor.profile.role);
  const isOwner = actor.profile.role === 'owner';
  if (action === 'password_changed') {
    await service.from('staff_profiles').update({ must_change_password: false }).eq('id', actor.profile.id);
    await log(actor.profile, 'account.password_changed', actor.profile.id, actor.profile.username);
    return json({ ok: true });
  }
  if (action === 'validate_session') {
    const deviceHash = body.deviceToken ? await sha256(String(body.deviceToken)) : '';
    if (deviceHash) {
      const { data: device, error } = await service.from('trusted_devices').select('id,revoked_at').eq('user_id', actor.profile.id).eq('device_token_hash', deviceHash).maybeSingle();
      if (!error && device?.revoked_at) return json({ error: 'session_revoked' }, 401);
      if (!error && device) {
        await service.from('trusted_devices').update({ last_seen_at: new Date().toISOString(), device_label: String(body.deviceLabel || ''), browser_label: String(body.browserLabel || '') }).eq('id', device.id);
      } else if (!device) {
        await rememberDevice(actor.profile, String(body.deviceToken), String(body.deviceLabel || ''), String(body.browserLabel || ''));
      }
    }
    return json({ profile: actor.profile });
  }
  if (action === 'list_devices') {
    const requestedUserId = String(body.userId || actor.profile.id);
    if (requestedUserId !== actor.profile.id && !isOwner) return json({ error: 'forbidden' }, 403);
    const { data, error } = await service.from('trusted_devices').select('id,user_id,device_token_hash,device_label,browser_label,last_seen_at,created_at,revoked_at').eq('user_id', requestedUserId).order('last_seen_at', { ascending: false });
    return error ? json({ error: error.message }, 400) : json({ devices: data });
  }
  if (action === 'revoke_device') {
    const deviceId = String(body.deviceId || '');
    const { data: device } = await service.from('trusted_devices').select('*').eq('id', deviceId).maybeSingle();
    if (!device || (device.user_id !== actor.profile.id && !isOwner)) return json({ error: 'forbidden' }, 403);
    await service.from('trusted_devices').update({ revoked_at: new Date().toISOString() }).eq('id', deviceId);
    await log(actor.profile, 'auth.device_revoked', device.user_id, device.device_label || device.browser_label || 'device');
    return json({ ok: true });
  }
  if (action === 'list_accounts') {
    if (!isAdmin) return json({ error: 'forbidden' }, 403);
    const { data, error } = await service.from('staff_profiles').select('id,username,display_name,role,recovery_email,is_active,must_change_password,locked_until,created_at,deleted_at').order('created_at');
    return error ? json({ error: error.message }, 400) : json({ accounts: data });
  }
  if (action === 'create_account') {
    if (!isAdmin) return json({ error: 'forbidden' }, 403);
    const role = body.role === 'admin' ? 'admin' : 'staff';
    if (role === 'admin' && !isOwner) return json({ error: 'owner_required' }, 403);
    const username = String(body.username || '').trim(); const displayName = String(body.displayName || '').trim(); const password = String(body.password || '');
    if (!username || !displayName || password.length < 8) return json({ error: 'invalid_account' }, 400);
    const { data: existingUsername } = await service.from('staff_profiles').select('id').ilike('username', normalize(username)).maybeSingle();
    if (existingUsername) return json({ error: 'username_exists' }, 409);
    const email = await internalEmail(username);
    const { data: created, error } = await service.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { username, display_name: displayName } });
    if (error || !created.user) return json({ error: error?.message || 'create_failed' }, 400);
    const { error: profileError } = await service.from('staff_profiles').insert({ id: created.user.id, username, display_name: displayName, role, is_active: true, must_change_password: true });
    if (profileError) { await service.auth.admin.deleteUser(created.user.id); return json({ error: profileError.message }, 400); }
    await log(actor.profile, 'account.create', created.user.id, username, { role });
    return json({ ok: true });
  }
  const targetId = String(body.userId || '');
  const { data: target } = await service.from('staff_profiles').select('*').eq('id', targetId).maybeSingle();
  if (!target) return json({ error: 'not_found' }, 404);
  if (target.role === 'owner' && target.id !== actor.profile.id) return json({ error: 'owner_protected' }, 403);
  if (target.role === 'admin' && !isOwner && target.id !== actor.profile.id) return json({ error: 'owner_required' }, 403);
  if (action === 'reset_password') {
    if (!isAdmin || (target.role !== 'staff' && !isOwner)) return json({ error: 'forbidden' }, 403);
    const password = String(body.password || ''); if (password.length < 8) return json({ error: 'weak_password' }, 400);
    const { error } = await service.auth.admin.updateUserById(target.id, { password }); if (error) return json({ error: error.message }, 400);
    await service.from('trusted_devices').update({ revoked_at: new Date().toISOString() }).eq('user_id', target.id).is('revoked_at', null);
    await service.from('staff_profiles').update({ must_change_password: true, failed_attempts: 0, locked_until: null }).eq('id', target.id);
    await log(actor.profile, 'account.password_reset', target.id, target.username); return json({ ok: true });
  }
  if (action === 'set_active') {
    if (!isAdmin || target.role === 'owner' || (target.role === 'admin' && !isOwner)) return json({ error: 'forbidden' }, 403);
    await service.from('staff_profiles').update({ is_active: Boolean(body.active) }).eq('id', target.id);
    if (!body.active) await service.from('trusted_devices').update({ revoked_at: new Date().toISOString() }).eq('user_id', target.id).is('revoked_at', null);
    await log(actor.profile, body.active ? 'account.enable' : 'account.disable', target.id, target.username); return json({ ok: true });
  }
  if (action === 'unlock') {
    if (!isAdmin || target.role !== 'staff') return json({ error: 'forbidden' }, 403);
    await service.from('staff_profiles').update({ failed_attempts: 0, locked_until: null }).eq('id', target.id);
    await log(actor.profile, 'account.unlock', target.id, target.username); return json({ ok: true });
  }
  if (action === 'set_role') {
    if (!isOwner || target.role === 'owner') return json({ error: 'forbidden' }, 403);
    const role = body.role === 'admin' ? 'admin' : 'staff'; await service.from('staff_profiles').update({ role }).eq('id', target.id);
    await log(actor.profile, 'account.role_change', target.id, target.username, { role }); return json({ ok: true });
  }
  if (action === 'delete_account') {
    if (!isAdmin || target.role === 'owner' || (target.role === 'admin' && !isOwner)) return json({ error: 'forbidden' }, 403);
    await service.from('staff_profiles').update({ is_active: false, deleted_at: new Date().toISOString() }).eq('id', target.id);
    await service.from('trusted_devices').update({ revoked_at: new Date().toISOString() }).eq('user_id', target.id).is('revoked_at', null);
    await log(actor.profile, 'account.delete', target.id, target.username); return json({ ok: true });
  }
  return json({ error: 'unknown_action' }, 400);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    const body = await req.json(); const action = String(body.action || '');
    if (action === 'login') return await login(body);
    return await authenticatedAction(req, action, body);
  } catch (error) { console.error(error); return json({ error: 'server_error' }, 500); }
});
