import { productKeys, productLinks, productPrices, type ProductKey } from "@/config/products";
import type { Locale } from "@/i18n/locales";

export { productKeys, productLinks, productPrices, type ProductKey };

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
  purchaseUrls: productLinks,
  productPrices,
  footerOwnership: {
    en: "A browser-based business list utility by",
    es: "Una utilidad de navegador para listas de empresas de",
    it: "Uno strumento browser-based per liste aziendali di"
  }
} as const;

export const toolRoutes = [
  "list-quality-checker",
  "category-chaos-checker",
  "vendor-complaint-builder",
  "campaign-readiness-checker"
] as const;

export type ToolSlug = (typeof toolRoutes)[number];
