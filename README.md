# Nan Seyha — Full-Stack Developer Portfolio

A production-grade, single-owner developer portfolio: a dark "engineering blueprint"
single-page site (plus per-project case-study pages) with a real backend for contact
submissions and database-driven project data.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** with a flat design-token theme
- **Motion** (motion.dev) for all animation
- **PostgreSQL + Prisma 6** for project data and contact messages
- **Zod** for server-side validation

## Architecture

| Route | Purpose |
| --- | --- |
| `/` | Single-page portfolio: Hero, About, Skills, Projects, Contact (SSG) |
| `/projects/[slug]` | Case-study page per project (generated at build from the DB) |
| `/api/contact` | POST endpoint for contact submissions (external integrations) |
| Server Action `submitContactForm` | Progressive-enhancement path for the contact form |

Key behaviours implemented to spec:

- Fixed blueprint grid layer with scroll-linked parallax, masked so it fades toward the
  bottom of the hero.
- Cursor-tracked brass glow (`clientX`/`clientY` → viewport-correct during scroll) with
  `mix-blend-mode: screen`, eased via Motion `useSpring`.
- Staggered hero load sequence, one-shot `whileInView` reveals, small spring hover
  micro-interactions, and a reduced-motion mode that disables the load stagger, parallax,
  glow loop, and scroll cue bobbing.
- Projects rendered from the `Project` table; `PixToPrompt` is seeded `LIVE`, unfinished
  work is seeded `IN_DEVELOPMENT` and renders without a link.
- Contact form: inline field validation, `Sending…` pending state (`useFormStatus`),
  success/error states, no-JS fallback via the Server Action.

## Getting started

```bash
npm install        # also runs `prisma generate` (postinstall)
npm run dev        # http://localhost:3000
```

## Database (optional)

The site builds, runs, and deploys with **no database** — the Projects section falls
back to `lib/seed-projects.ts` when `DATABASE_URL` is unset or unreachable.

To enable the real backend:

1. Create a PostgreSQL database (local, Neon, or Supabase).
2. Copy `.env.example` to `.env` and set `DATABASE_URL`.
3. Apply the schema and seed:
   ```bash
   npm run db:migrate   # generates the initial migration (choose a name like "init")
   npm run db:seed      # loads PixToPrompt (LIVE) + Next project (in development)
   ```
4. Restart `npm run dev`. Adding a project later = insert a row, no markup changes.

`prisma/seed.mjs` shows the shape of the data expected by `lib/projects.ts`.

## Deploy to Vercel

1. Push the repo to GitHub and import it in Vercel.
2. Add environment variables: `DATABASE_URL` and (optional) `NEXT_PUBLIC_SITE_URL`.
3. Deploy. The `postinstall` hook generates the Prisma client automatically.
4. Run the migration against your production database once:
   ```bash
   npx prisma migrate deploy
   ```
5. Query the contact endpoint:
   ```bash
   curl -X POST https://YOUR-DOMAIN/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Ada","email":"ada@example.com","message":"Hello from curl"}'
   ```

## Project structure

```
app/
  layout.tsx            Fonts, metadata, background FX, header, footer
  page.tsx              Home (SSG), fetches projects server-side
  projects/[slug]/      Case-study page
  api/contact/route.ts  POST endpoint mirroring the Server Action
  actions/contact.ts    submitContactForm Server Action
components/             UI sections + shared primitives
lib/                    Prisma, projects repo (with fallback), validation, motion tokens
prisma/                 schema + seed
```

## Notes

- `npm audit` reports a high-severity advisory in `deepmerge-ts`, used by the Prisma
  **CLI** only (`@prisma/config`). It never runs in the production bundle and has no
  realistic attack surface here; the fix would force a downgrade to Prisma 6.12.
- `NEXT_PUBLIC_SITE_URL` feeds canonical and Open Graph URLs; set it to your real domain.