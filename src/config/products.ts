import type { Locale } from "@/i18n/locales";

export const productKeys = ["survivalBundle", "buyerProtection"] as const;

export type ProductKey = (typeof productKeys)[number];

export const productLinks: Record<Locale, Record<ProductKey, string>> = {
  en: {
    survivalBundle: "https://siendamedia.com/b/bizlist-en",
    buyerProtection: "https://siendamedia.com/b/en-dbtoolkit"
  },
  es: {
    survivalBundle: "https://siendamedia.com/b/es-bizlist-1",
    buyerProtection: "https://siendamedia.com/b/esdbtoolkit"
  },
  it: {
    survivalBundle: "https://siendamedia.com/b/itbizlist-1",
    buyerProtection: "https://siendamedia.com/b/it-dbtoolkit"
  }
};

export const productPrices: Record<ProductKey, string> = {
  survivalBundle: "US$49.00",
  buyerProtection: "US$19.00"
};
