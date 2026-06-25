"use client";

import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useMemo, useState } from "react";
import { ScoreBlock } from "@/components/ScoreBlock";
import { ToolkitCtas } from "@/components/ToolPageSections";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";
import { getToolPageContent } from "@/i18n/toolPageContent";
import { analyseCategoryChaos, splitCategoryInput, type CategoryChaosResult } from "@/lib/categoryChaos";
import { detectColumns, getHeaders, type RowData, valueOf } from "@/lib/fieldMapping";

async function parseFile(file: File): Promise<RowData[]> {
  const lower = file.name.toLowerCase();
  if (lower.endsWith(".csv")) {
    return new Promise((resolve, reject) => {
      Papa.parse<RowData>(file, { header: true, skipEmptyLines: false, complete: (result) => resolve(result.data), error: (error) => reject(error) });
    });
  }
  if (lower.endsWith(".xlsx")) {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json<RowData>(worksheet, { defval: "" });
  }
  throw new Error("unsupported");
}

export function CategoryChaosChecker({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const content = getToolPageContent(locale).categoryChaos;
  const [rows, setRows] = useState<RowData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [pasted, setPasted] = useState("");
  const [result, setResult] = useState<CategoryChaosResult | null>(null);
  const [error, setError] = useState("");

  const autoDetected = useMemo(() => {
    const detected = detectColumns(headers);
    return detected.category ?? detected.industry ?? "";
  }, [headers]);

  async function handleFile(file?: File) {
    setError("");
    setResult(null);
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv") && !file.name.toLowerCase().endsWith(".xlsx")) {
      setError(content.errors.unsupportedFile);
      return;
    }
    try {
      const parsed = await parseFile(file);
      const parsedHeaders = getHeaders(parsed);
      if (!parsedHeaders.length) {
        setError(content.errors.noReadableRows);
        return;
      }
      setRows(parsed);
      setHeaders(parsedHeaders);
      const detected = detectColumns(parsedHeaders);
      setSelectedColumn(detected.category ?? detected.industry ?? "");
    } catch {
      setError(content.errors.readError);
    }
  }

  function analyse() {
    setError("");
    const values = pasted.trim()
      ? splitCategoryInput(pasted)
      : rows.map((row) => valueOf(row, selectedColumn || autoDetected)).filter(Boolean);

    if (!pasted.trim() && rows.length > 0 && !(selectedColumn || autoDetected)) {
      setError(content.errors.noCategoryColumn);
      return;
    }

    if (!values.length) {
      setError(content.errors.noCategoryInput);
      return;
    }

    setResult(analyseCategoryChaos(values));
  }

  return (
    <div className="two-column section tool-workspace">
      <section className="form-card">
        <p className="eyebrow">{content.actionTitle}</p>
        <h2>{dictionary.category.title}</h2>
        <p>{content.instructions}</p>
        <p className="notice">{dictionary.common.filePrivacy}</p>
        <div className="field">
          <label htmlFor="category-file">{dictionary.common.chooseFile}</label>
          <input id="category-file" type="file" accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={(event) => void handleFile(event.target.files?.[0])} />
        </div>
        {headers.length > 0 ? (
          <div className="field">
            <label htmlFor="category-column">{dictionary.category.columnLabel}</label>
            <select id="category-column" value={selectedColumn} onChange={(event) => setSelectedColumn(event.target.value)}>
              <option value="">{dictionary.category.selectColumn}</option>
              {headers.map((header) => <option key={header} value={header}>{header}</option>)}
            </select>
            {!autoDetected ? <p>{dictionary.category.noCategoryColumn}</p> : null}
          </div>
        ) : null}
        <div className="field">
          <label htmlFor="category-paste">{dictionary.category.pasteLabel}</label>
          <textarea id="category-paste" value={pasted} onChange={(event) => setPasted(event.target.value)} placeholder={dictionary.category.pastePlaceholder} />
        </div>
        <button className="primary" type="button" onClick={analyse}>{dictionary.common.analyse}</button>
        {error ? <p className="warning">{error}</p> : null}
      </section>

      <section className="result" aria-live="polite">
        {!result ? <p className="empty-state">{content.emptyState}</p> : null}
        {result ? (
          <>
            <ScoreBlock label={dictionary.category.scoreTitle} score={result.score} />
            <h2>{dictionary.category.verdicts[result.band]}</h2>
            <div className="stat-grid compact-stats">
              <div className="stat"><strong>{result.totalEntries}</strong>{dictionary.common.rows}</div>
              <div className="stat"><strong>{result.uniqueCategories}</strong>{dictionary.category.uniqueCategories}</div>
              <div className="stat"><strong>{Math.round(result.fragmentationRatio * 100)}%</strong>{dictionary.category.fragmentation}</div>
              <div className="stat"><strong>{result.multiLabelCells}</strong>{dictionary.category.separatedLabels}</div>
            </div>
            <h3>{dictionary.category.repeated}</h3>
            <ul className="clean-list">{result.topRepeated.length ? result.topRepeated.map((item) => <li key={item.label}>{item.label}: {item.count}</li>) : <li>{dictionary.category.verdicts.low}</li>}</ul>
            <h3>{dictionary.category.inconsistent}</h3>
            <ul className="clean-list">{result.inconsistentExamples.length ? result.inconsistentExamples.map((item) => <li key={item}>{item}</li>) : <li>{dictionary.category.verdicts.low}</li>}</ul>
            <h3>{dictionary.common.recommendedActions}</h3>
            <ul className="clean-list">{dictionary.category.actions[result.band].map((action) => <li key={action}>{action}</li>)}</ul>
            <ToolkitCtas dictionary={dictionary} content={content} />
          </>
        ) : null}
      </section>
    </div>
  );
}
