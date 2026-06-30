import Link from "next/link";
import { productDisplayCopy, productLinks, secondaryBuyerCtaLine } from "@/config/products";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";
import { privacyPromise } from "@/i18n/privacyPromise";
import type { ToolPageContentMap, ToolPageKey } from "@/i18n/toolPageContent";

export function ToolPageHero({ content }: { content: ToolPageContentMap[ToolPageKey] }) {
  return (
    <section className="tool-hero">
      <p className="eyebrow">{content.eyebrow}</p>
      <h1>{content.headline}</h1>
      <p className="lede">{content.description}</p>
    </section>
  );
}

function TextCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="info-card">
      <h2>{title}</h2>
      <ul className="clean-list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

export function ToolkitCtas({ locale = "en", content }: { locale?: Locale; dictionary?: Dictionary; content: ToolPageContentMap[ToolPageKey] }) {
  const firstProduct = productDisplayCopy[locale][content.primaryProduct];
  const secondProduct = productDisplayCopy[locale][content.secondaryProduct];

  return (
    <section className="product-cta-section">
      <div className="cta-grid">
        <article className="toolkit-cta featured-toolkit">
          <p className="badge">{firstProduct.badge}</p>
          <h3>{firstProduct.name}</h3>
          <p className="price-line">{firstProduct.price}</p>
          <p>{content.primaryCta}</p>
          <p className="secondary-line">{firstProduct.bestFor}</p>
          <Link className="button" href={productLinks[locale][content.primaryProduct]} target="_blank" rel="noreferrer">
            {firstProduct.button}
          </Link>
        </article>
        <article className="toolkit-cta secondary-toolkit">
          <p className="badge">{secondProduct.badge}</p>
          <h3>{secondProduct.name}</h3>
          <p className="price-line">{secondProduct.price}</p>
          <p>{secondaryBuyerCtaLine[locale]}</p>
          <p className="secondary-line">{secondProduct.bestFor}</p>
          <Link className="button secondary" href={productLinks[locale][content.secondaryProduct]} target="_blank" rel="noreferrer">
            {secondProduct.button}
          </Link>
        </article>
      </div>
    </section>
  );
}

export function ToolPageSections({ locale, dictionary, content }: { locale: Locale; dictionary: Dictionary; content: ToolPageContentMap[ToolPageKey] }) {
  return (
    <section className="section tool-info-stack">
      <article className="info-card next-card">
        <h2>{content.meaningTitle}</h2>
        <p>{content.meaningText}</p>
      </article>
      <div className="info-grid">
        <TextCard title={content.whatChecksTitle} items={content.whatChecks} />
        <TextCard title={content.whatNotTitle} items={content.whatNot} />
        <TextCard title={content.bestUsedTitle} items={content.bestUsed} />
        <article className="info-card next-card">
          <h2>{content.nextTitle}</h2>
          <p>{content.nextText}</p>
        </article>
      </div>
      <ToolkitCtas locale={locale} dictionary={dictionary} content={content} />
      <p className="privacy-note">{privacyPromise[locale]}</p>
    </section>
  );
}
