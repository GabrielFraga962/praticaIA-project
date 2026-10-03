-- Origem do lead (utm_source)
alter table public.leads
  add column origem text not null default 'direto';

-- Visitas à landing
create table public.visitas (
  id uuid primary key default gen_random_uuid(),
  origem text not null default 'direto',
  created_at timestamptz not null default now()
);
alter table public.visitas enable row level security;
create policy "permitir insert publico de visitas" on public.visitas
  for insert to anon with check (true);
create index visitas_origem_idx on public.visitas (origem);
create index leads_origem_idx on public.leads (origem);

-- Grupos onde o link foi divulgado (preenchido manualmente)
create table public.grupos (
  origem text primary key,
  nome text not null,
  plataforma text not null,
  membros integer not null check (membros > 0),
  divulgado_em timestamptz
);
alter table public.grupos enable row level security;

-- Conversão por origem
create view public.conversao_por_origem with (security_invoker = true) as
with v as (select origem, count(*) visitas from public.visitas group by 1),
     l as (select origem, count(*) leads from public.leads group by 1),
     base as (
       select coalesce(v.origem, l.origem) origem,
              coalesce(v.visitas, 0) visitas, coalesce(l.leads, 0) leads
       from v full join l on v.origem = l.origem
     )
select b.origem, g.nome grupo, g.plataforma, g.membros,
       b.visitas, b.leads,
       round(100.0 * b.visitas / nullif(g.membros, 0), 1) pct_membros_que_visitaram,
       round(100.0 * b.leads / nullif(b.visitas, 0), 1) pct_conversao_visita_lead,
       round(100.0 * b.leads / nullif(g.membros, 0), 1) pct_membros_que_viraram_lead
from base b left join public.grupos g on g.origem = b.origem
order by b.leads desc;

revoke all on public.conversao_por_origem from anon, authenticated;
