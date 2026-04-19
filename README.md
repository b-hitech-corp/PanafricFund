# PanAfricFund MVP

Production-ready MVP for a diaspora investment platform connecting African founders and global funders.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS (shadcn-style components)
- Prisma ORM + PostgreSQL (Neon/Supabase/Vercel Postgres)
- React Hook Form + Zod
- NextAuth credentials auth (admin only)

## Features
- Landing page with featured project
- Projects marketplace with search/filter
- Project detail pages + express interest CTA
- Founder application form (DB persisted)
- Funder interest form (DB persisted)
- Admin dashboard (protected)
  - stats
  - view submissions
  - create/delete projects
- Legal pages: terms, privacy, risk

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure env:
   ```bash
   cp .env.example .env
   ```
3. Run migrations and generate Prisma client:
   ```bash
   npx prisma migrate dev --name init
   npm run prisma:generate
   ```
4. Seed initial data and admin user:
   ```bash
   npm run prisma:seed
   ```
5. Start app:
   ```bash
   npm run dev
   ```

## Default Admin Login
- Email: value of `ADMIN_EMAIL`
- Password: value of `ADMIN_PASSWORD`

## Vercel Deployment (Git Integration)
1. Push repository to GitHub.
2. Import project in Vercel.
3. Add managed Postgres (Vercel Postgres or external Neon/Supabase).
4. Add environment variables from `.env.example`.
5. Set build command: `npm run build`.
6. Set install command: `npm install`.
7. Run Prisma migrate as part of deployment workflow (recommended):
   - `npx prisma migrate deploy`
   - `npm run prisma:seed` (one-time or conditional)
8. Deploy. Admin auth and all forms run serverlessly via Next.js routes/server actions.

## Route Map
- `/`
- `/projects`
- `/projects/[slug]`
- `/apply/founder`
- `/invest`
- `/admin`
- `/login`
- `/legal/terms`
- `/legal/privacy`
- `/legal/risk`
