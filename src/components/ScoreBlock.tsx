export function ScoreBlock({ label, score, suffix = "/100" }: { label: string; score: number; suffix?: string }) {
  return (
    <div aria-label={`${label}: ${score}${suffix}`}>
      <p className="eyebrow">{label}</p>
      <div className="score">
        {score}<span>{suffix}</span>
      </div>
    </div>
  );
}
