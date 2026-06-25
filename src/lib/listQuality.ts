import type { IssueKey, RoleKey, VerdictBand } from "@/i18n/dictionaries";
import { detectColumns, getHeaders, normaliseText, type RowData, valueOf } from "./fieldMapping";

export type ListQualityResult = {
  score: number;
  band: VerdictBand;
  rowCount: number;
  columnCount: number;
  detected: Partial<Record<RoleKey, string>>;
  issues: IssueKey[];
  stats: {
    malformedEmails: number;
    duplicateEmails: number;
    duplicateCompanies: number;
    emptyColumns: number;
    mostlyEmptyColumns: number;
    nearlyEmptyRows: number;
    uniqueCategories: number;
  };
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isMalformedWebsite(value: string) {
  if (!value) return false;
  const cleaned = value.replace(/^https?:\/\//i, "");
  return !cleaned.includes(".") || cleaned.includes(" ");
}

function countDuplicates(values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  values.filter(Boolean).forEach((value) => {
    const normalised = normaliseText(value);
    if (!normalised) return;
    if (seen.has(normalised)) duplicates.add(normalised);
    seen.add(normalised);
  });
  return duplicates.size;
}

function percentage(count: number, total: number) {
  if (total === 0) return 0;
  return count / total;
}

function verdictFor(score: number): VerdictBand {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "messy";
  if (score >= 20) return "poor";
  return "failure";
}

const genericCategories = new Set([
  "business", "service", "company", "general", "other", "miscellaneous", "unknown",
  "empresa", "servicio", "compania", "general", "otro", "varios", "desconocido",
  "azienda", "servizio", "societa", "altro", "varie", "sconosciuto"
]);

export function analyseListQuality(rows: RowData[]): ListQualityResult {
  const cleanRows = rows.filter((row) => Object.values(row).some((value) => String(value ?? "").trim() !== ""));
  const headers = getHeaders(cleanRows);
  const detected = detectColumns(headers);
  const rowCount = cleanRows.length;
  const columnCount = headers.length;

  const companyValues = cleanRows.map((row) => valueOf(row, detected.company));
  const emailValues = cleanRows.map((row) => valueOf(row, detected.email));
  const websiteValues = cleanRows.map((row) => valueOf(row, detected.website));
  const phoneValues = cleanRows.map((row) => valueOf(row, detected.phone));
  const cityValues = cleanRows.map((row) => valueOf(row, detected.city));
  const countryValues = cleanRows.map((row) => valueOf(row, detected.country));
  const categoryColumn = detected.category ?? detected.industry;
  const categoryValues = cleanRows.map((row) => valueOf(row, categoryColumn));

  const missingCompany = detected.company ? companyValues.filter((value) => !value).length : rowCount;
  const missingEmail = detected.email ? emailValues.filter((value) => !value).length : rowCount;
  const malformedEmails = detected.email ? emailValues.filter((value) => value && !emailPattern.test(value)).length : 0;
  const duplicateEmails = detected.email ? countDuplicates(emailValues) : 0;
  const duplicateCompanies = detected.company ? countDuplicates(companyValues) : 0;
  const missingWebsite = detected.website ? websiteValues.filter((value) => !value).length : rowCount;
  const malformedWebsites = detected.website ? websiteValues.filter(isMalformedWebsite).length : 0;
  const missingPhone = detected.phone ? phoneValues.filter((value) => !value).length : rowCount;
  const missingLocation = cleanRows.filter((_, index) => !cityValues[index] && !countryValues[index]).length;

  const emptyColumns = headers.filter((header) => cleanRows.every((row) => !valueOf(row, header))).length;
  const mostlyEmptyColumns = headers.filter((header) => percentage(cleanRows.filter((row) => !valueOf(row, header)).length, rowCount) > 0.8).length;
  const nearlyEmptyRows = cleanRows.filter((row) => Object.values(row).filter((value) => String(value ?? "").trim()).length <= 2).length;

  const normalisedCategories = categoryValues.map(normaliseText).filter(Boolean);
  const uniqueCategories = new Set(normalisedCategories).size;
  const fragmentationRatio = percentage(uniqueCategories, normalisedCategories.length);
  const genericCategoryCount = normalisedCategories.filter((value) => genericCategories.has(value)).length;

  const issues = new Set<IssueKey>();
  let score = 100;

  const deductions: Array<[IssueKey, number, boolean]> = [
    ["missingCompany", percentage(missingCompany, rowCount) * 18, missingCompany > 0],
    ["missingEmail", percentage(missingEmail, rowCount) * 18, missingEmail > 0],
    ["malformedEmail", percentage(malformedEmails, rowCount) * 14, malformedEmails > 0],
    ["duplicateEmail", Math.min(12, duplicateEmails * 3), duplicateEmails > 0],
    ["duplicateCompany", Math.min(10, duplicateCompanies * 2), duplicateCompanies > 0],
    ["missingWebsite", percentage(missingWebsite, rowCount) * 8, missingWebsite > 0],
    ["malformedWebsite", percentage(malformedWebsites, rowCount) * 6, malformedWebsites > 0],
    ["missingPhone", percentage(missingPhone, rowCount) * 5, missingPhone > 0],
    ["missingLocation", percentage(missingLocation, rowCount) * 8, missingLocation > 0],
    ["emptyColumns", Math.min(10, emptyColumns * 4), emptyColumns > 0],
    ["mostlyEmptyColumns", Math.min(8, mostlyEmptyColumns * 2), mostlyEmptyColumns > 0],
    ["thinRows", percentage(nearlyEmptyRows, rowCount) * 14, nearlyEmptyRows > 0],
    ["categoryFragmentation", fragmentationRatio > 0.65 && uniqueCategories > 8 ? 12 : 0, fragmentationRatio > 0.65 && uniqueCategories > 8],
    ["genericCategories", Math.min(8, genericCategoryCount * 2), genericCategoryCount > 0]
  ];

  deductions.forEach(([issue, deduction, active]) => {
    if (active) issues.add(issue);
    score -= deduction;
  });

  const finalScore = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score: finalScore,
    band: verdictFor(finalScore),
    rowCount,
    columnCount,
    detected,
    issues: Array.from(issues),
    stats: { malformedEmails, duplicateEmails, duplicateCompanies, emptyColumns, mostlyEmptyColumns, nearlyEmptyRows, uniqueCategories }
  };
}
