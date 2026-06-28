import type { ProductKey, ToolSlug } from "@/config/site";
import type { Locale } from "./locales";

export type VerdictBand = "excellent" | "good" | "messy" | "poor" | "failure";
export type ChaosBand = "low" | "moderate" | "high" | "severe";
export type CampaignBand = "ready" | "nearly" | "risky" | "notReady";
export type IssueKey = "missingCompany" | "missingEmail" | "malformedEmail" | "duplicateEmail" | "duplicateCompany" | "missingWebsite" | "malformedWebsite" | "missingPhone" | "missingLocation" | "emptyColumns" | "thinRows" | "categoryFragmentation" | "genericCategories" | "mostlyEmptyColumns";
export type RoleKey = "company" | "email" | "website" | "phone" | "country" | "city" | "postcode" | "category" | "industry" | "contact" | "source";

type ProductCopy = {
  name: string;
  subtitle: string;
  description: string;
  forWhom: string;
  includes: string;
  price: string;
  button: string;
};

type ToolCopy = {
  title: string;
  problem: string;
  forWhom: string;
  button: string;
};

export type Dictionary = {
  meta: Record<string, string>;
  nav: Record<string, string>;
  common: Record<string, string>;
  home: {
    headline: string;
    subheading: string;
    problemIntro: string;
    problemPoints: string[];
    privacyTitle: string;
    privacyLine: string;
    privacyBullets: string[];
    toolsHeading: string;
    toolsSubheading: string;
  };
  toolsDirectory: { heading: string; intro: string };
  tools: Record<ToolSlug, ToolCopy>;
  roles: Record<RoleKey, string>;
  listQuality: {
    title: string;
    intro: string;
    uploadHelp: string;
    verdicts: Record<VerdictBand, string>;
    verdictDetails: Record<VerdictBand, string>;
    issueText: Record<IssueKey, string>;
    actions: Record<VerdictBand, string[]>;
    stats: Record<string, string>;
  };
  category: {
    title: string;
    intro: string;
    pasteLabel: string;
    pastePlaceholder: string;
    columnLabel: string;
    selectColumn: string;
    noCategoryColumn: string;
    scoreTitle: string;
    uniqueCategories: string;
    fragmentation: string;
    repeated: string;
    inconsistent: string;
    usability: string;
    separatedLabels: string;
    verdicts: Record<ChaosBand, string>;
    actions: Record<ChaosBand, string[]>;
    cta: string;
  };
  complaint: {
    title: string;
    intro: string;
    vendorName: string;
    productName: string;
    purchaseDate: string;
    promised: string;
    wrong: string;
    desiredOutcome: string;
    tone: string;
    tones: Record<string, string>;
    outcomes: Record<string, string>;
    problemOptions: string[];
    subjectPrefix: string;
    generatedSubject: string;
    greeting: string;
    evidenceTitle: string;
    evidenceItems: string[];
    buildButton: string;
    outputTitle: string;
    closingPolite: string;
    closingFirm: string;
    closingVeryFirm: string;
    cta: string;
  };
  campaign: {
    title: string;
    intro: string;
    questions: string[];
    verdicts: Record<CampaignBand, string>;
    risksTitle: string;
    checklistTitle: string;
    legalNote: string;
    actions: Record<CampaignBand, string[]>;
    cta: string;
  };
  products: Record<ProductKey, ProductCopy>;
  toolkits: { heading: string; intro: string; bundleNote: string };
  legal: { privacy: string[]; terms: string[]; cookie: string[] };
  notFound: { title: string; text: string; link: string };
};

const roleLabels: Record<Locale, Record<RoleKey, string>> = {
  en: { company: "Company name", email: "Email", website: "Website", phone: "Phone", country: "Country", city: "City", postcode: "Postcode", category: "Category", industry: "Industry", contact: "Contact name", source: "Source" },
  es: { company: "Empresa", email: "Email", website: "Sitio web", phone: "Teléfono", country: "País", city: "Ciudad", postcode: "Código postal", category: "Categoría", industry: "Industria", contact: "Contacto", source: "Fuente" },
  it: { company: "Azienda", email: "Email", website: "Sito web", phone: "Telefono", country: "Paese", city: "Città", postcode: "Codice postale", category: "Categoria", industry: "Industria", contact: "Contatto", source: "Fonte" }
};

