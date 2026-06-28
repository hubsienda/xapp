import type { Metadata } from "next";
import Link from "next/link";
import { productKeys, siteConfig } from "@/config/site";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/locales";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : siteConfig.defaultLocale;
  const d = getDictionary(safeLocale);
  return { title: d.meta.toolkitsTitle, description: d.toolkits.intro };
}

export default async function ToolkitsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = isLocale(locale) ? locale : siteConfig.defaultLocale;
  const d = getDictionary(safeLocale);

  return (
    <main className="main readable-page">
      <p className="eyebrow">{siteConfig.name}</p>
      <h1>{d.toolkits.heading}</h1>
      <p className="lede">{d.toolkits.intro}</p>
      <p className="notice section">{d.toolkits.bundleNote}</p>
      <section className="product-grid section two-product-grid">
        {productKeys.map((key) => {
          const product = d.products[key];
          const url = siteConfig.purchaseUrls[safeLocale][key];
          return (
            <article className="card product-card" key={key}>
              <p className="badge">{product.price}</p>
              <h2>{product.name}</h2>
              <p className="product-subtitle">{product.subtitle}</p>
              <p>{product.description}</p>
              <p><strong>{product.forWhom}</strong></p>
              <p>{product.includes}</p>
              <Link className="button" href={url} target="_blank" rel="noreferrer">
                {product.button}
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
