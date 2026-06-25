import { siteConfig } from "@/config/site";

export function LegalPage({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <main className="main legal-page">
      <p className="eyebrow">{siteConfig.name}</p>
      <h1>{title}</h1>
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </main>
  );
}
