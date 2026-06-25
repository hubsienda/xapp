import type { Metadata } from "next";
import { ToolCard } from "@/components/ToolCard";
import { siteConfig, toolRoutes } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/locales";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : siteConfig.defaultLocale;
  const d = getDictionary(safeLocale);
  return { title: d.meta.toolsTitle, description: d.toolsDirectory.intro };
}

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : siteConfig.defaultLocale;
  const d = getDictionary(safeLocale);

  return (
    <main className="main">
      <p className="eyebrow">{siteConfig.name}</p>
      <h1>{d.toolsDirectory.heading}</h1>
      <p className="lede">{d.toolsDirectory.intro}</p>
      <section className="tool-grid section">
        {toolRoutes.map((slug) => (
          <ToolCard key={slug} locale={safeLocale} slug={slug} dictionary={d} />
        ))}
      </section>
    </main>
  );
}
