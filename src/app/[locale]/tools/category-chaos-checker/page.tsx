import type { Metadata } from "next";
import { CategoryChaosChecker } from "@/components/CategoryChaosChecker";
import { ToolPageHero, ToolPageSections } from "@/components/ToolPageSections";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/locales";
import { getToolPageContent } from "@/i18n/toolPageContent";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : siteConfig.defaultLocale;
  const content = getToolPageContent(safeLocale).categoryChaos;
  return { title: `${content.headline} — ${siteConfig.name}`, description: content.description };
}

export default async function CategoryChaosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : siteConfig.defaultLocale;
  const d = getDictionary(safeLocale);
  const content = getToolPageContent(safeLocale).categoryChaos;

  return (
    <main className="main">
      <ToolPageHero content={content} />
      <CategoryChaosChecker locale={safeLocale} dictionary={d} />
      <ToolPageSections locale={safeLocale} dictionary={d} content={content} />
    </main>
  );
}
