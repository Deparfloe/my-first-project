Tech stack
-----------

- Next.js (App Router) — latest stable version
- React
- TypeScript (strict mode enabled)
- Tailwind CSS (default configuration)
- ESLint (Next.js recommended config)
- Supabase (`@supabase/supabase-js`) for backend/auth/database


Folder structure
----------------

- /src
  - /app        — Next.js App Router entrypoints and pages
  - /components — Reusable React components
  - /lib        — Lightweight libraries and clients (e.g. `supabase.ts`)
- /public       — Static assets served by Next.js
- package.json  — npm scripts and dependencies
- tsconfig.json — TypeScript configuration (strict mode enabled)
- tailwind.config.js — Tailwind configuration


Environment variables
---------------------

The project expects the following environment variables (example names used in `src/lib/supabase.ts`):

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL (public)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key (public)

Store them in a local `.env.local` file for development (do NOT commit this file).


Next steps for development
--------------------------

1. Add your `.env.local` with the Supabase variables:

   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

2. Start the dev server:

   npm run dev

3. Implement pages under `src/app` and reusable UI in `src/components`.

4. Use `src/lib/supabase.ts` to interact with Supabase (auth, database, storage).

5. Add tests, CI, or additional envs (service_role key) as required for production.
