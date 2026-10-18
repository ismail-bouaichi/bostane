import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ABOUT_IMG, MARKET_IMG, pexels } from "@/lib/catalog";
import { getDict, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return { title: t.about.title, description: t.about.lede };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap about-grid">
          <div className="prose">
            <span className="eyebrow">{t.about.title}</span>
            <h1 style={{ fontSize: "clamp(2rem,4.4vw,3.4rem)" }}>{t.about.lede}</h1>
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
          <div className="about-photo">
            <Image src={pexels(ABOUT_IMG)} alt="" fill sizes="(max-width: 1020px) 100vw, 560px" style={{ objectFit: "cover" }} priority />
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head"><h2>{t.about.valuesTitle}</h2></div>
          <div className="values">
            {t.about.values.map(([h, p]) => <div className="value" key={h}><h3>{h}</h3><p>{p}</p></div>)}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="wide-photo">
            <Image src={pexels(MARKET_IMG)} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="cta-row" style={{ justifyContent: "center", marginTop: 32 }}>
            <Link className="btn btn-primary" href={`/${lang}/produits`}>{t.home.ctaShop}</Link>
            <Link className="btn btn-outline" href={`/${lang}/contact`}>{t.nav.contact}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
