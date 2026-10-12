-- Store Atlas secure shared workspace schema
-- Run in Supabase SQL Editor after taking a database backup.
-- Existing products are preserved. Anonymous visitors become read-only.

create extension if not exists pgcrypto;

create table if not exists public.staff_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  display_name text not null,
  role text not null default 'staff' check (role in ('owner', 'admin', 'staff')),
  recovery_email text,
  is_active boolean not null default true,
  must_change_password boolean not null default false,
  failed_attempts integer not null default 0,
  locked_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint staff_profiles_username_length check (char_length(btrim(username)) between 1 and 80),
  constraint staff_profiles_display_name_length check (char_length(btrim(display_name)) between 1 and 80)
);
create unique index if not exists staff_profiles_username_unique on public.staff_profiles (lower(btrim(username)));
create unique index if not exists staff_profiles_single_owner on public.staff_profiles (role) where role = 'owner' and deleted_at is null;

create table if not exists public.trusted_devices (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references public.staff_profiles(id) on delete cascade,
  device_token_hash text not null, device_label text not null default '', browser_label text not null default '',
  last_seen_at timestamptz not null default now(), created_at timestamptz not null default now(), revoked_at timestamptz,
  unique (user_id, device_token_hash)
);

create table if not exists public.products (
  id text primary key, number text not null, type text not null, floor text not null check (floor in ('1F', '2F', '3F')),
  zone text not null, details text not null default '', image text not null default '', updated_at timestamptz not null default now()
);
alter table public.products add column if not exists price numeric(14, 0);
alter table public.products add column if not exists stock_status text not null default 'ample';
alter table public.products add column if not exists type_zh text;
alter table public.products add column if not exists type_ru text;
alter table public.products add column if not exists type_kk text;
alter table public.products add column if not exists details_zh text;
alter table public.products add column if not exists details_ru text;
alter table public.products add column if not exists details_kk text;
alter table public.products add column if not exists source_language text check (source_language in ('zh', 'ru', 'kk'));
alter table public.products add column if not exists translation_status text not null default 'pending' check (translation_status in ('ready', 'pending', 'failed'));
alter table public.products add column if not exists image_path text;
alter table public.products add column if not exists restock_since timestamptz;
alter table public.products add column if not exists move_notice_until timestamptz;
alter table public.products add column if not exists move_notice_from text;
alter table public.products add column if not exists created_at timestamptz not null default now();
alter table public.products add column if not exists created_by uuid references public.staff_profiles(id) on delete set null;
alter table public.products add column if not exists updated_by uuid references public.staff_profiles(id) on delete set null;
alter table public.products add column if not exists deleted_at timestamptz;
alter table public.products add column if not exists deleted_by uuid references public.staff_profiles(id) on delete set null;
alter table public.products add column if not exists delete_reason text;
update public.products set stock_status = 'ample' where stock_status is null or stock_status not in ('ample', 'normal', 'restock');
update public.products set restock_since = coalesce(restock_since, updated_at) where stock_status = 'restock' and deleted_at is null;
update public.products set type_zh = coalesce(type_zh, type), details_zh = coalesce(details_zh, details), source_language = coalesce(source_language, 'zh') where type_zh is null or source_language is null;
with ranked_duplicates as (
  select id, row_number() over (
    partition by floor, zone, lower(btrim(number))
    order by updated_at desc nulls last, id desc
  ) as duplicate_rank
  from public.products
  where deleted_at is null
)
update public.products as product
set deleted_at = now(), delete_reason = 'migration_duplicate'
from ranked_duplicates
where product.id = ranked_duplicates.id and ranked_duplicates.duplicate_rank > 1;
alter table public.products drop constraint if exists products_stock_status_check;
alter table public.products add constraint products_stock_status_check check (stock_status in ('ample', 'normal', 'restock'));
alter table public.products drop constraint if exists products_zone_floor_check;
alter table public.products add constraint products_zone_floor_check check (
  (floor = '1F' and zone in ('A','B','C','D','E')) or
  (floor = '2F' and zone in ('F','G','H1','H2','J1','J2','K1','K2','L1','L2','M1','M2')) or
  (floor = '3F' and zone in ('W1','W2','X1','X2','Y1','Y2','Z1','Z2'))
);
alter table public.products drop constraint if exists products_price_nonnegative;
alter table public.products add constraint products_price_nonnegative check (price is null or price >= 0);
create unique index if not exists products_active_zone_number_unique on public.products (floor, zone, lower(btrim(number))) where deleted_at is null;
create index if not exists products_active_location_idx on public.products (floor, zone) where deleted_at is null;
create index if not exists products_restock_idx on public.products (restock_since) where stock_status = 'restock' and deleted_at is null;
create index if not exists products_trash_idx on public.products (deleted_at) where deleted_at is not null;

