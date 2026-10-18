"use client";

import { currencyShort, type Box } from "@/lib/catalog";
import { getDict, type Locale } from "@/lib/i18n";
import { useCart } from "./CartProvider";
import { ProduceImage } from "./ProduceImage";

export function BoxCard({ b, lang, showContents = true }: { b: Box; lang: Locale; showContents?: boolean }) {
  const t = getDict(lang);
  const { cart, add, notify } = useCart();
  const inCart = cart[b.slug] ?? 0;
  return (
    <article className={`box-card ${b.popular ? "popular" : ""}`}>
      <div className="box-media">
        <ProduceImage id={b.img} alt={b.name[lang]} sizes="(max-width: 680px) 100vw, 380px" />
        {b.popular && <span className="tag">{t.common.popular}</span>}
      </div>
      <div className="box-body">
        <h3>{b.name[lang]}</h3>
        <span className="box-weight">{b.weight[lang]}</span>
        <p className="muted">{b.desc[lang]}</p>
        {showContents && (
          <>
            <span className="legend" style={{ marginTop: 6 }}>{t.boxes.contains}</span>
            <ul className="box-list">{b.contents.map((c) => <li key={c.fr}>{c[lang]}</li>)}</ul>
          </>
        )}
        <div className="box-foot">
          <span className="price"><b className="num">{b.price}</b><small>{currencyShort(lang)}</small></span>
          <button type="button" className="btn btn-primary" onClick={() => { add(b.slug, 1); notify(`${b.name[lang]} · ${t.common.added}`); }}>
            {t.boxes.add}{inCart > 0 ? ` · ${inCart}` : ""}
          </button>
        </div>
      </div>
    </article>
  );
}
