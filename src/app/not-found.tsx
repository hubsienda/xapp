import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";

export default function NotFound() {
  const d = getDictionary("en");

  return (
    <main className="main legal-page">
      <p className="eyebrow">QBX.app</p>
      <h1>{d.notFound.title}</h1>
      <p className="lede">{d.notFound.text}</p>
      <Link className="button" href="/en">
        {d.notFound.link}
      </Link>
    </main>
  );
}