create table if not exists public.audit_logs (
  id bigint generated by default as identity primary key, actor_id uuid references public.staff_profiles(id) on delete set null,
  actor_username text, actor_name text, action text not null, entity_type text not null, entity_id text,
  summary text not null default '', details jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);
create index if not exists audit_logs_created_at_idx on public.audit_logs (created_at desc);
create table if not exists public.app_settings (key text primary key, value jsonb not null, updated_at timestamptz not null default now(), updated_by uuid references public.staff_profiles(id) on delete set null);

create or replace function public.current_staff_role() returns text language sql stable security definer set search_path = public as $$ select role from public.staff_profiles where id = auth.uid() and is_active = true and deleted_at is null $$;
create or replace function public.is_staff() returns boolean language sql stable security definer set search_path = public as $$ select public.current_staff_role() in ('owner','admin','staff') $$;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$ select public.current_staff_role() in ('owner','admin') $$;
create or replace function public.is_owner() returns boolean language sql stable security definer set search_path = public as $$ select public.current_staff_role() = 'owner' $$;

create or replace function public.write_audit(p_action text, p_entity_type text, p_entity_id text default null, p_summary text default '', p_details jsonb default '{}'::jsonb) returns void language plpgsql security definer set search_path = public as $$
declare p public.staff_profiles;
begin
  select * into p from public.staff_profiles where id = auth.uid();
  insert into public.audit_logs(actor_id, actor_username, actor_name, action, entity_type, entity_id, summary, details)
  values (auth.uid(), p.username, p.display_name, p_action, p_entity_type, p_entity_id, p_summary, coalesce(p_details, '{}'::jsonb));
end; $$;

create or replace function public.enforce_product_timestamps() returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now(); new.updated_by = auth.uid();
  if tg_op = 'INSERT' then new.created_at = coalesce(new.created_at, now()); new.created_by = coalesce(new.created_by, auth.uid()); end if;
  if tg_op = 'UPDATE' and (
    new.number is distinct from old.number or new.type is distinct from old.type or new.details is distinct from old.details or
    new.price is distinct from old.price or new.stock_status is distinct from old.stock_status or
    new.image is distinct from old.image or new.image_path is distinct from old.image_path
  ) then new.move_notice_until = null; new.move_notice_from = null; end if;
  if new.stock_status = 'restock' and (tg_op = 'INSERT' or old.stock_status is distinct from 'restock') then new.restock_since = now(); elsif new.stock_status <> 'restock' then new.restock_since = null; end if;
  return new;
end; $$;
drop trigger if exists products_timestamps on public.products;
create trigger products_timestamps before insert or update on public.products for each row execute function public.enforce_product_timestamps();

create or replace function public.audit_product_change() returns trigger language plpgsql security definer set search_path = public as $$
declare action_name text;
begin
  if tg_op = 'INSERT' then action_name := 'product.create';
  elsif new.deleted_at is not null and old.deleted_at is null then action_name := 'product.trash';
  elsif new.deleted_at is null and old.deleted_at is not null then action_name := 'product.restore';
  elsif new.floor is distinct from old.floor or new.zone is distinct from old.zone then action_name := 'product.move';
  elsif new.stock_status = 'ample' and old.stock_status = 'restock' then action_name := 'product.restock';
  else action_name := 'product.update'; end if;
  perform public.write_audit(action_name, 'product', new.id, new.number, jsonb_build_object('floor', new.floor, 'zone', new.zone, 'stock_status', new.stock_status));
  return new;
