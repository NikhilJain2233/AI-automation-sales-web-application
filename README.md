# AI Agent Workplace Website

A professional sales website for an AI automation agency. It includes a React frontend, Node/Express backend, and Supabase-ready authentication and lead storage.

## Setup

1. Install dependencies:
   ```bash
   npm run install:all
   ```

2. Copy the environment examples:
   ```bash
   Copy-Item server/.env.example server/.env
   Copy-Item client/.env.example client/.env
   ```

3. Add your Supabase project URL and keys.

4. Run the app:
   ```bash
   npm run dev
   ```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:4000`

## Supabase Tables

Create a `leads` table:

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  source text default 'website',
  created_at timestamptz default now()
);
```

Authentication uses Supabase Auth email/password. The backend exposes a profile endpoint for logged-in users.
