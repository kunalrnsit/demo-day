-- ============================================================
-- SKH investor sign-ups
-- Run once in Supabase → SQL Editor → + → Create a new snippet → Run
-- ============================================================

-- 1. Table for investors who join through the website
create table if not exists public.investor_signups (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  phone         text,
  organisation  text,                          -- firm name, or blank for individual angels
  investor_type text not null,                 -- angel | vc | family_office | banker | corporate | other
  ticket_size   text,                          -- e.g. "₹5–25L"
  sectors       text[] not null default '{}',
  linkedin      text,
  note          text,
  status        text not null default 'new',   -- new | contacted | onboarded | not_a_fit
  created_at    timestamptz not null default now()
);

-- One sign-up per email
create unique index if not exists investor_signups_email_key
  on public.investor_signups (lower(email));

-- Nobody can read or write this table directly from the browser.
alter table public.investor_signups enable row level security;

-- 2. The only way the website can add an investor
create or replace function public.submit_investor_signup(
  p_name text, p_email text, p_phone text, p_organisation text, p_investor_type text,
  p_ticket_size text, p_sectors text[], p_linkedin text, p_note text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_name is null or length(trim(p_name)) = 0 or length(p_name) > 100
     or p_email is null or trim(p_email) !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(p_email) > 200
     or length(coalesce(p_phone, '')) > 20
     or length(coalesce(p_organisation, '')) > 150
     or p_investor_type not in ('angel', 'vc', 'family_office', 'banker', 'corporate', 'other')
     or length(coalesce(p_ticket_size, '')) > 50
     or coalesce(array_length(p_sectors, 1), 0) > 15
     or length(coalesce(p_note, '')) > 1000
     or (coalesce(trim(p_linkedin), '') <> '' and (trim(p_linkedin) !~* '^https?://' or length(p_linkedin) > 300)) then
    return jsonb_build_object('result', 'invalid');
  end if;

  if exists (select 1 from investor_signups where lower(email) = lower(trim(p_email))) then
    return jsonb_build_object('result', 'already');
  end if;

  insert into investor_signups
    (name, email, phone, organisation, investor_type, ticket_size, sectors, linkedin, note)
  values
    (trim(p_name), lower(trim(p_email)), nullif(trim(coalesce(p_phone, '')), ''),
     nullif(trim(coalesce(p_organisation, '')), ''), p_investor_type,
     nullif(trim(coalesce(p_ticket_size, '')), ''), coalesce(p_sectors, '{}'),
     nullif(trim(coalesce(p_linkedin, '')), ''), nullif(trim(coalesce(p_note, '')), ''));

  return jsonb_build_object('result', 'ok');
end;
$$;

revoke all on function public.submit_investor_signup(text, text, text, text, text, text, text[], text, text) from public;
grant execute on function public.submit_investor_signup(text, text, text, text, text, text, text[], text, text) to anon, authenticated;
