"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";
import { localeLabels } from "@/i18n/locales";

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
        <Link className="brand" href={`/${locale}`}>
          {siteConfig.name}
        </Link>
        <nav className="nav" aria-label="Main navigation">
          <Link href={`/${locale}/tools`}>{dictionary.nav.tools}</Link>
          <Link href={`/${locale}/toolkits`}>{dictionary.nav.toolkits}</Link>
        </nav>
        <nav className="lang-switcher" aria-label={dictionary.nav.language}>
          {siteConfig.supportedLocales.map((item) => (
            <Link key={item} href={switchLocale(pathname, item)} className={item === locale ? "active" : undefined} hrefLang={item}>
              {localeLabels[item]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
