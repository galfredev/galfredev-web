-- Script para crear las tablas en Supabase
-- Podes correr esto desde el dashboard de Supabase -> "SQL Editor" -> "New Query"

-- 1. Tabla de Contactos (Leads)
create table if not exists public.contacts (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    nombre text not null,
    email text not null,
    whatsapp text,
    servicio text not null,
    deadline text not null,
    detalles text not null,
    privacidad_aceptada boolean default true
);

-- Habilitar RLS
alter table public.contacts enable row level security;

-- Limpiar políticas existentes para evitar errores al re-correr el script
drop policy if exists "Habilitar insert anonimo" on public.contacts;
drop policy if exists "Solo admin o autenticados leen" on public.contacts;

-- Otorga permiso a conexiones anónimas para INSERTAR (Formulario Web)
create policy "Habilitar insert anonimo" on public.contacts
    for insert
    to anon
    with check (true);

-- Permite leer registros solo a usuarios autenticados
create policy "Solo admin o autenticados leen" on public.contacts
    for select
    to authenticated
    using (true);

-- 2. Tabla de Proyectos (Portal de Clientes)
create table if not exists public.projects (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    title text not null,
    progress integer default 0 check (progress >= 0 and progress <= 100),
    status text not null,
    details text
);

-- Habilitar RLS
alter table public.projects enable row level security;

-- Limpiar políticas existentes
drop policy if exists "Usuarios ven sus propios proyectos" on public.projects;

-- Los usuarios solo pueden ver sus propios proyectos
create policy "Usuarios ven sus propios proyectos" on public.projects
    for select
    to authenticated
    using (auth.uid() = user_id);

-- Notas finales:
-- Solo el administrador (service_role) puede crear o editar proyectos.
-- Esto se hace desde el "Table Editor" de Supabase manualmente.

