import type { Metadata } from "next";
import { ListQualityChecker } from "@/components/ListQualityChecker";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/locales";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : siteConfig.defaultLocale;
  const d = getDictionary(safeLocale);
  return { title: `${d.listQuality.title} — ${siteConfig.name}`, description: d.listQuality.intro };
}

export default async function ListQualityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : siteConfig.defaultLocale;
  const d = getDictionary(safeLocale);

  return (
    <main className="main">
      <p className="eyebrow">{siteConfig.name}</p>
      <h1>{d.listQuality.title}</h1>
      <p className="lede">{d.listQuality.intro}</p>
      <ListQualityChecker locale={safeLocale} dictionary={d} />
    </main>
  );
}
