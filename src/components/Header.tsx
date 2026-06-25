"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";

const languageMarks: Record<Locale, { label: string; title: string }> = {
  en: { label: "🇬🇧 EN", title: "English" },
  es: { label: "🇪🇸 ES", title: "Español" },
  it: { label: "🇮🇹 IT", title: "Italiano" }
};

function switchLocale(pathname: string, locale: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${locale}`;
  parts[0] = locale;
  return `/${parts.join("/")}`;
}

export function Header({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="header-inner">
        <Link className="brand" href={`/${locale}`} aria-label={`${siteConfig.name} homepage`}>
          <img className="brand-logo" src="/logo.png" alt="QBX.app" />
        </Link>
        <nav className="nav" aria-label="Main navigation">
          <Link href={`/${locale}/tools`}>{dictionary.nav.tools}</Link>
          <Link href={`/${locale}/toolkits`}>{dictionary.nav.toolkits}</Link>
        </nav>
        <nav className="lang-switcher" aria-label={dictionary.nav.language}>
          {siteConfig.supportedLocales.map((item) => (
            <Link key={item} href={switchLocale(pathname, item)} className={item === locale ? "active" : undefined} hrefLang={item} aria-label={languageMarks[item].title}>
              {languageMarks[item].label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
