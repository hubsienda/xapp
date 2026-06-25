"use client";

import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useState } from "react";
import Link from "next/link";
import { ScoreBlock } from "@/components/ScoreBlock";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";
import { analyseListQuality, type ListQualityResult } from "@/lib/listQuality";
import { type RowData } from "@/lib/fieldMapping";

const warningSize = 5 * 1024 * 1024;

async function parseFile(file: File): Promise<RowData[]> {
  const lower = file.name.toLowerCase();
  if (lower.endsWith(".csv")) {
    return new Promise((resolve, reject) => {
      Papa.parse<RowData>(file, {
        header: true,
        skipEmptyLines: false,
        complete: (result) => resolve(result.data),
        error: (error) => reject(error)
      });
    });
  }

  if (lower.endsWith(".xlsx")) {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    return XLSX.utils.sheet_to_json<RowData>(worksheet, { defval: "" });
  }

  throw new Error("Unsupported file type");
}

export function ListQualityChecker({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [result, setResult] = useState<ListQualityResult | null>(null);
  const [error, setError] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  async function handleFile(file?: File) {
    setError("");
    setResult(null);
    setWarning("");
    if (!file) return;
    setFileName(file.name);
    if (file.size > warningSize) {
      setWarning("This file is large. If the browser struggles, use a smaller export for the first check.");
    }
    try {
      const rows = await parseFile(file);
      setResult(analyseListQuality(rows));
    } catch {
      setError("The file could not be read. Use a CSV or XLSX file with a clear header row.");
    }
  }

  return (
    <div className="two-column section">
      <section className="form-card">
        <h2>{dictionary.listQuality.title}</h2>
        <p>{dictionary.listQuality.intro}</p>
        <p className="notice">{dictionary.common.filePrivacy}</p>
        <div className="field">
          <label htmlFor="list-file">{dictionary.common.chooseFile}</label>
          <input id="list-file" type="file" accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={(event) => void handleFile(event.target.files?.[0])} />
        </div>
        <p>{dictionary.listQuality.uploadHelp}</p>
        {fileName ? <p><strong>{fileName}</strong></p> : null}
        {warning ? <p className="warning">{warning}</p> : null}
        {error ? <p className="warning">{error}</p> : null}
      </section>

      <section className="result" aria-live="polite">
        {!result ? <p>{dictionary.common.noFileYet}</p> : null}
        {result ? (
          <>
            <ScoreBlock label={dictionary.common.score} score={result.score} />
            <h2>{dictionary.listQuality.verdicts[result.band]}</h2>
            <p>{dictionary.listQuality.verdictDetails[result.band]}</p>

            <div className="stat-grid">
              <div className="stat"><strong>{result.rowCount}</strong>{dictionary.listQuality.stats.totalRows}</div>
              <div className="stat"><strong>{result.columnCount}</strong>{dictionary.listQuality.stats.totalColumns}</div>
              <div className="stat"><strong>{result.stats.duplicateEmails}</strong>{dictionary.listQuality.stats.duplicateEmails}</div>
              <div className="stat"><strong>{result.stats.uniqueCategories}</strong>{dictionary.listQuality.stats.uniqueCategories}</div>
            </div>

            <h3>{dictionary.common.issues}</h3>
            <ul>
              {result.issues.length === 0 ? <li>{dictionary.listQuality.verdicts.excellent}</li> : null}
              {result.issues.map((issue) => <li key={issue}>{dictionary.listQuality.issueText[issue]}</li>)}
            </ul>

            <h3>{dictionary.common.statistics}</h3>
            <ul>
              <li>{dictionary.listQuality.stats.malformedEmails}: {result.stats.malformedEmails}</li>
              <li>{dictionary.listQuality.stats.duplicateCompanies}: {result.stats.duplicateCompanies}</li>
              <li>{dictionary.listQuality.stats.emptyColumns}: {result.stats.emptyColumns}</li>
              <li>{dictionary.listQuality.stats.mostlyEmptyColumns}: {result.stats.mostlyEmptyColumns}</li>
              <li>{dictionary.listQuality.stats.nearlyEmptyRows}: {result.stats.nearlyEmptyRows}</li>
            </ul>

            <h3>{dictionary.common.detectedColumns}</h3>
            <ul>
              {Object.entries(dictionary.roles).map(([role, label]) => (
                <li key={role}>{label}: {result.detected[role as keyof typeof result.detected] ?? dictionary.common.notDetected}</li>
              ))}
            </ul>

            <h3>{dictionary.common.recommendedActions}</h3>
            <ul>
              {dictionary.listQuality.actions[result.band].map((action) => <li key={action}>{action}</li>)}
            </ul>

            <Link className="button" href={siteConfig.purchaseUrls.listQuality} target="_blank" rel="noreferrer">
              {dictionary.products.listQuality.button}
            </Link>
          </>
        ) : null}
      </section>
    </div>
  );
}
