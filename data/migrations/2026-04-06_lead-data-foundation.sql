-- Migración aditiva para reforzar la base comercial de leads.
-- Segura para ejecutar sobre la base actual sin romper el flujo existente.

create extension if not exists pgcrypto;

alter table public.lead_intake
  add column if not exists priority text not null default 'normal',
  add column if not exists form_key text not null default 'contact',
  add column if not exists page_path text,
  add column if not exists entry_point text,
  add column if not exists cta_id text,
  add column if not exists next_action text,
  add column if not exists next_action_at timestamptz,
  add column if not exists contacted_at timestamptz,
  add column if not exists last_activity_at timestamptz not null default timezone('utc'::text, now()),
  add column if not exists closed_at timestamptz,
  add column if not exists discarded_reason text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'lead_intake_status_check'
  ) then
    alter table public.lead_intake
      add constraint lead_intake_status_check
      check (status in ('new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost', 'spam'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'lead_intake_priority_check'
  ) then
    alter table public.lead_intake
      add constraint lead_intake_priority_check
      check (priority in ('low', 'normal', 'high'));
  end if;
end $$;

create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc'::text, now()),
  lead_id uuid not null references public.lead_intake(id) on delete cascade,
  actor_user_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  event_source text,
  note text,
  payload jsonb not null default '{}'::jsonb,
  constraint lead_events_type_check
    check (event_type in ('lead_created', 'status_changed', 'consent_recorded', 'follow_up_scheduled', 'note_added'))
);

create index if not exists idx_lead_intake_created_at_desc
  on public.lead_intake (created_at desc);

create index if not exists idx_lead_intake_status_created_at
  on public.lead_intake (status, created_at desc);

create index if not exists idx_lead_intake_source_created_at
  on public.lead_intake (source, created_at desc);

create index if not exists idx_lead_intake_email
  on public.lead_intake (email);

create index if not exists idx_lead_intake_user_id
  on public.lead_intake (user_id);

create index if not exists idx_lead_events_lead_id_created_at
  on public.lead_events (lead_id, created_at desc);

create index if not exists idx_lead_events_event_type_created_at
  on public.lead_events (event_type, created_at desc);

alter table public.lead_events enable row level security;

drop policy if exists "Lead events select own" on public.lead_events;
drop policy if exists "Lead events insert own" on public.lead_events;

create policy "Lead events select own"
  on public.lead_events
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.lead_intake
      where public.lead_intake.id = public.lead_events.lead_id
        and public.lead_intake.user_id = auth.uid()
    )
  );

create policy "Lead events insert own"
  on public.lead_events
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.lead_intake
      where public.lead_intake.id = public.lead_events.lead_id
        and public.lead_intake.user_id = auth.uid()
    )
  );
