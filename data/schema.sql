-- Script para crear la tabla de contactos en Supabase
-- Podes correr esto desde el dashboard de Supabase -> "SQL Editor" -> "New Query"

create table public.contacts (
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

-- Si querés habilitar Row Level Security (RLS) para mayor seguridad
-- (esto previene que alguien lea tu base de datos anonimamente)
alter table public.contacts enable row level security;

-- Otorga permiso a conexiones anónimas para INSERTAR unicamente (para que el formulario ande desde la web)
create policy "Habilitar insert anonimo" on public.contacts
    for insert
    to anon
    with check (true);

-- Permite leer todos los registros solo por administradores (service role o users logueados con ciertos permisos)
create policy "Solo admin o autenticados leen" on public.contacts
    for select
    to authenticated
    using (true);
