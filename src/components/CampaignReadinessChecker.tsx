"use client";

import { useMemo, useState } from "react";
import { ScoreBlock } from "@/components/ScoreBlock";
import { ToolkitCtas } from "@/components/ToolPageSections";
import type { Dictionary } from "@/i18n/dictionaries";
import { campaignExtraQuestions } from "@/i18n/campaignExtra";
import type { Locale } from "@/i18n/locales";
import { getToolPageContent } from "@/i18n/toolPageContent";
import { scoreCampaign, type AnswerValue } from "@/lib/campaign";

export function CampaignReadinessChecker({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const content = getToolPageContent(locale).campaignReadiness;
  const questions = useMemo(() => [...dictionary.campaign.questions, ...campaignExtraQuestions[locale]], [dictionary.campaign.questions, locale]);
  const [answers, setAnswers] = useState<AnswerValue[]>(questions.map(() => "partial"));
  const [submitted, setSubmitted] = useState(false);
  const result = scoreCampaign(answers);

  function setAnswer(index: number, answer: AnswerValue) {
    setSubmitted(false);
    setAnswers((current) => current.map((item, itemIndex) => itemIndex === index ? answer : item));
  }

  function resetAnswers() {
    setSubmitted(false);
    setAnswers(questions.map(() => "partial"));
  }

  return (
    <div className="two-column section tool-workspace">
      <section className="form-card">
        <p className="eyebrow">{content.actionTitle}</p>
        <h2>{dictionary.campaign.title}</h2>
        <p>{content.instructions}</p>
        {questions.map((question: string, index: number) => (
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
        <div className="button-row">
          <button className="primary" type="button" onClick={() => setSubmitted(true)}>{content.labels?.submit ?? dictionary.common.analyse}</button>
          <button className="button secondary" type="button" onClick={resetAnswers}>{content.labels?.reset ?? "Reset"}</button>
        </div>
      </section>

      <section className="result" aria-live="polite">
        {!submitted ? <p className="empty-state">{content.emptyState}</p> : null}
        {submitted ? (
          <>
            <ScoreBlock label={dictionary.common.score} score={result.score} />
            <h2>{dictionary.campaign.verdicts[result.band]}</h2>
            <p className="notice">{dictionary.campaign.legalNote}</p>
            <h3>{dictionary.campaign.risksTitle}</h3>
            <ul className="clean-list">
              {result.weakIndexes.length ? result.weakIndexes.map((index) => <li key={index}>{questions[index]}</li>) : <li>{dictionary.campaign.verdicts.ready}</li>}
            </ul>
            <h3>{dictionary.campaign.checklistTitle}</h3>
            <ul className="clean-list">{dictionary.campaign.actions[result.band].map((action: string) => <li key={action}>{action}</li>)}</ul>
            <ToolkitCtas dictionary={dictionary} content={content} />
          </>
        ) : null}
      </section>
    </div>
  );
}