const toolCopy: Record<Locale, Record<ToolSlug, ToolCopy>> = {
  en: {
    "list-quality-checker": { title: "Business List Quality Checker", problem: "Find missing fields, duplicate records, weak categories, and structural problems before they waste campaign budget.", forWhom: "For anyone about to import, email, trust, or challenge a business list.", button: "Check list quality" },
    "category-chaos-checker": { title: "Category Chaos Checker", problem: "A business list with hundreds of raw categories is not segmented. It is a filing cabinet after a small explosion.", forWhom: "For people trying to turn raw vendor labels into usable campaign groups.", button: "Check category chaos" },
    "vendor-complaint-builder": { title: "Vendor Complaint Builder", problem: "Create a clear, professional complaint when a purchased database is messy, incomplete, duplicated, badly categorised, or not as described.", forWhom: "For buyers who need to challenge a database vendor professionally.", button: "Build complaint" },
    "campaign-readiness-checker": { title: "Campaign Readiness Checker", problem: "Review list source, data quality, segmentation, sender setup, unsubscribe handling, and pre-send risks before the campaign goes out.", forWhom: "For teams preparing email or outreach campaigns.", button: "Check readiness" }
  },
  es: {
    "list-quality-checker": { title: "Revisor de calidad de listas", problem: "Detecta campos ausentes, duplicados, categorías débiles y problemas estructurales antes de malgastar presupuesto de campaña.", forWhom: "Para quien va a importar, enviar, confiar o reclamar una lista de empresas.", button: "Revisar calidad" },
    "category-chaos-checker": { title: "Detector de caos de categorías", problem: "Una lista de empresas con cientos de categorías sin procesar no está segmentada. Es un archivador después de una pequeña explosión.", forWhom: "Para convertir etiquetas brutas del proveedor en grupos de campaña utilizables.", button: "Revisar categorías" },
    "vendor-complaint-builder": { title: "Generador de reclamaciones a proveedores", problem: "Crea una reclamación clara y profesional cuando una base de datos comprada es desordenada, incompleta, duplicada, mal categorizada o no coincide con lo prometido.", forWhom: "Para compradores que necesitan reclamar profesionalmente a un proveedor de bases de datos.", button: "Crear reclamación" },
    "campaign-readiness-checker": { title: "Revisor de preparación de campaña", problem: "Revisa fuente de la lista, calidad de datos, segmentación, remitente, bajas y riesgos previos antes de enviar.", forWhom: "Para equipos que preparan campañas de email o prospección.", button: "Revisar preparación" }
  },
  it: {
    "list-quality-checker": { title: "Controllo qualità liste aziendali", problem: "Trova campi mancanti, duplicati, categorie deboli e problemi strutturali prima che sprechino budget di campagna.", forWhom: "Per chi sta per importare, inviare, fidarsi o contestare una lista aziendale.", button: "Controlla qualità" },
    "category-chaos-checker": { title: "Controllo caos categorie", problem: "Una lista aziendale con centinaia di categorie grezze non è segmentata. È un archivio dopo una piccola esplosione.", forWhom: "Per trasformare etichette grezze del fornitore in gruppi campagna utilizzabili.", button: "Controlla categorie" },
    "vendor-complaint-builder": { title: "Generatore reclami ai fornitori", problem: "Crea un reclamo chiaro e professionale quando una banca dati acquistata è disordinata, incompleta, duplicata, categorizzata male o diversa da quanto promesso.", forWhom: "Per acquirenti che devono contestare professionalmente un fornitore di database.", button: "Crea reclamo" },
    "campaign-readiness-checker": { title: "Controllo preparazione campagna", problem: "Rivedi fonte lista, qualità dati, segmentazione, mittente, disiscrizione e rischi pre-invio prima che la campagna parta.", forWhom: "Per team che preparano campagne email o di prospezione.", button: "Controlla preparazione" }
  }
};

const verdicts: Record<Locale, Record<VerdictBand, string>> = {
  en: { excellent: "Usable, but still review before sending.", good: "Usable with corrections.", messy: "Messy and risky.", poor: "Poor list quality.", failure: "Serious list failure." },
  es: { excellent: "Utilizable, pero revísala antes de enviar.", good: "Utilizable con correcciones.", messy: "Desordenada y arriesgada.", poor: "Calidad pobre de lista.", failure: "Fallo grave de lista." },
  it: { excellent: "Utilizzabile, ma da revisionare prima dell’invio.", good: "Utilizzabile con correzioni.", messy: "Disordinata e rischiosa.", poor: "Qualità lista scadente.", failure: "Grave fallimento della lista." }
};

