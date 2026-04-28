import { Skeleton } from "@/components/ui/skeleton";
import { usePreviousDaySummary } from "@/hooks/useHabitBackend";
import type { DaySummary, TabId } from "@/types/habit";
import { formatDisplayDate, todayKey, yesterdayKey } from "@/utils/dateUtils";

interface HomePageProps {
  onNavigate: (tab: TabId) => void;
}

// ─── Mood emoji map (score 1–5) ───────────────────────────────────────────────
const MOOD_EMOJI: Record<number, string> = {
  1: "😔",
  2: "😕",
  3: "😐",
  4: "🙂",
  5: "😄",
};

function getMoodEmoji(score: bigint | null | undefined): string {
  if (score == null) return "";
  const n = Number(score);
  // Backend stores 1–10; map to 1–5 buckets
  const bucket = Math.max(1, Math.min(5, Math.ceil(n / 2)));
  return MOOD_EMOJI[bucket] ?? "😐";
}

// ─── Small ring progress ──────────────────────────────────────────────────────
function Ring({
  pct,
  color,
  size = 44,
}: {
  pct: number;
  color: string;
  size?: number;
}) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = Math.min(pct / 100, 1) * circ;
  return (
    <svg
      width={size}
      height={size}
      className="-rotate-90 shrink-0"
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={3.5}
        stroke={color}
        fill="none"
        strokeOpacity={0.18}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={3.5}
        stroke={color}
        fill="none"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Single summary card ──────────────────────────────────────────────────────
interface CardProps {
  icon: React.ReactNode;
  accent: string;
  title: string;
  value: string;
  sub?: string;
  ring?: { pct: number };
  onClick?: () => void;
  ocid: string;
}

function SummaryCard({
  icon,
  accent,
  title,
  value,
  sub,
  ring,
  onClick,
  ocid,
}: CardProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      data-ocid={ocid}
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={[
        "rounded-2xl bg-card border border-border p-4 text-left shadow-sm",
        "flex flex-col gap-1 min-h-[140px]",
        onClick
          ? "cursor-pointer transition-smooth active:scale-95 hover:shadow-md hover:border-border/60"
          : "",
      ].join(" ")}
    >
      {/* Icon badge */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-1 shrink-0"
        style={{ background: `${accent}18` }}
      >
        <span style={{ color: accent }}>{icon}</span>
      </div>

      {/* Title */}
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider leading-none">
        {title}
      </p>

      {/* Value + ring */}
      <div className="flex items-end justify-between mt-auto gap-2">
        <div className="min-w-0">
          <p className="text-base font-bold text-foreground leading-tight break-words">
            {value}
          </p>
          {sub && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
              {sub}
            </p>
          )}
        </div>
        {ring && <Ring pct={ring.pct} color={accent} size={40} />}
      </div>
    </Tag>
  );
}

// ─── Icon components ──────────────────────────────────────────────────────────
const DumbbellIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    aria-hidden="true"
  >
    <rect x="2" y="10" width="4" height="4" rx="1" />
    <rect x="18" y="10" width="4" height="4" rx="1" />
    <rect x="5" y="7" width="3" height="10" rx="1" />
    <rect x="16" y="7" width="3" height="10" rx="1" />
    <rect x="8" y="9" width="8" height="6" rx="1" />
  </svg>
);

const DropIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    aria-hidden="true"
  >
    <path d="M12 2C12 2 5 10.5 5 15a7 7 0 0 0 14 0c0-4.5-7-13-7-13Z" />
  </svg>
);

const FaceIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="9" cy="10.5" r="1" fill="currentColor" />
    <circle cx="15" cy="10.5" r="1" fill="currentColor" />
    <path d="M9 15c.83 1 5.17 1 6 0" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    aria-hidden="true"
  >
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const BookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    aria-hidden="true"
  >
    <path d="M4 4h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4V4Zm16 0h-7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7V4Z" />
  </svg>
);

const LotusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="5" r="2" />
    <path d="M7 13c0-2.8 2.2-5 5-5s5 2.2 5 5" />
    <path d="M5 13h14" />
    <path d="M7 13l-3 4h16l-3-4" />
  </svg>
);

