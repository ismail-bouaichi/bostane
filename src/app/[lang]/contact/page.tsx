import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { getDict, isLocale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return { title: t.contact.title, description: t.contact.lede };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <div className="wrap">
      <header className="page-head" style={{ marginBottom: 24 }}>
        <h1>{t.contact.title}</h1>
        <p>{t.contact.lede}</p>
      </header>
      <div className="contact-grid">
        <div className="card-panel"><ContactForm lang={lang} /></div>
        <div className="card-panel">
          <ul className="info-list">
            <li><small>{t.contact.reach}</small><span dir="ltr" className="num ltr-inline">{SITE.phoneDisplay}</span><span>{SITE.email}</span></li>
            <li><small>{t.contact.hoursTitle}</small>{t.contact.hours.map((h) => <span key={h}>{h}</span>)}</li>
            <li><small>{t.footer.delivery}</small><span>{t.home.stats[0][1]} · {t.announce.split("·")[0].trim()}</span></li>
          </ul>
        </div>
      </div>
      <section id="faq" style={{ paddingBottom: 72, scrollMarginTop: 96 }}>
        <div className="section-head"><h2>{t.contact.faqTitle}</h2></div>
        <div className="faq">
          {t.contact.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>
      </section>
    </div>
  );
}
