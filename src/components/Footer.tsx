import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";

export function Footer({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brandline">
          {siteConfig.footerOwnership[locale]}{" "}
          <a href="https://sienda.co.uk" target="_blank" rel="noreferrer">Sienda Ltd.</a>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href={`/${locale}/privacy`}>{dictionary.nav.privacy}</Link>
          <Link href={`/${locale}/terms`}>{dictionary.nav.terms}</Link>
          <Link href={`/${locale}/cookie-policy`}>{dictionary.nav.cookiePolicy}</Link>
        </nav>
      </div>
      <div className="footer-legal">
        © 2026 <a href="https://sienda.co.uk" target="_blank" rel="noreferrer">Sienda Ltd.</a> All rights reserved.<br />
        Company No. 08194971 • Registered in England &amp; Wales
      </div>
    </footer>
  );
}
