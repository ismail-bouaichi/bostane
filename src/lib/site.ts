// Business settings — edit these before going live.
export const SITE = {
  name: { fr: "Bostane", ar: "بستان" },
  url: "https://bostane.ma",
  // International format, digits only (e.g. "212612345678"). Leave empty to let the
  // customer pick the WhatsApp contact themselves.
  whatsapp: "",
  phoneDisplay: "+212 6 00 00 00 00",
  email: "commande@bostane.ma",
  address: { fr: "Marché de gros, Maroc", ar: "سوق الجملة، المغرب" },
  // Money, in Moroccan dirhams (MAD)
  minOrder: 50,
  freeDeliveryFrom: 200,
  deliveryFee: 15,
  orderCutoffHour: 11,
};

export const CITIES: [string, string][] = [
  ["Casablanca", "الدار البيضاء"],
  ["Rabat", "الرباط"],
  ["Salé", "سلا"],
  ["Témara", "تمارة"],
  ["Marrakech", "مراكش"],
  ["Fès", "فاس"],
  ["Meknès", "مكناس"],
  ["Tanger", "طنجة"],
  ["Agadir", "أكادير"],
  ["Kénitra", "القنيطرة"],
  ["Mohammédia", "المحمدية"],
  ["El Jadida", "الجديدة"],
];

export function whatsappLink(text: string) {
  const base = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}
