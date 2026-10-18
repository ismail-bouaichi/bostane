import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThankYou } from "@/components/ThankYou";
import { getDict, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDict(lang).thanks.title, robots: { index: false } };
}

export default async function ThanksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <div className="wrap"><ThankYou lang={lang} /></div>;
}
