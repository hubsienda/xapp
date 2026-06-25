import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
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

export function ToolkitCtas({ dictionary, content }: { dictionary: Dictionary; content: ToolPageContentMap[ToolPageKey] }) {
  const firstProduct = dictionary.products[content.primaryProduct];
  const bundleProduct = dictionary.products[content.bundleProduct];

  return (
    <div className="cta-grid">
      <article className="toolkit-cta featured-toolkit">
        <h3>{firstProduct.name}</h3>
        <p>{content.primaryCta}</p>
        <Link className="button" href={siteConfig.purchaseUrls[content.primaryProduct]} target="_blank" rel="noreferrer">
          {firstProduct.button}
        </Link>
      </article>
      <article className="toolkit-cta">
        <h3>{bundleProduct.name}</h3>
        <p>{content.bundleCta}</p>
        <Link className="button secondary" href={siteConfig.purchaseUrls[content.bundleProduct]} target="_blank" rel="noreferrer">
          {bundleProduct.button}
        </Link>
      </article>
    </div>
  );
}

export function ToolPageSections({ dictionary, content }: { dictionary: Dictionary; content: ToolPageContentMap[ToolPageKey] }) {
  return (
    <section className="section tool-info-stack">
      <div className="info-grid">
        <TextCard title={content.whatChecksTitle} items={content.whatChecks} />
        <TextCard title={content.whatNotTitle} items={content.whatNot} />
        <TextCard title={content.bestUsedTitle} items={content.bestUsed} />
        <article className="info-card next-card">
          <h2>{content.nextTitle}</h2>
          <p>{content.nextText}</p>
        </article>
      </div>
      <ToolkitCtas dictionary={dictionary} content={content} />
    </section>
  );
}
