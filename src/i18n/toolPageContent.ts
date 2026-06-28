import type { ProductKey } from "@/config/site";
import type { Locale } from "./locales";

type ToolPageContent = {
  eyebrow: string;
  headline: string;
  description: string;
  actionTitle: string;
  instructions: string;
  emptyState: string;
  meaningTitle: string;
  meaningText: string;
  privacyNote: string;
  whatChecksTitle: string;
  whatChecks: string[];
  whatNotTitle: string;
  whatNot: string[];
  bestUsedTitle: string;
  bestUsed: string[];
  nextTitle: string;
  nextText: string;
  primaryProduct: ProductKey;
  secondaryProduct: ProductKey;
  primaryCta: string;
  secondaryCta: string;
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
  meaningTitle: string;
  privacyNote: string;
};

const generic: Record<Locale, GenericCopy> = {
  en: {
    whatChecksTitle: "What this checks",
    whatNotTitle: "What this does not check",
    bestUsedTitle: "Best used when",
    nextTitle: "Practical next action",
    meaningTitle: "What this result means",
    privacyNote: "Your file is analysed locally in your browser. It is not uploaded, stored, or reviewed by us."
  },
  es: {
    whatChecksTitle: "Qué revisa",
    whatNotTitle: "Qué no revisa",
    bestUsedTitle: "Cuándo usarlo",
    nextTitle: "Siguiente acción práctica",
    meaningTitle: "Qué significa este resultado",
    privacyNote: "Tu archivo se analiza localmente en tu navegador. No se sube, no se almacena y no lo revisamos nosotros."
  },
  it: {
    whatChecksTitle: "Che cosa controlla",
    whatNotTitle: "Che cosa non controlla",
    bestUsedTitle: "Quando usarlo",
    nextTitle: "Prossima azione pratica",
    meaningTitle: "Che cosa significa questo risultato",
    privacyNote: "Il tuo file viene analizzato localmente nel browser. Non viene caricato, memorizzato o revisionato da noi."
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

function baseProducts() {
  return { primaryProduct: "survivalBundle" as ProductKey, secondaryProduct: "buyerProtection" as ProductKey };
}

export function getToolPageContent(locale: Locale): ToolPageContentMap {
  const g = generic[locale];
  const errors = sharedErrors[locale];
  const products = baseProducts();

  if (locale === "es") {
    return {
      listQuality: {
        ...products,
        eyebrow: "Calidad de lista",
        headline: "Revisa tu lista de empresas antes de importarla.",
        description: "Detecta campos ausentes, registros duplicados, categorías débiles y problemas estructurales antes de que malgasten presupuesto de campaña.",
        actionTitle: "Sube tu lista",
        instructions: "CSV y XLSX son compatibles. El archivo se analiza localmente en tu navegador.",
        emptyState: "Sube un archivo CSV o XLSX para ver el resultado de calidad de la lista.",
        meaningTitle: g.meaningTitle,
        meaningText: "El resultado muestra señales de riesgo estructural. No sustituye una revisión humana, pero ayuda a decidir si la lista puede usarse, debe corregirse o conviene documentar defectos.",
        privacyNote: g.privacyNote,
        whatChecksTitle: g.whatChecksTitle,
        whatChecks: ["Nombres de empresa ausentes", "Campos de email ausentes", "Formatos de email mal formados", "Emails duplicados", "Nombres de empresa duplicados", "Sitios web ausentes", "Teléfonos ausentes", "Ciudad o país ausentes", "Columnas vacías", "Filas con poca información útil", "Fragmentación de categorías", "Categorías sospechosamente genéricas", "Debilidades potenciales de preparación de campaña"],
        whatNotTitle: g.whatNotTitle,
        whatNot: ["No verifica si un email existe realmente", "No confirma permiso legal para contactar a nadie", "No garantiza entregabilidad", "No enriquece el archivo con datos externos", "No sube ni almacena el archivo"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Has comprado una base de datos de empresas", "Has exportado contactos desde otro sistema", "Has heredado una hoja de cálculo desordenada", "Estás preparando una campaña", "Necesitas evidencias antes de reclamar a un proveedor"],
        nextTitle: g.nextTitle,
        nextText: "Si el resultado muestra campos ausentes, duplicados, categorías débiles o usabilidad incierta, usa el Business List Survival Bundle para auditar bien la lista, documentar defectos, limpiar la estructura y preparar tu siguiente acción.",
        primaryCta: "Este revisor gratuito muestra señales tempranas. El bundle incluye el workbook editable de auditoría, tablas de evidencias, material de limpieza de categorías, plantillas de reclamación y comprobaciones de preparación de campaña.",
        secondaryCta: "Si aún no has comprado la base de datos, usa el Database Buyer Protection Toolkit antes de pagar.",
        errors
      },
      categoryChaos: {
        ...products,
        eyebrow: "Categorías",
        headline: "Convierte el caos de categorías en grupos de campaña utilizables.",
        description: "Una lista de empresas con cientos de categorías brutas no está segmentada. Es un archivador después de una pequeña explosión.",
        actionTitle: "Sube o pega categorías",
        instructions: "Sube un archivo y selecciona la columna de categorías, o pega valores de categoría directamente.",
        emptyState: "Sube un archivo o pega valores de categoría para ver el resultado de caos de categorías.",
        meaningTitle: g.meaningTitle,
        meaningText: "El resultado indica si las categorías ayudan a segmentar o si crean ruido operativo antes de una campaña.",
        privacyNote: g.privacyNote,
        whatChecksTitle: g.whatChecksTitle,
        whatChecks: ["Número de entradas de categoría", "Número de categorías únicas", "Fragmentación de categorías", "Categorías repetidas con distintas mayúsculas", "Varias categorías dentro de la misma celda", "Etiquetas demasiado largas", "Etiquetas genéricas inútiles", "Formato mezclado", "Posible mezcla de idiomas con heurísticas locales simples"],
        whatNotTitle: g.whatNotTitle,
        whatNot: ["No reescribe automáticamente todo el sistema de categorías", "No traduce categorías", "No enriquece la lista", "No decide tu estrategia comercial", "No sube ni almacena el archivo"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Tu lista tiene cientos de etiquetas de categoría", "El mismo sector aparece con muchos nombres distintos", "No puedes segmentar la lista correctamente", "Un proveedor te dio categorías incoherentes", "Necesitas reducir el caos a grupos útiles de campaña"],
        nextTitle: g.nextTitle,
        nextText: "Si las categorías ya son desordenadas, usa el Business List Survival Bundle para mapear etiquetas brutas en grupos prácticos y preparar el archivo para uso en campaña.",
        primaryCta: "Si las categorías ya son caóticas, usa el bundle para convertirlas en grupos de campaña utilizables.",
        secondaryCta: "Si todavía estás valorando la compra, usa el buyer toolkit antes de pagar.",
        errors
      },
      vendorComplaint: {
        ...products,
        eyebrow: "Reclamación",
        headline: "Crea una reclamación seria sobre una mala lista de empresas.",
        description: "Crea una reclamación clara y profesional cuando una base de datos comprada es desordenada, incompleta, duplicada, mal categorizada o no coincide con lo prometido.",
        actionTitle: "Completa los datos",
        instructions: "Introduce los hechos, el problema, el resultado solicitado y el tono. La herramienta no envía ni almacena el email.",
        emptyState: "Completa los campos para generar tu email de reclamación.",
        meaningTitle: g.meaningTitle,
        meaningText: "El resultado te da una reclamación profesional que separa hechos, promesas, defectos y remedio solicitado.",
        privacyNote: "El email se genera en tu navegador. No se envía ni se almacena.",
        whatChecksTitle: "Con qué ayuda",
        whatChecks: ["Explicar el problema con claridad", "Separar hechos de frustración", "Mostrar qué se prometió y qué se entregó", "Pedir una solución práctica", "Preparar un registro escrito"],
        whatNotTitle: "Qué no hace",
        whatNot: ["No envía el email", "No almacena el email", "No ofrece asesoramiento legal", "No garantiza un reembolso", "No hace afirmaciones difamatorias"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Un archivo comprado no coincide con la página de venta", "La lista contiene errores evidentes", "Necesitas pedir corrección, sustitución, explicación o reembolso", "Quieres reclamar sin escribir en caliente", "Necesitas una comunicación firme pero profesional"],
        nextTitle: g.nextTitle,
        nextText: "Si el proveedor se resiste o el problema es material, usa el Business List Survival Bundle para emails de reclamación, tablas de evidencia, seguimiento promesa-entrega, texto de reembolso y escalado.",
        primaryCta: "Si el archivo ya fue comprado y no coincide con lo descrito, usa el bundle para reclamaciones, evidencias y documentación práctica.",
        secondaryCta: "Antes de volver a comprar otra base de datos, usa el buyer toolkit para revisar al proveedor.",
        errors
      },
      campaignReadiness: {
        ...products,
        eyebrow: "Pre-envío",
        headline: "Comprueba si tu lista está lista para una campaña.",
        description: "Revisa fuente, calidad de datos, segmentación, configuración del remitente, bajas y riesgos previos antes de enviar.",
        actionTitle: "Responde a los checks",
        instructions: "Responde a todas las preguntas y muestra la puntuación sólo cuando hayas terminado.",
        emptyState: "Responde a los checks para ver tu puntuación de preparación de campaña.",
        meaningTitle: g.meaningTitle,
        meaningText: "El resultado muestra si la lista y la preparación están suficientemente ordenadas antes de importarlas a una herramienta de envío.",
        privacyNote: "Tus respuestas se procesan localmente en el navegador. No se almacenan.",
        whatChecksTitle: g.whatChecksTitle,
        whatChecks: ["Si la lista está estructuralmente preparada", "Si la segmentación es posible", "Si existen riesgos evidentes de campaña", "Si has preparado lo básico antes de enviar"],
        whatNotTitle: g.whatNotTitle,
        whatNot: ["No ofrece asesoramiento legal", "No verifica entregabilidad", "No configura el dominio remitente", "No confirma consentimiento ni base legal", "No garantiza el rendimiento de la campaña"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Estás a punto de importar una lista", "Vas a enviar una campaña", "No sabes si la preparación mínima está hecha", "Quieres detectar riesgos antes de gastar dinero", "Necesitas una revisión previa sencilla"],
        nextTitle: g.nextTitle,
        nextText: "Si el resultado es débil o incierto, usa el Business List Survival Bundle antes de importar la lista en Mailchimp, Brevo, WordPress Newsletter o cualquier sistema de prospección.",
        primaryCta: "Si la lista no está lista para campaña, el bundle ayuda a documentar qué corregir antes de importar, enviar o reclamar al proveedor.",
        secondaryCta: "Si todavía no has comprado la lista, usa el buyer toolkit para evitar comprar un archivo problemático.",
        errors,
        labels: { submit: "Ver puntuación", reset: "Reiniciar respuestas" }
      }
    };
  }

  if (locale === "it") {
    return {
      listQuality: {
        ...products,
        eyebrow: "Qualità lista",
        headline: "Controlla la tua lista aziendale prima di importarla.",
        description: "Trova campi mancanti, record duplicati, categorie deboli e problemi strutturali prima che sprechino budget di campagna.",
        actionTitle: "Carica la lista",
        instructions: "CSV e XLSX sono supportati. Il file viene analizzato localmente nel browser.",
        emptyState: "Carica un file CSV o XLSX per vedere il risultato qualità lista.",
        meaningTitle: g.meaningTitle,
        meaningText: "Il risultato mostra segnali di rischio strutturale. Non sostituisce una revisione umana, ma aiuta a decidere se la lista può essere usata, corretta o contestata.",
        privacyNote: g.privacyNote,
        whatChecksTitle: g.whatChecksTitle,
        whatChecks: ["Nomi azienda mancanti", "Campi email mancanti", "Formati email mal formati", "Email duplicate", "Nomi azienda duplicati", "Siti web mancanti", "Telefoni mancanti", "Città o paese mancanti", "Colonne vuote", "Righe con poche informazioni utili", "Frammentazione delle categorie", "Categorie sospettosamente generiche", "Debolezze potenziali di preparazione campagna"],
        whatNotTitle: g.whatNotTitle,
        whatNot: ["Non verifica se un indirizzo email esiste davvero", "Non conferma il permesso legale di contattare qualcuno", "Non garantisce la deliverability", "Non arricchisce il file con dati esterni", "Non carica né memorizza il file"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Hai comprato un database aziendale", "Hai esportato contatti da un altro sistema", "Hai ereditato un foglio di calcolo disordinato", "Stai preparando una campagna", "Ti servono prove prima di reclamare al fornitore"],
        nextTitle: g.nextTitle,
        nextText: "Se il risultato mostra campi mancanti, duplicati, categorie deboli o usabilità incerta, usa il Business List Survival Bundle per controllare bene la lista, documentare difetti, pulire la struttura e preparare l’azione successiva.",
        primaryCta: "Questo controllo gratuito mostra segnali iniziali. Il bundle include workbook di audit modificabile, tabelle prove, materiale per pulizia categorie, template reclami e controlli di preparazione campagna.",
        secondaryCta: "Se non hai ancora comprato la banca dati, usa il Database Buyer Protection Toolkit prima di pagare.",
        errors
      },
      categoryChaos: {
        ...products,
        eyebrow: "Categorie",
        headline: "Trasforma il caos delle categorie in gruppi campagna utilizzabili.",
        description: "Una lista aziendale con centinaia di categorie grezze non è segmentata. È un archivio dopo una piccola esplosione.",
        actionTitle: "Carica o incolla categorie",
        instructions: "Carica un file e seleziona la colonna categoria, oppure incolla direttamente i valori categoria.",
        emptyState: "Carica un file o incolla valori categoria per vedere il risultato caos categorie.",
        meaningTitle: g.meaningTitle,
        meaningText: "Il risultato indica se le categorie aiutano la segmentazione o creano rumore operativo prima della campagna.",
        privacyNote: g.privacyNote,
        whatChecksTitle: g.whatChecksTitle,
        whatChecks: ["Numero di voci categoria", "Numero di categorie uniche", "Frammentazione delle categorie", "Categorie ripetute con maiuscole diverse", "Più categorie nella stessa cella", "Etichette troppo lunghe", "Etichette generiche inutili", "Formattazione mista", "Possibile incoerenza linguistica con semplici euristiche locali"],
        whatNotTitle: g.whatNotTitle,
        whatNot: ["Non riscrive automaticamente tutto il sistema di categorie", "Non traduce le categorie", "Non arricchisce la lista", "Non decide la strategia commerciale", "Non carica né memorizza il file"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["La lista ha centinaia di etichette categoria", "Lo stesso settore appare con molti nomi diversi", "Non riesci a segmentare correttamente", "Un fornitore ha dato categorie incoerenti", "Devi ridurre il caos in gruppi campagna utilizzabili"],
        nextTitle: g.nextTitle,
        nextText: "Se le categorie sono già disordinate, usa il Business List Survival Bundle per mappare le etichette grezze in gruppi pratici e preparare il file all’uso in campagna.",
        primaryCta: "Se le categorie sono già caotiche, usa il bundle per convertirle in gruppi campagna utilizzabili.",
        secondaryCta: "Se stai ancora valutando l’acquisto, usa il buyer toolkit prima di pagare.",
        errors
      },
      vendorComplaint: {
        ...products,
        eyebrow: "Reclamo",
        headline: "Crea un reclamo serio su una lista aziendale scadente.",
        description: "Crea un reclamo chiaro e professionale quando una banca dati acquistata è disordinata, incompleta, duplicata, categorizzata male o diversa da quanto descritto.",
        actionTitle: "Compila i campi",
        instructions: "Inserisci fatti, problema, risultato richiesto e tono. Lo strumento non invia né memorizza l’email.",
        emptyState: "Completa i campi per generare la tua email di reclamo.",
        meaningTitle: g.meaningTitle,
        meaningText: "Il risultato fornisce un reclamo professionale che separa fatti, promesse, difetti e rimedio richiesto.",
        privacyNote: "L’email viene generata nel browser. Non viene inviata né memorizzata.",
        whatChecksTitle: "In che cosa aiuta",
        whatChecks: ["Spiegare chiaramente il problema", "Separare i fatti dalla frustrazione", "Mostrare che cosa era stato promesso e che cosa è stato consegnato", "Richiedere un rimedio pratico", "Preparare una traccia scritta"],
        whatNotTitle: "Che cosa non fa",
        whatNot: ["Non invia l’email", "Non memorizza l’email", "Non offre consulenza legale", "Non garantisce un rimborso", "Non fa affermazioni diffamatorie"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Un file acquistato non corrisponde alla pagina di vendita", "La lista contiene errori evidenti", "Devi chiedere correzione, sostituzione, spiegazione o rimborso", "Vuoi reclamare senza scrivere a caldo", "Ti serve una comunicazione ferma ma professionale"],
        nextTitle: g.nextTitle,
        nextText: "Se il fornitore respinge la richiesta o il problema è materiale, usa il Business List Survival Bundle per email di reclamo, tabelle prove, tracciamento promessa-consegna, testo rimborso ed escalation.",
        primaryCta: "Se il file è già stato acquistato e non corrisponde alla descrizione, usa il bundle per reclami, prove e documentazione pratica.",
        secondaryCta: "Prima di comprare un’altra banca dati, usa il buyer toolkit per controllare il fornitore.",
        errors
      },
      campaignReadiness: {
        ...products,
        eyebrow: "Pre-invio",
        headline: "Controlla se la lista è pronta per una campagna.",
        description: "Rivedi fonte lista, qualità dati, segmentazione, configurazione mittente, disiscrizione e rischi pre-invio prima che la campagna parta.",
        actionTitle: "Rispondi ai controlli",
        instructions: "Rispondi a tutte le domande e mostra il punteggio solo quando hai terminato.",
        emptyState: "Rispondi ai controlli per vedere il punteggio di preparazione campagna.",
        meaningTitle: g.meaningTitle,
        meaningText: "Il risultato mostra se lista e preparazione sono abbastanza ordinate prima di importarle in uno strumento di invio.",
        privacyNote: "Le risposte vengono elaborate localmente nel browser. Non vengono memorizzate.",
        whatChecksTitle: g.whatChecksTitle,
        whatChecks: ["Se la lista è strutturalmente pronta", "Se la segmentazione è possibile", "Se sono presenti rischi evidenti di campagna", "Se hai preparato le basi prima dell’invio"],
        whatNotTitle: g.whatNotTitle,
        whatNot: ["Non offre consulenza legale", "Non verifica la deliverability", "Non configura il dominio mittente", "Non conferma consenso o base giuridica", "Non garantisce le prestazioni della campagna"],
        bestUsedTitle: g.bestUsedTitle,
        bestUsed: ["Stai per importare una lista", "Stai per inviare una campagna", "Non sai se la preparazione minima è stata fatta", "Vuoi rilevare rischi prima di spendere", "Ti serve una revisione preliminare semplice"],
        nextTitle: g.nextTitle,
        nextText: "Se il risultato è debole o incerto, usa il Business List Survival Bundle prima di importare la lista in Mailchimp, Brevo, WordPress Newsletter o qualsiasi sistema di outreach.",
        primaryCta: "Se la lista non è pronta per campagna, il bundle aiuta a documentare che cosa correggere prima di importare, inviare o contestare il fornitore.",
        secondaryCta: "Se non hai ancora comprato la lista, usa il buyer toolkit per evitare di acquistare un file problematico.",
        errors,
        labels: { submit: "Vedi punteggio", reset: "Reimposta risposte" }
      }
    };
  }

  return {
    listQuality: {
      ...products,
      eyebrow: "List quality",
      headline: "Check your business list before you import it.",
      description: "Find missing fields, duplicate records, weak categories, and structural problems before they waste campaign budget.",
      actionTitle: "Upload your list",
      instructions: "CSV and XLSX are supported. The file is analysed locally in your browser.",
      emptyState: "Upload a CSV or XLSX file to see the list quality result.",
      meaningTitle: g.meaningTitle,
      meaningText: "The result highlights structural warning signs. It does not replace human review, but it helps you decide whether the list can be used, needs correction, or should be documented as defective.",
      privacyNote: g.privacyNote,
      whatChecksTitle: g.whatChecksTitle,
      whatChecks: ["Missing company names", "Missing email fields", "Malformed email formats", "Duplicate emails", "Duplicate company names", "Missing websites", "Missing phone numbers", "Missing city or country fields", "Empty columns", "Rows with too little useful data", "Category fragmentation", "Suspiciously generic categories", "Potential campaign-readiness weaknesses"],
      whatNotTitle: g.whatNotTitle,
      whatNot: ["It does not verify whether an email address really exists", "It does not confirm legal permission to contact anyone", "It does not guarantee deliverability", "It does not enrich the file with external data", "It does not upload or store the file"],
      bestUsedTitle: g.bestUsedTitle,
      bestUsed: ["You bought a business database", "You exported contacts from another system", "You inherited a messy spreadsheet", "You are preparing a campaign", "You need evidence before complaining to a vendor"],
      nextTitle: g.nextTitle,
      nextText: "If the result shows missing fields, duplicates, weak categories, or uncertain usability, use the Business List Survival Bundle to audit the list properly, document defects, clean the structure, and prepare your next action.",
      primaryCta: "This free checker shows early warning signs. The bundle gives you the editable audit workbook, evidence tables, category clean-up material, complaint templates, and campaign readiness checks.",
      secondaryCta: "If you have not bought the database yet, use the Database Buyer Protection Toolkit before paying.",
      errors
    },
    categoryChaos: {
      ...products,
      eyebrow: "Categories",
      headline: "Turn category chaos into usable campaign groups.",
      description: "A business list with hundreds of raw categories is not segmented. It is a filing cabinet after a small explosion.",
      actionTitle: "Upload or paste categories",
      instructions: "Upload a file and select the category column, or paste category values directly.",
      emptyState: "Upload a file or paste category values to see the category chaos result.",
      meaningTitle: g.meaningTitle,
      meaningText: "The result shows whether the categories support segmentation or create operational noise before a campaign.",
      privacyNote: g.privacyNote,
      whatChecksTitle: g.whatChecksTitle,
      whatChecks: ["Number of category entries", "Number of unique categories", "Category fragmentation", "Repeated categories with different capitalisation", "Multiple categories inside the same cell", "Overly long category labels", "Useless generic labels", "Mixed formatting", "Possible mixed-language inconsistency using simple local heuristics"],
      whatNotTitle: g.whatNotTitle,
      whatNot: ["It does not automatically rewrite your whole category system", "It does not translate categories", "It does not enrich your list", "It does not decide your commercial strategy", "It does not upload or store your file"],
      bestUsedTitle: g.bestUsedTitle,
      bestUsed: ["Your list has hundreds of category labels", "The same sector appears under many different names", "You cannot segment the list properly", "A vendor gave you messy or inconsistent categories", "You need to reduce chaos into usable campaign groups"],
      nextTitle: g.nextTitle,
      nextText: "If the categories are already messy, use the Business List Survival Bundle to map raw labels into practical groups and prepare the file for campaign use.",
      primaryCta: "If the categories are already chaotic, use the bundle to map them into usable campaign groups.",
      secondaryCta: "If you are still considering a purchase, use the buyer toolkit before paying.",
      errors
    },
    vendorComplaint: {
      ...products,
      eyebrow: "Complaint",
      headline: "Build a serious complaint about a poor business list.",
      description: "Create a clear, professional complaint when a purchased database is messy, incomplete, duplicated, badly categorised, or not as described.",
      actionTitle: "Complete the fields",
      instructions: "Enter the facts, the problem, the requested outcome, and the tone. The tool does not send or store the email.",
      emptyState: "Complete the fields to generate your complaint email.",
      meaningTitle: g.meaningTitle,
      meaningText: "The result gives you a professional complaint structure that separates facts, promises, defects, and requested remedy.",
      privacyNote: "The email is generated in your browser. It is not sent or stored.",
      whatChecksTitle: "What this helps with",
      whatChecks: ["Explaining the issue clearly", "Separating facts from frustration", "Showing what was promised and what was delivered", "Requesting a practical remedy", "Preparing a written record"],
      whatNotTitle: "What this does not do",
      whatNot: ["It does not send the email", "It does not store the email", "It does not provide legal advice", "It does not guarantee a refund", "It does not make defamatory claims"],
      bestUsedTitle: g.bestUsedTitle,
      bestUsed: ["A purchased file does not match the sales page", "The list contains obvious errors", "You need to request correction, replacement, explanation, or refund", "You want to complain without writing in anger", "You need a firm but professional record"],
      nextTitle: g.nextTitle,
      nextText: "If the supplier pushes back or the issue is material, use the Business List Survival Bundle for complaint emails, evidence tables, promise-vs-delivery tracking, refund wording, and escalation support.",
      primaryCta: "If the file was already purchased and is not as described, use the bundle for complaint emails, evidence tables, refund or replacement wording, and practical documentation.",
      secondaryCta: "Before buying another database, use the buyer toolkit to check the vendor first.",
      errors
    },
    campaignReadiness: {
      ...products,
      eyebrow: "Pre-send",
      headline: "Check whether your list is ready for a campaign.",
      description: "Review list source, data quality, segmentation, sender setup, unsubscribe handling, and pre-send risks before the campaign goes out.",
      actionTitle: "Answer the checks",
      instructions: "Answer every question, then show your score. No score is shown until you submit the checklist.",
      emptyState: "Answer the checks to see your campaign readiness score.",
      meaningTitle: g.meaningTitle,
      meaningText: "The result shows whether the list and preparation are orderly enough before importing them into a sending system.",
      privacyNote: "Your answers are processed locally in the browser. They are not stored.",
      whatChecksTitle: g.whatChecksTitle,
      whatChecks: ["Whether the list is structurally ready", "Whether segmentation is possible", "Whether obvious campaign risks are present", "Whether you have prepared the basics before sending"],
      whatNotTitle: g.whatNotTitle,
      whatNot: ["It does not provide legal advice", "It does not verify deliverability", "It does not configure the sending domain", "It does not confirm consent or lawful basis", "It does not guarantee campaign performance"],
      bestUsedTitle: g.bestUsedTitle,
      bestUsed: ["You are about to import a list", "You are preparing an email or outreach campaign", "You are not sure the basics are ready", "You want to spot risks before spending money", "You need a simple pre-send review"],
      nextTitle: g.nextTitle,
      nextText: "If the result is weak or uncertain, use the Business List Survival Bundle before importing the list into Mailchimp, Brevo, WordPress Newsletter, or any outreach system.",
      primaryCta: "If the list is not campaign-ready, the bundle helps you document what to fix before importing, emailing, or challenging the supplier.",
      secondaryCta: "If you have not bought the list yet, use the buyer toolkit to avoid purchasing a problem file.",
      errors,
      labels: { submit: "Show score", reset: "Reset answers" }
    }
  };
}

export function getGenericToolCopy(locale: Locale) {
  return generic[locale];
}
