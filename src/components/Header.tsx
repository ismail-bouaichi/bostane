"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import { useCart } from "./CartProvider";
import { Logo } from "./Logo";

export function Header({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const path = usePathname() || `/${lang}`;
  const { count, ready, toast } = useCart();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  const other: Locale = lang === "fr" ? "ar" : "fr";
  const switchHref = path.replace(/^\/(fr|ar)(?=\/|$)/, `/${other}`);
  const links: [string, string][] = [
    [`/${lang}/produits`, t.nav.shop],
    [`/${lang}/paniers`, t.nav.boxes],
    [`/${lang}/a-propos`, t.nav.about],
    [`/${lang}/contact`, t.nav.contact],
  ];
  const isActive = (href: string) => path === href || path.startsWith(href + "/");

  return (
    <>
      <div className="announce"><div className="wrap">{t.announce}</div></div>
      <header className="site-header">
        <div className="wrap header-row">
          <Link href={`/${lang}`} className="logo-link" aria-label={t.nav.home}><Logo lang={lang} /></Link>
          <nav className="main-nav" aria-label={t.nav.menu}>
            {links.map(([href, label]) => (
              <Link key={href} href={href} className={isActive(href) ? "active" : undefined}>{label}</Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link href={switchHref} className="lang-switch" hrefLang={other} lang={other === "ar" ? "ar" : "fr"}>
              {other === "ar" ? "العربية" : "Français"}
            </Link>
            <Link href={`/${lang}/panier`} className="cart-link" aria-label={t.nav.cart}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.4 10.3A2 2 0 0 1 15.6 20H8.4a2 2 0 0 1-2-1.7L5 8Z" /><path d="M9 11V7a3 3 0 0 1 6 0v4" /></svg>
              <span className="cart-label">{t.nav.cart}</span>
              {ready && count > 0 && <span className="count num">{count}</span>}
            </Link>
            <button type="button" className="menu-btn" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
              <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">{open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
            </button>
          </div>
        </div>
        <nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label={t.nav.menu}>
          <div className="wrap">
            {[[`/${lang}`, t.nav.home] as [string, string], ...links].map(([href, label]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </div>
        </nav>
      </header>
      <div className={`toast ${toast ? "on" : ""}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
