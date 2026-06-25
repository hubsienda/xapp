import type { Metadata } from "next";
import Link from "next/link";
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
  return { title: d.meta.homeTitle, description: d.meta.homeDescription };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : siteConfig.defaultLocale;
  const d = getDictionary(safeLocale);

  return (
    <main className="main">
      <section className="hero">
        <div>
          <p className="eyebrow">{siteConfig.name}</p>
          <h1>{d.home.headline}</h1>
          <p className="lede">{d.home.subheading}</p>
          <ul className="problem-list" aria-label="Problems">
            {d.home.problemPoints.map((point: string) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <aside className="panel">
          <p className="eyebrow">{d.home.problemIntro}</p>
          <h2>{d.home.privacyTitle}</h2>
          <p>{d.home.privacyLine}</p>
          <div className="button-row">
            <Link className="button" href={`/${safeLocale}/tools`}>
              {d.nav.tools}
            </Link>
            <Link className="button secondary" href={`/${safeLocale}/toolkits`}>
              {d.nav.toolkits}
            </Link>
          </div>
        </aside>
      </section>

      <section className="section">
        <p className="eyebrow">{d.nav.tools}</p>
        <h2>{d.home.toolsHeading}</h2>
        <p className="lede">{d.home.toolsSubheading}</p>
        <div className="tool-grid" style={{ marginTop: 24 }}>
          {toolRoutes.map((slug) => (
            <ToolCard key={slug} locale={safeLocale} slug={slug} dictionary={d} />
          ))}
        </div>
      </section>

      <section className="section panel">
        <h2>{d.home.privacyTitle}</h2>
        <p>{d.home.privacyLine}</p>
        <div className="grid" style={{ marginTop: 18 }}>
          {d.home.privacyBullets.map((item: string) => (
            <div className="stat" key={item}>{item}</div>
          ))}
        </div>
      </section>
    </main>
  );
}
