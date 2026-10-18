import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoxCard } from "@/components/BoxCard";
import { BOXES } from "@/lib/catalog";
import { getDict, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return { title: t.boxes.title, description: t.boxes.sub };
}

export default async function BoxesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <header className="page-head" style={{ marginBottom: 32 }}>
        <h1>{t.boxes.title}</h1>
        <p>{t.boxes.sub}</p>
      </header>
      <div className="box-grid">{BOXES.map((b) => <BoxCard key={b.slug} b={b} lang={lang} />)}</div>
      <div className="promise" style={{ marginTop: 48 }}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>
        <div><h3>{t.home.promiseTitle}</h3><p>{t.home.promise}</p></div>
      </div>
    </div>
  );
}
