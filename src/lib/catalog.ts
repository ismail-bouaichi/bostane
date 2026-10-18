import type { Locale } from "./i18n";

export type Category = "legumes" | "fruits" | "herbes";
export type Unit = "kg" | "botte" | "piece" | "panier";

type L = { fr: string; ar: string };

export interface Product {
  slug: string;
  cat: Category;
  name: L;
  origin: L;
  desc: L;
  keep: L; // storage tip
  unit: Unit;
  price: number; // MAD per unit
  img: number; // Pexels photo id
  featured?: boolean;
  arrival?: boolean; // arrived this week
}

export interface Box {
  slug: string;
  name: L;
  weight: L;
  desc: L;
  contents: L[];
  price: number;
  img: number;
  popular?: boolean;
}

export const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg`;

export const HERO_IMG = 14650541;
export const ABOUT_IMG = 4975349;
export const MARKET_IMG = 319798;

export const PRODUCTS: Product[] = [
  // Légumes
  { slug: "tomates", cat: "legumes", unit: "kg", price: 7, img: 10112127, featured: true, arrival: true,
    name: { fr: "Tomates rondes", ar: "طماطم" },
    origin: { fr: "Souss-Massa", ar: "سوس ماسة" },
    desc: { fr: "Tomates mûries en plein champ, chair ferme et juteuse. Idéales pour la salade marocaine, la chakchouka et les tajines.", ar: "طماطم ناضجة في الحقل، لحمها متماسك وغني بالعصير. مثالية للسلطة المغربية والشكشوكة والطواجن." },
    keep: { fr: "À température ambiante, à l'abri du soleil.", ar: "تحفظ في درجة حرارة الغرفة بعيداً عن الشمس." } },
  { slug: "pommes-de-terre", cat: "legumes", unit: "kg", price: 5, img: 144248, featured: true,
    name: { fr: "Pommes de terre", ar: "بطاطس" },
    origin: { fr: "Saïss", ar: "سايس" },
    desc: { fr: "Variété à chair ferme, parfaite pour les frites maison, les tajines et la purée.", ar: "صنف متماسك، مثالي للبطاطس المقلية المنزلية والطواجن والبوريه." },
    keep: { fr: "Dans un endroit sec et sombre, hors du réfrigérateur.", ar: "في مكان جاف ومظلم، خارج الثلاجة." } },
  { slug: "oignons", cat: "legumes", unit: "kg", price: 5, img: 7890176,
    name: { fr: "Oignons rouges", ar: "بصل أحمر" },
    origin: { fr: "El Hajeb", ar: "الحاجب" },
    desc: { fr: "Oignons rouges doux et parfumés, à cuire ou à croquer en salade.", ar: "بصل أحمر حلو المذاق وعطر، للطبخ أو للسلطة." },
    keep: { fr: "Au sec, dans un panier aéré.", ar: "في مكان جاف وسلة مهواة." } },
  { slug: "carottes", cat: "legumes", unit: "kg", price: 5, img: 1306559,
    name: { fr: "Carottes", ar: "جزر" },
    origin: { fr: "Doukkala", ar: "دكالة" },
    desc: { fr: "Carottes sucrées et croquantes, pour le couscous, les jus et les salades cuites.", ar: "جزر حلو ومقرمش، للكسكس والعصائر والسلطات المطبوخة." },
    keep: { fr: "Au réfrigérateur, dans le bac à légumes.", ar: "في الثلاجة، في درج الخضر." } },
  { slug: "aubergines", cat: "legumes", unit: "kg", price: 6, img: 3948546,
    name: { fr: "Aubergines", ar: "باذنجان" },
    origin: { fr: "Souss-Massa", ar: "سوس ماسة" },
    desc: { fr: "Peau brillante et chair fondante. Le légume du zaalouk.", ar: "قشرة لامعة ولحم طري. الخضرة الأساسية للزعلوك." },
    keep: { fr: "Au frais, à consommer sous 4 jours.", ar: "في مكان بارد، تستهلك خلال 4 أيام." } },
  { slug: "poivrons", cat: "legumes", unit: "kg", price: 9, img: 10112137, arrival: true,
    name: { fr: "Poivrons tricolores", ar: "فلفل ملون" },
    origin: { fr: "Chtouka", ar: "اشتوكة" },
    desc: { fr: "Mélange de poivrons rouges, jaunes et verts, sucrés et charnus.", ar: "خليط من الفلفل الأحمر والأصفر والأخضر، حلو ولحمي." },
    keep: { fr: "Au réfrigérateur, jusqu'à une semaine.", ar: "في الثلاجة، حتى أسبوع." } },
  { slug: "ail", cat: "legumes", unit: "kg", price: 30, img: 2920402,
    name: { fr: "Ail blanc", ar: "ثوم أبيض" },
    origin: { fr: "Tadla", ar: "تادلة" },
    desc: { fr: "Têtes d'ail bien sèches, goût franc. Vendu au kilo, à partir de 500 g.", ar: "رؤوس ثوم جافة بنكهة قوية. يباع بالكيلو، ابتداءً من 500 غ." },
    keep: { fr: "Au sec, à température ambiante, plusieurs semaines.", ar: "في مكان جاف وفي درجة حرارة الغرفة لعدة أسابيع." } },
  { slug: "concombres", cat: "legumes", unit: "kg", price: 6, img: 2775838,
    name: { fr: "Concombres", ar: "خيار" },
    origin: { fr: "Agadir", ar: "أكادير" },
    desc: { fr: "Concombres fins et croquants, peu de pépins.", ar: "خيار رفيع ومقرمش، قليل البذور." },
    keep: { fr: "Au réfrigérateur, à consommer sous 5 jours.", ar: "في الثلاجة، يستهلك خلال 5 أيام." } },
  // Fruits
  { slug: "clementines", cat: "fruits", unit: "kg", price: 9, img: 7703345, featured: true, arrival: true,
    name: { fr: "Clémentines", ar: "مندرين" },
    origin: { fr: "Berkane", ar: "بركان" },
    desc: { fr: "Premières clémentines de la saison, sans pépins, faciles à éplucher.", ar: "أول مندرين في الموسم، بدون بذور وسهل التقشير." },
    keep: { fr: "À température ambiante, une semaine.", ar: "في درجة حرارة الغرفة، أسبوع." } },
  { slug: "oranges", cat: "fruits", unit: "kg", price: 6, img: 2247142, featured: true,
    name: { fr: "Oranges à jus", ar: "برتقال للعصير" },
    origin: { fr: "Souss", ar: "سوس" },
    desc: { fr: "Oranges très juteuses pour le jus du matin. Comptez 1 kg pour un litre environ.", ar: "برتقال غني بالعصير لعصير الصباح. حوالي كيلو واحد للتر." },
    keep: { fr: "Au frais, jusqu'à deux semaines.", ar: "في مكان بارد، حتى أسبوعين." } },
  { slug: "citrons", cat: "fruits", unit: "kg", price: 10, img: 1414122,
    name: { fr: "Citrons", ar: "ليمون" },
    origin: { fr: "Gharb", ar: "الغرب" },
    desc: { fr: "Citrons jaunes à peau fine, très parfumés.", ar: "ليمون أصفر بقشرة رقيقة وعطر قوي." },
    keep: { fr: "Au réfrigérateur, trois semaines.", ar: "في الثلاجة، ثلاثة أسابيع." } },
  { slug: "raisin", cat: "fruits", unit: "kg", price: 14, img: 5455081,
    name: { fr: "Raisin noir", ar: "عنب أسود" },
    origin: { fr: "Doukkala", ar: "دكالة" },
    desc: { fr: "Grappes de fin de saison, grains sucrés et croquants.", ar: "عناقيد آخر الموسم، حبات حلوة ومقرمشة." },
    keep: { fr: "Au réfrigérateur, sans le laver.", ar: "في الثلاجة، دون غسل." } },
  { slug: "pommes", cat: "fruits", unit: "kg", price: 13, img: 2966150, featured: true,
    name: { fr: "Pommes rouges", ar: "تفاح أحمر" },
    origin: { fr: "Midelt", ar: "ميدلت" },
    desc: { fr: "Pommes des vergers de l'Atlas, croquantes et acidulées.", ar: "تفاح من بساتين الأطلس، مقرمش وحامض قليلاً." },
    keep: { fr: "Au réfrigérateur, jusqu'à un mois.", ar: "في الثلاجة، حتى شهر." } },
  { slug: "grenades", cat: "fruits", unit: "kg", price: 12, img: 14650515, arrival: true,
    name: { fr: "Grenades", ar: "رمان" },
    origin: { fr: "Ouled Abdellah", ar: "أولاد عبد الله" },
    desc: { fr: "Grenades sefri à grains rouge rubis, en pleine saison.", ar: "رمان صفري بحبات حمراء ياقوتية، في أوج موسمه." },
    keep: { fr: "À température ambiante, deux semaines.", ar: "في درجة حرارة الغرفة، أسبوعين." } },
  { slug: "avocats", cat: "fruits", unit: "kg", price: 22, img: 3029520, featured: true,
    name: { fr: "Avocats Hass", ar: "أفوكادو هاس" },
    origin: { fr: "Gharb", ar: "الغرب" },
    desc: { fr: "Livrés presque mûrs : prêts en 1 à 2 jours. Pour le jus à l'avocat ou les toasts.", ar: "تصل شبه ناضجة: جاهزة خلال يوم أو يومين. لعصير الأفوكادو أو التوست." },
    keep: { fr: "À température ambiante, puis au frais une fois mûrs.", ar: "في درجة حرارة الغرفة، ثم في الثلاجة بعد النضج." } },
  { slug: "bananes", cat: "fruits", unit: "kg", price: 14, img: 365810,
    name: { fr: "Bananes", ar: "موز" },
    origin: { fr: "Souss", ar: "سوس" },
    desc: { fr: "Bananes du Maroc, petites et très sucrées.", ar: "موز مغربي، صغير وحلو جداً." },
    keep: { fr: "À température ambiante, jamais au réfrigérateur.", ar: "في درجة حرارة الغرفة، وليس في الثلاجة." } },
  { slug: "dattes", cat: "fruits", unit: "kg", price: 90, img: 11679686, featured: true,
    name: { fr: "Dattes Mejhoul", ar: "تمر المجهول" },
    origin: { fr: "Tafilalet", ar: "تافيلالت" },
    desc: { fr: "Grosses dattes moelleuses de la nouvelle récolte. Vendues à partir de 500 g.", ar: "تمر كبير وطري من المحصول الجديد. يباع ابتداءً من 500 غ." },
    keep: { fr: "Au frais, dans une boîte fermée, plusieurs mois.", ar: "في مكان بارد وعلبة مغلقة لعدة أشهر." } },
  // Herbes
  { slug: "menthe", cat: "herbes", unit: "botte", price: 3, img: 8281634, featured: true,
    name: { fr: "Menthe nanah", ar: "نعناع" },
    origin: { fr: "Meknès", ar: "مكناس" },
    desc: { fr: "La menthe verte du thé. Bottes généreuses, cueillies la veille.", ar: "النعناع الأخضر للأتاي. ربطات كبيرة مقطوفة في اليوم السابق." },
    keep: { fr: "Tiges dans un verre d'eau, au frais.", ar: "السيقان في كأس ماء، في مكان بارد." } },
  { slug: "coriandre", cat: "herbes", unit: "botte", price: 3, img: 10048317,
    name: { fr: "Coriandre", ar: "كزبرة" },
    origin: { fr: "Production locale", ar: "إنتاج محلي" },
    desc: { fr: "Indispensable aux tajines, à la chermoula et à la harira.", ar: "لا غنى عنها في الطواجن والشرمولة والحريرة." },
    keep: { fr: "Enveloppée dans un linge humide, au réfrigérateur.", ar: "ملفوفة في قطعة قماش مبللة، في الثلاجة." } },
  { slug: "persil", cat: "herbes", unit: "botte", price: 3, img: 1309426,
    name: { fr: "Persil plat", ar: "بقدونس" },
    origin: { fr: "Production locale", ar: "إنتاج محلي" },
    desc: { fr: "Persil plat très parfumé, en grosses bottes.", ar: "بقدونس مسطح عطر، في ربطات كبيرة." },
    keep: { fr: "Enveloppé dans un linge humide, au réfrigérateur.", ar: "ملفوف في قطعة قماش مبللة، في الثلاجة." } },
];

export const BOXES: Box[] = [
  { slug: "panier-legumes", price: 99, img: 27567597,
    name: { fr: "Panier Légumes", ar: "سلة الخضر" },
    weight: { fr: "≈ 7 kg · 2 à 3 personnes", ar: "≈ 7 كلغ · 2 إلى 3 أشخاص" },
    desc: { fr: "L'essentiel de la cuisine de la semaine.", ar: "أساسيات مطبخ الأسبوع." },
    contents: [
      { fr: "Tomates 2 kg", ar: "طماطم 2 كلغ" }, { fr: "Pommes de terre 2 kg", ar: "بطاطس 2 كلغ" },
      { fr: "Oignons 1 kg", ar: "بصل 1 كلغ" }, { fr: "Carottes 1 kg", ar: "جزر 1 كلغ" },
      { fr: "Poivrons 500 g", ar: "فلفل 500 غ" }, { fr: "Coriandre, persil, menthe", ar: "كزبرة، بقدونس، نعناع" },
    ] },
  { slug: "panier-famille", price: 189, img: 5425893, popular: true,
    name: { fr: "Panier Famille", ar: "سلة العائلة" },
    weight: { fr: "≈ 13 kg · 4 à 6 personnes", ar: "≈ 13 كلغ · 4 إلى 6 أشخاص" },
    desc: { fr: "Légumes et fruits de saison pour toute la semaine.", ar: "خضر وفواكه الموسم لأسبوع كامل." },
    contents: [
      { fr: "Tomates 3 kg", ar: "طماطم 3 كلغ" }, { fr: "Pommes de terre 3 kg", ar: "بطاطس 3 كلغ" },
      { fr: "Oignons, carottes, aubergines", ar: "بصل، جزر، باذنجان" }, { fr: "Clémentines 2 kg", ar: "مندرين 2 كلغ" },
      { fr: "Pommes 1 kg, bananes 1 kg", ar: "تفاح 1 كلغ، موز 1 كلغ" }, { fr: "Herbes fraîches", ar: "أعشاب طرية" },
    ] },
  { slug: "panier-fruits", price: 119, img: 235294,
    name: { fr: "Panier Fruits", ar: "سلة الفواكه" },
    weight: { fr: "≈ 6 kg · fruits de saison", ar: "≈ 6 كلغ · فواكه الموسم" },
    desc: { fr: "Pour le goûter, les jus et le dessert.", ar: "للّمجة والعصائر والتحلية." },
    contents: [
      { fr: "Clémentines 2 kg", ar: "مندرين 2 كلغ" }, { fr: "Oranges à jus 2 kg", ar: "برتقال للعصير 2 كلغ" },
      { fr: "Pommes 1 kg", ar: "تفاح 1 كلغ" }, { fr: "Grenades 1 kg", ar: "رمان 1 كلغ" },
    ] },
];

export interface CartItemInfo {
  id: string;
  kind: "product" | "box";
  name: string;
  img: number;
  unit: Unit;
  price: number;
  step: number;
  min: number;
  href: string;
}

export function itemInfo(id: string, lang: Locale): CartItemInfo | null {
  const p = PRODUCTS.find((x) => x.slug === id);
  if (p) {
    const step = p.unit === "kg" ? 0.5 : 1;
    return { id, kind: "product", name: p.name[lang], img: p.img, unit: p.unit, price: p.price, step, min: step, href: `/${lang}/produits/${p.slug}` };
  }
  const b = BOXES.find((x) => x.slug === id);
  if (b) return { id, kind: "box", name: b.name[lang], img: b.img, unit: "panier", price: b.price, step: 1, min: 1, href: `/${lang}/paniers` };
  return null;
}

export function formatMAD(n: number, lang: Locale) {
  const s = n.toFixed(2).replace(".", ",");
  return lang === "ar" ? `${s} درهم` : `${s} DH`;
}

export function currencyShort(lang: Locale) {
  return lang === "ar" ? "درهم" : "DH";
}

const UNIT: Record<Unit, L> = {
  kg: { fr: "kg", ar: "كلغ" },
  botte: { fr: "botte", ar: "ربطة" },
  piece: { fr: "pièce", ar: "حبة" },
  panier: { fr: "panier", ar: "سلة" },
};
export const unitLabel = (u: Unit, lang: Locale) => UNIT[u][lang];

export function formatQty(q: number, u: Unit, lang: Locale) {
  const n = Number.isInteger(q) ? String(q) : q.toFixed(1).replace(".", ",");
  return `${n} ${unitLabel(u, lang)}`;
}
