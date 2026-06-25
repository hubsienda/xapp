import type { ProductKey } from "@/config/site";
import type { Locale } from "./locales";

type ToolPageContent = {
  eyebrow: string;
  headline: string;
  description: string;
  actionTitle: string;
  instructions: string;
  emptyState: string;
  whatChecksTitle: string;
  whatChecks: string[];
  whatNotTitle: string;
  whatNot: string[];
  bestUsedTitle: string;
  bestUsed: string[];
  nextTitle: string;
  nextText: string;
  primaryProduct: ProductKey;
  bundleProduct: ProductKey;
  primaryCta: string;
  bundleCta: string;
  errors: {
    unsupportedFile: string;
    largeFile: string;
    readError: string;
    noReadableRows: string;
    noCategoryInput: string;
    noCategoryColumn: string;
    incompleteQuestions: string;
  };
  labels?: Record<string, string>;
};

export type ToolPageKey = "listQuality" | "categoryChaos" | "vendorComplaint" | "campaignReadiness";
export type ToolPageContentMap = Record<ToolPageKey, ToolPageContent>;

type GenericCopy = {
  whatChecksTitle: string;
  whatNotTitle: string;
  bestUsedTitle: string;
  nextTitle: string;
  privacyBadge: string;
};

const generic: Record<Locale, GenericCopy> = {
  en: {
    whatChecksTitle: "What this checks",
    whatNotTitle: "What this does not check",
    bestUsedTitle: "Best used when",
    nextTitle: "What to do next",
    privacyBadge: "Local browser analysis. No upload. No storage."
  },
  es: {
    whatChecksTitle: "Qué revisa",
    whatNotTitle: "Qué no revisa",
    bestUsedTitle: "Cuándo usarlo",
    nextTitle: "Qué hacer después",
    privacyBadge: "Análisis local en el navegador. Sin subida. Sin almacenamiento."
  },
  it: {
    whatChecksTitle: "Che cosa controlla",
    whatNotTitle: "Che cosa non controlla",
    bestUsedTitle: "Quando usarlo",
    nextTitle: "Che cosa fare dopo",
    privacyBadge: "Analisi locale nel browser. Nessun caricamento. Nessuna memorizzazione."
  }
};

const sharedErrors: Record<Locale, ToolPageContent["errors"]> = {
  en: {
    unsupportedFile: "Unsupported file type. Use a CSV or XLSX file.",
    largeFile: "This file is large. If the browser struggles, use a smaller export for the first check.",
    readError: "The file could not be read. Use a CSV or XLSX file with a clear header row.",
    noReadableRows: "No readable rows were found. Check that the file has a header row and usable data.",
    noCategoryInput: "Upload a file with a category column or paste category values first.",
    noCategoryColumn: "No category column is selected. Choose a column or paste category values.",
    incompleteQuestions: "Complete the checklist to see your readiness score."
  },
  es: {
    unsupportedFile: "Tipo de archivo no admitido. Usa un archivo CSV o XLSX.",
    largeFile: "Este archivo es grande. Si el navegador se resiente, usa una exportación más pequeña para la primera revisión.",
    readError: "No se pudo leer el archivo. Usa un CSV o XLSX con una fila de encabezados clara.",
    noReadableRows: "No se encontraron filas legibles. Comprueba que el archivo tenga encabezados y datos útiles.",
    noCategoryInput: "Primero sube un archivo con una columna de categorías o pega valores de categoría.",
    noCategoryColumn: "No hay ninguna columna de categorías seleccionada. Elige una columna o pega valores de categoría.",
    incompleteQuestions: "Completa el checklist para ver la puntuación de preparación."
  },
  it: {
    unsupportedFile: "Tipo di file non supportato. Usa un file CSV o XLSX.",
    largeFile: "Questo file è grande. Se il browser fatica, usa un’esportazione più piccola per il primo controllo.",
    readError: "Non è stato possibile leggere il file. Usa un CSV o XLSX con una riga di intestazioni chiara.",
    noReadableRows: "Non sono state trovate righe leggibili. Controlla che il file abbia intestazioni e dati utilizzabili.",
    noCategoryInput: "Carica prima un file con una colonna categoria o incolla valori di categoria.",
    noCategoryColumn: "Nessuna colonna categoria selezionata. Scegli una colonna o incolla valori di categoria.",
    incompleteQuestions: "Completa la checklist per vedere il punteggio di preparazione."
  }
};

