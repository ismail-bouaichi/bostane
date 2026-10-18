"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";

export default function NotFound() {
  const p = useParams<{ lang?: string }>();
  const lang = p?.lang && isLocale(p.lang) ? p.lang : "fr";
  const t = getDict(lang).notFound;
  return (
    <div className="wrap thanks">
      <h1>{t.title}</h1>
      <p className="muted">{t.text}</p>
      <Link className="btn btn-primary" href={`/${lang}`}>{t.cta}</Link>
    </div>
  );
}
