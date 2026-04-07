-- ============================================================
-- family-chores: Supabase テーブル定義
-- SQL Editor に貼り付けて実行してください
-- ============================================================

create table if not exists members (
  id text primary key,
  name text not null,
  color text default 'purple',
  created_at timestamptz default now()
);

create table if not exists chores (
  id text primary key,
  name text not null,
  freq text default 'daily',
  need integer default 1,
  fixed_members text[] default '{}',
  color text default 'purple',
  created_at timestamptz default now()
);

create table if not exists availability (
  avail_key text primary key,
  dates text[] default '{}'
);

create table if not exists assignments (
  day_key text not null,
  chore_id text not null,
  member_ids text[] default '{}',
  primary key (day_key, chore_id)
);

create table if not exists meals (
  meal_key text primary key,
  member_id text,
  date text,
  meal_name text,
  state text default 'undecided'
);

-- RLS を有効化（全操作を許可: 家族内ツールのため簡易設定）
alter table members enable row level security;
alter table chores enable row level security;
alter table availability enable row level security;
alter table assignments enable row level security;
alter table meals enable row level security;

create policy "allow_all" on members for all using (true) with check (true);
create policy "allow_all" on chores for all using (true) with check (true);
create policy "allow_all" on availability for all using (true) with check (true);
create policy "allow_all" on assignments for all using (true) with check (true);
create policy "allow_all" on meals for all using (true) with check (true);
