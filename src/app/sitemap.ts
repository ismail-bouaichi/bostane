import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/catalog";
import { LOCALES } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/produits", "/paniers", "/a-propos", "/contact", ...PRODUCTS.map((p) => `/produits/${p.slug}`)];
  return LOCALES.flatMap((l) => pages.map((p) => ({ url: `${SITE.url}/${l}${p}`, changeFrequency: "daily" as const })));
}
