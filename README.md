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
- Cursor-tracked brass glow: replaced by a custom additive-blend canvas cursor effect
  (gold/brass spark trail + click burst/ripple) that works on fine and coarse pointers,
  respects `prefers-reduced-motion`, and sits above cards via a fixed z-index layer.
- Static ambient background (aurora glow, blueprint grid, dust, film grain, vignette)
  rendered once with no per-frame JS.
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
back to `lib/seed-projects.ts` when `DATABASE_URL` is unset or unreachable, and contact
messages are emailed without storing a copy.

To enable the real backend (project data from the DB + contact-message backups):

1. Create a PostgreSQL database (local, Neon, or Vercel Postgres).
2. Copy `.env.example` to `.env` and set `DATABASE_URL`.
3. Apply the schema and seed:
   ```bash
   npm run db:migrate   # creates the initial migration, then applies it
   npm run db:seed      # loads PixToPrompt (LIVE) + the other projects
   ```
4. Restart `npm run dev`. Adding a project later = insert a row, no markup changes.

`prisma/seed.mjs` shows the shape of the data expected by `lib/projects.ts`.

### Production (Vercel)

1. In **Vercel → Settings → Environment Variables**, add `DATABASE_URL` (with the `?sslmode=require`
   suffix if using Neon/Vercel Postgres).
2. Run the migration and seed against the production database once (locally or a one-off
   `vercel run` / CI step):
   ```bash
   npm run db:deploy   # = prisma migrate deploy && prisma db seed
   ```
3. Redeploy (or push). The `postinstall` hook generates the Prisma client; the app reads
   `DATABASE_URL` at runtime and falls back to seed data if it is unset or unreachable.
4. Contact-message backups: each submission is stored in the `ContactMessage` table (best
   effort) **in addition to** the email sent via Resend. Verify persistence from a
   Postgres client (e.g. Neon console or `prisma studio`).

## Deploy to Vercel

1. Push the repo to GitHub and import it in Vercel.
2. Add these environment variables in **Vercel → Project → Settings → Environment Variables**:
   - `RESEND_API_KEY` — **required** for the contact form to send email (from https://resend.com).
   - `CONTACT_FROM` — the verified sender address, e.g. `contact@seyha.dev`. If unset, the
     sandbox sender `onboarding@resend.dev` is used, which only delivers to your own Resend
     account email — verify a domain in Resend and set this for production.
   - `DATABASE_URL` — optional; project data falls back to bundled seed data without it.
   - `NEXT_PUBLIC_SITE_URL` — optional; feeds canonical/OpenGraph URLs.
3. Deploy (or push to trigger a redeploy). The `postinstall` hook generates the Prisma client.
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
   A `201/200` with `{"success":true}` means Resend accepted the message for delivery — but make
   sure the **from** address is a verified sender, otherwise delivery is blocked or lands in spam.

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