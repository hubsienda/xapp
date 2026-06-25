export const locales = ["en", "es", "it"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const localeLabels: Record<Locale, string> = {
  en: "English",
  es: "Español",
  it: "Italiano"
};
