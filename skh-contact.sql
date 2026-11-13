-- ============================================================
-- SKH contact messages
-- Run once in Supabase → SQL Editor → + → Create a new snippet → Run
-- ============================================================

-- 1. Table for messages from the website's contact form
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  reason     text not null default 'other',   -- founder | investor | partner | other
  message    text not null,
  status     text not null default 'new',     -- new | replied | archived
  created_at timestamptz not null default now()
);

-- Nobody can read or write this table directly from the browser.
alter table public.contact_messages enable row level security;

-- 2. The only way the website can add a message
create or replace function public.submit_contact_message(
  p_name text, p_email text, p_phone text, p_reason text, p_message text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare recent int;
begin
  if p_name is null or length(trim(p_name)) = 0 or length(p_name) > 100
     or p_email is null or trim(p_email) !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(p_email) > 200
     or length(coalesce(p_phone, '')) > 20
     or p_message is null or length(trim(p_message)) < 5 or length(p_message) > 2000 then
    return jsonb_build_object('result', 'invalid');
  end if;

  if p_reason not in ('founder', 'investor', 'partner', 'other') then
    p_reason := 'other';
  end if;

  -- Simple spam guard: at most 3 messages per email in 10 minutes
  select count(*) into recent
  from contact_messages
  where lower(email) = lower(trim(p_email))
    and created_at > now() - interval '10 minutes';
  if recent >= 3 then
    return jsonb_build_object('result', 'too_many');
  end if;

  insert into contact_messages (name, email, phone, reason, message)
  values (trim(p_name), lower(trim(p_email)), nullif(trim(coalesce(p_phone, '')), ''), p_reason, trim(p_message));

  return jsonb_build_object('result', 'ok');
end;
$$;

revoke all on function public.submit_contact_message(text, text, text, text, text) from public;
grant execute on function public.submit_contact_message(text, text, text, text, text) to anon, authenticated;
