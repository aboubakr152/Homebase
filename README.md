# The Yellow Mango Website

Premium, responsive brand and product-catalogue website for The Yellow Mango. Customers browse products on the site and complete purchases on Amazon.com. The site intentionally has no cart, checkout, local payment processing, currency selector or non-US marketplaces.

## Stack

- TypeScript
- Next.js App Router
- React
- Tailwind CSS configuration with shared design tokens
- Sanity CMS schemas for products and categories
- Supabase-ready feedback API route
- Vercel deployment target

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Required environment variables

See `.env.example`.

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project id.
- `NEXT_PUBLIC_SANITY_DATASET` — Sanity dataset, usually `production`.
- `SANITY_API_TOKEN` — server-side Sanity token for previews or protected reads.
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — browser-safe anon key if later needed.
- `SUPABASE_SERVICE_ROLE_KEY` — server-only key used by `/api/feedback`; never expose in client code.
- `FEEDBACK_NOTIFICATION_EMAIL` — optional owner notification recipient.

## Sanity setup

Schemas live in `sanity/schemas`. The product schema includes fields for product status, featured status, categories, Sanity-hosted images with alt text, Amazon.com URLs, ASIN, Amazon Attribution URL, benefits, features, specifications, package contents, instructions, care, FAQs, related products and SEO metadata.

To add or update products, the owner should use Sanity Studio forms rather than editing source code. Publish active products to make them eligible for product cards, dynamic product pages, shop results, related products and feedback tabs.

## Current launch products

- Manual Juicer
- Potato Chipper
- Tea Kettle
- Thermos Bottle

The discontinued portable blender is not included.

## Changing Amazon links

Update `amazonUrlUS` or `amazonAttributionUrl` on each product in Sanity. The site uses Amazon-safe button language: `Buy on Amazon`, `Check Price on Amazon` and `View on Amazon`.

## Supabase feedback storage

Create a `feedback_submissions` table with fields matching the API payload: product id/name, category, customer name/email, optional order number, optional variant, rating, message, uploaded image URL, permission to contact, status, timestamps and page source.

The API route stores submissions only when `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are configured. Without those variables it validates and returns success for local testing.

## Vercel deployment

Import the GitHub repository into Vercel, set environment variables, and deploy. Use production deployments from the main branch and preview deployments for pull requests. Connect the custom domain in Vercel project settings when ready.

## Testing feedback submissions

1. Run `npm run dev`.
2. Visit `/feedback`.
3. Select a product tab.
4. Submit required fields.
5. Confirm the success message appears.
6. If Supabase variables are configured, confirm a new `feedback_submissions` row is created.
