import type { Locale } from "@/i18n/locales";

export const productKeys = ["survivalBundle", "buyerProtection"] as const;

export type ProductKey = (typeof productKeys)[number];

export type ProductDisplayCopy = {
  name: string;
  badge: string;
  price: string;
  description: string;
  bestFor: string;
  includes: string;
  button: string;
};

export const productLinks: Record<Locale, Record<ProductKey, string>> = {
  en: {
    survivalBundle: "https://siendamedia.com/b/bizlist-en",
    buyerProtection: "https://siendamedia.com/b/en-dbtoolkit"
  },
  es: {
    survivalBundle: "https://siendamedia.com/b/es-bizlist-1",
    buyerProtection: "https://siendamedia.com/b/esdbtoolkit"
  },
  it: {
    survivalBundle: "https://siendamedia.com/b/itbizlist-1",
    buyerProtection: "https://siendamedia.com/b/it-dbtoolkit"
  }
};

export const productPrices: Record<ProductKey, string> = {
  survivalBundle: "US$49.00",
  buyerProtection: "US$19.00"
};

export const productDisplayCopy: Record<Locale, Record<ProductKey, ProductDisplayCopy>> = {
  en: {
    survivalBundle: {
      name: "Business List Survival Bundle",
      badge: "Main product",
      price: productPrices.survivalBundle,
      description: "Already have a messy business list? Use the full rescue bundle to audit quality, clean categories, prepare campaign checks, document defects, and write serious vendor complaints.",
      bestFor: "Purchased lists, exported lists, inherited files, messy prospect databases, and campaign files you do not fully trust.",
      includes: "Editable workbooks, DOCX templates, complaint emails, evidence tables, checklists, and before/after example files.",
      button: "Get the Business List Survival Bundle"
    },
    buyerProtection: {
      name: "Database Buyer Protection Toolkit",
      badge: "Before you buy",
      price: productPrices.buyerProtection,
      description: "About to buy a business database? Use this pre-purchase toolkit to ask the right vendor questions, review sample files, spot red flags, check refund terms, and decide whether to buy or walk away.",
      bestFor: "Anyone considering a B2B database, email list, export directory, prospect file, or industry contact database.",
      includes: "Vendor question checklists, sample file review workbook, red flag lists, buyer scorecard, refund policy review, and data freshness questions.",
      button: "Get the Database Buyer Protection Toolkit"
    }
  },
  es: {
    survivalBundle: {
      name: "Business List Survival Bundle",
      badge: "Producto principal",
      price: productPrices.survivalBundle,
      description: "¿Ya tienes una lista de empresas desordenada? Usa el kit completo para revisar la calidad, ordenar categorías, preparar comprobaciones de campaña, documentar defectos y redactar reclamaciones serias al proveedor.",
      bestFor: "Listas compradas, listas exportadas, archivos heredados, bases de prospectos desordenadas y campañas que no acabas de fiarte.",
      includes: "Workbooks editables, plantillas DOCX, emails de reclamación, tablas de evidencias, checklists y archivos de ejemplo antes/después.",
      button: "Comprar el Business List Survival Bundle"
    },
    buyerProtection: {
      name: "Database Buyer Protection Toolkit",
      badge: "Antes de comprar",
      price: productPrices.buyerProtection,
      description: "¿Estás a punto de comprar una base de datos de empresas? Usa este kit previo a la compra para hacer mejores preguntas al proveedor, revisar archivos de muestra, detectar señales de alerta, comprobar condiciones de reembolso y decidir si comprar o abandonar la operación.",
      bestFor: "Personas que están considerando una base de datos B2B, una lista de correos, un directorio de exportación, un archivo de prospectos o una lista de contactos de un sector.",
      includes: "Checklists de preguntas al proveedor, workbook de revisión de muestra, listas de alertas, scorecard de comprador, revisión de política de reembolso y preguntas sobre frescura de datos.",
      button: "Comprar el Database Buyer Protection Toolkit"
    }
  },
  it: {
    survivalBundle: {
      name: "Business List Survival Bundle",
      badge: "Prodotto principale",
      price: productPrices.survivalBundle,
      description: "Hai già una lista aziendale disordinata? Usa il kit completo per controllare la qualità, sistemare le categorie, preparare le verifiche di campagna, documentare i difetti e scrivere reclami seri al fornitore.",
      bestFor: "Liste acquistate, liste esportate, file ereditati, database di prospect disordinati e file campagna di cui non ti fidi completamente.",
      includes: "Workbook modificabili, template DOCX, email di reclamo, tabelle prove, checklist e file di esempio prima/dopo.",
      button: "Acquista il Business List Survival Bundle"
    },
    buyerProtection: {
      name: "Database Buyer Protection Toolkit",
      badge: "Prima di comprare",
      price: productPrices.buyerProtection,
      description: "Stai per acquistare una banca dati aziendale? Usa questo kit pre-acquisto per fare le domande giuste al fornitore, rivedere file campione, individuare segnali di allarme, controllare le condizioni di rimborso e decidere se acquistare o rinunciare.",
      bestFor: "Chi sta valutando una banca dati B2B, una lista email, una directory export, un file di prospect o una lista di contatti di settore.",
      includes: "Checklist domande al fornitore, workbook per revisione campione, liste segnali di allarme, scorecard acquirente, revisione policy rimborsi e domande sulla freschezza dati.",
      button: "Acquista il Database Buyer Protection Toolkit"
    }
  }
};

export const secondaryBuyerCtaLine: Record<Locale, string> = {
  en: "Still deciding whether to buy a database? Use the Database Buyer Protection Toolkit before you pay.",
  es: "¿Aún estás decidiendo si comprar una base de datos? Usa el Database Buyer Protection Toolkit antes de pagar.",
  it: "Stai ancora decidendo se acquistare una banca dati? Usa il Database Buyer Protection Toolkit prima di pagare."
};
