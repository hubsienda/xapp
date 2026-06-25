import type { RoleKey } from "@/i18n/dictionaries";

export type RowData = Record<string, unknown>;

export const roleVariants: Record<RoleKey, string[]> = {
  company: [
    "company", "company name", "business name", "organisation", "organization", "name", "legal name",
    "empresa", "nombre empresa", "nombre de empresa", "compañía", "compania", "organización", "organizacion", "razón social", "razon social", "nombre comercial",
    "azienda", "nome azienda", "società", "societa", "impresa", "organizzazione", "ragione sociale", "nome commerciale"
  ],
  email: [
    "email", "e-mail", "mail", "email address", "contact email",
    "correo", "correo electrónico", "correo electronico",
    "posta elettronica", "indirizzo email"
  ],
  website: [
    "website", "web", "url", "domain", "site",
    "sitio web", "página web", "pagina web", "dominio",
    "sito web"
  ],
  phone: [
    "phone", "telephone", "tel", "mobile", "contact number",
    "teléfono", "telefono", "móvil", "movil", "número", "numero", "contacto",
    "cellulare", "contatto"
  ],
  country: ["country", "nation", "market", "país", "pais", "mercado", "paese", "nazione"],
  city: ["city", "town", "locality", "ciudad", "localidad", "municipio", "città", "citta", "comune", "località", "localita"],
  postcode: ["postcode", "post code", "postal code", "zip", "zip code", "código postal", "codigo postal", "cp", "codice postale", "cap"],
  category: ["category", "categories", "business type", "categoría", "categoria", "categorías", "categorias", "tipo de empresa", "categorie", "tipo azienda"],
  industry: ["industry", "sector", "activity", "industria", "sector", "actividad", "settore", "attività", "attivita"],
  contact: ["contact", "contact name", "person", "name contact", "contacto", "persona", "nombre contacto", "contatto", "referente", "nome contatto"],
  source: ["source", "origin", "fuente", "origen", "fonte", "origine"]
};

export function normaliseText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

const normalisedVariants = Object.fromEntries(
  Object.entries(roleVariants).map(([role, variants]) => [role, variants.map(normaliseText)])
) as Record<RoleKey, string[]>;

export function detectColumns(headers: string[]) {
  const detected: Partial<Record<RoleKey, string>> = {};

  for (const header of headers) {
    const normalisedHeader = normaliseText(header);
    for (const role of Object.keys(normalisedVariants) as RoleKey[]) {
      if (detected[role]) continue;
      const variants = normalisedVariants[role];
      if (variants.includes(normalisedHeader)) {
        detected[role] = header;
        continue;
      }
      if (normalisedHeader.length > 3 && variants.some((variant) => normalisedHeader.includes(variant) || variant.includes(normalisedHeader))) {
        detected[role] = header;
      }
    }
  }

  return detected;
}

export function valueOf(row: RowData, column?: string) {
  if (!column) return "";
  const value = row[column];
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

export function getHeaders(rows: RowData[]) {
  const headerSet = new Set<string>();
  rows.forEach((row) => Object.keys(row).forEach((key) => headerSet.add(key)));
  return Array.from(headerSet).filter(Boolean);
}
