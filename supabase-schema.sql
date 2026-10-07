-- 店面货品摆放：共享数据表与公开图片存储
-- 在 Supabase Dashboard → SQL Editor 中一次性运行本文件。

create table if not exists public.products (
  id text primary key,
  number text not null,
  type text not null,
  floor text not null check (floor in ('1F', '2F', '3F')),
  zone text not null,
  details text not null default '',
  image text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

drop policy if exists "Public can read products" on public.products;
drop policy if exists "Public can add products" on public.products;
drop policy if exists "Public can edit products" on public.products;
drop policy if exists "Public can remove products" on public.products;

create policy "Public can read products" on public.products for select to anon, authenticated using (true);
create policy "Public can add products" on public.products for insert to anon, authenticated with check (true);
create policy "Public can edit products" on public.products for update to anon, authenticated using (true) with check (true);
create policy "Public can remove products" on public.products for delete to anon, authenticated using (true);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can view product images" on storage.objects;
drop policy if exists "Public can upload product images" on storage.objects;
drop policy if exists "Public can update product images" on storage.objects;
drop policy if exists "Public can delete product images" on storage.objects;

create policy "Public can view product images" on storage.objects for select to anon, authenticated using (bucket_id = 'product-images');
create policy "Public can upload product images" on storage.objects for insert to anon, authenticated with check (bucket_id = 'product-images');
create policy "Public can update product images" on storage.objects for update to anon, authenticated using (bucket_id = 'product-images') with check (bucket_id = 'product-images');
create policy "Public can delete product images" on storage.objects for delete to anon, authenticated using (bucket_id = 'product-images');
