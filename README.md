# Homebase Unified Next.js Project

This repository combines **13 integrated modules** into one complete Next.js App Router project:

1. auth
2. users
3. organizations
4. projects
5. tasks
6. comments
7. notifications
8. files
9. search
10. settings
11. analytics
12. activity
13. dashboard

## Folder Structure

- `app/` - App Router pages and API routes
- `modules/` - Domain modules and service-layer logic
- `lib/` - Shared infrastructure (auth, prisma, validation, types)
- `prisma/` - Database schema and seed script
- `components/` - Reusable UI components
- `types/` - Type augmentations

## Run

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Then open `http://localhost:3000` and navigate to `/dashboard`.