// ─── Derived helpers ──────────────────────────────────────────────────────────
function hasAnyData(s: DaySummary | null | undefined): boolean {
  if (!s) return false;
  return (
    s.workout.length > 0 ||
    Number(s.hydration) > 0 ||
    s.mood != null ||
    s.tasks.length > 0 ||
    s.reading.length > 0 ||
    s.meditation.length > 0
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage({ onNavigate }: HomePageProps) {
  const today = todayKey();
  const yesterday = yesterdayKey();
  const { data: summary, isLoading } = usePreviousDaySummary(today);

  // Derived values
  const workoutCount = summary?.workout.length ?? 0;
  const hydrationGlasses = Number(summary?.hydration ?? 0n);
  const moodScore = summary?.mood ?? null;
  const tasksTotal = summary?.tasks.length ?? 0;
  const tasksDone = summary?.tasks.filter((t) => t.completed).length ?? 0;
  const totalPages =
    summary?.reading.reduce((s, e) => s + Number(e.pages), 0) ?? 0;
  const totalMinutesRead =
    summary?.reading.reduce((s, e) => s + Number(e.minutes), 0) ?? 0;
  const totalMedSecs =
    summary?.meditation.reduce((s, e) => s + Number(e.durationSeconds), 0) ?? 0;
  const totalMedMins = Math.round(totalMedSecs / 60);

  const noData = !isLoading && !hasAnyData(summary);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.99 0 0) 0%, oklch(0.96 0.015 260) 50%, oklch(0.97 0.01 30) 100%)",
      }}
    >
      {/* Header */}
      <header className="pt-12 pb-5 px-5 text-center">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
          {formatDisplayDate(today)}
        </p>
        <h1 className="text-3xl font-bold text-foreground tracking-tight font-display">
          Good morning ☀️
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here's how yesterday went —{" "}
          <span className="text-foreground/70 font-medium">
            {formatDisplayDate(yesterday)}
          </span>
        </p>
      </header>

      {/* Summary Grid */}
      <section
        data-ocid="home.summary.section"
        className="px-4 pb-6 grid grid-cols-2 gap-3"
      >
        {isLoading ? (
          (["w1", "w2", "w3", "w4", "w5", "w6"] as const).map((k, i) => (
            <Skeleton
              key={k}
              data-ocid={`home.loading_state.${i + 1}`}
              className="h-[140px] rounded-2xl"
            />
          ))
        ) : noData ? (
          // Empty state — full width
          <div
            data-ocid="home.empty_state"
            className="col-span-2 rounded-2xl bg-card border border-border p-8 text-center shadow-sm"
          >
            <p className="text-4xl mb-3">🌱</p>
            <p className="font-semibold text-foreground text-base">
              Every journey starts somewhere
            </p>
            <p className="text-sm text-muted-foreground mt-1 leading-snug">
              No data logged for yesterday. Start tracking today and watch your
              progress grow!
            </p>
          </div>
        ) : (
          <>
            {/* Card 1 — Workout */}
            <SummaryCard
              ocid="home.workout.card"
              icon={<DumbbellIcon />}
              accent="oklch(0.45 0.14 25)"
              title="Workout"
              value={
                workoutCount > 0
                  ? `${workoutCount} exercise${workoutCount !== 1 ? "s" : ""} logged`
                  : "No workouts logged"
              }
              sub={workoutCount > 0 ? "Great effort!" : "Rest day"}
              ring={{ pct: workoutCount > 0 ? 100 : 0 }}
              onClick={() => onNavigate("workout")}
            />

            {/* Card 2 — Hydration */}
            <SummaryCard
              ocid="home.hydration.card"
              icon={<DropIcon />}
              accent="oklch(0.5 0.14 220)"
              title="Hydration"
              value={
                hydrationGlasses > 0
                  ? `${hydrationGlasses} glass${hydrationGlasses !== 1 ? "es" : ""}`
                  : "Not logged"
              }
              sub={
                hydrationGlasses >= 8
                  ? "Goal reached! 🎉"
                  : hydrationGlasses > 0
                    ? "Goal: 8 glasses"
                    : ""
              }
              ring={{ pct: Math.min((hydrationGlasses / 8) * 100, 100) }}
              onClick={() => onNavigate("hydration")}
            />

            {/* Card 3 — Mood */}
            <SummaryCard
              ocid="home.mood.card"
              icon={<FaceIcon />}
              accent="oklch(0.58 0.12 40)"
              title="Mood"
              value={
                moodScore != null
                  ? `${getMoodEmoji(moodScore)} Score ${Number(moodScore)}/10`
                  : "Not logged"
              }
              sub={
                moodScore != null ? "Reflection captured" : "How did you feel?"
              }
            />

            {/* Card 4 — Tasks */}
            <SummaryCard
              ocid="home.tasks.card"
              icon={<CheckIcon />}
              accent="oklch(0.5 0.1 280)"
              title="Tasks"
              value={
                tasksTotal > 0 ? `${tasksDone}/${tasksTotal} done` : "No tasks"
              }
              sub={
                tasksTotal > 0 && tasksDone === tasksTotal
                  ? "All complete! ✨"
                  : tasksTotal > 0
                    ? `${tasksTotal - tasksDone} remaining`
                    : ""
              }
              ring={
                tasksTotal > 0
                  ? { pct: (tasksDone / tasksTotal) * 100 }
                  : undefined
              }
            />

            {/* Card 5 — Reading */}
            <SummaryCard
              ocid="home.reading.card"
              icon={<BookIcon />}
              accent="oklch(0.42 0.12 240)"
              title="Reading"
              value={
                totalPages > 0 || totalMinutesRead > 0
                  ? totalPages > 0
                    ? `${totalPages} page${totalPages !== 1 ? "s" : ""}`
                    : `${totalMinutesRead} min`
                  : "Not logged"
              }
              sub={
                totalPages > 0 && totalMinutesRead > 0
                  ? `${totalMinutesRead} min read`
                  : totalPages > 0
                    ? "Keep reading!"
                    : ""
              }
              onClick={() => onNavigate("reading")}
            />

            {/* Card 6 — Meditation */}
            <SummaryCard
              ocid="home.meditation.card"
              icon={<LotusIcon />}
              accent="oklch(0.48 0.13 145)"
              title="Meditation"
              value={totalMedMins > 0 ? `${totalMedMins} min` : "No session"}
              sub={
                totalMedMins > 0
                  ? `${summary?.meditation.length ?? 0} session${(summary?.meditation.length ?? 0) !== 1 ? "s" : ""}`
                  : "Start mindful practice"
              }
              ring={{ pct: Math.min((totalMedSecs / 900) * 100, 100) }}
              onClick={() => onNavigate("meditation")}
            />
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="px-5 py-6 text-center border-t border-border mt-2 bg-card/60">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="underline underline-offset-2 hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
