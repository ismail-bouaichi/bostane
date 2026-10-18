import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/BuyBox";
import { ProduceImage } from "@/components/ProduceImage";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, currencyShort, unitLabel } from "@/lib/catalog";
import { getDict, isLocale, LOCALES } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => PRODUCTS.map((p) => ({ lang, slug: p.slug })));
}
export const dynamicParams = false;

type P = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!isLocale(lang) || !p) return {};
  return { title: p.name[lang], description: p.desc[lang] };
}

export default async function ProductPage({ params }: P) {
  const { lang, slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!isLocale(lang) || !p) notFound();
  const t = getDict(lang);
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.slug !== p.slug).slice(0, 4);

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="breadcrumb" style={{ paddingTop: 24 }}>
        <Link href={`/${lang}/produits`}>{t.shop.title}</Link><span aria-hidden="true">/</span>
        <Link href={`/${lang}/produits?cat=${p.cat}`}>{t.cats[p.cat]}</Link><span aria-hidden="true">/</span>
        <span>{p.name[lang]}</span>
      </nav>
      <div className="pd">
        <div className="pd-media">
          <ProduceImage id={p.img} alt={p.name[lang]} sizes="(max-width: 1020px) 100vw, 620px" priority />
          {p.arrival && <span className="tag">{t.common.arrival}</span>}
        </div>
        <div className="pd-info">
          <span className="eyebrow">{t.cats[p.cat]}</span>
          <h1>{p.name[lang]}</h1>
          <div className="pd-price">
            <b className="num">{p.price.toFixed(2).replace(".", ",")}</b>
            <small>{currencyShort(lang)} / {unitLabel(p.unit, lang)}</small>
          </div>
          <p style={{ fontSize: "1.05rem" }}>{p.desc[lang]}</p>
          <BuyBox p={p} lang={lang} />
          <ul className="assure">
            <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>{t.product.delivery}</li>
            <li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 20h12M12 4v16M5 8h14M5 8l-2 6a3 3 0 0 0 6 0L7 8m10 0-2 6a3 3 0 0 0 6 0l-2-6" /></svg>{t.product.weighed}</li>
          </ul>
          <dl className="facts">
            <div><dt>{t.common.origin}</dt><dd>{p.origin[lang]}</dd></div>
            <div><dt>{t.common.keep}</dt><dd>{p.keep[lang]}</dd></div>
          </dl>
        </div>
      </div>
      {related.length > 0 && (
        <section style={{ paddingBottom: 72 }}>
          <div className="section-head"><h2>{t.product.related}</h2></div>
          <div className="p-grid">{related.map((r) => <ProductCard key={r.slug} p={r} lang={lang} />)}</div>
        </section>
      )}
    </div>
  );
}
