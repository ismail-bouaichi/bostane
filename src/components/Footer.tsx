import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo lang={lang} light />
          <p>{t.footer.about}</p>
        </div>
        <div>
          <h2>{t.footer.shop}</h2>
          <ul>
            <li><Link href={`/${lang}/produits?cat=legumes`}>{t.cats.legumes}</Link></li>
            <li><Link href={`/${lang}/produits?cat=fruits`}>{t.cats.fruits}</Link></li>
            <li><Link href={`/${lang}/produits?cat=herbes`}>{t.cats.herbes}</Link></li>
            <li><Link href={`/${lang}/paniers`}>{t.nav.boxes}</Link></li>
          </ul>
        </div>
        <div>
          <h2>{t.footer.help}</h2>
          <ul>
            <li><Link href={`/${lang}/contact#faq`}>{t.footer.faq}</Link></li>
            <li><Link href={`/${lang}/a-propos`}>{t.nav.about}</Link></li>
            <li><Link href={`/${lang}/contact`}>{t.nav.contact}</Link></li>
          </ul>
        </div>
        <div>
          <h2>{t.contact.hoursTitle}</h2>
          <ul className="plain">
            {t.contact.hours.map((h) => <li key={h}>{h}</li>)}
            <li dir="ltr" className="num ltr-inline">{SITE.phoneDisplay}</li>
            <li>{SITE.email}</li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {year} {SITE.name[lang]}. {t.footer.rights}</span>
        <span>{t.footer.currency}</span>
      </div>
    </footer>
  );
}
