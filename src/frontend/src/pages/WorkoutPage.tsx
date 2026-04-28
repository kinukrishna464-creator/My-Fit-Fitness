import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useSaveWorkout, useWorkoutLog } from "@/hooks/useHabitBackend";
import type { WorkoutEntry } from "@/types/habit";
import { formatDisplayDate, todayKey } from "@/utils/dateUtils";
import {
  Activity,
  Dumbbell,
  Flame,
  Heart,
  Layers,
  Shield,
  Target,
  Wind,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Category config ──────────────────────────────────────────────────────────

interface CategoryConfig {
  name: string;
  icon: React.ReactNode;
  accentClass: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    name: "Full Body",
    icon: <Dumbbell className="w-7 h-7 stroke-2" strokeWidth={2} />,
    accentClass: "workout-card-crimson",
  },
  {
    name: "Shoulders",
    icon: <Shield className="w-7 h-7 stroke-2" strokeWidth={2} />,
    accentClass: "workout-card-ruby",
  },
  {
    name: "Chest",
    icon: <Heart className="w-7 h-7 stroke-2" strokeWidth={2} />,
    accentClass: "workout-card-maroon",
  },
  {
    name: "Arms",
    icon: <Dumbbell className="w-7 h-7 stroke-2" strokeWidth={2} />,
    accentClass: "workout-card-crimson",
  },
  {
    name: "Legs",
    icon: <Layers className="w-7 h-7 stroke-2" strokeWidth={2} />,
    accentClass: "workout-card-maroon",
  },
  {
    name: "Core",
    icon: <Target className="w-7 h-7 stroke-2" strokeWidth={2} />,
    accentClass: "workout-card-ruby",
  },
  {
    name: "Cardio",
    icon: <Activity className="w-7 h-7 stroke-2" strokeWidth={2} />,
    accentClass: "workout-card-ember",
  },
  {
    name: "Back",
    icon: <Wind className="w-7 h-7 stroke-2" strokeWidth={2} />,
    accentClass: "workout-card-crimson",
  },
];

// ─── Modal ────────────────────────────────────────────────────────────────────

interface LogModalProps {
  category: CategoryConfig;
  existing: WorkoutEntry | undefined;
  onSave: (reps: bigint, sets: bigint) => void;
  onClose: () => void;
  isPending: boolean;
}