function product(locale: Locale, key: ProductKey): ProductCopy {
  const products: Record<Locale, Record<ProductKey, ProductCopy>> = {
    en: {
      survivalBundle: {
        name: "Business List Survival Bundle",
        subtitle: "Main product",
        description: "A complete rescue kit for business lists you already have. Audit quality, clean category chaos, check campaign readiness, document vendor defects, and prepare serious complaint emails.",
        forWhom: "Purchased lists, exported lists, inherited files, messy prospect databases, and campaign files you do not fully trust.",
        includes: "Editable workbooks, DOCX templates, complaint emails, evidence tables, checklists, and before/after example files.",
        price: "Main product",
        button: "View product"
      },
      buyerProtection: {
        name: "Database Buyer Protection Toolkit",
        subtitle: "Before you buy",
        description: "A pre-purchase toolkit for checking vendors before you buy a business database. Ask better questions, request usable samples, review sales claims, spot red flags, and decide whether to buy or walk away.",
        forWhom: "Anyone considering a B2B database, email list, export directory, prospect file, or industry contact database.",
        includes: "Vendor question checklists, sample file review workbook, red flag lists, buyer scorecard, refund policy review, and data freshness questions.",
        price: "Before you buy",
        button: "View product"
      }
    },
    es: {
      survivalBundle: {
        name: "Business List Survival Bundle",
        subtitle: "Kit completo de supervivencia para listas de empresas",
        description: "Un kit completo de rescate para listas de empresas que ya tienes. Audita la calidad, ordena el caos de categorías, revisa la preparación de campaña, documenta defectos del proveedor y prepara reclamaciones serias.",
        forWhom: "Listas compradas, listas exportadas, archivos heredados, bases de datos de prospectos desordenadas y archivos de campaña que no inspiran plena confianza.",
        includes: "Workbooks editables, plantillas DOCX, emails de reclamación, tablas de evidencias, checklists y archivos de ejemplo antes/después.",
        price: "Producto principal",
        button: "Ver producto"
      },
      buyerProtection: {
        name: "Database Buyer Protection Toolkit",
        subtitle: "Kit de protección antes de comprar una base de datos",
        description: "Un toolkit previo a la compra para revisar proveedores antes de comprar una base de datos de empresas. Haz mejores preguntas, pide muestras útiles, revisa promesas de venta, detecta señales de alerta y decide si comprar o retirarte.",
        forWhom: "Quien esté considerando una base de datos B2B, lista de emails, directorio exportado, archivo de prospectos o base de contactos sectorial.",
        includes: "Checklists de preguntas al proveedor, workbook de revisión de muestra, listas de alertas, scorecard de comprador, revisión de política de reembolso y preguntas sobre frescura de datos.",
        price: "Antes de comprar",
        button: "Ver producto"
      }
    },
    it: {
      survivalBundle: {
        name: "Business List Survival Bundle",
        subtitle: "Kit completo di sopravvivenza per liste aziendali",
        description: "Un kit completo di recupero per liste aziendali che possiedi già. Controlla la qualità, ordina il caos delle categorie, verifica la preparazione campagna, documenta difetti del fornitore e prepara reclami seri.",
        forWhom: "Liste acquistate, liste esportate, file ereditati, database prospect disordinati e file campagna di cui non ti fidi del tutto.",
        includes: "Workbook modificabili, template DOCX, email di reclamo, tabelle prove, checklist e file di esempio prima/dopo.",
        price: "Prodotto principale",
        button: "Vedi prodotto"
      },
      buyerProtection: {
        name: "Database Buyer Protection Toolkit",
        subtitle: "Kit di protezione prima di acquistare una banca dati",
        description: "Un toolkit pre-acquisto per controllare i fornitori prima di comprare una banca dati aziendale. Fai domande migliori, richiedi campioni utilizzabili, verifica le promesse commerciali, individua segnali di allarme e decidi se comprare o lasciar perdere.",
        forWhom: "Chi sta valutando una banca dati B2B, lista email, directory esportabile, file prospect o database di contatti di settore.",
        includes: "Checklist domande al fornitore, workbook per revisione campione, liste segnali di allarme, scorecard acquirente, revisione policy rimborsi e domande sulla freschezza dati.",
        price: "Prima di comprare",
        button: "Vedi prodotto"
      }
    }
  };
  return products[locale][key];
}

