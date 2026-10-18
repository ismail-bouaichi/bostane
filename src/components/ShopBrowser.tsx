"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { PRODUCTS, type Category } from "@/lib/catalog";
import { getDict, type Locale } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";

const CATS: ("all" | Category)[] = ["all", "legumes", "fruits", "herbes"];
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function ShopBrowser({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const sp = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const raw = sp.get("cat");
  const cat = (CATS as string[]).includes(raw ?? "") ? (raw as "all" | Category) : "all";
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default");

  const list = useMemo(() => {
    const nq = norm(q.trim());
    let l = PRODUCTS.filter((p) => (cat === "all" || p.cat === cat) && (!nq || norm(p.name.fr).includes(nq) || p.name.ar.includes(q.trim())));
    if (sort !== "default") l = [...l].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
    return l;
  }, [cat, q, sort]);

  const setCat = (c: string) => router.replace(c === "all" ? path : `${path}?cat=${c}`, { scroll: false });

  return (
    <>
      <div className="shop-tools">
        <div className="chips" role="group" aria-label={t.cats.all}>
          {CATS.map((c) => (
            <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{t.cats[c]}</button>
          ))}
        </div>
        <div className="tools-right">
          <label className="search-box">
            <span className="sr-only">{t.shop.search}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input id="shop-search" type="search" placeholder={t.shop.search} value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <label>
            <span className="sr-only">{t.shop.sort}</span>
            <select id="shop-sort" className="select" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
              <option value="default">{t.shop.sortDefault}</option>
              <option value="asc">{t.shop.sortAsc}</option>
              <option value="desc">{t.shop.sortDesc}</option>
            </select>
          </label>
        </div>
      </div>
      <p className="result-count num">{list.length} {t.shop.results}</p>
      <div className="p-grid">
        {list.length ? list.map((p) => <ProductCard key={p.slug} p={p} lang={lang} />) : <p className="empty-state">{t.shop.none}</p>}
      </div>
    </>
  );
}
