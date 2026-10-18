import type { Locale } from "@/lib/i18n";

export function Logo({ lang, light = false }: { lang: Locale; light?: boolean }) {
  return (
    <span className={`logo ${light ? "logo-light" : ""}`}>
      <svg className="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="11" fill="currentColor" />
        <path d="M20 9c-5 4.5-7.5 8.7-7.5 12.6a7.5 7.5 0 0 0 15 0C27.5 17.7 25 13.5 20 9Z" fill="var(--bg)" />
        <path d="M20 15v16M20 22l-3.6-3M20 25.5l3.6-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
      <span className="logo-word">{lang === "ar" ? "بستان" : "Bostane"}</span>
    </span>
  );
}
