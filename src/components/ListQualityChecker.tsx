"use client";

import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useState } from "react";
import { ScoreBlock } from "@/components/ScoreBlock";
import { ToolkitCtas } from "@/components/ToolPageSections";
import type { Dictionary, RoleKey } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";
import { getToolPageContent } from "@/i18n/toolPageContent";
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

  throw new Error("unsupported");
}

export function ListQualityChecker({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const content = getToolPageContent(locale).listQuality;
  const [result, setResult] = useState<ListQualityResult | null>(null);
  const [error, setError] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  async function handleFile(file?: File) {
    setError("");
    setResult(null);
    setWarning("");
    setFileName("");
    if (!file) return;
    setFileName(file.name);
    if (!file.name.toLowerCase().endsWith(".csv") && !file.name.toLowerCase().endsWith(".xlsx")) {
      setError(content.errors.unsupportedFile);
      return;
    }
    if (file.size > warningSize) {
      setWarning(content.errors.largeFile);
    }
    try {
      const rows = await parseFile(file);
      const readableRows = rows.filter((row) => Object.values(row).some((value) => String(value ?? "").trim() !== ""));
      if (!readableRows.length) {
        setError(content.errors.noReadableRows);
        return;
      }
      setResult(analyseListQuality(readableRows));
    } catch {
      setError(content.errors.readError);
    }
  }

  return (
    <div className="two-column section tool-workspace">
      <section className="form-card">
        <p className="eyebrow">{content.actionTitle}</p>
        <h2>{dictionary.listQuality.title}</h2>
        <p>{content.instructions}</p>
        <p className="notice">{dictionary.common.filePrivacy}</p>
        <div className="field">
          <label htmlFor="list-file">{dictionary.common.chooseFile}</label>
          <input id="list-file" type="file" accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={(event) => void handleFile(event.target.files?.[0])} />
        </div>
        {fileName ? <p><strong>{fileName}</strong></p> : null}
        {warning ? <p className="warning">{warning}</p> : null}
        {error ? <p className="warning">{error}</p> : null}
      </section>

      <section className="result" aria-live="polite">
        {!result ? <p className="empty-state">{content.emptyState}</p> : null}
        {result ? (
          <>
            <ScoreBlock label={dictionary.common.score} score={result.score} />
            <h2>{dictionary.listQuality.verdicts[result.band]}</h2>
            <p>{dictionary.listQuality.verdictDetails[result.band]}</p>

            <div className="stat-grid compact-stats">
              <div className="stat"><strong>{result.rowCount}</strong>{dictionary.listQuality.stats.totalRows}</div>
              <div className="stat"><strong>{result.columnCount}</strong>{dictionary.listQuality.stats.totalColumns}</div>
              <div className="stat"><strong>{result.stats.duplicateEmails}</strong>{dictionary.listQuality.stats.duplicateEmails}</div>
              <div className="stat"><strong>{result.stats.uniqueCategories}</strong>{dictionary.listQuality.stats.uniqueCategories}</div>
            </div>

            <h3>{dictionary.common.detectedColumns}</h3>
            <ul className="clean-list">
              {(Object.entries(dictionary.roles) as Array<[RoleKey, string]>).map(([role, label]) => (
                <li key={role}>{label}: {result.detected[role] ?? dictionary.common.notDetected}</li>
              ))}
            </ul>

            <h3>{dictionary.common.issues}</h3>
            <ul className="clean-list">
              {result.issues.length === 0 ? <li>{dictionary.listQuality.verdicts.excellent}</li> : null}
              {result.issues.map((issue) => <li key={issue}>{dictionary.listQuality.issueText[issue]}</li>)}
            </ul>

            <h3>{dictionary.common.statistics}</h3>
            <ul className="clean-list">
              <li>{dictionary.listQuality.stats.malformedEmails}: {result.stats.malformedEmails}</li>
              <li>{dictionary.listQuality.stats.duplicateCompanies}: {result.stats.duplicateCompanies}</li>
              <li>{dictionary.listQuality.stats.emptyColumns}: {result.stats.emptyColumns}</li>
              <li>{dictionary.listQuality.stats.mostlyEmptyColumns}: {result.stats.mostlyEmptyColumns}</li>
              <li>{dictionary.listQuality.stats.nearlyEmptyRows}: {result.stats.nearlyEmptyRows}</li>
            </ul>

            <h3>{dictionary.common.recommendedActions}</h3>
            <ul className="clean-list">
              {dictionary.listQuality.actions[result.band].map((action) => <li key={action}>{action}</li>)}
            </ul>

            <ToolkitCtas dictionary={dictionary} content={content} />
          </>
        ) : null}
      </section>
    </div>
  );
}
