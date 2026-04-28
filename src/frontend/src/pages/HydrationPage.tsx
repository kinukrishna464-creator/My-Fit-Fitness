import {
  useDecrementHydration,
  useHydration,
  useIncrementHydration,
} from "@/hooks/useHabitBackend";
import { todayKey } from "@/utils/dateUtils";
import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const GOAL = 8;
const CIRCLE_R = 88;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

// ── Glass icon ──────────────────────────────────────────────────────────────
function GlassIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="30"
      height="30"
      aria-hidden="true"
      className="transition-smooth"
    >
      <path
        d="M6 3h12l-1.8 15H7.8L6 3z"
        strokeWidth="1.6"
        strokeLinejoin="round"
        className={
          filled ? "fill-sky-400 stroke-sky-500" : "fill-none stroke-sky-300"
        }
      />
      {filled && (
        <path
          d="M8.2 11h7.6l-1.1 7H9.3L8.2 11z"
          className="fill-sky-200 stroke-none opacity-70"
        />
      )}
    </svg>
  );
}

// ── Animated SVG ring ───────────────────────────────────────────────────────
function ProgressRing({
  glasses,
  loading,
}: { glasses: number; loading: boolean }) {
  // Allow ring to show full (and stay full) when at or beyond goal
  const fraction = glasses >= GOAL ? 1 : glasses / GOAL;
  const targetOffset = CIRCUMFERENCE * (1 - fraction);
  const [offset, setOffset] = useState(CIRCUMFERENCE);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => setOffset(targetOffset));
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [targetOffset]);

  return (
    <svg width="220" height="220" viewBox="0 0 220 220" aria-hidden="true">
      <defs>
        <linearGradient id="hyd-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.65 0.18 215)" />
          <stop offset="100%" stopColor="oklch(0.52 0.22 200)" />
        </linearGradient>
      </defs>
      {/* track */}
      <circle
        cx="110"
        cy="110"
        r={CIRCLE_R}
        fill="none"
        stroke="rgba(147,210,240,0.3)"
        strokeWidth="14"
      />
      {/* progress */}
      {!loading && (
        <circle
          cx="110"
          cy="110"
          r={CIRCLE_R}
          fill="none"
          stroke="url(#hyd-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 110 110)"
          style={{
            transition: "stroke-dashoffset 0.65s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      )}
    </svg>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function HydrationPage() {
  const dateKey = todayKey();
  const { data: hydrationBigInt, isLoading } = useHydration(dateKey);
  const increment = useIncrementHydration(dateKey);
  const decrement = useDecrementHydration(dateKey);

  const glasses = hydrationBigInt !== undefined ? Number(hydrationBigInt) : 0;
  const goalReached = glasses >= GOAL;
  const remaining = GOAL - glasses;

  const displayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="min-h-screen flex flex-col section-hydration"
      data-ocid="hydration.page"
    >
      {/* ── Goal banner ── */}
      {goalReached && !isLoading && (
        <output
          className="mx-4 mt-4 px-5 py-3 rounded-2xl flex items-center gap-3 shadow bg-accent/20 border border-accent/30"
          aria-live="polite"
          data-ocid="hydration.success_state"
        >
          <span className="text-2xl select-none">🎉</span>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground">
              Daily goal reached! Keep going!
            </p>
            <p className="text-xs opacity-75 text-muted-foreground">
              You've logged {glasses} glasses today — goal was {GOAL}.
            </p>
          </div>
        </output>
      )}

      {/* ── Header ── */}
      <header className="px-6 pt-6 pb-2" data-ocid="hydration.section">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Hydration
        </h1>
        <p className="text-sm mt-0.5 font-medium text-muted-foreground">
          {displayDate}
        </p>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col items-center justify-center gap-7 px-6 py-6">
        {/* Progress ring */}
        <div className="relative" data-ocid="hydration.card">
          <ProgressRing glasses={glasses} loading={isLoading} />

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {isLoading ? (
              <div
                className="w-10 h-10 rounded-full border-4 border-t-sky-500 border-sky-200 animate-spin"
                data-ocid="hydration.loading_state"
              />
            ) : (
              <>
                <span
                  className="font-bold leading-none tabular-nums text-foreground"
                  style={{ fontSize: "3.6rem" }}
                  aria-label={`${glasses} glasses logged`}
                >
                  {glasses}
                </span>
                <span className="text-sm font-medium mt-1 text-muted-foreground">
                  {glasses === 1 ? "glass" : "glasses"}
                </span>
                {goalReached && (
                  <span className="text-xs font-semibold mt-0.5 text-accent-foreground opacity-80">
                    goal ✓
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Glass grid — shows ALL glasses added, no cap */}
        <div
          className="flex items-center gap-1.5 flex-wrap justify-center max-w-xs"
          aria-label={`${glasses} ${glasses === 1 ? "glass" : "glasses"} logged today`}
          data-ocid="hydration.list"
        >
          {Array.from({ length: Math.max(glasses, GOAL) }, (_, i) => (
            <span
              key={`glass-${i + 1}`}
              className="transition-smooth"
              style={{ transform: i < glasses ? "scale(1.15)" : "scale(1)" }}
              data-ocid={`hydration.item.${i + 1}`}
            >
              <GlassIcon filled={i < glasses} />
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div
          className="flex items-center gap-4 mt-1"
          data-ocid="hydration.panel"
        >
          {/* Remove */}
          <button
            type="button"
            onClick={() => {
              if (glasses > 0) void decrement.mutate();
            }}
            disabled={glasses === 0 || decrement.isPending}
            aria-label="Remove a glass of water"
            data-ocid="hydration.secondary_button"
            className="transition-smooth flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base active:scale-95 disabled:opacity-35 disabled:pointer-events-none bg-secondary text-secondary-foreground border border-border shadow-sm"
          >
            {decrement.isPending ? (
              <div className="w-5 h-5 rounded-full border-2 border-sky-300 border-t-sky-600 animate-spin" />
            ) : (
              <Minus size={19} strokeWidth={2.5} aria-hidden />
            )}
            Remove
          </button>

          {/* Add */}
          <button
            type="button"
            onClick={() => {
              void increment.mutate();
            }}
            disabled={increment.isPending}
            aria-label="Add a glass of water"
            data-ocid="hydration.primary_button"
            className="transition-smooth flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base active:scale-95 disabled:opacity-60 disabled:pointer-events-none bg-primary text-primary-foreground shadow-md"
          >
            {increment.isPending ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/50 border-t-white animate-spin" />
            ) : (
              <Plus size={19} strokeWidth={2.5} aria-hidden />
            )}
            Add Glass
          </button>
        </div>

        {/* Progress hint */}
        {!isLoading && (
          <p className="text-sm text-center font-medium text-muted-foreground">
            {glasses === 0
              ? `Tap Add Glass to start — goal is ${GOAL} 💧`
              : goalReached
                ? `${glasses} glasses logged — keep going, no limit! 💧`
                : `${remaining} more ${remaining === 1 ? "glass" : "glasses"} to reach your daily goal`}
          </p>
        )}
      </main>
    </div>
  );
}
