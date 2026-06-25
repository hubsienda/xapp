import Link from "next/link";
import type { ToolSlug } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";

export function ToolCard({ locale, slug, dictionary }: { locale: Locale; slug: ToolSlug; dictionary: Dictionary }) {
  const tool = dictionary.tools[slug];

  return (
    <article className="card">
      <h3>{tool.title}</h3>
      <p>{tool.problem}</p>
      <p>{tool.forWhom}</p>
      <Link className="button" href={`/${locale}/tools/${slug}`}>
        {tool.button}
      </Link>
    </article>
  );
}
