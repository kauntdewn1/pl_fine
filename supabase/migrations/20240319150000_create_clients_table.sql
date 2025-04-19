create table clients (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  plano text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Função para atualizar o updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger para atualizar o updated_at
create trigger update_clients_updated_at
  before update on clients
  for each row
  execute function update_updated_at_column();

-- Política de segurança
alter table clients enable row level security;

create policy "Clients are viewable by authenticated users"
  on clients for select
  to authenticated
  using (true);

create policy "Clients are insertable by service role"
  on clients for insert
  to service_role
  with check (true); 