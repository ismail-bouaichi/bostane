# Bostane — fruits & légumes frais

Next.js storefront for a fresh-produce delivery business in Morocco. French and Arabic (RTL), prices in Moroccan dirhams (MAD), cash or card on delivery, orders confirmed over WhatsApp.

## Pages

| Route | Page |
| --- | --- |
| `/fr`, `/ar` | Home |
| `/[lang]/produits` | Shop with category filter, search and sort |
| `/[lang]/produits/[slug]` | Product detail |
| `/[lang]/paniers` | Ready-made baskets |
| `/[lang]/a-propos` | About |
| `/[lang]/contact` | Contact form + FAQ |
| `/[lang]/panier` | Cart |
| `/[lang]/commande` | Checkout |
| `/[lang]/commande/merci` | Order confirmation |

`/` redirects to `/fr`. The language switch in the header keeps the current page.

## Run locally

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. vercel.com → **Add New → Project** → import this GitHub repo.
2. Framework preset: **Next.js** (detected automatically). No environment variables needed.
3. Deploy.

## Customize

- **Business info** (WhatsApp number, phone, email, delivery fee, free-delivery threshold, minimum order, order cutoff hour): `src/lib/site.ts`
- **Products, prices, baskets, photos**: `src/lib/catalog.ts` (photos are Pexels IDs)
- **All text in French and Arabic**: `src/lib/i18n.ts`
- **Colors and layout**: `src/app/globals.css`

Set `whatsapp` in `src/lib/site.ts` (e.g. `"212612345678"`) so orders go straight to the shop's WhatsApp.
