import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getDict, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDict(lang).checkout.title, robots: { index: false } };
}

export default async function CheckoutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <div className="wrap">
      <header className="page-head" style={{ marginBottom: 16 }}>
        <nav className="crumbs" aria-label="breadcrumb"><Link href={`/${lang}/panier`}>{t.nav.cart}</Link><span aria-hidden="true">/</span><span>{t.checkout.title}</span></nav>
        <h1>{t.checkout.title}</h1>
      </header>
      <CheckoutForm lang={lang} />
    </div>
  );
}
