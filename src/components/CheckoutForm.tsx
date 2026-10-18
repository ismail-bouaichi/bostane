"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatMAD, formatQty, itemInfo } from "@/lib/catalog";
import { getDict, type Locale } from "@/lib/i18n";
import { CITIES, SITE } from "@/lib/site";
import { cartTotals, useCart } from "./CartProvider";
import { Summary } from "./CartView";

export interface Order {
  no: string;
  createdAt: string;
  form: { name: string; phone: string; city: number; address: string; note: string; day: "today" | "tomorrow"; slot: string; pay: "cash" | "card" };
  lines: { id: string; q: number; amount: number }[];
  totals: ReturnType<typeof cartTotals>;
}
export const ORDER_KEY = "bostane.lastOrder";

function moroccoHour() {
  try {
    return Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Africa/Casablanca" }).format(new Date()));
  } catch { return new Date().getHours(); }
}

export function CheckoutForm({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const c = t.checkout;
  const router = useRouter();
  const { cart, ready, clear } = useCart();
  const [todayOpen, setTodayOpen] = useState(true);
  const [f, setF] = useState<Order["form"]>({ name: "", phone: "", city: -1, address: "", note: "", day: "today", slot: "a", pay: "cash" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const open = moroccoHour() < SITE.orderCutoffHour;
    setTodayOpen(open);
    if (!open) setF((x) => ({ ...x, day: "tomorrow" }));
  }, []);

  if (!ready) return <div style={{ minHeight: 400 }} />;
  const entries = Object.entries(cart).map(([id, q]) => ({ info: itemInfo(id, lang)!, q })).filter((e) => e.info);
  const tt = cartTotals(cart);

  if (!entries.length || tt.belowMin) {
    return (
      <div className="empty-cart">
        <p className="muted">{entries.length ? t.cart.min.replace("{x}", formatMAD(SITE.minOrder, lang)) : t.cart.empty}</p>
        <Link className="btn btn-primary" href={`/${lang}/${entries.length ? "panier" : "produits"}`}>{entries.length ? t.nav.cart : t.cart.emptyCta}</Link>
      </div>
    );
  }

  const set = <K extends keyof Order["form"]>(k: K, v: Order["form"][K]) => {
    setF((x) => ({ ...x, [k]: v }));
    if (errors[k]) setErrors((e) => { const n = { ...e }; delete n[k]; return n; });
  };

  function validate() {
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = c.required;
    const digits = f.phone.replace(/[^\d+]/g, "").replace(/^\+212/, "0").replace(/^00212/, "0");
    if (!f.phone.trim()) er.phone = c.required;
    else if (!/^0[5-7]\d{8}$/.test(digits)) er.phone = c.badPhone;
    if (f.city < 0) er.city = c.required;
    if (!f.address.trim()) er.address = c.required;
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) document.getElementById(`co-${first}`)?.focus();
    return !first;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || !validate()) return;
    setBusy(true);
    const order: Order = {
      no: `BST-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      form: f,
      lines: entries.map(({ info, q }) => ({ id: info.id, q, amount: Math.round(info.price * q * 100) / 100 })),
      totals: tt,
    };
    try { sessionStorage.setItem(ORDER_KEY, JSON.stringify(order)); } catch {}
    clear();
    router.push(`/${lang}/commande/merci`);
  }

  const lines = (
    <div className="mini-lines">
      {entries.map(({ info, q }) => (
        <div key={info.id}><span>{info.name} · {formatQty(q, info.unit, lang)}</span><span className="num">{formatMAD(Math.round(info.price * q * 100) / 100, lang)}</span></div>
      ))}
    </div>
  );

  const err = (k: string) => errors[k] ? <span className="err" id={`co-${k}-err`}>{errors[k]}</span> : null;

  return (
    <div className="two-col">
      <form id="checkout" className="form card-panel" onSubmit={submit} noValidate>
        <fieldset className="fieldset">
          <legend>{c.contactT}</legend>
          <div className="row-2">
            <div className="field">
              <label htmlFor="co-name">{c.name}</label>
              <input id="co-name" autoComplete="name" value={f.name} aria-invalid={!!errors.name} onChange={(e) => set("name", e.target.value)} />
              {err("name")}
            </div>
            <div className="field">
              <label htmlFor="co-phone">{c.phone}</label>
              <input id="co-phone" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" placeholder="06 12 34 56 78" value={f.phone} aria-invalid={!!errors.phone} onChange={(e) => set("phone", e.target.value)} />
              {err("phone")}
            </div>
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend>{c.deliveryT}</legend>
          <div className="field">
            <label htmlFor="co-city">{c.city}</label>
            <select id="co-city" value={f.city} aria-invalid={!!errors.city} onChange={(e) => set("city", Number(e.target.value))}>
              <option value={-1}>{c.cityPick}</option>
              {CITIES.map((ct, i) => <option key={ct[0]} value={i}>{lang === "ar" ? ct[1] : ct[0]}</option>)}
            </select>
            {err("city")}
          </div>
          <div className="field">
            <label htmlFor="co-address">{c.address}</label>
            <textarea id="co-address" rows={3} placeholder={c.addressPh} value={f.address} aria-invalid={!!errors.address} onChange={(e) => set("address", e.target.value)} />
            {err("address")}
          </div>
          <div className="field">
            <span className="legend">{c.day}</span>
            <div className="options cols-2">
              <label className="option"><input type="radio" name="day" id="day-today" disabled={!todayOpen} checked={f.day === "today"} onChange={() => set("day", "today")} /><span>{c.today}{!todayOpen && <small>{c.todayClosed}</small>}</span></label>
              <label className="option"><input type="radio" name="day" id="day-tomorrow" checked={f.day === "tomorrow"} onChange={() => set("day", "tomorrow")} /><span>{c.tomorrow}</span></label>
            </div>
          </div>
          <div className="field">
            <span className="legend">{c.slot}</span>
            <div className="options cols-3">
              {c.slots.map(([id, label, hours]) => (
                <label className="option" key={id}><input type="radio" name="slot" id={`slot-${id}`} checked={f.slot === id} onChange={() => set("slot", id)} /><span>{label}<small className="num">{hours}</small></span></label>
              ))}
            </div>
          </div>
          <div className="field">
            <label htmlFor="co-note">{c.note}</label>
            <input id="co-note" value={f.note} onChange={(e) => set("note", e.target.value)} />
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend>{c.payT}</legend>
          <div className="options">
            <label className="option"><input type="radio" name="pay" id="pay-cash" checked={f.pay === "cash"} onChange={() => set("pay", "cash")} /><span>{c.cash}</span></label>
            <label className="option"><input type="radio" name="pay" id="pay-card" checked={f.pay === "card"} onChange={() => set("pay", "card")} /><span>{c.card}<small>{c.cardSub}</small></span></label>
          </div>
        </fieldset>
      </form>
      <Summary lang={lang} tt={tt} lines={lines}>
        <button type="submit" form="checkout" className="btn btn-primary btn-block" disabled={busy}>{c.confirm}</button>
      </Summary>
    </div>
  );
}
