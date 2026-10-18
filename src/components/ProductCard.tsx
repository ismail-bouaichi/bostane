"use client";

import Link from "next/link";
import { currencyShort, unitLabel, type Product } from "@/lib/catalog";
import { getDict, type Locale } from "@/lib/i18n";
import { useCart } from "./CartProvider";
import { ProduceImage } from "./ProduceImage";
import { QtyStepper } from "./QtyStepper";

export function ProductCard({ p, lang }: { p: Product; lang: Locale }) {
  const t = getDict(lang);
  const { cart, add, setQty, notify } = useCart();
  const q = cart[p.slug] ?? 0;
  const step = p.unit === "kg" ? (p.price >= 30 ? 0.5 : 1) : 1;
  const name = p.name[lang];

  return (
    <article className="pcard">
      <Link href={`/${lang}/produits/${p.slug}`} className="pcard-media" aria-label={name}>
        <ProduceImage id={p.img} alt={name} sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 280px" />
        {p.arrival && <span className="tag">{t.common.arrival}</span>}
      </Link>
      <div className="pcard-body">
        <Link href={`/${lang}/produits/${p.slug}`} className="pcard-name">{name}</Link>
        <span className="pcard-origin">{p.origin[lang]}</span>
      </div>
      <div className="pcard-foot">
        <span className="price">
          <b className="num">{p.price.toFixed(2).replace(".", ",")}</b>
          <small>{currencyShort(lang)} / {unitLabel(p.unit, lang)}</small>
        </span>
        {q > 0 ? (
          <QtyStepper size="sm" value={q} step={p.unit === "kg" ? 0.5 : 1} unit={p.unit} lang={lang} onChange={(v) => setQty(p.slug, v)} />
        ) : (
          <button type="button" className="add-btn" aria-label={`${t.common.add} ${name}`}
            onClick={() => { add(p.slug, step); notify(`${name} · ${t.common.added}`); }}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
          </button>
        )}
      </div>
    </article>
  );
}
