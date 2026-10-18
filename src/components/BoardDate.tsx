"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

export function BoardDate({ lang }: { lang: Locale }) {
  const [d, setD] = useState("");
  useEffect(() => {
    try {
      setD(new Intl.DateTimeFormat(lang === "ar" ? "ar-MA-u-nu-latn" : "fr-MA", { weekday: "long", day: "numeric", month: "long" }).format(new Date()));
    } catch { setD(""); }
  }, [lang]);
  return <span className="board-date">{d}</span>;
}
