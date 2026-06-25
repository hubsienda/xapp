"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";

type Tone = "polite" | "firm" | "veryFirm";
type Outcome = "correction" | "replacement" | "refund" | "explanation" | "escalation";

type FormState = {
  vendorName: string;
  productName: string;
  purchaseDate: string;
  promised: string;
  wrong: string;
  outcome: Outcome;
  tone: Tone;
  problems: string[];
};

function buildEmail(locale: Locale, dictionary: Dictionary, form: FormState) {
  const subjectProduct = form.productName || dictionary.complaint.generatedSubject;
  const subject = `${dictionary.complaint.subjectPrefix} ${subjectProduct}`;
  const vendor = form.vendorName || "";
  const selectedProblems = form.problems.length ? form.problems.join("; ") : form.wrong;
  const requested = dictionary.complaint.outcomes[form.outcome];
  const closing = form.tone === "veryFirm" ? dictionary.complaint.closingVeryFirm : form.tone === "firm" ? dictionary.complaint.closingFirm : dictionary.complaint.closingPolite;

  if (locale === "es") {
    return {
      subject,
      body: `${dictionary.complaint.greeting} ${vendor},\n\nMe pongo en contacto con ustedes en relación con ${form.productName || "la lista/producto adquirido"}${form.purchaseDate ? `, comprado el ${form.purchaseDate}` : ""}.\n\nSegún la información facilitada, se esperaba lo siguiente: ${form.promised || "un archivo coherente, completo y listo para su uso razonable"}.\n\nAl revisar el archivo he encontrado estos problemas: ${selectedProblems || "problemas estructurales que impiden usar el archivo con normalidad"}.\n\nPor este motivo solicito: ${requested}.\n\n${form.wrong ? `Observaciones adicionales: ${form.wrong}\n\n` : ""}${closing}\n\nAtentamente,`
    };
  }

  if (locale === "it") {
    return {
      subject,
      body: `${dictionary.complaint.greeting} ${vendor},\n\nVi contatto in merito a ${form.productName || "la lista/prodotto acquistato"}${form.purchaseDate ? `, acquistato il ${form.purchaseDate}` : ""}.\n\nSecondo le informazioni fornite, era atteso quanto segue: ${form.promised || "un file coerente, completo e ragionevolmente pronto all’uso"}.\n\nDurante la revisione del file ho riscontrato questi problemi: ${selectedProblems || "problemi strutturali che impediscono un uso normale del file"}.\n\nPer questo motivo richiedo: ${requested}.\n\n${form.wrong ? `Ulteriori osservazioni: ${form.wrong}\n\n` : ""}${closing}\n\nCordiali saluti,`
    };
  }

  return {
    subject,
    body: `${dictionary.complaint.greeting} ${vendor},\n\nI am writing regarding ${form.productName || "the purchased list/product"}${form.purchaseDate ? `, purchased on ${form.purchaseDate}` : ""}.\n\nBased on the information provided, I expected the following: ${form.promised || "a coherent, complete file that was reasonably ready to use"}.\n\nAfter reviewing the file, I found the following problems: ${selectedProblems || "structural issues that prevent normal use of the file"}.\n\nFor this reason, I am requesting: ${requested}.\n\n${form.wrong ? `Additional observations: ${form.wrong}\n\n` : ""}${closing}\n\nKind regards,`
  };
}

export function VendorComplaintBuilder({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [form, setForm] = useState<FormState>({ vendorName: "", productName: "", purchaseDate: "", promised: "", wrong: "", outcome: "correction", tone: "firm", problems: [] });
  const [output, setOutput] = useState<{ subject: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleProblem(problem: string) {
    setForm((current) => ({
      ...current,
      problems: current.problems.includes(problem)
        ? current.problems.filter((item) => item !== problem)
        : [...current.problems, problem]
    }));
  }

  function generate() {
    setOutput(buildEmail(locale, dictionary, form));
    setCopied(false);
  }

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(`Subject: ${output.subject}\n\n${output.body}`);
    setCopied(true);
  }

  return (
    <div className="two-column section">
      <section className="form-card">
        <h2>{dictionary.complaint.title}</h2>
        <p>{dictionary.complaint.intro}</p>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="vendor-name">{dictionary.complaint.vendorName}</label>
            <input id="vendor-name" value={form.vendorName} onChange={(event) => update("vendorName", event.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="product-name">{dictionary.complaint.productName}</label>
            <input id="product-name" value={form.productName} onChange={(event) => update("productName", event.target.value)} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="purchase-date">{dictionary.complaint.purchaseDate} <span>({dictionary.common.optional})</span></label>
          <input id="purchase-date" type="date" value={form.purchaseDate} onChange={(event) => update("purchaseDate", event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="promised">{dictionary.complaint.promised}</label>
          <textarea id="promised" value={form.promised} onChange={(event) => update("promised", event.target.value)} />
        </div>
        <fieldset>
          <legend>{dictionary.complaint.wrong}</legend>
          {dictionary.complaint.problemOptions.map((problem) => (
            <label className="check-row" key={problem}>
              <input type="checkbox" checked={form.problems.includes(problem)} onChange={() => toggleProblem(problem)} />
              <span>{problem}</span>
            </label>
          ))}
        </fieldset>
        <div className="field">
          <label htmlFor="wrong-extra">{dictionary.complaint.wrong}</label>
          <textarea id="wrong-extra" value={form.wrong} onChange={(event) => update("wrong", event.target.value)} />
        </div>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="outcome">{dictionary.complaint.desiredOutcome}</label>
            <select id="outcome" value={form.outcome} onChange={(event) => update("outcome", event.target.value as Outcome)}>
              {Object.entries(dictionary.complaint.outcomes).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="tone">{dictionary.complaint.tone}</label>
            <select id="tone" value={form.tone} onChange={(event) => update("tone", event.target.value as Tone)}>
              {Object.entries(dictionary.complaint.tones).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </div>
        </div>
        <button className="primary" type="button" onClick={generate}>{dictionary.complaint.buildButton}</button>
      </section>

      <section className="result" aria-live="polite">
        {!output ? <p>{dictionary.common.noFileYet}</p> : null}
        {output ? (
          <>
            <h2>{dictionary.complaint.outputTitle}</h2>
            <p><strong>Subject:</strong> {output.subject}</p>
            <pre className="output">{output.body}</pre>
            <div className="button-row">
              <button type="button" className="primary" onClick={() => void copyOutput()}>{copied ? dictionary.common.copied : dictionary.common.copy}</button>
              <Link className="button secondary" href={siteConfig.purchaseUrls.vendorComplaint} target="_blank" rel="noreferrer">{dictionary.products.vendorComplaint.button}</Link>
            </div>
            <h3>{dictionary.complaint.evidenceTitle}</h3>
            <ul>{dictionary.complaint.evidenceItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </>
        ) : null}
      </section>
    </div>
  );
}
