import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
const url = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const azureKey = Deno.env.get('AZURE_TRANSLATOR_KEY');
const azureRegion = Deno.env.get('AZURE_TRANSLATOR_REGION');
const azureEndpoint = Deno.env.get('AZURE_TRANSLATOR_ENDPOINT') || 'https://api.cognitive.microsofttranslator.com';
const service = createClient(url, serviceKey, { auth: { persistSession: false } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const jwt = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  const { data: userData } = await service.auth.getUser(jwt);
  if (!userData.user) return json({ error: 'unauthorized' }, 401);
  const { data: profile } = await service.from('staff_profiles').select('is_active').eq('id', userData.user.id).maybeSingle();
  if (!profile?.is_active) return json({ error: 'forbidden' }, 403);
  if (!azureKey || !azureRegion) return json({ pending: true, error: 'translator_not_configured' }, 202);
  const { productId } = await req.json();
  const { data: product } = await service.from('products').select('*').eq('id', productId).is('deleted_at', null).maybeSingle();
  if (!product) return json({ error: 'not_found' }, 404);
  const translate = async (text: string) => {
    if (!text) return { zh: '', ru: '', kk: '' };
    const response = await fetch(`${azureEndpoint}/translate?api-version=3.0&to=zh-Hans&to=ru&to=kk`, { method: 'POST', headers: { 'Ocp-Apim-Subscription-Key': azureKey, 'Ocp-Apim-Subscription-Region': azureRegion, 'Content-Type': 'application/json' }, body: JSON.stringify([{ Text: text }]) });
    if (!response.ok) throw new Error(`Translator ${response.status}`);
    const payload = await response.json(); const result: Record<string, string> = {};
    for (const item of payload[0]?.translations || []) result[item.to === 'zh-Hans' ? 'zh' : item.to] = item.text;
    return { zh: result.zh || text, ru: result.ru || text, kk: result.kk || text };
  };
  try {
    const [type, details] = await Promise.all([translate(product.type), translate(product.details || '')]);
    const { data, error } = await service.from('products').update({ type_zh: type.zh, type_ru: type.ru, type_kk: type.kk, details_zh: details.zh, details_ru: details.ru, details_kk: details.kk, translation_status: 'ready' }).eq('id', product.id).select().single();
    if (error) throw error; return json({ product: data });
  } catch (error) {
    console.error(error); await service.from('products').update({ translation_status: 'failed' }).eq('id', product.id);
    return json({ pending: true, error: 'translation_failed' }, 202);
  }
});