function LogModal({
  category,
  existing,
  onSave,
  onClose,
  isPending,
}: LogModalProps) {
  const [sets, setSets] = useState(existing ? Number(existing.sets) : 3);
  const [reps, setReps] = useState(existing ? Number(existing.reps) : 10);
  const overlayRef = useRef<HTMLDialogElement>(null);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <dialog
      ref={overlayRef}
      data-ocid="workout.dialog"
      open
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center m-0 p-0 w-full h-full max-w-none max-h-none border-0 bg-transparent"
      style={{ background: "rgba(0,0,0,0.72)" }}
      aria-labelledby="workout-modal-title"
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="bg-card rounded-t-3xl sm:rounded-3xl w-full max-w-sm mx-0 sm:mx-4 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="presentation"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`workout-modal-icon ${category.accentClass}`}>
              {category.icon}
            </div>
            <h2
              id="workout-modal-title"
              className="text-lg font-bold text-foreground font-display"
            >
              {category.name}
            </h2>
          </div>
          <button
            type="button"
            data-ocid="workout.close_button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1.5">
            <Label
              htmlFor="modal-sets"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Sets
            </Label>
            <Input
              id="modal-sets"
              data-ocid="workout.sets.input"
              type="number"
              min={1}
              max={99}
              value={sets}
              onChange={(e) =>
                setSets(Math.max(1, Number(e.target.value) || 1))
              }
              className="text-center text-lg font-bold h-12 rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="modal-reps"
              className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Reps
            </Label>
            <Input
              id="modal-reps"
              data-ocid="workout.reps.input"
              type="number"
              min={1}
              max={999}
              value={reps}
              onChange={(e) =>
                setReps(Math.max(1, Number(e.target.value) || 1))
              }
              className="text-center text-lg font-bold h-12 rounded-xl"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            data-ocid="workout.cancel_button"
            onClick={onClose}
            className="flex-1 h-12 rounded-xl font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="button"
            data-ocid="workout.save_button"
            onClick={() => onSave(BigInt(reps), BigInt(sets))}
            disabled={isPending}
            className="flex-1 h-12 rounded-xl font-semibold workout-save-btn"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Saving…
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </dialog>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────

interface CategoryCardProps {
  category: CategoryConfig;
  entry: WorkoutEntry | undefined;
  index: number;
  onClick: () => void;
}

function CategoryCard({ category, entry, index, onClick }: CategoryCardProps) {
  return (
    <button
      type="button"
      data-ocid={`workout.card.${index + 1}`}
      onClick={onClick}
      className="workout-category-card group text-left"
    >
      <div className="workout-card-inner">
        {/* Icon area */}
        <div className={`workout-icon-wrapper ${category.accentClass}`}>
          <span className="text-white">{category.icon}</span>
        </div>

        {/* Label */}
        <p className="text-white font-semibold text-sm leading-tight mt-3">
          {category.name}
        </p>

        {/* Logged data badge */}
        {entry ? (
          <p className="text-white/60 text-xs mt-0.5">
            {Number(entry.sets)} × {Number(entry.reps)}
          </p>
        ) : (
          <p className="text-white/30 text-xs mt-0.5">Tap to log</p>
        )}

        {/* Done indicator */}
        {entry && <span className="workout-done-dot" aria-label="Logged" />}
      </div>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkoutPage() {
  const today = todayKey();
  const { data: entries = [], isLoading } = useWorkoutLog(today);
  const saveWorkout = useSaveWorkout(today);

  const [activeCategory, setActiveCategory] = useState<CategoryConfig | null>(
    null,
  );

  const getEntry = (name: string) => entries.find((e) => e.category === name);

  const handleSave = (reps: bigint, sets: bigint) => {
    if (!activeCategory) return;
    saveWorkout.mutate(
      { category: activeCategory.name, reps, sets },
      { onSuccess: () => setActiveCategory(null) },
    );
  };

  return (
    <div className="min-h-screen section-workout">
      {/* Header */}
      <header className="px-5 pt-12 pb-6">
        <div className="flex items-center gap-2 mb-0.5">
          <Flame className="w-5 h-5 text-white/70" />
          <h1 className="text-2xl font-bold text-white font-display tracking-tight">
            Workout
          </h1>
        </div>
        <p className="text-white/40 text-sm pl-7">{formatDisplayDate(today)}</p>
      </header>

      {/* Summary pill */}
      {!isLoading && entries.length > 0 && (
        <div className="px-5 mb-4">
          <div
            data-ocid="workout.summary.panel"
            className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-white/70" />
            <span className="text-white/70 text-xs font-medium">
              {entries.length} of {CATEGORIES.length} logged today
            </span>
          </div>
        </div>
      )}

      {/* Category Grid */}
      <section data-ocid="workout.categories.section" className="px-4 pb-8">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
              <Skeleton
                key={k}
                className="h-32 rounded-2xl bg-white/10"
                data-ocid="workout.loading_state"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard
                key={cat.name}
                category={cat}
                entry={getEntry(cat.name)}
                index={i}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Log Modal */}
      {activeCategory && (
        <LogModal
          category={activeCategory}
          existing={getEntry(activeCategory.name)}
          onSave={handleSave}
          onClose={() => setActiveCategory(null)}
          isPending={saveWorkout.isPending}
        />
      )}

      {/* Scoped styles */}
      <style>{`
        .workout-category-card {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
          width: 100%;
          cursor: pointer;
          transition: transform 0.18s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s ease;
        }
        .workout-category-card:active {
          transform: scale(0.95);
        }
        .workout-card-inner {
          padding: 1.1rem 1rem 1rem;
          background: oklch(0.21 0.025 20 / 0.9);
          border: 1px solid oklch(1 0 0 / 0.08);
          border-radius: 1rem;
          min-height: 128px;
          display: flex;
          flex-direction: column;
        }
        .workout-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .workout-card-crimson .workout-icon-wrapper,
        .workout-icon-wrapper.workout-card-crimson {
          background: oklch(0.42 0.14 22);
        }
        .workout-card-ruby .workout-icon-wrapper,
        .workout-icon-wrapper.workout-card-ruby {
          background: oklch(0.45 0.16 15);
        }
        .workout-card-maroon .workout-icon-wrapper,
        .workout-icon-wrapper.workout-card-maroon {
          background: oklch(0.38 0.12 28);
        }
        .workout-card-ember .workout-icon-wrapper,
        .workout-icon-wrapper.workout-card-ember {
          background: oklch(0.5 0.15 35);
        }
        .workout-done-dot {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: oklch(0.72 0.18 140);
        }
        .workout-modal-icon {
          width: 40px;
          height: 40px;
          border-radius: 0.625rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .workout-modal-icon.workout-card-crimson { background: oklch(0.42 0.14 22); color: white; }
        .workout-modal-icon.workout-card-ruby    { background: oklch(0.45 0.16 15); color: white; }
        .workout-modal-icon.workout-card-maroon  { background: oklch(0.38 0.12 28); color: white; }
        .workout-modal-icon.workout-card-ember   { background: oklch(0.5  0.15 35); color: white; }
        .workout-save-btn {
          background: oklch(0.42 0.14 22);
          color: white;
          border: none;
        }
        .workout-save-btn:hover:not(:disabled) {
          background: oklch(0.38 0.14 22);
        }
        .workout-save-btn:disabled {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
