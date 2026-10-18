import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource/readex-pro/300.css";
import "@fontsource/readex-pro/400.css";
import "@fontsource/readex-pro/500.css";
import "@fontsource/readex-pro/600.css";
import "@fontsource/lalezar/400.css";
import "../globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getDict, isLocale, LOCALES } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F7F1" },
    { media: "(prefers-color-scheme: dark)", color: "#0C1511" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t.meta.title, template: `%s · ${SITE.name[lang]}` },
    description: t.meta.description,
    alternates: { canonical: `/${lang}`, languages: { "fr-MA": "/fr", "ar-MA": "/ar" } },
    openGraph: { title: t.meta.title, description: t.meta.description, locale: lang === "ar" ? "ar_MA" : "fr_MA", type: "website", siteName: SITE.name[lang] },
  };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang === "ar" ? "ar-MA" : "fr-MA"} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body>
        <CartProvider>
          <Header lang={lang} />
          <main id="main">{children}</main>
          <Footer lang={lang} />
        </CartProvider>
      </body>
    </html>
  );
}
