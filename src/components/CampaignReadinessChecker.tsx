"use client";

import { useState } from "react";
import Link from "next/link";
import { ScoreBlock } from "@/components/ScoreBlock";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";
import { scoreCampaign, type AnswerValue } from "@/lib/campaign";

export function CampaignReadinessChecker({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [answers, setAnswers] = useState<AnswerValue[]>(dictionary.campaign.questions.map(() => "partial"));
  const result = scoreCampaign(answers);

  function setAnswer(index: number, answer: AnswerValue) {
    setAnswers((current) => current.map((item, itemIndex) => itemIndex === index ? answer : item));
  }

  return (
    <div className="two-column section">
      <section className="form-card">
        <h2>{dictionary.campaign.title}</h2>
        <p>{dictionary.campaign.intro}</p>
        {dictionary.campaign.questions.map((question: string, index: number) => (
          <fieldset key={question}>
            <legend>{question}</legend>
            {(["yes", "partial", "no"] as AnswerValue[]).map((answer) => (
              <label className="radio-row" key={answer}>
                <input type="radio" name={`question-${index}`} value={answer} checked={answers[index] === answer} onChange={() => setAnswer(index, answer)} />
                <span>{answer === "yes" ? dictionary.common.yes : answer === "partial" ? dictionary.common.partial : dictionary.common.no}</span>
              </label>
            ))}
          </fieldset>
        ))}
      </section>

      <section className="result" aria-live="polite">
        <ScoreBlock label={dictionary.common.score} score={result.score} />
        <h2>{dictionary.campaign.verdicts[result.band]}</h2>
        <p className="notice">{dictionary.campaign.legalNote}</p>
        <h3>{dictionary.campaign.risksTitle}</h3>
        <ul>
          {result.weakIndexes.length ? result.weakIndexes.map((index) => <li key={index}>{dictionary.campaign.questions[index]}</li>) : <li>{dictionary.campaign.verdicts.ready}</li>}
        </ul>
        <h3>{dictionary.campaign.checklistTitle}</h3>
        <ul>{dictionary.campaign.actions[result.band].map((action: string) => <li key={action}>{action}</li>)}</ul>
        <Link className="button" href={siteConfig.purchaseUrls.campaignReadiness} target="_blank" rel="noreferrer">{dictionary.products.campaignReadiness.button}</Link>
      </section>
    </div>
  );
}
