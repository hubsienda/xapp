import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";

export function Footer({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>{siteConfig.footerOwnership[locale]}</p>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href={`/${locale}/privacy`}>{dictionary.nav.privacy}</Link>
          <Link href={`/${locale}/terms`}>{dictionary.nav.terms}</Link>
          <Link href={`/${locale}/cookie-policy`}>{dictionary.nav.cookiePolicy}</Link>
        </nav>
      </div>
    </footer>
  );
}