end; $$;
drop trigger if exists products_audit on public.products;
create trigger products_audit after insert or update on public.products for each row execute function public.audit_product_change();

create or replace function public.run_store_maintenance() returns jsonb language plpgsql security definer set search_path = public as $$
declare restock_archived integer := 0; notices_cleared integer := 0; trash_purged integer := 0; logs_purged integer := 0;
begin
  update public.products set deleted_at = now(), delete_reason = 'restock_timeout', deleted_by = null where deleted_at is null and stock_status = 'restock' and restock_since <= now() - interval '7 days'; get diagnostics restock_archived = row_count;
  update public.products set move_notice_until = null, move_notice_from = null where move_notice_until is not null and move_notice_until <= now(); get diagnostics notices_cleared = row_count;
  delete from public.products where deleted_at <= now() - interval '30 days'; get diagnostics trash_purged = row_count;
  delete from public.audit_logs where created_at <= now() - interval '1 year'; get diagnostics logs_purged = row_count;
  return jsonb_build_object('restock_archived', restock_archived, 'notices_cleared', notices_cleared, 'trash_purged', trash_purged, 'logs_purged', logs_purged);
end; $$;

create or replace function public.move_product(p_source_id text, p_new_id text, p_floor text, p_zone text, p_number text, p_type text, p_details text, p_price numeric, p_stock_status text, p_image text, p_image_path text, p_source_language text)
returns public.products language plpgsql security definer set search_path = public as $$
declare source public.products; created public.products;
begin
  if not public.is_staff() then raise exception 'forbidden'; end if;
  select * into source from public.products where id = p_source_id and deleted_at is null for update;
  if source.id is null then raise exception 'not_found'; end if;
  insert into public.products(id, number, type, details, price, stock_status, floor, zone, image, image_path, translation_status, source_language)
   values (p_new_id, p_number, p_type, coalesce(p_details,''), p_price, p_stock_status, p_floor, p_zone, coalesce(p_image,''), p_image_path, 'pending', coalesce(p_source_language, 'zh'))
  returning * into created;
  update public.products set move_notice_until = now() + interval '3 days', move_notice_from = p_floor || ' / ' || p_zone where id = p_source_id;
  perform public.write_audit('product.move_copy', 'product', p_new_id, p_number, jsonb_build_object('source_id', p_source_id, 'from', source.floor || '/' || source.zone, 'to', p_floor || '/' || p_zone));
  return created;
end; $$;

create or replace function public.merge_product_locations(p_target_id text, p_source_ids text[], p_final_status text)
returns public.products language plpgsql security definer set search_path = public as $$
declare target public.products; source_id text;
begin
  if not public.is_staff() then raise exception 'forbidden'; end if;
  if p_final_status not in ('ample','normal','restock') then raise exception 'invalid_status'; end if;
  select * into target from public.products where id = p_target_id and deleted_at is null for update;
  if target.id is null then raise exception 'target_not_found'; end if;
  foreach source_id in array p_source_ids loop
    if source_id = p_target_id then raise exception 'target_in_sources'; end if;
    if not exists(select 1 from public.products where id = source_id and deleted_at is null and lower(btrim(number)) = lower(btrim(target.number))) then raise exception 'invalid_source'; end if;
  end loop;
  update public.products set deleted_at = now(), deleted_by = auth.uid(), delete_reason = 'location_merge' where id = any(p_source_ids);
  update public.products set stock_status = p_final_status, move_notice_until = null, move_notice_from = null where id = p_target_id returning * into target;
  perform public.write_audit('product.merge', 'product', p_target_id, target.number, jsonb_build_object('sources', p_source_ids, 'target', p_target_id, 'final_status', p_final_status));
  return target;
end; $$;

create or replace function public.restore_product(p_product_id text, p_floor text default null, p_zone text default null)
returns public.products language plpgsql security definer set search_path = public as $$
declare restored public.products;
begin
  if not public.is_admin() then raise exception 'forbidden'; end if;
  update public.products set deleted_at = null, deleted_by = null, delete_reason = null, floor = coalesce(p_floor, floor), zone = coalesce(p_zone, zone), restock_since = case when stock_status = 'restock' then now() else null end where id = p_product_id and deleted_at is not null returning * into restored;
  if restored.id is null then raise exception 'not_found'; end if;
  return restored;
