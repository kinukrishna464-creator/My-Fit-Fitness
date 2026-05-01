import {
  useAddLitres,
  useHydration,
  useHydrationTarget,
  useRemoveLitres,
  useSetHydrationTarget,
} from "@/hooks/useHabitBackend";
import { todayKey } from "@/utils/dateUtils";
import { Minus, Plus, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CIRCLE_R = 88;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

// ── Animated SVG progress ring ────────────────────────────────────────────────
function ProgressRing({
  litres,
  target,
  loading,
}: {
  litres: number;
  target: number;
  loading: boolean;
}) {
  const fraction = target > 0 ? Math.min(litres / target, 1) : 0;
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
        stroke="rgba(147,210,240,0.25)"
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

// ── Set Goal Dialog ───────────────────────────────────────────────────────────
function SetGoalDialog({
  currentTarget,
  onSave,
  onClose,
}: {
  currentTarget: number;
  onSave: (v: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [value, setValue] = useState(String(currentTarget));
  const [error, setError] = useState("");

  useEffect(() => {
    const el = dialogRef.current;
    if (el) el.showModal();
  }, []);

  function handleBackdrop(e: React.MouseEvent<HTMLDialogElement>) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      onClose();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = Number.parseFloat(value);
    if (Number.isNaN(num) || num < 0.5 || num > 5.0) {
      setError("Enter a value between 0.5 and 5.0 litres");
      return;
    }
    onSave(Math.round(num * 4) / 4); // snap to nearest 0.25 L
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdrop}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      aria-label="Set daily water goal"
      data-ocid="hydration.dialog"
      style={{ all: "unset", position: "fixed", inset: 0, zIndex: 50 }}
    >
      <div
        className="fixed inset-0 flex items-end justify-center sm:items-center"
        style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
      >
        <div
          className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl bg-card shadow-xl p-6 pb-8"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-foreground">
              Set Daily Goal
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-ocid="hydration.close_button"
              className="transition-smooth w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted active:scale-95"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="goal-input"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Target (Litres)
              </label>
              <div className="relative">
                <input
                  id="goal-input"
                  type="number"
                  step="0.25"
                  min="0.5"
                  max="5.0"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setError("");
                  }}
                  ref={(el) => {
                    if (el) setTimeout(() => el.focus(), 50);
                  }}
                  data-ocid="hydration.input"
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/60 transition-smooth"
                  placeholder="2.0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground pointer-events-none">
                  L
                </span>
              </div>
              {error && (
                <p
                  className="text-xs mt-1.5 font-medium text-destructive"
                  data-ocid="hydration.field_error"
                >
                  {error}
                </p>
              )}
              <div className="flex gap-2 mt-3 flex-wrap">
                {[1.5, 2.0, 2.5, 3.0].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setValue(String(preset));
                      setError("");
                    }}
                    className="transition-smooth px-3 py-1.5 rounded-full text-sm font-medium border border-border hover:bg-muted active:scale-95 text-foreground"
                  >
                    {preset} L
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              data-ocid="hydration.confirm_button"
              className="transition-smooth w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-base active:scale-[.97] shadow-md"
            >
              Save Goal
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HydrationPage() {
  const dateKey = todayKey();
  const { data: litres = 0, isLoading: hydrationLoading } =
    useHydration(dateKey);
  const { data: targetLitres = 2.0, isLoading: targetLoading } =
    useHydrationTarget(dateKey);
  const addLitres = useAddLitres(dateKey);
  const removeLitres = useRemoveLitres(dateKey);
  const setTarget = useSetHydrationTarget(dateKey);
  const [showGoalDialog, setShowGoalDialog] = useState(false);

  const isLoading = hydrationLoading || targetLoading;
  const goalReached = litres >= targetLitres;
  const remaining = Math.max(targetLitres - litres, 0);
  const percentPct = Math.round(Math.min((litres / targetLitres) * 100, 100));

  const displayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  function formatLitres(l: number) {
    return l % 1 === 0 ? `${l.toFixed(1)} L` : `${l.toFixed(2)} L`;
  }

  return (
    <div
      className="min-h-screen flex flex-col section-hydration"
      data-ocid="hydration.page"
    >
      {/* ── Goal reached banner ── */}
      {goalReached && !isLoading && (
        <output
          className="mx-4 mt-4 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm"
          style={{
            background: "oklch(0.78 0.12 215 / 0.25)",
            border: "1px solid oklch(0.65 0.18 215 / 0.35)",
          }}
          aria-live="polite"
          data-ocid="hydration.success_state"
        >
          <span className="text-2xl select-none" aria-hidden>
            🎉
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground">
              Daily goal reached!
            </p>
            <p className="text-xs opacity-75 text-muted-foreground">
              You've had {formatLitres(litres)} today — great work!
            </p>
          </div>
        </output>
      )}

      {/* ── Header ── */}
      <header
        className="px-6 pt-6 pb-2 flex items-start justify-between"
        data-ocid="hydration.section"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Hydration
          </h1>
          <p className="text-sm mt-0.5 font-medium text-muted-foreground">
            {displayDate}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowGoalDialog(true)}
          aria-label="Set daily goal"
          data-ocid="hydration.open_modal_button"
          className="transition-smooth flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold border border-border bg-card/70 text-foreground active:scale-95 shadow-sm mt-1"
        >
          <Target size={15} aria-hidden />
          Set Goal
        </button>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-4">
        {/* Progress ring + centre display */}
        <div className="relative" data-ocid="hydration.card">
          <ProgressRing
            litres={litres}
            target={targetLitres}
            loading={isLoading}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {isLoading ? (
              <div
                className="w-10 h-10 rounded-full border-4 border-t-sky-500 border-sky-200/50 animate-spin"
                data-ocid="hydration.loading_state"
              />
            ) : (
              <>
                <span
                  className="font-bold leading-none tabular-nums text-foreground"
                  style={{ fontSize: "3rem" }}
                  aria-label={`${litres.toFixed(2)} litres logged`}
                >
                  {litres.toFixed(2)}
                </span>
                <span className="text-base font-semibold mt-0.5 text-muted-foreground">
                  litres
                </span>
                <span className="text-xs font-medium mt-1 opacity-70 text-muted-foreground">
                  {goalReached ? "✓ goal reached" : `${percentPct}%`}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Goal label */}
        <p className="text-sm font-semibold text-muted-foreground -mt-2">
          Goal:{" "}
          <span className="text-foreground">{targetLitres.toFixed(1)} L</span>
          {!goalReached && !isLoading && (
            <span className="ml-2 font-normal opacity-75">
              · {formatLitres(remaining)} remaining
            </span>
          )}
        </p>

        {/* +/- buttons */}
        <div
          className="flex items-center gap-4 mt-1"
          data-ocid="hydration.panel"
        >
          {/* Remove */}
          <button
            type="button"
            onClick={() => void removeLitres.mutate(0.25)}
            disabled={litres <= 0 || removeLitres.isPending}
            aria-label="Remove 0.25 litres"
            data-ocid="hydration.secondary_button"
            className="transition-smooth flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-base active:scale-95 disabled:opacity-35 disabled:pointer-events-none bg-card/80 text-foreground border border-border shadow-sm"
          >
            {removeLitres.isPending ? (
              <div className="w-5 h-5 rounded-full border-2 border-sky-300/50 border-t-sky-600 animate-spin" />
            ) : (
              <Minus size={19} strokeWidth={2.5} aria-hidden />
            )}
            <span>−0.25 L</span>
          </button>

          {/* Add */}
          <button
            type="button"
            onClick={() => void addLitres.mutate(0.25)}
            disabled={addLitres.isPending}
            aria-label="Add 0.25 litres"
            data-ocid="hydration.primary_button"
            className="transition-smooth flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-base active:scale-95 disabled:opacity-60 disabled:pointer-events-none shadow-md"
            style={{ background: "oklch(0.52 0.22 200)", color: "#fff" }}
          >
            {addLitres.isPending ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            ) : (
              <Plus size={19} strokeWidth={2.5} aria-hidden />
            )}
            <span>+0.25 L</span>
          </button>
        </div>

        {/* Quick-add presets */}
        <div
          className="flex items-center gap-2 flex-wrap justify-center max-w-xs"
          data-ocid="hydration.list"
          aria-label="Quick add presets"
        >
          {[0.5, 0.75, 1.0].map((amount, i) => (
            <button
              key={amount}
              type="button"
              onClick={() => void addLitres.mutate(amount)}
              disabled={addLitres.isPending}
              data-ocid={`hydration.item.${i + 1}`}
              className="transition-smooth px-4 py-2 rounded-full text-sm font-semibold border border-border bg-card/60 text-foreground active:scale-95 disabled:opacity-40 shadow-sm"
            >
              +{amount.toFixed(2)} L
            </button>
          ))}
        </div>

        {/* Motivational hint */}
        {!isLoading && (
          <p className="text-xs text-center font-medium text-muted-foreground max-w-xs opacity-80">
            {litres === 0
              ? `Tap +0.25 L to start — your goal is ${targetLitres.toFixed(1)} L 💧`
              : goalReached
                ? `${formatLitres(litres)} logged — keep it up! 💧`
                : `${formatLitres(remaining)} more to hit your ${targetLitres.toFixed(1)} L goal`}
          </p>
        )}
      </main>

      {/* ── Set Goal Dialog ── */}
      {showGoalDialog && (
        <SetGoalDialog
          currentTarget={targetLitres}
          onSave={(v) => void setTarget.mutate(v)}
          onClose={() => setShowGoalDialog(false)}
        />
      )}
    </div>
  );
}
