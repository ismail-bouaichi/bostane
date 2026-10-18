"use client";

import { useState } from "react";
import Link from "next/link";
import { formatMAD, type Product } from "@/lib/catalog";
import { getDict, type Locale } from "@/lib/i18n";
import { useCart } from "./CartProvider";
import { QtyStepper } from "./QtyStepper";

export function BuyBox({ p, lang }: { p: Product; lang: Locale }) {
  const t = getDict(lang);
  const step = p.unit === "kg" ? 0.5 : 1;
  const [qty, setQty] = useState(p.unit === "kg" && p.price < 30 ? 1 : step);
  const { cart, add, notify, ready } = useCart();
  const inCart = cart[p.slug] ?? 0;
  return (
    <div className="pd-buy">
      <QtyStepper value={qty} step={step} min={step} unit={p.unit} lang={lang} onChange={setQty} />
      <button type="button" className="btn btn-primary" onClick={() => { add(p.slug, qty); notify(`${p.name[lang]} · ${t.common.added}`); }}>
        {t.common.add} · <span className="num">{formatMAD(Math.round(p.price * qty * 100) / 100, lang)}</span>
      </button>
      {ready && inCart > 0 && (
        <div className="pd-line-total">
          <span>{t.common.inCart}</span>
          <Link href={`/${lang}/panier`} className="link-arrow">{t.nav.cart}</Link>
        </div>
      )}
    </div>
  );
}
