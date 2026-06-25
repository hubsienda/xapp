import type { ChaosBand } from "@/i18n/dictionaries";
import { normaliseText } from "./fieldMapping";

export type CategoryChaosResult = {
  score: number;
  band: ChaosBand;
  totalEntries: number;
  uniqueCategories: number;
  fragmentationRatio: number;
  topRepeated: Array<{ label: string; count: number }>;
  inconsistentExamples: string[];
  multiLabelCells: number;
};

const genericTerms = new Set([
  "business", "service", "company", "general", "other", "miscellaneous", "unknown",
  "empresa", "servicio", "general", "otro", "varios", "desconocido",
  "azienda", "servizio", "altro", "varie", "sconosciuto"
]);

const separators = /[,;|/]+/;

function bandFor(score: number): ChaosBand {
  if (score >= 75) return "severe";
  if (score >= 50) return "high";
  if (score >= 25) return "moderate";
  return "low";
}

export function splitCategoryInput(input: string) {
  return input
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean);
}

export function analyseCategoryChaos(values: string[]): CategoryChaosResult {
  const cells = values.map((value) => String(value ?? "").trim()).filter(Boolean);
  const splitValues = cells.flatMap((cell) => cell.split(separators).map((value) => value.trim()).filter(Boolean));
  const totalEntries = splitValues.length;
  const normalised = splitValues.map(normaliseText).filter(Boolean);
  const uniqueCategories = new Set(normalised).size;
  const fragmentationRatio = totalEntries === 0 ? 0 : uniqueCategories / totalEntries;
  const multiLabelCells = cells.filter((cell) => separators.test(cell)).length;

  const counts = new Map<string, { label: string; count: number }>();
  splitValues.forEach((label) => {
    const key = normaliseText(label);
    const current = counts.get(key) ?? { label, count: 0 };
    current.count += 1;
    counts.set(key, current);
  });

  const topRepeated = Array.from(counts.values())
    .filter((item) => item.count > 1)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const caseGroups = new Map<string, Set<string>>();
  splitValues.forEach((label) => {
    const key = normaliseText(label);
    const set = caseGroups.get(key) ?? new Set<string>();
    set.add(label);
    caseGroups.set(key, set);
  });

  const inconsistentExamples = Array.from(caseGroups.values())
    .filter((set) => set.size > 1)
    .slice(0, 8)
    .map((set) => Array.from(set).join(" / "));

  const veryLong = splitValues.filter((value) => value.length > 55).length;
  const veryShort = splitValues.filter((value) => value.length <= 2).length;
  const generic = normalised.filter((value) => genericTerms.has(value)).length;

  let score = 0;
  score += Math.min(35, fragmentationRatio * 35);
  score += Math.min(20, multiLabelCells * 3);
  score += Math.min(15, inconsistentExamples.length * 3);
  score += Math.min(15, generic * 4);
  score += Math.min(10, veryLong * 2);
  score += Math.min(5, veryShort * 2);

  const roundedScore = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score: roundedScore,
    band: bandFor(roundedScore),
    totalEntries,
    uniqueCategories,
    fragmentationRatio,
    topRepeated,
    inconsistentExamples,
    multiLabelCells
  };
}
