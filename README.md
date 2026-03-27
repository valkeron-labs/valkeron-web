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
npm install
npm run dev
npm run build
npm run start
```

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
