-- GalfreDev Portal Schema v2
-- Ejecutar este archivo completo en Supabase SQL Editor.
-- Crea:
-- 1. leads/contactos comerciales
-- 2. newsletter subscribers
-- 3. perfiles de clientes/admin
-- 4. ordenes de servicio
-- 5. actualizaciones de avance
-- 6. entregables publicados

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create table if not exists public.contacts (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    nombre text not null,
    email text not null,
    whatsapp text,
    servicio text not null,
    deadline text not null,
    detalles text not null,
    privacidad_aceptada boolean default true,
    source text default 'web',
    status text default 'new'
);

alter table public.contacts enable row level security;

drop policy if exists "Contacts insert anonymous" on public.contacts;
drop policy if exists "Contacts read admin only" on public.contacts;

create policy "Contacts insert anonymous" on public.contacts
    for insert
    to anon, authenticated
    with check (true);

create table if not exists public.newsletter_subscribers (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    email text not null unique,
    full_name text,
    whatsapp text,
    source text default 'website',
    status text default 'active',
    tags text[] default '{}'
);

drop trigger if exists trg_newsletter_updated_at on public.newsletter_subscribers;
create trigger trg_newsletter_updated_at
before update on public.newsletter_subscribers
for each row execute function public.set_updated_at();

alter table public.newsletter_subscribers enable row level security;

drop table if exists public.order_deliverables cascade;
drop table if exists public.service_updates cascade;
drop table if exists public.service_orders cascade;
drop function if exists public.is_admin();
drop table if exists public.client_profiles cascade;

create table public.client_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    email text not null unique,
    full_name text,
    company text,
    whatsapp text,
    avatar_url text,
    role text not null default 'client' check (role in ('client', 'admin')),
    notes text,
    newsletter_opt_in boolean default true
);

drop trigger if exists trg_client_profiles_updated_at on public.client_profiles;
create trigger trg_client_profiles_updated_at
before update on public.client_profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.client_profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', '')
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = case when excluded.full_name <> '' then excluded.full_name else public.client_profiles.full_name end,
      avatar_url = case when excluded.avatar_url <> '' then excluded.avatar_url else public.client_profiles.avatar_url end;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.client_profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create table public.service_orders (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    client_id uuid references public.client_profiles(id) on delete cascade not null,
    title text not null,
    service_type text not null,
    status text not null default 'planning' check (status in ('planning', 'active', 'review', 'delivered', 'paused')),
    priority text default 'medium' check (priority in ('low', 'medium', 'high')),
    progress integer default 0 check (progress >= 0 and progress <= 100),
    summary text,
    budget_range text,
    monthly_roi_estimate numeric default 0,
    monthly_hours_saved numeric default 0,
    purchased_at date default current_date,
    due_date date
);

drop trigger if exists trg_service_orders_updated_at on public.service_orders;
create trigger trg_service_orders_updated_at
before update on public.service_orders
for each row execute function public.set_updated_at();

create table public.service_updates (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    order_id uuid references public.service_orders(id) on delete cascade not null,
    author_id uuid references public.client_profiles(id) on delete set null,
    title text not null,
    body text not null,
    progress integer default 0 check (progress >= 0 and progress <= 100),
    visibility text default 'client' check (visibility in ('internal', 'client'))
);

drop trigger if exists trg_service_updates_updated_at on public.service_updates;
create trigger trg_service_updates_updated_at
before update on public.service_updates
for each row execute function public.set_updated_at();

create table public.order_deliverables (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    order_id uuid references public.service_orders(id) on delete cascade not null,
    title text not null,
    description text,
    deliverable_type text default 'link' check (deliverable_type in ('link', 'document', 'repository', 'video')),
    file_url text,
    status text default 'draft' check (status in ('draft', 'published')),
    published_at timestamp with time zone
);

drop trigger if exists trg_order_deliverables_updated_at on public.order_deliverables;
create trigger trg_order_deliverables_updated_at
before update on public.order_deliverables
for each row execute function public.set_updated_at();

alter table public.client_profiles enable row level security;
alter table public.service_orders enable row level security;
alter table public.service_updates enable row level security;
alter table public.order_deliverables enable row level security;

drop policy if exists "Profiles select own or admin" on public.client_profiles;
drop policy if exists "Profiles insert own or admin" on public.client_profiles;
drop policy if exists "Profiles update own or admin" on public.client_profiles;
drop policy if exists "Newsletter admin read" on public.newsletter_subscribers;
drop policy if exists "Newsletter insert all" on public.newsletter_subscribers;
drop policy if exists "Newsletter admin update" on public.newsletter_subscribers;
drop policy if exists "Service orders select own or admin" on public.service_orders;
drop policy if exists "Service orders admin write" on public.service_orders;
drop policy if exists "Service updates select own or admin" on public.service_updates;
drop policy if exists "Service updates admin write" on public.service_updates;
drop policy if exists "Deliverables select own or admin" on public.order_deliverables;
drop policy if exists "Deliverables admin write" on public.order_deliverables;

create policy "Profiles select own or admin" on public.client_profiles
    for select
    to authenticated
    using (id = auth.uid() or public.is_admin());

create policy "Profiles insert own or admin" on public.client_profiles
    for insert
    to authenticated
    with check (id = auth.uid() or public.is_admin());

create policy "Profiles update own or admin" on public.client_profiles
    for update
    to authenticated
    using (id = auth.uid() or public.is_admin())
    with check (id = auth.uid() or public.is_admin());

create policy "Contacts read admin only" on public.contacts
    for select
    to authenticated
    using (public.is_admin());

create policy "Newsletter admin read" on public.newsletter_subscribers
    for select
    to authenticated
    using (public.is_admin());

create policy "Newsletter insert all" on public.newsletter_subscribers
    for insert
    to anon, authenticated
    with check (true);

create policy "Newsletter admin update" on public.newsletter_subscribers
    for update
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

create policy "Service orders select own or admin" on public.service_orders
    for select
    to authenticated
    using (client_id = auth.uid() or public.is_admin());

create policy "Service orders admin write" on public.service_orders
    for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

create policy "Service updates select own or admin" on public.service_updates
    for select
    to authenticated
    using (
      public.is_admin()
      or exists (
        select 1
        from public.service_orders so
        where so.id = order_id
          and so.client_id = auth.uid()
      )
    );

create policy "Service updates admin write" on public.service_updates
    for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

create policy "Deliverables select own or admin" on public.order_deliverables
    for select
    to authenticated
    using (
      public.is_admin()
      or exists (
        select 1
        from public.service_orders so
        where so.id = order_id
          and so.client_id = auth.uid()
      )
    );

create policy "Deliverables admin write" on public.order_deliverables
    for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Compatibilidad con la version anterior del dashboard:
create table if not exists public.projects (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    title text not null,
    progress integer default 0 check (progress >= 0 and progress <= 100),
    status text not null,
    details text
);

alter table public.projects enable row level security;

drop policy if exists "Usuarios ven sus propios proyectos" on public.projects;
drop policy if exists "Projects select own or admin" on public.projects;
drop policy if exists "Projects admin write" on public.projects;

create policy "Projects select own or admin" on public.projects
    for select
    to authenticated
    using (auth.uid() = user_id or public.is_admin());

create policy "Projects admin write" on public.projects
    for all
    to authenticated
    using (public.is_admin())
    with check (public.is_admin());

-- Bootstrap admin:
-- despues de registrarte con tu cuenta principal, corre una sola vez:
-- update public.client_profiles set role = 'admin' where email = 'tu-email@dominio.com';
