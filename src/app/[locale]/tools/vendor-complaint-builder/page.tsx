import type { Metadata } from "next";
import { VendorComplaintBuilder } from "@/components/VendorComplaintBuilder";
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
  const content = getToolPageContent(safeLocale).vendorComplaint;
  return { title: `${content.headline} — ${siteConfig.name}`, description: content.description };
}

export default async function VendorComplaintPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : siteConfig.defaultLocale;
  const d = getDictionary(safeLocale);
  const content = getToolPageContent(safeLocale).vendorComplaint;

  return (
    <main className="main">
      <ToolPageHero content={content} />
      <VendorComplaintBuilder locale={safeLocale} dictionary={d} />
      <ToolPageSections dictionary={d} content={content} />
    </main>
  );
}
