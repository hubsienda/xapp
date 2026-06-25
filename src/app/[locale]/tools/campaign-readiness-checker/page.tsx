import type { Metadata } from "next";
import { CampaignReadinessChecker } from "@/components/CampaignReadinessChecker";
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
  return { title: `${d.campaign.title} — ${siteConfig.name}`, description: d.campaign.intro };
}

export default async function CampaignReadinessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : siteConfig.defaultLocale;
  const d = getDictionary(safeLocale);

  return (
    <main className="main">
      <p className="eyebrow">{siteConfig.name}</p>
      <h1>{d.campaign.title}</h1>
      <p className="lede">{d.campaign.intro}</p>
      <CampaignReadinessChecker locale={safeLocale} dictionary={d} />
    </main>
  );
}
