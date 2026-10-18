"use client";

import Link from "next/link";
import { formatMAD, itemInfo, unitLabel } from "@/lib/catalog";
import { getDict, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { cartTotals, useCart } from "./CartProvider";
import { ProduceImage } from "./ProduceImage";
import { QtyStepper } from "./QtyStepper";

export function CartView({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const { cart, ready, setQty, remove } = useCart();
  if (!ready) return <div style={{ minHeight: 360 }} />;
  const entries = Object.entries(cart).map(([id, q]) => ({ info: itemInfo(id, lang)!, q })).filter((e) => e.info);

  if (!entries.length) {
    return (
      <div className="empty-cart">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.4 10.3A2 2 0 0 1 15.6 20H8.4a2 2 0 0 1-2-1.7L5 8Z" /><path d="M9 11V7a3 3 0 0 1 6 0v4" /></svg>
        <p className="muted">{t.cart.empty}</p>
        <Link className="btn btn-primary" href={`/${lang}/produits`}>{t.cart.emptyCta}</Link>
      </div>
    );
  }

  const tt = cartTotals(cart);
  return (
    <div className="two-col">
      <div className="lines">
        {entries.map(({ info, q }) => (
          <div className="line" key={info.id}>
            <Link href={info.href} className="line-media" aria-hidden="true" tabIndex={-1}>
              <ProduceImage id={info.img} alt="" sizes="84px" />
            </Link>
            <div className="line-info">
              <Link href={info.href}>{info.name}</Link>
              <small className="num">{formatMAD(info.price, lang)} / {unitLabel(info.unit, lang)}</small>
              <button type="button" className="remove" onClick={() => remove(info.id)} style={{ justifySelf: "start" }}>{t.common.remove}</button>
            </div>
            <div className="line-right">
              <QtyStepper size="sm" value={q} step={info.step} unit={info.unit} lang={lang} onChange={(v) => setQty(info.id, v)} />
              <span className="line-total num">{formatMAD(Math.round(info.price * q * 100) / 100, lang)}</span>
            </div>
          </div>
        ))}
        <div style={{ paddingTop: 20 }}><Link className="link-arrow" href={`/${lang}/produits`}>{t.cart.continue}</Link></div>
      </div>
      <Summary lang={lang} tt={tt}>
        <Link className="btn btn-primary btn-block" href={`/${lang}/commande`} aria-disabled={tt.belowMin}>{t.cart.checkout}</Link>
      </Summary>
    </div>
  );
}

export function Summary({ lang, tt, children, lines }: { lang: Locale; tt: ReturnType<typeof cartTotals>; children?: React.ReactNode; lines?: React.ReactNode }) {
  const t = getDict(lang);
  const pct = Math.min(100, (tt.sub / SITE.freeDeliveryFrom) * 100);
  return (
    <aside className="summary">
      <h2>{t.cart.summary}</h2>
      {lines}
      <div className="sum-row"><span>{t.cart.subtotal}</span><span className="num">{formatMAD(tt.sub, lang)}</span></div>
      <div className="sum-row"><span>{t.cart.delivery}</span><span className="num">{tt.delivery === 0 ? t.cart.free : formatMAD(tt.delivery, lang)}</span></div>
      <div className="meter" aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>
      {tt.belowMin
        ? <p className="hint warn">{t.cart.min.replace("{x}", formatMAD(SITE.minOrder, lang))}</p>
        : <p className="hint">{tt.sub >= SITE.freeDeliveryFrom ? t.cart.freeOk : t.cart.freeLeft.replace("{x}", formatMAD(Math.round((SITE.freeDeliveryFrom - tt.sub) * 100) / 100, lang))}</p>}
      <div className="sum-row sum-total"><span>{t.cart.total}</span><span className="num">{formatMAD(tt.total, lang)}</span></div>
      {children}
      <p className="hint">{t.cart.note}</p>
    </aside>
  );
}
