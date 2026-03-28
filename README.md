# Valkeron Web

Marketing site for Valkeron built with Next.js 15 App Router, TypeScript, Tailwind CSS v4, `next-intl`, `next-themes`, and shadcn/ui conventions.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- next-intl (EN + ES)
- next-themes (system-aware dark/light mode)
- Strapi-ready fetch helper

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Dev server (hot reload)
npm run build     # Production build
npm run start     # Start production server
```

## Deploy (PM2 on server)

After pulling changes or making edits:

```bash
cd /home/zetoniak/code/valkeron-web
npm run build && pm2 restart valkeron-web
```

This is required because PM2 serves the pre-built `.next/` output. Code changes
(including CSS) won't be visible until you rebuild.

| Step | What it does |
|------|-------------|
| `npm run build` | Compiles Next.js into `.next/` |
| `pm2 restart valkeron-web` | Restarts the server to serve the new build |

> **Tip:** If styles still look stale after restart, hard-refresh the browser with `Ctrl+Shift+R`.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_STRAPI_URL`
- `STRAPI_TOKEN`
- `REVALIDATE_SECRET`

## Routing

- `/en` English
- `/es` Spanish
- `/` locale redirect via `next-intl` middleware

## Content

- Marketing homepage sections are driven by translation files in `messages/`
- Blog routes are scaffolded for static content now and can later be backed by Strapi
- Revalidation endpoint: `POST /api/revalidate?secret=...`
