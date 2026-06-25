import type { CampaignBand } from "@/i18n/dictionaries";

export type AnswerValue = "yes" | "partial" | "no";

export function scoreCampaign(answers: AnswerValue[]) {
  const score = answers.reduce((total, answer) => {
    if (answer === "yes") return total + 10;
    if (answer === "partial") return total + 5;
    return total;
  }, 0);

  const max = answers.length * 10;
  const percentage = max === 0 ? 0 : Math.round((score / max) * 100);
  let band: CampaignBand = "notReady";
  if (percentage >= 85) band = "ready";
  else if (percentage >= 65) band = "nearly";
  else if (percentage >= 40) band = "risky";

  const weakIndexes = answers.map((answer, index) => ({ answer, index })).filter((item) => item.answer !== "yes").map((item) => item.index);

  return { score: percentage, band, weakIndexes };
}