end; $$;

alter table public.staff_profiles enable row level security;
alter table public.trusted_devices enable row level security;
alter table public.products enable row level security;
alter table public.audit_logs enable row level security;
alter table public.app_settings enable row level security;
drop policy if exists "Public can read products" on public.products;
drop policy if exists "Public can add products" on public.products;
drop policy if exists "Public can edit products" on public.products;
drop policy if exists "Public can remove products" on public.products;
drop policy if exists "Visitors read active products" on public.products;
drop policy if exists "Staff create products" on public.products;
drop policy if exists "Staff update products" on public.products;
create policy "Visitors read active products" on public.products for select to anon, authenticated using (deleted_at is null or public.is_admin());
create policy "Staff create products" on public.products for insert to authenticated with check (public.is_staff());
create policy "Staff update products" on public.products for update to authenticated using (public.is_staff()) with check (public.is_staff());
drop policy if exists "Staff read own profile" on public.staff_profiles;
drop policy if exists "Admins read profiles" on public.staff_profiles;
create policy "Staff read own profile" on public.staff_profiles for select to authenticated using (id = auth.uid() or public.is_admin());
drop policy if exists "Staff read own devices" on public.trusted_devices;
drop policy if exists "Staff revoke own devices" on public.trusted_devices;
create policy "Staff read own devices" on public.trusted_devices for select to authenticated using (user_id = auth.uid() or public.is_owner());
create policy "Staff revoke own devices" on public.trusted_devices for update to authenticated using (user_id = auth.uid() or public.is_owner()) with check (user_id = auth.uid() or public.is_owner());
drop policy if exists "Admins read audit" on public.audit_logs;
create policy "Admins read audit" on public.audit_logs for select to authenticated using (public.is_admin());
drop policy if exists "Staff read settings" on public.app_settings;
drop policy if exists "Owner manages settings" on public.app_settings;
create policy "Staff read settings" on public.app_settings for select to authenticated using (public.is_staff());
create policy "Owner manages settings" on public.app_settings for all to authenticated using (public.is_owner()) with check (public.is_owner());

insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true) on conflict (id) do update set public = true;
drop policy if exists "Public can view product images" on storage.objects;
drop policy if exists "Public can upload product images" on storage.objects;
drop policy if exists "Public can update product images" on storage.objects;
drop policy if exists "Public can delete product images" on storage.objects;
drop policy if exists "Visitors view product images" on storage.objects;
drop policy if exists "Staff upload product images" on storage.objects;
drop policy if exists "Staff update product images" on storage.objects;
drop policy if exists "Admins delete product images" on storage.objects;
drop policy if exists "Staff delete product images" on storage.objects;
create policy "Visitors view product images" on storage.objects for select to anon, authenticated using (bucket_id = 'product-images');
create policy "Staff upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.is_staff());
create policy "Staff update product images" on storage.objects for update to authenticated using (bucket_id = 'product-images' and public.is_staff()) with check (bucket_id = 'product-images' and public.is_staff());
create policy "Staff delete product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.is_staff());
grant execute on function public.current_staff_role() to anon, authenticated;
grant execute on function public.is_staff() to anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;
drop function if exists public.move_product(text,text,text,text,text,text,text,numeric,text,text,text);
grant execute on function public.move_product(text,text,text,text,text,text,text,numeric,text,text,text,text) to authenticated;
grant execute on function public.merge_product_locations(text,text[],text) to authenticated;
grant execute on function public.restore_product(text,text,text) to authenticated;
revoke execute on function public.write_audit(text,text,text,text,jsonb) from anon;
revoke execute on function public.run_store_maintenance() from anon, authenticated;
create extension if not exists pg_cron with schema extensions;
do $$
begin
  if not exists (select 1 from cron.job where jobname = 'store-atlas-daily-maintenance') then
    perform cron.schedule('store-atlas-daily-maintenance', '0 22 * * *', 'select public.run_store_maintenance();');
  end if;
end;
$$;
