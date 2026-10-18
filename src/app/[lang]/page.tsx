import Link from "next/link";
import Image from "next/image";
import { BoardDate } from "@/components/BoardDate";
import { BoxCard } from "@/components/BoxCard";
import { ProductCard } from "@/components/ProductCard";
import { BOXES, HERO_IMG, PRODUCTS, currencyShort, pexels, unitLabel, type Category } from "@/lib/catalog";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const BOARD = ["tomates", "clementines", "pommes-de-terre", "grenades", "menthe"];
const CAT_IMG: Record<Category, number> = { legumes: 7890188, fruits: 7703345, herbes: 8281634 };

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  if (!isLocale(l)) notFound();
  const lang: Locale = l;
  const t = getDict(lang);
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const [first, ...rest] = t.home.title.split(/(?<=[,،])\s/);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">{t.home.eyebrow}</span>
            <h1>{rest.length ? <>{first} <span className="hl">{rest.join(" ")}</span></> : t.home.title}</h1>
            <p className="lede">{t.home.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href={`/${lang}/produits`}>{t.home.ctaShop}</Link>
              <Link className="btn btn-outline" href={`/${lang}/paniers`}>{t.home.ctaBoxes}</Link>
            </div>
            <dl className="stats">
              {t.home.stats.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </div>
          <div className="hero-visual">
            <div className="hero-photo">
              <Image src={pexels(HERO_IMG)} alt="" fill priority sizes="(max-width: 1020px) 100vw, 560px" style={{ objectFit: "cover" }} />
            </div>
            <aside className="board" aria-labelledby="board-title">
              <div className="board-head">
                <h2 id="board-title">{t.home.boardTitle}</h2>
                <BoardDate lang={lang} />
              </div>
              <ul>
                {BOARD.map((slug) => {
                  const p = PRODUCTS.find((x) => x.slug === slug)!;
                  return (
                    <li key={slug}>
                      <span>{p.name[lang]}</span><span className="dots" />
                      <span className="p num">{p.price.toFixed(2).replace(".", ",")}</span>
                      <span className="u">{currencyShort(lang)}/{unitLabel(p.unit, lang)}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="board-note">{t.home.boardNote}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head"><h2>{t.home.catsTitle}</h2></div>
          <div className="cat-grid">
            {(["legumes", "fruits", "herbes"] as Category[]).map((c) => (
              <Link key={c} href={`/${lang}/produits?cat=${c}`} className="cat-tile">
                <Image src={pexels(CAT_IMG[c])} alt="" fill sizes="(max-width: 680px) 100vw, 400px" style={{ objectFit: "cover", zIndex: -1 }} />
                <div className="cat-text"><h3>{t.cats[c]}</h3><p>{t.catBlurb[c]}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)", borderBlock: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="section-head">
            <div><h2>{t.home.featuredTitle}</h2><p>{t.home.featuredSub}</p></div>
            <Link className="link-arrow" href={`/${lang}/produits`}>{t.common.viewAll}</Link>
          </div>
          <div className="p-grid">{featured.map((p) => <ProductCard key={p.slug} p={p} lang={lang} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div><h2>{t.home.boxesTitle}</h2><p>{t.home.boxesSub}</p></div>
            <Link className="link-arrow" href={`/${lang}/paniers`}>{t.nav.boxes}</Link>
          </div>
          <div className="box-grid">{BOXES.map((b) => <BoxCard key={b.slug} b={b} lang={lang} showContents={false} />)}</div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head"><h2>{t.home.howTitle}</h2></div>
          <ol className="steps">
            {t.home.steps.map(([h, p]) => <li key={h}><h3>{h}</h3><p>{p}</p></li>)}
          </ol>
          <div className="promise" style={{ marginTop: 48 }}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>
            <div><h3>{t.home.promiseTitle}</h3><p>{t.home.promise}</p></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band">
            <div><h2>{t.home.ctaBandTitle}</h2><p>{t.home.ctaBandSub}</p></div>
            <Link className="btn btn-primary" href={`/${lang}/produits`}>{t.home.ctaShop}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
