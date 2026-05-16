create extension if not exists pgcrypto;

create table if not exists public.festival_intents (
  id uuid primary key default gen_random_uuid(),
  user_id text not null unique,
  display_name text not null,
  area text not null,
  artist text not null,
  start_time text not null,
  end_time text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists festival_intents_set_updated_at on public.festival_intents;
create trigger festival_intents_set_updated_at
before update on public.festival_intents
for each row execute function public.set_updated_at();

alter table public.festival_intents enable row level security;

grant select, insert, update, delete on table public.festival_intents to anon;

create policy "festival intents are publicly readable"
on public.festival_intents
for select
to anon
using (true);

create policy "festival intents are publicly insertable"
on public.festival_intents
for insert
to anon
with check (true);

create policy "festival intents are publicly updatable"
on public.festival_intents
for update
to anon
using (true)
with check (true);

create policy "festival intents are publicly deletable"
on public.festival_intents
for delete
to anon
using (true);
