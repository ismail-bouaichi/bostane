"use client";

import { useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

export function ContactForm({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const [f, setF] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = t.checkout.required;
    if (!f.message.trim()) er.message = t.checkout.required;
    setErrors(er);
    if (Object.keys(er).length) return;
    const text = `${f.message}\n\n— ${f.name}${f.phone ? ` · ${f.phone}` : ""}`;
    window.open(whatsappLink(text), "_blank", "noopener");
    setSent(true);
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="row-2">
        <div className="field">
          <label htmlFor="c-name">{t.contact.name}</label>
          <input id="c-name" autoComplete="name" value={f.name} aria-invalid={!!errors.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          {errors.name && <span className="err">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="c-phone">{t.contact.phone}</label>
          <input id="c-phone" type="tel" dir="ltr" inputMode="tel" autoComplete="tel" placeholder="06 12 34 56 78" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-msg">{t.contact.message}</label>
        <textarea id="c-msg" rows={5} value={f.message} aria-invalid={!!errors.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
        {errors.message && <span className="err">{errors.message}</span>}
      </div>
      <button type="submit" className="btn btn-primary">{t.contact.send}</button>
      {sent && <p className="notice" role="status">{t.contact.sent}</p>}
    </form>
  );
}
