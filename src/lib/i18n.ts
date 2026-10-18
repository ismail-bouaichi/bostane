export const LOCALES = ["fr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}

const fr = {
  meta: {
    title: "Bostane · Fruits et légumes frais livrés à domicile",
    description: "Fruits, légumes et herbes de producteurs marocains, livrés le jour même. Paiement à la livraison.",
  },
  nav: { home: "Accueil", shop: "Le marché", boxes: "Paniers", about: "Notre histoire", contact: "Contact", cart: "Panier", menu: "Menu", close: "Fermer" },
  announce: "Livraison offerte dès 200 DH · Commandez avant 11 h, livré aujourd'hui",
  common: {
    add: "Ajouter", added: "Ajouté au panier", arrival: "Arrivage", per: "le", origin: "Origine", keep: "Conservation",
    viewAll: "Voir tout le marché", from: "à partir de", popular: "Le plus commandé", seeProduct: "Voir le produit",
    decrease: "Diminuer", increase: "Augmenter", remove: "Retirer", inCart: "Dans le panier",
  },
  cats: { all: "Tout", legumes: "Légumes", fruits: "Fruits", herbes: "Herbes fraîches" },
  catBlurb: {
    legumes: "Tomates, pommes de terre, aubergines et tout ce qu'il faut pour les tajines de la semaine.",
    fruits: "Agrumes de Berkane, pommes de Midelt, dattes du Tafilalet.",
    herbes: "Menthe, coriandre et persil coupés la veille.",
  },
  home: {
    eyebrow: "Marché frais · livraison à domicile",
    title: "Le marché du matin, livré chez vous.",
    lede: "Nous achetons chaque matin auprès des producteurs et coopératives du Maroc. Vous commandez avant 11 h, nous livrons le jour même.",
    ctaShop: "Faire mon marché", ctaBoxes: "Voir les paniers",
    stats: [["Livraison", "le jour même"], ["Paiement", "à la livraison"], ["Producteurs", "100 % marocains"]],
    boardTitle: "Prix du jour", boardNote: "Prix en dirhams, mis à jour chaque matin.",
    catsTitle: "Que cherchez-vous aujourd'hui ?",
    featuredTitle: "Cette semaine au marché", featuredSub: "Les produits de saison que nos clients commandent le plus.",
    boxesTitle: "Les paniers prêts à commander", boxesSub: "Composés chaque matin selon l'arrivage. Un clic, et la semaine est réglée.",
    howTitle: "Comment ça marche",
    steps: [
      ["Composez votre panier", "Au kilo, à la botte ou en panier tout prêt. Minimum de commande : 50 DH."],
      ["Choisissez un créneau", "Matin, après-midi ou soir. Commande avant 11 h, livraison le jour même."],
      ["Payez à la réception", "Le livreur pèse devant vous. Espèces ou carte bancaire."],
    ],
    promiseTitle: "Notre engagement fraîcheur",
    promise: "Un produit ne vous convient pas ? Signalez-le au livreur ou par WhatsApp dans les 24 h : il est remplacé ou remboursé sur la commande suivante.",
    ctaBandTitle: "Votre premier panier, livré aujourd'hui.",
    ctaBandSub: "Livraison offerte dès 200 DH d'achat.",
  },
  shop: {
    title: "Le marché", sub: "Pesé à la commande. Les quantités au kilo se choisissent par 500 g.",
    search: "Chercher un produit", sort: "Trier", sortDefault: "Sélection", sortAsc: "Prix croissant", sortDesc: "Prix décroissant",
    results: "produits", none: "Aucun produit ne correspond à votre recherche.",
  },
  product: { back: "Retour au marché", related: "Vous aimerez aussi", qty: "Quantité", total: "Total", delivery: "Livré aujourd'hui si commandé avant 11 h", weighed: "Pesé devant vous à la livraison" },
  boxes: { title: "Les paniers", sub: "Des paniers composés chaque matin avec les meilleurs produits de l'arrivage. Le contenu peut varier légèrement selon la saison, le poids est toujours respecté.", contains: "Contenu indicatif", add: "Ajouter le panier" },
  about: {
    title: "Notre histoire",
    lede: "Bostane veut dire « verger ». Nous avons créé le service que nous voulions pour nos familles : le marché du matin, sans la foule ni les sacs à porter.",
    p1: "Chaque jour avant l'aube, notre équipe sélectionne les produits au marché de gros et directement auprès de coopératives partenaires : agrumes de Berkane, pommes de Midelt, primeurs du Souss, dattes du Tafilalet.",
    p2: "Nous ne stockons presque rien. Ce qui arrive le matin part en livraison l'après-midi. C'est ce qui nous permet de garantir la fraîcheur et des prix proches de ceux du souk.",
    valuesTitle: "Ce qui nous guide",
    values: [
      ["Le juste prix", "Des prix affichés chaque matin, au plus près du marché. Pas de frais cachés."],
      ["Les producteurs d'abord", "Nous travaillons en direct avec des coopératives pour mieux rémunérer ceux qui cultivent."],
      ["Zéro gaspillage", "Les invendus sont donnés chaque soir à des associations de quartier."],
    ],
  },
  contact: {
    title: "Contact", lede: "Une question sur une commande, une livraison ou un produit ? Notre équipe répond 7 j/7.",
    name: "Nom", phone: "Téléphone", message: "Message", send: "Envoyer sur WhatsApp",
    sent: "Votre message est prêt dans WhatsApp. Envoyez-le pour nous joindre.",
    hoursTitle: "Horaires", hours: ["Lundi – samedi : 8 h – 20 h", "Dimanche : 8 h – 13 h"],
    reach: "Nous joindre",
    faqTitle: "Questions fréquentes",
    faq: [
      ["Quelles villes livrez-vous ?", "Nous livrons actuellement les principales villes du Maroc. Choisissez votre ville au moment de la commande pour voir les créneaux disponibles."],
      ["Comment se passe le paiement ?", "Vous payez à la livraison, en espèces ou par carte bancaire. Aucun paiement n'est demandé en ligne."],
      ["Le poids est-il exact ?", "Le livreur pèse les produits devant vous. Le montant est ajusté au poids réel, à quelques dirhams près."],
      ["Puis-je modifier ma commande ?", "Oui, jusqu'à 11 h le jour de la livraison, par téléphone ou WhatsApp."],
    ],
  },
  cart: {
    title: "Votre panier", empty: "Votre panier est vide.", emptyCta: "Découvrir le marché",
    subtotal: "Sous-total", delivery: "Livraison", free: "Offerte", total: "Total estimé",
    freeLeft: "Encore {x} pour la livraison offerte", freeOk: "Livraison offerte", min: "Minimum de commande : {x}",
    checkout: "Passer la commande", continue: "Continuer mes achats", note: "Le total final est ajusté au poids réel à la livraison.",
    summary: "Récapitulatif",
  },
  checkout: {
    title: "Finaliser la commande", contactT: "Vos coordonnées", deliveryT: "Livraison", payT: "Paiement",
    name: "Nom complet", phone: "Téléphone", city: "Ville", cityPick: "Choisir une ville", address: "Adresse",
    addressPh: "Rue, numéro, immeuble, quartier, point de repère", note: "Instructions pour le livreur (facultatif)",
    day: "Jour", today: "Aujourd'hui", tomorrow: "Demain", slot: "Créneau",
    slots: [["m", "Matin", "9 h – 12 h"], ["a", "Après-midi", "14 h – 17 h"], ["e", "Soir", "17 h – 20 h"]],
    cash: "Espèces à la livraison", card: "Carte bancaire à la livraison", cardSub: "Le livreur dispose d'un terminal de paiement",
    confirm: "Confirmer la commande", required: "Ce champ est obligatoire.", badPhone: "Numéro marocain attendu, par exemple 06 12 34 56 78.",
    todayClosed: "Les commandes pour aujourd'hui sont closes après 11 h.",
  },
  thanks: {
    title: "Merci, votre commande est enregistrée.", lede: "Un conseiller vous appelle pour la confirmer avant la livraison.",
    number: "N° de commande", when: "Livraison", pay: "Paiement", whatsapp: "Suivre ma commande sur WhatsApp", back: "Retour à l'accueil",
    waIntro: "Bonjour Bostane, voici ma commande", waName: "Nom", waPhone: "Téléphone", waAddress: "Adresse", waWhen: "Livraison", waPay: "Paiement", waNote: "Note",
    missing: "Aucune commande récente.",
  },
  footer: {
    about: "Fruits, légumes et herbes de producteurs marocains, livrés chez vous le jour même.",
    shop: "Boutique", help: "Aide", rights: "Tous droits réservés.", currency: "Prix en dirhams marocains (MAD).",
    delivery: "Livraison", faq: "Questions fréquentes",
  },
  notFound: { title: "Page introuvable", text: "Cette page n'existe pas ou a été déplacée.", cta: "Retour à l'accueil" },
};

type Dict = typeof fr;

const ar: Dict = {
  meta: {
    title: "بستان · فواكه وخضر طازجة توصل إلى منزلك",
    description: "فواكه وخضر وأعشاب من الفلاحين المغاربة، توصيل في نفس اليوم والدفع عند الاستلام.",
  },
  nav: { home: "الرئيسية", shop: "السوق", boxes: "السلال", about: "قصتنا", contact: "اتصل بنا", cart: "السلة", menu: "القائمة", close: "إغلاق" },
  announce: "توصيل مجاني ابتداءً من 200 درهم · اطلب قبل 11 صباحاً ويصلك اليوم",
  common: {
    add: "أضف", added: "أضيف إلى السلة", arrival: "وصل هذا الأسبوع", per: "لكل", origin: "المصدر", keep: "طريقة الحفظ",
    viewAll: "تصفح السوق كاملاً", from: "ابتداءً من", popular: "الأكثر طلباً", seeProduct: "عرض المنتج",
    decrease: "إنقاص", increase: "زيادة", remove: "حذف", inCart: "في السلة",
  },
  cats: { all: "الكل", legumes: "الخضر", fruits: "الفواكه", herbes: "الأعشاب الطرية" },
  catBlurb: {
    legumes: "طماطم وبطاطس وباذنجان وكل ما تحتاجه لطواجن الأسبوع.",
    fruits: "حوامض بركان، تفاح ميدلت، وتمور تافيلالت.",
    herbes: "نعناع وكزبرة وبقدونس مقطوفة في اليوم السابق.",
  },
  home: {
    eyebrow: "سوق طازج · توصيل إلى المنزل",
    title: "سوق الصباح، يصل إلى باب منزلك.",
    lede: "نشتري كل صباح من الفلاحين والتعاونيات المغربية. اطلب قبل الساعة 11 صباحاً ونوصل طلبك في نفس اليوم.",
    ctaShop: "ابدأ التسوق", ctaBoxes: "اكتشف السلال",
    stats: [["التوصيل", "في نفس اليوم"], ["الدفع", "عند الاستلام"], ["الفلاحون", "مغاربة 100٪"]],
    boardTitle: "أثمنة اليوم", boardNote: "الأثمنة بالدرهم، تُحدَّث كل صباح.",
    catsTitle: "ماذا تبحث عنه اليوم؟",
    featuredTitle: "هذا الأسبوع في السوق", featuredSub: "منتجات الموسم الأكثر طلباً من زبنائنا.",
    boxesTitle: "سلال جاهزة للطلب", boxesSub: "نحضّرها كل صباح حسب ما وصل من السوق. نقرة واحدة ويكتمل أسبوعك.",
    howTitle: "كيف نعمل",
    steps: [
      ["اختر منتجاتك", "بالكيلو أو بالربطة أو سلة جاهزة. الحد الأدنى للطلب: 50 درهم."],
      ["اختر وقت التوصيل", "صباحاً أو بعد الظهر أو مساءً. اطلب قبل 11 صباحاً ليصلك اليوم."],
      ["ادفع عند الاستلام", "يزن الموزع المنتجات أمامك. نقداً أو بالبطاقة البنكية."],
    ],
    promiseTitle: "التزامنا بالجودة",
    promise: "إذا لم يعجبك منتج، أخبر الموزع أو راسلنا على واتساب خلال 24 ساعة: نستبدله أو نخصم ثمنه من طلبك القادم.",
    ctaBandTitle: "سلتك الأولى تصلك اليوم.",
    ctaBandSub: "توصيل مجاني ابتداءً من 200 درهم.",
  },
  shop: {
    title: "السوق", sub: "نزن المنتجات عند الطلب. الكميات بالكيلو تُختار بنصف كيلو.",
    search: "ابحث عن منتج", sort: "ترتيب", sortDefault: "اختيارنا", sortAsc: "الثمن تصاعدياً", sortDesc: "الثمن تنازلياً",
    results: "منتج", none: "لا يوجد منتج يطابق بحثك.",
  },
  product: { back: "العودة إلى السوق", related: "قد يعجبك أيضاً", qty: "الكمية", total: "المجموع", delivery: "يصلك اليوم إذا طلبت قبل 11 صباحاً", weighed: "يُوزن أمامك عند الاستلام" },
  boxes: { title: "السلال", sub: "سلال نحضّرها كل صباح بأفضل ما وصل إلى السوق. قد يتغير المحتوى قليلاً حسب الموسم، لكن الوزن مضمون دائماً.", contains: "المحتوى التقريبي", add: "أضف السلة" },
  about: {
    title: "قصتنا",
    lede: "«بستان» يعني البستان والبساتين. أنشأنا الخدمة التي كنا نريدها لعائلاتنا: سوق الصباح دون زحام ولا أكياس ثقيلة.",
    p1: "كل يوم قبل الفجر، يختار فريقنا المنتجات من سوق الجملة ومباشرة من تعاونيات شريكة: حوامض بركان، تفاح ميدلت، بواكير سوس، وتمور تافيلالت.",
    p2: "لا نخزّن تقريباً أي شيء. ما يصل في الصباح يخرج للتوصيل بعد الظهر. هكذا نضمن الطراوة وأثمنة قريبة من أثمنة السوق.",
    valuesTitle: "ما يوجّهنا",
    values: [
      ["الثمن العادل", "أثمنة معلنة كل صباح وقريبة من السوق. بدون مصاريف خفية."],
      ["الفلاح أولاً", "نتعامل مباشرة مع التعاونيات لنكافئ من يزرع بشكل أفضل."],
      ["صفر تبذير", "ما لا يُباع نتبرع به كل مساء لجمعيات الحي."],
    ],
  },
  contact: {
    title: "اتصل بنا", lede: "سؤال حول طلب أو توصيل أو منتج؟ فريقنا يجيب طيلة أيام الأسبوع.",
    name: "الاسم", phone: "الهاتف", message: "الرسالة", send: "أرسل عبر واتساب",
    sent: "رسالتك جاهزة في واتساب. أرسلها للتواصل معنا.",
    hoursTitle: "أوقات العمل", hours: ["الاثنين – السبت: 8:00 – 20:00", "الأحد: 8:00 – 13:00"],
    reach: "للتواصل",
    faqTitle: "أسئلة شائعة",
    faq: [
      ["ما هي المدن التي توصلون إليها؟", "نوصل حالياً إلى أهم مدن المغرب. اختر مدينتك عند الطلب لرؤية الأوقات المتاحة."],
      ["كيف يتم الدفع؟", "تدفع عند الاستلام، نقداً أو بالبطاقة البنكية. لا نطلب أي دفع عبر الإنترنت."],
      ["هل الوزن دقيق؟", "يزن الموزع المنتجات أمامك، ويُعدَّل المبلغ حسب الوزن الحقيقي."],
      ["هل يمكنني تعديل طلبي؟", "نعم، حتى الساعة 11 صباحاً يوم التوصيل، عبر الهاتف أو واتساب."],
    ],
  },
  cart: {
    title: "سلتك", empty: "سلتك فارغة.", emptyCta: "اكتشف السوق",
    subtotal: "المجموع الفرعي", delivery: "التوصيل", free: "مجاني", total: "المجموع التقديري",
    freeLeft: "تبقى {x} للحصول على توصيل مجاني", freeOk: "التوصيل مجاني", min: "الحد الأدنى للطلب: {x}",
    checkout: "إتمام الطلب", continue: "متابعة التسوق", note: "يُعدَّل المبلغ النهائي حسب الوزن الحقيقي عند الاستلام.",
    summary: "ملخص الطلب",
  },
  checkout: {
    title: "إتمام الطلب", contactT: "معلوماتك", deliveryT: "التوصيل", payT: "الدفع",
    name: "الاسم الكامل", phone: "رقم الهاتف", city: "المدينة", cityPick: "اختر المدينة", address: "العنوان",
    addressPh: "الشارع، الرقم، العمارة، الحي، علامة قريبة", note: "تعليمات للموزع (اختياري)",
    day: "اليوم", today: "اليوم", tomorrow: "غداً", slot: "الوقت",
    slots: [["m", "صباحاً", "9:00 – 12:00"], ["a", "بعد الظهر", "14:00 – 17:00"], ["e", "مساءً", "17:00 – 20:00"]],
    cash: "نقداً عند الاستلام", card: "بالبطاقة البنكية عند الاستلام", cardSub: "يتوفر الموزع على جهاز الأداء",
    confirm: "تأكيد الطلب", required: "هذه الخانة إجبارية.", badPhone: "أدخل رقماً مغربياً، مثلاً 06 12 34 56 78.",
    todayClosed: "طلبات اليوم مغلقة بعد الساعة 11 صباحاً.",
  },
  thanks: {
    title: "شكراً، تم تسجيل طلبك.", lede: "سيتصل بك أحد أعضاء فريقنا لتأكيده قبل التوصيل.",
    number: "رقم الطلب", when: "التوصيل", pay: "الدفع", whatsapp: "تابع طلبك عبر واتساب", back: "العودة إلى الرئيسية",
    waIntro: "السلام عليكم بستان، هذا طلبي", waName: "الاسم", waPhone: "الهاتف", waAddress: "العنوان", waWhen: "التوصيل", waPay: "الدفع", waNote: "ملاحظة",
    missing: "لا يوجد طلب حديث.",
  },
  footer: {
    about: "فواكه وخضر وأعشاب من الفلاحين المغاربة، تصلك في نفس اليوم.",
    shop: "المتجر", help: "مساعدة", rights: "جميع الحقوق محفوظة.", currency: "الأثمنة بالدرهم المغربي.",
    delivery: "التوصيل", faq: "أسئلة شائعة",
  },
  notFound: { title: "الصفحة غير موجودة", text: "هذه الصفحة غير موجودة أو تم نقلها.", cta: "العودة إلى الرئيسية" },
};

const DICTS: Record<Locale, Dict> = { fr, ar };
export const getDict = (l: Locale) => DICTS[l];
export type { Dict };
