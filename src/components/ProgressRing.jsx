/**
 * ProgressRing — a hand-drawn-feel circular progress indicator.
 */
export default function ProgressRing({ value, size = 64, label = undefined }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value || 0));
  const offset = c - (pct / 100) * c;
  return (
    <div className="flex flex-col items-center gap-1" role="img" aria-label={`${Math.round(pct)}% complete`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--brown) / 0.25)" strokeWidth="4" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--green))"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />
      </svg>
      {label !== undefined && (
        <span className="font-mono-code text-xs text-brown">{Math.round(pct)}% {label}</span>
      )}
    </div>
  );
}