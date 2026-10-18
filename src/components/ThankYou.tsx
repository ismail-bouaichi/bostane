"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatMAD, formatQty, itemInfo } from "@/lib/catalog";
import { getDict, type Locale } from "@/lib/i18n";
import { CITIES, whatsappLink } from "@/lib/site";
import { ORDER_KEY, type Order } from "./CheckoutForm";

export function ThankYou({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  useEffect(() => {
    try { const raw = sessionStorage.getItem(ORDER_KEY); setOrder(raw ? JSON.parse(raw) : null); } catch { setOrder(null); }
  }, []);

  if (order === undefined) return <div style={{ minHeight: 400 }} />;
  if (!order) {
    return (
      <div className="thanks">
        <p className="muted">{t.thanks.missing}</p>
        <Link className="btn btn-primary" href={`/${lang}/produits`}>{t.cart.emptyCta}</Link>
      </div>
    );
  }

  const c = t.checkout;
  const slot = c.slots.find(([id]) => id === order.form.slot);
  const when = `${order.form.day === "today" ? c.today : c.tomorrow} · ${slot ? `${slot[1]} (${slot[2]})` : ""}`;
  const pay = order.form.pay === "cash" ? c.cash : c.card;
  const city = CITIES[order.form.city]?.[lang === "ar" ? 1 : 0] ?? "";
  const items = order.lines.map((l) => ({ ...l, info: itemInfo(l.id, lang) })).filter((l) => l.info);

  const T = t.thanks;
  const msg = [
    `${T.waIntro} (${order.no})`, "",
    ...items.map((l) => `• ${l.info!.name} — ${formatQty(l.q, l.info!.unit, lang)} — ${formatMAD(l.amount, lang)}`), "",
    `${t.cart.total}: ${formatMAD(order.totals.total, lang)} (${t.cart.delivery}: ${order.totals.delivery === 0 ? t.cart.free : formatMAD(order.totals.delivery, lang)})`,
    `${T.waName}: ${order.form.name}`,
    `${T.waPhone}: ${order.form.phone}`,
    `${T.waAddress}: ${order.form.address}, ${city}`,
    `${T.waWhen}: ${when}`,
    `${T.waPay}: ${pay}`,
    ...(order.form.note ? [`${T.waNote}: ${order.form.note}`] : []),
  ].join("\n");

  return (
    <div className="thanks">
      <div className="check"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></div>
      <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>{T.title}</h1>
      <p className="muted">{T.lede}</p>
      <div className="receipt">
        <div className="sum-row"><span className="muted">{T.number}</span><b className="num" dir="ltr">{order.no}</b></div>
        <div className="sum-row"><span className="muted">{T.when}</span><span>{when}</span></div>
        <div className="sum-row"><span className="muted">{T.pay}</span><span>{pay}</span></div>
        <hr />
        {items.map((l) => (
          <div className="sum-row" key={l.id}><span>{l.info!.name} · {formatQty(l.q, l.info!.unit, lang)}</span><span className="num">{formatMAD(l.amount, lang)}</span></div>
        ))}
        <hr />
        <div className="sum-row"><span>{t.cart.delivery}</span><span className="num">{order.totals.delivery === 0 ? t.cart.free : formatMAD(order.totals.delivery, lang)}</span></div>
        <div className="sum-row sum-total"><span>{t.cart.total}</span><span className="num">{formatMAD(order.totals.total, lang)}</span></div>
      </div>
      <div className="cta-row" style={{ justifyContent: "center", marginTop: 0 }}>
        <a className="btn btn-primary" href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer">{T.whatsapp}</a>
        <Link className="btn btn-outline" href={`/${lang}`}>{T.back}</Link>
      </div>
    </div>
  );
}
