"use client";

import { formatQty, type Unit } from "@/lib/catalog";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";

export function QtyStepper({ value, step, min = 0, unit, lang, onChange, size = "md" }: {
  value: number; step: number; min?: number; unit: Unit; lang: Locale; onChange: (v: number) => void; size?: "sm" | "md";
}) {
  const t = getDict(lang).common;
  return (
    <div className={`stepper stepper-${size}`}>
      <button type="button" aria-label={t.decrease} onClick={() => onChange(Math.max(min, Math.round((value - step) * 100) / 100))}>−</button>
      <span className="num" aria-live="polite">{formatQty(value, unit, lang)}</span>
      <button type="button" aria-label={t.increase} onClick={() => onChange(Math.round((value + step) * 100) / 100)}>+</button>
    </div>
  );
}
