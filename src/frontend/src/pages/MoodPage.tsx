import {
  useAddTask,
  useDeleteTask,
  useMood,
  useSaveMood,
  useTasks,
  useToggleTask,
} from "@/hooks/useHabitBackend";
import type { Task } from "@/types/habit";
import { todayKey } from "@/utils/dateUtils";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";

// ─── Emoji Config ─────────────────────────────────────────────────────────────

const EMOJIS: { emoji: string; label: string; score: number }[] = [
  { emoji: "😔", label: "Very sad", score: 1 },
  { emoji: "😕", label: "Sad", score: 2 },
  { emoji: "😐", label: "Neutral", score: 3 },
  { emoji: "🙂", label: "Good", score: 4 },
  { emoji: "😄", label: "Great", score: 5 },
];

// ─── Mood Tracker ─────────────────────────────────────────────────────────────

function MoodTracker() {
  const date = todayKey();
  const { data: savedScore } = useMood(date);
  const saveMood = useSaveMood(date);

  const currentScore =
    savedScore !== null && savedScore !== undefined ? Number(savedScore) : null;

  const handleSelect = (score: number) => {
    saveMood.mutate(BigInt(score));
  };

  return (
    <section className="px-5 pt-6 pb-4" data-ocid="mood.section">
      <h1 className="text-[22px] font-semibold leading-tight text-foreground mb-1">
        How are you feeling today?
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Tap an emoji to log your mood
      </p>

      <fieldset
        className="flex items-center justify-between gap-2 border-0 p-0 m-0"
        aria-label="Mood score selector"
      >
        {EMOJIS.map(({ emoji, label, score }) => {
          const isSelected = currentScore === score;
          return (
            <button
              key={score}
              type="button"
              data-ocid={`mood.emoji_${score}.button`}
              aria-label={label}
              aria-pressed={isSelected}
              onClick={() => handleSelect(score)}
              className={[
                "flex items-center justify-center rounded-2xl transition-all duration-200 active:scale-90 select-none",
                "w-14 h-14 text-3xl",
                isSelected
                  ? "ring-[3px] ring-accent scale-110 bg-accent/15"
                  : "bg-muted hover:bg-accent/10 hover:scale-105",
              ].join(" ")}
            >
              {emoji}
            </button>
          );
        })}
      </fieldset>

      {currentScore && (
        <p
          className="mt-4 text-center text-sm font-medium text-muted-foreground"
          data-ocid="mood.selected_label"
        >
          {EMOJIS.find((e) => e.score === currentScore)?.label} — logged ✓
        </p>
      )}
    </section>
  );
}

// ─── Task Item ────────────────────────────────────────────────────────────────

function TaskItem({
  task,
  index,
  date,
}: {
  task: Task;
  index: number;
  date: string;
}) {
  const toggle = useToggleTask(date);
  const remove = useDeleteTask(date);

  return (
    <li
      className="flex items-center gap-3 py-3 border-b border-border last:border-0"
      data-ocid={`mood.task.item.${index + 1}`}
    >
      {/* Custom checkbox */}
      <button
        type="button"
        data-ocid={`mood.task.checkbox.${index + 1}`}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        aria-pressed={task.completed}
        onClick={() => toggle.mutate(task.id)}
        className={[
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-smooth active:scale-90",
          task.completed ? "border-accent bg-accent" : "border-input",
        ].join(" ")}
      >
        {task.completed && (
          <svg
            viewBox="0 0 12 10"
            className="w-3 h-3 fill-none stroke-white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M1 5l3.5 3.5L11 1" />
          </svg>
        )}
      </button>

      {/* Task text */}
      <span
        className={[
          "flex-1 text-sm leading-snug min-w-0 break-words",
          task.completed
            ? "line-through text-muted-foreground opacity-60"
            : "text-foreground",
        ].join(" ")}
      >
        {task.text}
      </span>

      {/* Delete */}
      <button
        type="button"
        data-ocid={`mood.task.delete_button.${index + 1}`}
        aria-label="Delete task"
        onClick={() => remove.mutate(task.id)}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-muted active:scale-90 transition-smooth"
      >
        <Trash2 size={15} strokeWidth={1.75} />
      </button>
    </li>
  );
}

// ─── Task List ────────────────────────────────────────────────────────────────

function TaskList() {
  const date = todayKey();
  const { data: tasks = [], isLoading } = useTasks(date);
  const addTask = useAddTask(date);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState("");

  const completedCount = tasks.filter((t) => t.completed).length;

  const handleAdd = () => {
    const text = inputText.trim();
    if (!text) return;
    const newTask: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      text,
      completed: false,
    };
    addTask.mutate(newTask);
    setInputText("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <section className="px-5 pt-5 pb-6" data-ocid="mood.tasks.section">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-semibold text-foreground">
          Today's Tasks
        </h2>
        {tasks.length > 0 && (
          <span
            data-ocid="mood.tasks.progress_badge"
            className={[
              "text-xs font-semibold px-2.5 py-1 rounded-full",
              completedCount === tasks.length && tasks.length > 0
                ? "bg-accent/20 text-accent-foreground"
                : "bg-muted text-muted-foreground",
            ].join(" ")}
          >
            {completedCount}/{tasks.length}
          </span>
        )}
      </div>

      {/* Add input */}
      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          type="text"
          data-ocid="mood.task.input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a task..."
          maxLength={120}
          className={[
            "flex-1 px-4 py-2.5 rounded-xl border text-sm bg-card",
            "border-input placeholder:text-muted-foreground",
            "text-foreground outline-none",
            "focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth",
          ].join(" ")}
          aria-label="New task text"
        />
        <button
          type="button"
          data-ocid="mood.task.add_button"
          onClick={handleAdd}
          disabled={!inputText.trim() || addTask.isPending}
          className={[
            "px-4 py-2.5 rounded-xl text-sm font-semibold transition-smooth active:scale-95",
            "bg-accent text-accent-foreground",
            "hover:opacity-90",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
          ].join(" ")}
          aria-label="Add task"
        >
          Add
        </button>
      </div>

      {/* Task list */}
      {isLoading ? (
        <div
          className="space-y-3 py-2"
          data-ocid="mood.tasks.loading_state"
          aria-live="polite"
          aria-label="Loading tasks"
        >
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div
          data-ocid="mood.tasks.empty_state"
          className="flex flex-col items-center justify-center py-8 text-center"
        >
          <span className="text-3xl mb-2" aria-hidden="true">
            ✅
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            No tasks yet — add one above
          </p>
        </div>
      ) : (
        <ul
          data-ocid="mood.tasks.list"
          className="rounded-2xl bg-card border border-border overflow-hidden"
          aria-label="Task list"
        >
          {tasks.map((task, i) => (
            <TaskItem key={task.id} task={task} index={i} date={date} />
          ))}
        </ul>
      )}
    </section>
  );
}

// ─── MoodPage ─────────────────────────────────────────────────────────────────

export default function MoodPage() {
  return (
    <div className="min-h-full section-mood" data-ocid="mood.page">
      <MoodTracker />

      {/* Divider */}
      <div className="mx-5 border-t border-border" aria-hidden="true" />

      <TaskList />
    </div>
  );
}
