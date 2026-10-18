import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ShopBrowser } from "@/components/ShopBrowser";
import { getDict, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return { title: t.shop.title, description: t.shop.sub };
}

export default async function ShopPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <div className="wrap" style={{ paddingBottom: 72 }}>
      <header className="page-head">
        <h1>{t.shop.title}</h1>
        <p>{t.shop.sub}</p>
      </header>
      <Suspense fallback={<div style={{ minHeight: 400 }} />}>
        <ShopBrowser lang={lang} />
      </Suspense>
    </div>
  );
}