function buildDictionary(locale: Locale): Dictionary {
  const isEs = locale === "es";
  const isIt = locale === "it";
  const nav = isEs ? { tools: "Herramientas", toolkits: "Toolkits", privacy: "Privacidad", terms: "Términos", cookiePolicy: "Cookies", language: "Idioma" } : isIt ? { tools: "Strumenti", toolkits: "Toolkit", privacy: "Privacy", terms: "Termini", cookiePolicy: "Cookie", language: "Lingua" } : { tools: "Tools", toolkits: "Toolkits", privacy: "Privacy", terms: "Terms", cookiePolicy: "Cookie Policy", language: "Language" };
  const common = isEs ? { copy: "Copiar", copied: "Copiado", score: "Puntuación", issues: "Riesgos principales", statistics: "Estadísticas útiles", detectedColumns: "Columnas detectadas", recommendedActions: "Próximas acciones prácticas", noFileYet: "Sube un archivo o completa las comprobaciones para ver tu resultado.", filePrivacy: "Tu archivo se analiza localmente en tu navegador. No se sube, no se almacena y no lo revisamos nosotros.", chooseFile: "Elegir CSV o XLSX", analyse: "Analizar", rows: "Filas", columns: "Columnas", notDetected: "No detectado", optional: "opcional", yes: "Sí", partial: "En parte / no lo sé", no: "No" } : isIt ? { copy: "Copia", copied: "Copiato", score: "Punteggio", issues: "Rischi principali", statistics: "Statistiche utili", detectedColumns: "Colonne rilevate", recommendedActions: "Prossime azioni pratiche", noFileYet: "Carica un file o completa i controlli per vedere il risultato.", filePrivacy: "Il tuo file viene analizzato localmente nel browser. Non viene caricato, memorizzato o revisionato da noi.", chooseFile: "Scegli CSV o XLSX", analyse: "Analizza", rows: "Righe", columns: "Colonne", notDetected: "Non rilevato", optional: "facoltativo", yes: "Sì", partial: "In parte / non so", no: "No" } : { copy: "Copy", copied: "Copied", score: "Score", issues: "Main risks", statistics: "Useful statistics", detectedColumns: "Detected columns", recommendedActions: "Practical next actions", noFileYet: "Upload a file or complete the checks to see your result.", filePrivacy: "Your file is analysed locally in your browser. It is not uploaded, stored, or reviewed by us.", chooseFile: "Choose CSV or XLSX file", analyse: "Analyse", rows: "Rows", columns: "Columns", notDetected: "Not detected", optional: "optional", yes: "Yes", partial: "Partly / not sure", no: "No" };
  const issueText: Record<IssueKey, string> = {
    missingCompany: isEs ? "Faltan nombres de empresa." : isIt ? "Mancano nomi azienda." : "Company names are missing.",
    missingEmail: isEs ? "Faltan emails." : isIt ? "Mancano email." : "Emails are missing.",
    malformedEmail: isEs ? "Algunos emails están mal formados." : isIt ? "Alcune email sono mal formate." : "Some emails are malformed.",
    duplicateEmail: isEs ? "Hay emails duplicados." : isIt ? "Ci sono email duplicate." : "Duplicate emails were found.",
    duplicateCompany: isEs ? "Hay empresas duplicadas." : isIt ? "Ci sono aziende duplicate." : "Duplicate companies were found.",
    missingWebsite: isEs ? "Faltan sitios web." : isIt ? "Mancano siti web." : "Websites are missing.",
    malformedWebsite: isEs ? "Algunos sitios web parecen mal formados." : isIt ? "Alcuni siti web sembrano mal formati." : "Some websites look malformed.",
    missingPhone: isEs ? "Faltan teléfonos." : isIt ? "Mancano telefoni." : "Phone numbers are missing.",
    missingLocation: isEs ? "Los datos de ubicación son débiles." : isIt ? "I dati località sono deboli." : "Location data is weak.",
    emptyColumns: isEs ? "Hay columnas vacías." : isIt ? "Ci sono colonne vuote." : "Some columns are empty.",
    thinRows: isEs ? "Hay filas con poca información." : isIt ? "Ci sono righe con poche informazioni." : "Some rows contain too little information.",
    categoryFragmentation: isEs ? "Las categorías están fragmentadas." : isIt ? "Le categorie sono frammentate." : "Categories are fragmented.",
    genericCategories: isEs ? "Hay categorías demasiado genéricas." : isIt ? "Ci sono categorie troppo generiche." : "Some categories are too generic.",
    mostlyEmptyColumns: isEs ? "Hay columnas casi vacías." : isIt ? "Ci sono colonne quasi vuote." : "Some columns are mostly empty."
  };

  return {
    meta: { homeTitle: `${isEs ? "Revisión de listas" : isIt ? "Controlli liste" : "Business list checks"} — QBX.app`, homeDescription: isEs ? "Herramientas gratuitas para revisar listas de empresas." : isIt ? "Strumenti gratuiti per controllare liste aziendali." : "Free browser-based tools for business list quality.", toolsTitle: `${nav.tools} — QBX.app`, toolkitsTitle: `${nav.toolkits} — QBX.app`, privacyTitle: `${nav.privacy} — QBX.app`, termsTitle: `${nav.terms} — QBX.app`, cookieTitle: `${nav.cookiePolicy} — QBX.app` },
    nav,
    common,
    home: {
      headline: isEs ? "Comprueba tu lista de empresas antes de que te cueste más dinero." : isIt ? "Controlla la tua lista di aziende prima che ti costi altro denaro." : "Check your business list before it costs you more money.",
      subheading: isEs ? "Herramientas gratuitas en el navegador para revisar calidad de listas, caos de categorías, reclamaciones a proveedores y preparación de campañas. Tu archivo se analiza localmente en tu navegador y no se sube a nuestros servidores." : isIt ? "Strumenti gratuiti nel browser per verificare qualità liste, caos categorie, reclami ai fornitori e preparazione campagne. Il file viene analizzato localmente nel browser e non viene caricato sui nostri server." : "Free browser-based tools for business list quality, category chaos, vendor complaints, and campaign readiness. Your file is analysed locally in your browser and is not uploaded to our servers.",
      problemIntro: isEs ? "Antes de culpar a la campaña, revisa la lista." : isIt ? "Prima di dare la colpa alla campagna, controlla la lista." : "Before you blame the campaign, check the list.",
      problemPoints: isEs ? ["Las malas listas hacen perder dinero.", "Las categorías caóticas destruyen la segmentación.", "Los campos ausentes arruinan la preparación de campañas.", "Un archivo pobre puede justificar una reclamación seria."] : isIt ? ["Le liste scadenti fanno perdere denaro.", "Le categorie caotiche distruggono la segmentazione.", "I campi mancanti rovinano la preparazione delle campagne.", "Un file scadente può giustificare un reclamo serio."] : ["Bad lists waste money.", "Chaotic categories ruin segmentation.", "Missing fields destroy campaign preparation.", "Poor vendor files may justify a serious complaint."],
      privacyTitle: isEs ? "Una comprobación útil, no otra plataforma que gestionar." : isIt ? "Un controllo utile, non un’altra piattaforma da gestire." : "A useful check, not another platform to manage.",
      privacyLine: isEs ? "Los archivos se revisan localmente. Sin subida. Sin almacenamiento. Sin cuenta. Sin panel. Sin base de datos." : isIt ? "I file vengono controllati localmente. Nessun caricamento. Nessuna memorizzazione. Nessun account. Nessun pannello. Nessun database." : "Files are checked locally. No upload. No storage. No account. No dashboard. No database.",
      privacyBullets: isEs ? ["Análisis local", "Sin informes guardados", "Sólo enlaces externos", "Sin pagos dentro de la app"] : isIt ? ["Analisi locale", "Nessun report salvato", "Solo link esterni", "Nessun pagamento dentro l’app"] : ["Local browser analysis", "No stored reports", "External product links only", "No payment processing inside the app"],
      toolsHeading: isEs ? "Empieza por el problema que tienes delante" : isIt ? "Parti dal problema che hai davanti" : "Start with the problem in front of you",
      toolsSubheading: isEs ? "Elige la herramienta que corresponde al problema. La niebla de hoja de cálculo es opcional; tirar dinero no." : isIt ? "Scegli lo strumento adatto al problema. La nebbia da foglio di calcolo è facoltativa; buttare soldi no." : "Pick the tool that matches the problem. Spreadsheet fog is optional; wasting money is not."
    },
    toolsDirectory: { heading: isEs ? "Herramientas gratuitas para listas de empresas" : isIt ? "Strumenti gratuiti per liste aziendali" : "Free business-list tools", intro: isEs ? "Comprobaciones prácticas para saber si una lista se puede usar." : isIt ? "Controlli pratici per capire se una lista è utilizzabile." : "Practical checks for people who have bought, exported, inherited, or prepared a business list." },
    tools: toolCopy[locale],
    roles: roleLabels[locale],
    listQuality: { title: toolCopy[locale]["list-quality-checker"].title, intro: toolCopy[locale]["list-quality-checker"].problem, uploadHelp: isEs ? "Se admiten CSV y XLSX. La versión 1 lee la primera hoja XLSX." : isIt ? "Sono supportati CSV e XLSX. La versione 1 legge il primo foglio XLSX." : "CSV and XLSX are supported. Version 1 reads the first XLSX worksheet.", verdicts: verdicts[locale], verdictDetails: { excellent: verdicts[locale].excellent, good: verdicts[locale].good, messy: isEs ? "No está lista para campaña; úsala como material bruto hasta limpiarla." : isIt ? "Non è pronta per campagna; usala come materiale grezzo finché non è pulita." : "This file is not campaign-ready. Treat it as raw material until cleaned.", poor: verdicts[locale].poor, failure: verdicts[locale].failure }, issueText, actions: { excellent: [isEs ? "Revisa una muestra antes de importar." : isIt ? "Rivedi un campione prima di importare." : "Review a sample before import."], good: [isEs ? "Corrige emails, duplicados y categorías." : isIt ? "Correggi email, duplicati e categorie." : "Fix emails, duplicates, and categories."], messy: [isEs ? "Limpia el archivo antes de importarlo." : isIt ? "Pulisci il file prima di importarlo." : "Clean the file before importing it."], poor: [isEs ? "No lo importes tal como está." : isIt ? "Non importarlo così com’è." : "Do not import it as-is."], failure: [isEs ? "Detén la campaña y pide corrección o sustitución." : isIt ? "Ferma la campagna e chiedi correzione o sostituzione." : "Stop the campaign and request correction or replacement."] }, stats: { totalRows: isEs ? "Filas totales" : isIt ? "Righe totali" : "Total rows", totalColumns: isEs ? "Columnas totales" : isIt ? "Colonne totali" : "Total columns", malformedEmails: isEs ? "Emails mal formados" : isIt ? "Email mal formate" : "Malformed emails", duplicateEmails: isEs ? "Emails duplicados" : isIt ? "Email duplicate" : "Duplicate emails", duplicateCompanies: isEs ? "Empresas duplicadas" : isIt ? "Aziende duplicate" : "Duplicate companies", emptyColumns: isEs ? "Columnas vacías" : isIt ? "Colonne vuote" : "Empty columns", mostlyEmptyColumns: isEs ? "Columnas casi vacías" : isIt ? "Colonne quasi vuote" : "Mostly empty columns", nearlyEmptyRows: isEs ? "Filas casi vacías" : isIt ? "Righe quasi vuote" : "Nearly empty rows", uniqueCategories: isEs ? "Categorías únicas" : isIt ? "Categorie uniche" : "Unique categories" } },
    category: { title: toolCopy[locale]["category-chaos-checker"].title, intro: toolCopy[locale]["category-chaos-checker"].problem, pasteLabel: isEs ? "Pegar categorías" : isIt ? "Incolla categorie" : "Paste category values", pastePlaceholder: isEs ? "Fabricante\nfabricante\nOtro" : isIt ? "Produttore\nproduttore\nAltro" : "Window manufacturer\nwindow Manufacturer\nOther", columnLabel: isEs ? "Columna de categorías" : isIt ? "Colonna categoria" : "Category column", selectColumn: isEs ? "Seleccionar columna" : isIt ? "Seleziona colonna" : "Select a column", noCategoryColumn: isEs ? "No se detectó una columna de categorías." : isIt ? "Nessuna colonna categoria rilevata." : "No category-like column was detected.", scoreTitle: isEs ? "Puntuación de caos" : isIt ? "Punteggio caos" : "Category Chaos Score", uniqueCategories: isEs ? "Categorías únicas" : isIt ? "Categorie uniche" : "Unique categories", fragmentation: isEs ? "Fragmentación" : isIt ? "Frammentazione" : "Fragmentation", repeated: isEs ? "Categorías repetidas" : isIt ? "Categorie ripetute" : "Top repeated categories", inconsistent: isEs ? "Incoherencias" : isIt ? "Incoerenze" : "Examples of inconsistent categories", usability: isEs ? "Utilidad para segmentación" : isIt ? "Utilità per segmentazione" : "Segmentation usability", separatedLabels: isEs ? "Celdas con varias etiquetas" : isIt ? "Celle con etichette multiple" : "Cells containing multiple labels", verdicts: isEs ? { low: "Caos bajo.", moderate: "Caos moderado.", high: "Caos alto.", severe: "Caos grave." } : isIt ? { low: "Caos basso.", moderate: "Caos moderato.", high: "Caos alto.", severe: "Caos grave." } : { low: "Low chaos.", moderate: "Moderate chaos.", high: "High chaos.", severe: "Severe chaos." }, actions: { low: [isEs ? "Revisa ortografía y mayúsculas." : isIt ? "Rivedi ortografia e maiuscole." : "Review spelling and capitalisation."], moderate: [isEs ? "Crea una lista controlada de categorías." : isIt ? "Crea una lista controllata di categorie." : "Create a controlled category list."], high: [isEs ? "Mapea etiquetas brutas hacia una taxonomía menor." : isIt ? "Mappa le etichette grezze in una tassonomia più piccola." : "Map raw labels into a smaller taxonomy."], severe: [isEs ? "Reconstruye la estructura antes de usarla en campaña." : isIt ? "Ricostruisci la struttura prima dell’uso in campagna." : "Rebuild the category structure before campaign use."] }, cta: "Business List Survival Bundle" },
    complaint: { title: toolCopy[locale]["vendor-complaint-builder"].title, intro: toolCopy[locale]["vendor-complaint-builder"].problem, vendorName: isEs ? "Nombre del proveedor" : isIt ? "Nome fornitore" : "Vendor name", productName: isEs ? "Producto o lista comprada" : isIt ? "Prodotto o lista acquistata" : "Product or list purchased", purchaseDate: isEs ? "Fecha de compra" : isIt ? "Data acquisto" : "Purchase date", promised: isEs ? "¿Qué se prometía?" : isIt ? "Che cosa era stato promesso?" : "What was promised?", wrong: isEs ? "¿Qué está mal?" : isIt ? "Che cosa non va?" : "What is wrong with the file?", desiredOutcome: isEs ? "¿Qué quieres?" : isIt ? "Che cosa vuoi ottenere?" : "What do you want?", tone: isEs ? "Tono" : isIt ? "Tono" : "Tone", tones: isEs ? { polite: "Educado", firm: "Firme", veryFirm: "Muy firme" } : isIt ? { polite: "Educato", firm: "Fermo", veryFirm: "Molto fermo" } : { polite: "Polite", firm: "Firm", veryFirm: "Very firm" }, outcomes: isEs ? { correction: "Corrección", replacement: "Archivo de sustitución", refund: "Reembolso", explanation: "Explicación", escalation: "Escalado" } : isIt ? { correction: "Correzione", replacement: "File sostitutivo", refund: "Rimborso", explanation: "Spiegazione", escalation: "Escalation" } : { correction: "Correction", replacement: "Replacement file", refund: "Refund", explanation: "Explanation", escalation: "Escalation" }, problemOptions: isEs ? ["Categorías incoherentes", "Emails mal formados", "Duplicados", "Archivo no listo"] : isIt ? ["Categorie incoerenti", "Email mal formate", "Duplicati", "File non pronto"] : ["Inconsistent categories", "Malformed emails", "Duplicate records", "File not ready to use"], subjectPrefix: isEs ? "Problema con" : isIt ? "Problema con" : "Issue with", generatedSubject: isEs ? "Solicitud de corrección" : isIt ? "Richiesta di correzione" : "Request for correction", greeting: isEs ? "Estimados señores de" : isIt ? "Gentili" : "Dear", evidenceTitle: isEs ? "Checklist de evidencias" : isIt ? "Checklist prove" : "Evidence checklist", evidenceItems: isEs ? ["Página de venta", "Factura", "Capturas", "Filas problemáticas"] : isIt ? ["Pagina di vendita", "Fattura", "Screenshot", "Righe problematiche"] : ["Sales page", "Invoice", "Screenshots", "Problem rows"], buildButton: isEs ? "Crear email" : isIt ? "Crea email" : "Build complaint email", outputTitle: isEs ? "Email generado" : isIt ? "Email generata" : "Generated email", closingPolite: isEs ? "Agradecería su ayuda para resolverlo." : isIt ? "Vi sarei grato per l’aiuto nella risoluzione." : "I would appreciate your help in resolving this.", closingFirm: isEs ? "Les pido una respuesta concreta." : isIt ? "Vi chiedo una risposta concreta." : "Please provide a concrete response.", closingVeryFirm: isEs ? "Traten esto como solicitud formal de resolución." : isIt ? "Trattate questa come richiesta formale di risoluzione." : "Please treat this as a formal request for resolution.", cta: "Business List Survival Bundle" },
    campaign: { title: toolCopy[locale]["campaign-readiness-checker"].title, intro: toolCopy[locale]["campaign-readiness-checker"].problem, questions: isEs ? ["¿Conoces la fuente?", "¿Los datos son recientes?", "¿Las categorías están normalizadas?", "¿Los emails están revisados?", "¿Se quitaron duplicados?", "¿Hay nombres de empresa?", "¿Países y ciudades están claros?", "¿El dominio remitente está configurado?", "¿Hay baja preparada?", "¿Existe segmentación?", "¿La oferta está clara?", "¿Revisaste las reglas aplicables?"] : isIt ? ["Conosci la fonte?", "I dati sono recenti?", "Le categorie sono standardizzate?", "Le email sono controllate?", "I duplicati sono stati rimossi?", "Ci sono nomi azienda?", "Paesi e città sono chiari?", "Il dominio mittente è configurato?", "La disiscrizione è pronta?", "Esiste segmentazione?", "L’offerta è chiara?", "Hai controllato le regole applicabili?"] : ["Do you know the source of the list?", "Is the data recent?", "Are categories standardised?", "Are emails locally checked?", "Have duplicates been removed?", "Are company names present?", "Are countries and cities clear?", "Is the sender domain configured?", "Is unsubscribe handling ready?", "Does segmentation exist?", "Is the offer clear?", "Have you reviewed applicable rules?"], verdicts: isEs ? { ready: "Lista para revisión final.", nearly: "Casi lista.", risky: "Arriesgada.", notReady: "No está lista." } : isIt ? { ready: "Pronta per revisione finale.", nearly: "Quasi pronta.", risky: "Rischiosa.", notReady: "Non pronta." } : { ready: "Ready for final human review.", nearly: "Nearly ready.", risky: "Risky.", notReady: "Not ready." }, risksTitle: isEs ? "Riesgos principales" : isIt ? "Rischi principali" : "Main risks", checklistTitle: isEs ? "Checklist previa" : isIt ? "Checklist pre-invio" : "Pre-send checklist", legalNote: isEs ? "Las reglas de email marketing varían por país. Compruébalas antes de enviar campañas." : isIt ? "Le regole di email marketing variano per paese. Controllale prima di inviare campagne." : "Email marketing rules vary by country. Check the applicable rules before sending campaigns.", actions: { ready: [isEs ? "Haz una revisión final de muestra." : isIt ? "Fai una revisione finale a campione." : "Run a final sample review."], nearly: [isEs ? "Corrige las respuestas parciales antes de enviar." : isIt ? "Correggi le risposte parziali prima dell’invio." : "Fix partial answers before sending."], risky: [isEs ? "Pausa el lanzamiento de la campaña." : isIt ? "Metti in pausa il lancio della campagna." : "Pause campaign launch."], notReady: [isEs ? "No envíes todavía." : isIt ? "Non inviare ancora." : "Do not send yet."] }, cta: "Business List Survival Bundle" },
    products: { survivalBundle: product(locale, "survivalBundle"), buyerProtection: product(locale, "buyerProtection") },
    toolkits: { heading: isEs ? "Toolkits para listas de empresas" : isIt ? "Toolkit per liste aziendali" : "Business list toolkits", intro: isEs ? "Productos editables y prácticos para revisar listas, evitar malas compras de bases de datos, documentar defectos y decidir qué hacer después." : isIt ? "Prodotti modificabili e pratici per controllare liste, evitare cattivi acquisti di banche dati, documentare difetti e decidere cosa fare dopo." : "Practical editable products for checking business lists, avoiding bad database purchases, documenting defects, and deciding what to do next.", bundleNote: isEs ? "Sólo hay dos productos completos: uno para listas que ya tienes y otro para revisar antes de comprar." : isIt ? "Ci sono solo due prodotti completi: uno per liste che possiedi già e uno per controllare prima di comprare." : "There are only two full products: one for lists you already have, and one for checking before you buy." },
    legal: { privacy: [common.filePrivacy, isEs ? "No hay cuenta, panel, base de datos ni informes guardados." : isIt ? "Nessun account, pannello, database o report salvato." : "There is no account, dashboard, database, or saved report.", isEs ? "Los resultados son diagnóstico práctico, no garantía legal, comercial o de entregabilidad." : isIt ? "I risultati sono diagnostica pratica, non garanzia legale, commerciale o di deliverability." : "Results are practical diagnostics, not legal, commercial, or deliverability guarantees."], terms: [isEs ? "Usa las herramientas como diagnóstico práctico." : isIt ? "Usa gli strumenti come diagnostica pratica." : "Use the tools as practical diagnostics.", isEs ? "No dependas de los resultados como única base para una campaña o reclamación." : isIt ? "Non basarti sui risultati come unica base per una campagna o un reclamo." : "Do not rely on results as the sole basis for a campaign or complaint.", isEs ? "Los productos de pago se venden externamente." : isIt ? "I prodotti a pagamento sono venduti esternamente." : "Paid products are sold externally."], cookie: [isEs ? "La versión 1 no requiere cookies no esenciales." : isIt ? "La versione 1 non richiede cookie non essenziali." : "Version 1 does not require non-essential cookies.", isEs ? "Si se añaden analíticas, esta política deberá actualizarse." : isIt ? "Se verranno aggiunti analytics, questa policy dovrà essere aggiornata." : "If analytics are added later, this policy must be updated."] },
    notFound: { title: isEs ? "Página no encontrada" : isIt ? "Pagina non trovata" : "Page not found", text: isEs ? "Esta página se movió o nunca existió." : isIt ? "Questa pagina è stata spostata o non è mai esistita." : "This page either moved or never existed.", link: isEs ? "Ir al inicio" : isIt ? "Vai alla home" : "Go to homepage" }
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: buildDictionary("en"),
  es: buildDictionary("es"),
  it: buildDictionary("it")
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