export function getToolPageContent(locale: Locale): ToolPageContentMap {
  const g = generic[locale];
  const errors = sharedErrors[locale];

  if (locale === "es") {
    return {
      listQuality: {
        eyebrow: "Herramienta principal",
        headline: "Comprueba si una lista de empresas es utilizable antes de importarla, enviarla, confiar en ella o reclamarla.",
        description: "Sube un CSV o XLSX y obtén una revisión local de estructura, campos, duplicados, categorías y señales básicas de preparación de campaña.",
        actionTitle: "Revisa tu archivo",
        instructions: "Elige una lista CSV o XLSX. La versión 1 lee la primera hoja del archivo XLSX.",
        emptyState: "Sube un archivo CSV o XLSX para ver la puntuación de calidad de la lista.",
        whatChecksTitle: g.whatChecksTitle,
        whatChecks: ["Nombres de empresa ausentes", "Campos de email ausentes", "Formatos de email mal formados", "Emails duplicados", "Nombres de empresa duplicados", "Sitios web ausentes", "Teléfonos ausentes", "Ciudad o país ausentes", "Columnas vacías", "Filas con poca información útil", "Fragmentación de categorías", "Categorías sospechosamente genéricas", "Debilidades potenciales de preparación de campaña"],
        whatNotTitle: g.whatNotTitle,
        whatNot: ["No verifica si un email existe realmente", "No confirma permiso legal para contactar a nadie", "No garantiza entregabilidad", "No enriquece el archivo con datos externos", "No sube ni almacena el archivo"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Has comprado una base de datos de empresas", "Has exportado contactos desde otro sistema", "Has heredado una hoja de cálculo desordenada", "Estás preparando una campaña", "Necesitas evidencias antes de reclamar a un proveedor"],
        nextTitle: g.nextTitle,
        nextText: "Corrige los campos débiles, documenta los problemas principales y no importes una lista dudosa sin revisión humana.",
        primaryProduct: "listQuality",
        bundleProduct: "survivalBundle",
        primaryCta: "¿Necesitas el flujo de corrección, tablas de evidencia y plantillas reutilizables? Consigue el Toolkit de calidad de listas.",
        bundleCta: "¿Quieres cubrir calidad, categorías, reclamación y preparación de campaña? Consigue el bundle completo.",
        errors
      },
      categoryChaos: {
        eyebrow: "Segmentación",
        headline: "Descubre si tus categorías ayudan a segmentar o sólo decoran la hoja de cálculo con confusión.",
        description: "Analiza categorías pegadas o una columna de CSV/XLSX para detectar fragmentación, formatos incoherentes y etiquetas inútiles.",
        actionTitle: "Revisa las categorías",
        instructions: "Sube un archivo y selecciona la columna de categorías, o pega una categoría por línea.",
        emptyState: "Sube un archivo o pega valores de categoría para ver la puntuación de caos de categorías.",
        whatChecksTitle: g.whatChecksTitle,
        whatChecks: ["Número de entradas de categoría", "Número de categorías únicas", "Fragmentación de categorías", "Categorías repetidas con distintas mayúsculas", "Varias categorías dentro de la misma celda", "Etiquetas demasiado largas", "Etiquetas genéricas inútiles", "Formato mezclado", "Posible mezcla de idiomas con heurísticas locales simples"],
        whatNotTitle: g.whatNotTitle,
        whatNot: ["No reescribe automáticamente todo el sistema de categorías", "No traduce categorías", "No enriquece la lista", "No decide tu estrategia comercial", "No sube ni almacena el archivo"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Tu lista tiene cientos de etiquetas de categoría", "El mismo sector aparece con muchos nombres distintos", "No puedes segmentar la lista correctamente", "Un proveedor te dio categorías incoherentes", "Necesitas reducir el caos a grupos útiles de campaña"],
        nextTitle: g.nextTitle,
        nextText: "Agrupa etiquetas repetidas, elimina categorías inútiles y crea una taxonomía pequeña antes de segmentar.",
        primaryProduct: "categoryCleanup",
        bundleProduct: "survivalBundle",
        primaryCta: "¿Necesitas convertir etiquetas caóticas en grupos útiles? Consigue el Toolkit de limpieza de categorías.",
        bundleCta: "¿La lista también tiene problemas de calidad o campaña? Consigue el bundle completo.",
        errors
      },
      vendorComplaint: {
        eyebrow: "Reclamación profesional",
        headline: "Crea una reclamación clara cuando una lista comprada está incompleta, desordenada, es engañosa o no coincide con lo prometido.",
        description: "Rellena los datos principales y genera un email medido, firme y copiable. No se envía ni se almacena nada.",
        actionTitle: "Construye la reclamación",
        instructions: "Introduce los hechos, el problema, el resultado que buscas y el tono. La herramienta no usa IA.",
        emptyState: "Rellena el formulario para generar un email de reclamación profesional y copiable.",
        whatChecksTitle: "Con qué ayuda",
        whatChecks: ["Explicar el problema con claridad", "Separar hechos de frustración", "Mostrar qué se prometió y qué se entregó", "Pedir una solución práctica", "Preparar un registro escrito"],
        whatNotTitle: "Qué no hace",
        whatNot: ["No envía el email", "No almacena el email", "No ofrece asesoramiento legal", "No garantiza un reembolso", "No hace afirmaciones difamatorias"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Un archivo comprado no coincide con la página de venta", "La lista contiene errores evidentes", "Necesitas pedir corrección, sustitución, explicación o reembolso", "Quieres reclamar sin escribir en caliente", "Necesitas una comunicación firme pero profesional"],
        nextTitle: g.nextTitle,
        nextText: "Copia el email, adjunta evidencias concretas y mantén la reclamación centrada en hechos verificables.",
        primaryProduct: "vendorComplaint",
        bundleProduct: "survivalBundle",
        primaryCta: "¿Necesitas tablas de evidencia y plantillas de seguimiento? Consigue el Pack de reclamación a proveedores.",
        bundleCta: "¿Quieres revisar, limpiar, reclamar y preparar la lista? Consigue el bundle completo.",
        errors
      },
      campaignReadiness: {
        eyebrow: "Antes del envío",
        headline: "Antes de culpar a la campaña, comprueba si la lista y la preparación están listas.",
        description: "Responde a un checklist práctico sobre fuente, frescura, segmentación, remitente, bajas, oferta y revisión básica de reglas aplicables.",
        actionTitle: "Completa el checklist",
        instructions: "Responde a todas las preguntas y genera una puntuación sólo cuando hayas terminado.",
        emptyState: "Completa el checklist para ver tu puntuación de preparación de campaña.",
        whatChecksTitle: g.whatChecksTitle,
        whatChecks: ["Si la lista está estructuralmente preparada", "Si la segmentación es posible", "Si existen riesgos evidentes de campaña", "Si has preparado lo básico antes de enviar"],
        whatNotTitle: g.whatNotTitle,
        whatNot: ["No ofrece asesoramiento legal", "No verifica entregabilidad", "No configura el dominio remitente", "No confirma consentimiento ni base legal", "No garantiza el rendimiento de la campaña"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Estás a punto de importar una lista", "Vas a enviar una campaña", "No sabes si la preparación mínima está hecha", "Quieres detectar riesgos antes de gastar dinero", "Necesitas una revisión previa sencilla"],
        nextTitle: g.nextTitle,
        nextText: "Corrige los riesgos principales antes de enviar. Las reglas de email marketing varían por país; comprueba las normas aplicables antes de lanzar campañas.",
        primaryProduct: "campaignReadiness",
        bundleProduct: "survivalBundle",
        primaryCta: "¿Necesitas un checklist operativo y plantillas previas al envío? Consigue el Toolkit de preparación de campañas.",
        bundleCta: "¿Quieres cubrir toda la lista antes de enviar? Consigue el bundle completo.",
        errors,
        labels: { submit: "Ver puntuación", reset: "Reiniciar respuestas" }
      }
    };
  }

  if (locale === "it") {
    return {
      listQuality: {
        eyebrow: "Strumento principale",
        headline: "Controlla se una lista aziendale è utilizzabile prima di importarla, inviarla, fidarti o contestarla.",
        description: "Carica un CSV o XLSX e ottieni un controllo locale su struttura, campi, duplicati, categorie e segnali base di preparazione campagna.",
        actionTitle: "Controlla il file",
        instructions: "Scegli una lista CSV o XLSX. La versione 1 legge il primo foglio del file XLSX.",
        emptyState: "Carica un file CSV o XLSX per vedere il punteggio di qualità della lista.",
        whatChecksTitle: g.whatChecksTitle,
        whatChecks: ["Nomi azienda mancanti", "Campi email mancanti", "Formati email mal formati", "Email duplicate", "Nomi azienda duplicati", "Siti web mancanti", "Telefoni mancanti", "Città o paese mancanti", "Colonne vuote", "Righe con poche informazioni utili", "Frammentazione delle categorie", "Categorie sospettosamente generiche", "Debolezze potenziali di preparazione campagna"],
        whatNotTitle: g.whatNotTitle,
        whatNot: ["Non verifica se un indirizzo email esiste davvero", "Non conferma il permesso legale di contattare qualcuno", "Non garantisce la deliverability", "Non arricchisce il file con dati esterni", "Non carica né memorizza il file"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Hai comprato un database aziendale", "Hai esportato contatti da un altro sistema", "Hai ereditato un foglio di calcolo disordinato", "Stai preparando una campagna", "Ti servono prove prima di reclamare al fornitore"],
        nextTitle: g.nextTitle,
        nextText: "Correggi i campi deboli, documenta i problemi principali e non importare una lista dubbia senza revisione umana.",
        primaryProduct: "listQuality",
        bundleProduct: "survivalBundle",
        primaryCta: "Ti servono il flusso di correzione, tabelle di evidenza e template riutilizzabili? Prendi il Toolkit qualità liste.",
        bundleCta: "Vuoi coprire qualità, categorie, reclamo e preparazione campagna? Prendi il bundle completo.",
        errors
      },
      categoryChaos: {
        eyebrow: "Segmentazione",
        headline: "Scopri se le categorie aiutano la segmentazione o decorano il foglio di calcolo con confusione.",
        description: "Analizza categorie incollate o una colonna CSV/XLSX per rilevare frammentazione, formati incoerenti ed etichette inutili.",
        actionTitle: "Controlla le categorie",
        instructions: "Carica un file e seleziona la colonna categoria, oppure incolla una categoria per riga.",
        emptyState: "Carica un file o incolla valori categoria per vedere il punteggio di caos categorie.",
        whatChecksTitle: g.whatChecksTitle,
        whatChecks: ["Numero di voci categoria", "Numero di categorie uniche", "Frammentazione delle categorie", "Categorie ripetute con maiuscole diverse", "Più categorie nella stessa cella", "Etichette troppo lunghe", "Etichette generiche inutili", "Formattazione mista", "Possibile incoerenza linguistica con semplici euristiche locali"],
        whatNotTitle: g.whatNotTitle,
        whatNot: ["Non riscrive automaticamente tutto il sistema di categorie", "Non traduce le categorie", "Non arricchisce la lista", "Non decide la strategia commerciale", "Non carica né memorizza il file"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["La lista ha centinaia di etichette categoria", "Lo stesso settore appare con molti nomi diversi", "Non riesci a segmentare correttamente", "Un fornitore ha dato categorie incoerenti", "Devi ridurre il caos in gruppi campagna utilizzabili"],
        nextTitle: g.nextTitle,
        nextText: "Raggruppa etichette ripetute, elimina categorie inutili e crea una piccola tassonomia prima di segmentare.",
        primaryProduct: "categoryCleanup",
        bundleProduct: "survivalBundle",
        primaryCta: "Devi trasformare etichette caotiche in gruppi utili? Prendi il Toolkit pulizia categorie.",
        bundleCta: "La lista ha anche problemi di qualità o campagna? Prendi il bundle completo.",
        errors
      },
      vendorComplaint: {
        eyebrow: "Reclamo professionale",
        headline: "Crea un reclamo chiaro quando una lista acquistata è incompleta, disordinata, fuorviante o diversa da quanto promesso.",
        description: "Compila i dati principali e genera un’email misurata, ferma e copiabile. Nulla viene inviato o memorizzato.",
        actionTitle: "Costruisci il reclamo",
        instructions: "Inserisci fatti, problema, risultato richiesto e tono. Lo strumento non usa IA.",
        emptyState: "Compila il modulo per generare un’email di reclamo professionale e copiabile.",
        whatChecksTitle: "In che cosa aiuta",
        whatChecks: ["Spiegare chiaramente il problema", "Separare i fatti dalla frustrazione", "Mostrare che cosa era stato promesso e che cosa è stato consegnato", "Richiedere un rimedio pratico", "Preparare una traccia scritta"],
        whatNotTitle: "Che cosa non fa",
        whatNot: ["Non invia l’email", "Non memorizza l’email", "Non offre consulenza legale", "Non garantisce un rimborso", "Non fa affermazioni diffamatorie"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Un file acquistato non corrisponde alla pagina di vendita", "La lista contiene errori evidenti", "Devi chiedere correzione, sostituzione, spiegazione o rimborso", "Vuoi reclamare senza scrivere a caldo", "Ti serve una comunicazione ferma ma professionale"],
        nextTitle: g.nextTitle,
        nextText: "Copia l’email, allega prove concrete e mantieni il reclamo centrato su fatti verificabili.",
        primaryProduct: "vendorComplaint",
        bundleProduct: "survivalBundle",
        primaryCta: "Ti servono tabelle di evidenza e template di follow-up? Prendi il Pack reclami ai fornitori.",
        bundleCta: "Vuoi controllare, pulire, reclamare e preparare la lista? Prendi il bundle completo.",
        errors
      },
      campaignReadiness: {
        eyebrow: "Prima dell’invio",
        headline: "Prima di dare la colpa alla campagna, controlla se lista e preparazione sono pronte.",
        description: "Rispondi a una checklist pratica su fonte, freschezza, segmentazione, mittente, disiscrizione, offerta e revisione base delle regole applicabili.",
        actionTitle: "Completa la checklist",
        instructions: "Rispondi a tutte le domande e genera il punteggio solo quando hai terminato.",
        emptyState: "Completa la checklist per vedere il punteggio di preparazione campagna.",
        whatChecksTitle: g.whatChecksTitle,
        whatChecks: ["Se la lista è strutturalmente pronta", "Se la segmentazione è possibile", "Se sono presenti rischi evidenti di campagna", "Se hai preparato le basi prima dell’invio"],
        whatNotTitle: g.whatNotTitle,
        whatNot: ["Non offre consulenza legale", "Non verifica la deliverability", "Non configura il dominio mittente", "Non conferma consenso o base giuridica", "Non garantisce le prestazioni della campagna"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Stai per importare una lista", "Stai per inviare una campagna", "Non sai se la preparazione minima è stata fatta", "Vuoi rilevare rischi prima di spendere", "Ti serve una revisione preliminare semplice"],
        nextTitle: g.nextTitle,
        nextText: "Correggi i rischi principali prima di inviare. Le regole di email marketing variano per paese; controlla le norme applicabili prima di lanciare campagne.",
        primaryProduct: "campaignReadiness",
        bundleProduct: "survivalBundle",
        primaryCta: "Ti servono una checklist operativa e template pre-invio? Prendi il Toolkit preparazione campagne.",
        bundleCta: "Vuoi coprire tutta la lista prima dell’invio? Prendi il bundle completo.",
        errors,
        labels: { submit: "Vedi punteggio", reset: "Reimposta risposte" }
      }
    };
  }

  return {
    listQuality: {
      eyebrow: "Main tool",
      headline: "Check whether a business list is usable before you import it, email it, trust it, or complain about it.",
      description: "Upload a CSV or XLSX file and get a local structural check of fields, duplicates, categories, and basic campaign-readiness weaknesses.",
      actionTitle: "Check your file",
      instructions: "Choose a CSV or XLSX business list. Version 1 reads the first worksheet in an XLSX file.",
      emptyState: "Upload a CSV or XLSX file to see the list quality score.",
      whatChecksTitle: g.whatChecksTitle,
      whatChecks: ["Missing company names", "Missing email fields", "Malformed email formats", "Duplicate emails", "Duplicate company names", "Missing websites", "Missing phone numbers", "Missing city or country fields", "Empty columns", "Rows with too little useful data", "Category fragmentation", "Suspiciously generic categories", "Potential campaign-readiness weaknesses"],
      whatNotTitle: g.whatNotTitle,
      whatNot: ["It does not verify whether an email address really exists", "It does not confirm legal permission to contact anyone", "It does not guarantee deliverability", "It does not enrich the file with external data", "It does not upload or store the file"],
      bestUsedTitle: g.bestUsedTitle,
      bestUsed: ["You bought a business database", "You exported contacts from another system", "You inherited a messy spreadsheet", "You are preparing a campaign", "You need evidence before complaining to a vendor"],
      nextTitle: g.nextTitle,
      nextText: "Fix weak fields, document the main problems, and do not import a doubtful list without human review.",
      primaryProduct: "listQuality",
      bundleProduct: "survivalBundle",
      primaryCta: "Need the correction workflow, evidence tables, and reusable templates? Get the List Quality Toolkit.",
      bundleCta: "Want the full path from checking to complaint to campaign readiness? Get the Business List Survival Bundle.",
      errors
    },
    categoryChaos: {
      eyebrow: "Segmentation",
      headline: "Find out whether your categories help segmentation or just decorate the spreadsheet with confusion.",
      description: "Analyse pasted categories or a CSV/XLSX category column to spot fragmentation, inconsistent formatting, and useless labels.",
      actionTitle: "Check the categories",
      instructions: "Upload a file and select the category column, or paste one category value per line.",
      emptyState: "Upload a file or paste category values to see the category chaos score.",
      whatChecksTitle: g.whatChecksTitle,
      whatChecks: ["Number of category entries", "Number of unique categories", "Category fragmentation", "Repeated categories with different capitalisation", "Multiple categories inside the same cell", "Overly long category labels", "Useless generic labels", "Mixed formatting", "Possible mixed-language inconsistency using simple local heuristics"],
      whatNotTitle: g.whatNotTitle,
      whatNot: ["It does not automatically rewrite your whole category system", "It does not translate categories", "It does not enrich your list", "It does not decide your commercial strategy", "It does not upload or store your file"],
      bestUsedTitle: g.bestUsedTitle,
      bestUsed: ["Your list has hundreds of category labels", "The same sector appears under many different names", "You cannot segment the list properly", "A vendor gave you messy or inconsistent categories", "You need to reduce chaos into usable campaign groups"],
      nextTitle: g.nextTitle,
      nextText: "Group repeated labels, remove useless categories, and create a smaller controlled taxonomy before segmenting.",
      primaryProduct: "categoryCleanup",
      bundleProduct: "survivalBundle",
      primaryCta: "Need to turn chaotic labels into usable groups? Get the Category Clean-Up Toolkit.",
      bundleCta: "Does the list also have quality or campaign issues? Get the Business List Survival Bundle.",
      errors
    },
    vendorComplaint: {
      eyebrow: "Professional complaint",
      headline: "Build a clear complaint when a purchased business list is incomplete, messy, misleading, or not what was promised.",
      description: "Enter the basic facts and generate a measured, firm, copyable complaint email. Nothing is sent or stored.",
      actionTitle: "Build the complaint",
      instructions: "Add the facts, the problem, the remedy you want, and the tone. This tool is deterministic and uses no AI.",
      emptyState: "Complete the form to generate a professional, copyable complaint email.",
      whatChecksTitle: "What this helps with",
      whatChecks: ["Explaining the issue clearly", "Separating facts from frustration", "Showing what was promised and what was delivered", "Requesting a practical remedy", "Preparing a written record"],
      whatNotTitle: "What this does not do",
      whatNot: ["It does not send the email", "It does not store the email", "It does not provide legal advice", "It does not guarantee a refund", "It does not make defamatory claims"],
      bestUsedTitle: g.bestUsedTitle,
      bestUsed: ["A purchased file does not match the sales page", "The list contains obvious errors", "You need to request correction, replacement, explanation, or refund", "You want to complain without writing in anger", "You need a firm but professional record"],
      nextTitle: g.nextTitle,
      nextText: "Copy the email, attach concrete evidence, and keep the complaint focused on verifiable facts.",
      primaryProduct: "vendorComplaint",
      bundleProduct: "survivalBundle",
      primaryCta: "Need evidence tables and follow-up templates? Get the Vendor Complaint Pack.",
      bundleCta: "Want to check, clean, challenge, and prepare the list? Get the Business List Survival Bundle.",
      errors
    },
    campaignReadiness: {
      eyebrow: "Before sending",
      headline: "Before you blame the campaign, check whether the list and preparation are ready.",
      description: "Answer a practical pre-send checklist covering source, freshness, segmentation, sender setup, unsubscribe handling, offer clarity, and basic rules review.",
      actionTitle: "Complete the checklist",
      instructions: "Answer every question, then generate your score. No score is shown until you submit the checklist.",
      emptyState: "Complete the checklist to see your readiness score.",
      whatChecksTitle: g.whatChecksTitle,
      whatChecks: ["Whether the list is structurally ready", "Whether segmentation is possible", "Whether obvious campaign risks are present", "Whether you have prepared the basics before sending"],
      whatNotTitle: g.whatNotTitle,
      whatNot: ["It does not provide legal advice", "It does not verify deliverability", "It does not configure the sending domain", "It does not confirm consent or lawful basis", "It does not guarantee campaign performance"],
      bestUsedTitle: g.bestUsedTitle,
      bestUsed: ["You are about to import a list", "You are preparing an email or outreach campaign", "You are not sure the basics are ready", "You want to spot risks before spending money", "You need a simple pre-send review"],
      nextTitle: g.nextTitle,
      nextText: "Fix the main risks before sending. Email marketing rules vary by country; check the applicable rules before launching campaigns.",
      primaryProduct: "campaignReadiness",
      bundleProduct: "survivalBundle",
      primaryCta: "Need the operational checklist and pre-send templates? Get the Campaign Readiness Toolkit.",
      bundleCta: "Want the whole list checked before sending? Get the Business List Survival Bundle.",
      errors,
      labels: { submit: "Show score", reset: "Reset answers" }
    }
  };
}

export function getGenericToolCopy(locale: Locale) {
  return generic[locale];
}
