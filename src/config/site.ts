import type { Locale } from "@/i18n/locales";

export const siteConfig = {
  name: "QBX.app",
  domain: "qbx.app",
  defaultLocale: "en" as Locale,
  supportedLocales: ["en", "es", "it"] as Locale[],
  taglines: {
    en: "Check your business list before it costs you more money.",
    es: "Comprueba tu lista de empresas antes de que te cueste más dinero.",
    it: "Controlla la tua lista di aziende prima che ti costi altro denaro."
  },
  purchaseUrls: {
    listQuality: "https://siendamedia.com",
    categoryCleanup: "https://siendamedia.com",
    vendorComplaint: "https://siendamedia.com",
    campaignReadiness: "https://siendamedia.com",
    survivalBundle: "https://siendamedia.com"
  },
  footerOwnership: {
    en: "A standalone browser utility by Sienda Ltd.",
    es: "Una utilidad independiente en el navegador de Sienda Ltd.",
    it: "Uno strumento indipendente nel browser di Sienda Ltd."
  }
} as const;

export const toolRoutes = [
  "list-quality-checker",
  "category-chaos-checker",
  "vendor-complaint-builder",
  "campaign-readiness-checker"
] as const;

export type ToolSlug = (typeof toolRoutes)[number];

export const productKeys = [
  "listQuality",
  "categoryCleanup",
  "vendorComplaint",
  "campaignReadiness",
  "survivalBundle"
] as const;

export type ProductKey = (typeof productKeys)[number];
