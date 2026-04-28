import { Button } from "@/components/ui/button";
import { useReadingLog, useSaveReading } from "@/hooks/useHabitBackend";
import type { ReadingEntry } from "@/types/habit";
import { formatDisplayDate, todayKey } from "@/utils/dateUtils";
import {
  BookOpen,
  Brain,
  Feather,
  FlaskConical,
  Newspaper,
  Scroll,
} from "lucide-react";
import { useState } from "react";

// ─── Category config ──────────────────────────────────────────────────────────

type LucideIcon = React.FC<React.SVGProps<SVGSVGElement>>;

interface ReadingCategory {
  id: string;
  label: string;
  Icon: LucideIcon;
}

const CATEGORIES: ReadingCategory[] = [
  { id: "Fiction", label: "Fiction", Icon: BookOpen as LucideIcon },
  { id: "Non-Fiction", label: "Non-Fiction", Icon: Newspaper as LucideIcon },
  { id: "Self-Help", label: "Self-Help", Icon: Brain as LucideIcon },
  { id: "Science", label: "Science", Icon: FlaskConical as LucideIcon },
  { id: "History", label: "History", Icon: Scroll as LucideIcon },
  { id: "Poetry", label: "Poetry", Icon: Feather as LucideIcon },
];

// ─── Log Modal ────────────────────────────────────────────────────────────────

interface LogModalProps {
  category: ReadingCategory;
  existing?: ReadingEntry;
  onClose: () => void;
  onSave: (entry: ReadingEntry) => void;
  isPending: boolean;
}

function LogModal({
  category,
  existing,
  onClose,
  onSave,
  isPending,
}: LogModalProps) {
  const defaultMode: "pages" | "minutes" =
    existing && Number(existing.pages) > 0 ? "pages" : "minutes";
  const [mode, setMode] = useState<"pages" | "minutes">(defaultMode);
  const [amount, setAmount] = useState<string>(() => {
    if (!existing) return "";
    return defaultMode === "pages"
      ? String(Number(existing.pages))
      : String(Number(existing.minutes));
  });

  function handleSave() {
    const num = Number.parseInt(amount, 10);
    if (Number.isNaN(num) || num < 0) return;
    onSave({
      category: category.id,
      pages: mode === "pages" ? BigInt(num) : 0n,
      minutes: mode === "minutes" ? BigInt(num) : 0n,
    });
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center px-4 w-full h-full max-w-none max-h-none m-0 p-0 bg-transparent"
      data-ocid="reading.modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />

      {/* Modal card */}
      <div className="relative w-full max-w-sm bg-card rounded-2xl shadow-xl p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-card-foreground">
            {category.label}
          </h2>
          <button
            type="button"
            aria-label="Close"
            data-ocid="reading.modal.close_button"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-smooth text-muted-foreground text-xl leading-none"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Mode toggle */}
        <div
          className="flex rounded-xl overflow-hidden border border-input"
          data-ocid="reading.modal.mode_toggle"
        >
          {(["pages", "minutes"] as const).map((m) => (
            <button
              key={m}
              data-ocid={`reading.modal.mode_${m}`}
              type="button"
              className={`flex-1 py-2 text-sm font-medium transition-smooth ${
                mode === m
                  ? "text-white"
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
              style={mode === m ? { background: "var(--reading-bg)" } : {}}
              onClick={() => {
                setMode(m);
                setAmount("");
              }}
            >
              {m === "pages" ? "Pages" : "Minutes"}
            </button>
          ))}
        </div>

        {/* Numeric input */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reading-amount"
            className="text-sm text-muted-foreground font-medium"
          >
            {mode === "pages"
              ? "Number of pages read"
              : "Minutes spent reading"}
          </label>
          <input
            id="reading-amount"
            type="number"
            min="0"
            placeholder={mode === "pages" ? "e.g. 42" : "e.g. 30"}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            data-ocid="reading.modal.amount_input"
            className="w-full rounded-xl border border-input bg-background text-foreground px-4 py-2.5 text-base outline-none focus:ring-2 focus:ring-ring transition-smooth placeholder:text-muted-foreground"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <Button
            variant="outline"
            className="flex-1 rounded-xl"
            data-ocid="reading.modal.cancel_button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 rounded-xl text-white border-0"
            style={{ background: "var(--reading-bg)" }}
            data-ocid="reading.modal.save_button"
            onClick={handleSave}
            disabled={!amount || Number.parseInt(amount, 10) < 0 || isPending}
          >
            {isPending ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
    </dialog>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────

interface CategoryCardProps {
  category: ReadingCategory;
  entry?: ReadingEntry;
  index: number;
  onClick: () => void;
}

function CategoryCard({ category, entry, index, onClick }: CategoryCardProps) {
  const { Icon } = category;

  const badge =
    entry && (Number(entry.pages) > 0 || Number(entry.minutes) > 0)
      ? Number(entry.pages) > 0
        ? `${Number(entry.pages)} pages`
        : `${Number(entry.minutes)} min`
      : null;

  return (
    <button
      type="button"
      data-ocid={`reading.category_card.${index}`}
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl transition-smooth active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      style={{ background: "oklch(0.28 0.07 260)" }}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        <Icon
          className="w-7 h-7 stroke-2"
          style={{ color: "white" }}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </div>

      <span
        className="text-sm font-semibold text-center leading-tight"
        style={{ color: "white" }}
      >
        {category.label}
      </span>

      {badge ? (
        <span
          className="text-xs font-medium"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {badge}
        </span>
      ) : (
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          Tap to log
        </span>
      )}
    </button>
  );
}

// ─── Reading Page ─────────────────────────────────────────────────────────────

export default function ReadingPage() {
  const dateKey = todayKey();
  const { data: entries = [], isLoading } = useReadingLog(dateKey);
  const saveReading = useSaveReading(dateKey);

  const [openCategory, setOpenCategory] = useState<ReadingCategory | null>(
    null,
  );

  function findEntry(categoryId: string): ReadingEntry | undefined {
    return entries.find((e) => e.category === categoryId);
  }

  function handleSave(entry: ReadingEntry) {
    saveReading.mutate(entry, {
      onSuccess: () => setOpenCategory(null),
    });
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--reading-bg)" }}
      data-ocid="reading.page"
    >
      {/* ── Header ── */}
      <header className="px-5 pt-12 pb-5" data-ocid="reading.header">
        <p
          className="text-xs font-medium uppercase tracking-widest mb-1"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {formatDisplayDate(dateKey)}
        </p>
        <h1
          className="text-3xl font-bold tracking-tight font-display"
          style={{ color: "white" }}
        >
          Reading
        </h1>
      </header>

      {/* ── Grid ── */}
      <main className="flex-1 px-4 pb-8">
        {isLoading ? (
          <div
            className="grid grid-cols-2 gap-4"
            data-ocid="reading.list.loading_state"
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="h-36 rounded-2xl animate-pulse"
                style={{ background: "oklch(0.28 0.07 260)" }}
              />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-2 gap-4"
            data-ocid="reading.category_grid"
          >
            {CATEGORIES.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                entry={findEntry(cat.id)}
                index={i + 1}
                onClick={() => setOpenCategory(cat)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Log Modal ── */}
      {openCategory && (
        <LogModal
          category={openCategory}
          existing={findEntry(openCategory.id)}
          onClose={() => setOpenCategory(null)}
          onSave={handleSave}
          isPending={saveReading.isPending}
        />
      )}
    </div>
  );
}
