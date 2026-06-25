import type { ProductKey, ToolSlug } from '@/config/site';

export type VerdictBand = 'excellent' | 'good' | 'messy' | 'poor' | 'failure';
export type ChaosBand = 'low' | 'moderate' | 'high' | 'severe';
export type CampaignBand = 'ready' | 'nearly' | 'risky' | 'notReady';
export type IssueKey = 'missingCompany' | 'missingEmail' | 'malformedEmail' | 'duplicateEmail' | 'duplicateCompany' | 'missingWebsite' | 'malformedWebsite' | 'missingPhone' | 'missingLocation' | 'emptyColumns' | 'thinRows' | 'categoryFragmentation' | 'genericCategories' | 'mostlyEmptyColumns';
export type RoleKey = 'company' | 'email' | 'website' | 'phone' | 'country' | 'city' | 'postcode' | 'category' | 'industry' | 'contact' | 'source';
export type Dictionary = Record<string, any>;
type Locale = 'en' | 'es' | 'it';

const roleLabels: Record<Locale, Record<RoleKey, string>> = {
  en: { company: 'Company name', email: 'Email', website: 'Website', phone: 'Phone', country: 'Country', city: 'City', postcode: 'Postcode', category: 'Category', industry: 'Industry', contact: 'Contact name', source: 'Source' },
  es: { company: 'Empresa', email: 'Email', website: 'Sitio web', phone: 'Teléfono', country: 'País', city: 'Ciudad', postcode: 'Código postal', category: 'Categoría', industry: 'Industria', contact: 'Contacto', source: 'Fuente' },
  it: { company: 'Azienda', email: 'Email', website: 'Sito web', phone: 'Telefono', country: 'Paese', city: 'Città', postcode: 'Codice postale', category: 'Categoria', industry: 'Industria', contact: 'Contatto', source: 'Fonte' }
};
