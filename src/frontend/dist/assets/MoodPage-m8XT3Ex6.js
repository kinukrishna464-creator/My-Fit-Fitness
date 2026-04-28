import { j as jsxRuntimeExports, r as reactExports } from "./index-De6_TF5Z.js";
import { t as todayKey, g as useMood, h as useSaveMood, i as useTasks, j as useAddTask, k as useToggleTask, l as useDeleteTask } from "./useHabitBackend-hZtoiFj0.js";
import { c as createLucideIcon } from "./createLucideIcon-CAN4Aort.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const EMOJIS = [
  { emoji: "😔", label: "Very sad", score: 1 },
  { emoji: "😕", label: "Sad", score: 2 },
  { emoji: "😐", label: "Neutral", score: 3 },
  { emoji: "🙂", label: "Good", score: 4 },
  { emoji: "😄", label: "Great", score: 5 }
];
function MoodTracker() {
  var _a;
  const date = todayKey();
  const { data: savedScore } = useMood(date);
  const saveMood = useSaveMood(date);
  const currentScore = savedScore !== null && savedScore !== void 0 ? Number(savedScore) : null;
  const handleSelect = (score) => {
    saveMood.mutate(BigInt(score));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 pt-6 pb-4", "data-ocid": "mood.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[22px] font-semibold leading-tight text-foreground mb-1", children: "How are you feeling today?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Tap an emoji to log your mood" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "fieldset",
      {
        className: "flex items-center justify-between gap-2 border-0 p-0 m-0",
        "aria-label": "Mood score selector",
        children: EMOJIS.map(({ emoji, label, score }) => {
          const isSelected = currentScore === score;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `mood.emoji_${score}.button`,
              "aria-label": label,
              "aria-pressed": isSelected,
              onClick: () => handleSelect(score),
              className: [
                "flex items-center justify-center rounded-2xl transition-all duration-200 active:scale-90 select-none",
                "w-14 h-14 text-3xl",
                isSelected ? "ring-[3px] ring-accent scale-110 bg-accent/15" : "bg-muted hover:bg-accent/10 hover:scale-105"
              ].join(" "),
              children: emoji
            },
            score
          );
        })
      }
    ),
    currentScore && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        className: "mt-4 text-center text-sm font-medium text-muted-foreground",
        "data-ocid": "mood.selected_label",
        children: [
          (_a = EMOJIS.find((e) => e.score === currentScore)) == null ? void 0 : _a.label,
          " — logged ✓"
        ]
      }
    )
  ] });
}
function TaskItem({
  task,
  index,
  date
}) {
  const toggle = useToggleTask(date);
  const remove = useDeleteTask(date);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "li",
    {
      className: "flex items-center gap-3 py-3 border-b border-border last:border-0",
      "data-ocid": `mood.task.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `mood.task.checkbox.${index + 1}`,
            "aria-label": task.completed ? "Mark incomplete" : "Mark complete",
            "aria-pressed": task.completed,
            onClick: () => toggle.mutate(task.id),
            className: [
              "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-smooth active:scale-90",
              task.completed ? "border-accent bg-accent" : "border-input"
            ].join(" "),
            children: task.completed && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                viewBox: "0 0 12 10",
                className: "w-3 h-3 fill-none stroke-white",
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M1 5l3.5 3.5L11 1" })
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: [
              "flex-1 text-sm leading-snug min-w-0 break-words",
              task.completed ? "line-through text-muted-foreground opacity-60" : "text-foreground"
            ].join(" "),
            children: task.text
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `mood.task.delete_button.${index + 1}`,
            "aria-label": "Delete task",
            onClick: () => remove.mutate(task.id),
            className: "flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-muted active:scale-90 transition-smooth",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 15, strokeWidth: 1.75 })
          }
        )
      ]
    }
  );
}
function TaskList() {
  const date = todayKey();
  const { data: tasks = [], isLoading } = useTasks(date);
  const addTask = useAddTask(date);
  const inputRef = reactExports.useRef(null);
  const [inputText, setInputText] = reactExports.useState("");
  const completedCount = tasks.filter((t) => t.completed).length;
  const handleAdd = () => {
    var _a;
    const text = inputText.trim();
    if (!text) return;
    const newTask = {
      id: `task_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      text,
      completed: false
    };
    addTask.mutate(newTask);
    setInputText("");
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 pt-5 pb-6", "data-ocid": "mood.tasks.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[18px] font-semibold text-foreground", children: "Today's Tasks" }),
      tasks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          "data-ocid": "mood.tasks.progress_badge",
          className: [
            "text-xs font-semibold px-2.5 py-1 rounded-full",
            completedCount === tasks.length && tasks.length > 0 ? "bg-accent/20 text-accent-foreground" : "bg-muted text-muted-foreground"
          ].join(" "),
          children: [
            completedCount,
            "/",
            tasks.length
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          type: "text",
          "data-ocid": "mood.task.input",
          value: inputText,
          onChange: (e) => setInputText(e.target.value),
          onKeyDown: handleKeyDown,
          placeholder: "Add a task...",
          maxLength: 120,
          className: [
            "flex-1 px-4 py-2.5 rounded-xl border text-sm bg-card",
            "border-input placeholder:text-muted-foreground",
            "text-foreground outline-none",
            "focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
          ].join(" "),
          "aria-label": "New task text"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "mood.task.add_button",
          onClick: handleAdd,
          disabled: !inputText.trim() || addTask.isPending,
          className: [
            "px-4 py-2.5 rounded-xl text-sm font-semibold transition-smooth active:scale-95",
            "bg-accent text-accent-foreground",
            "hover:opacity-90",
            "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          ].join(" "),
          "aria-label": "Add task",
          children: "Add"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "space-y-3 py-2",
        "data-ocid": "mood.tasks.loading_state",
        "aria-live": "polite",
        "aria-label": "Loading tasks",
        children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 rounded-xl bg-muted animate-pulse" }, i))
      }
    ) : tasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "mood.tasks.empty_state",
        className: "flex flex-col items-center justify-center py-8 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl mb-2", "aria-hidden": "true", children: "✅" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "No tasks yet — add one above" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "ul",
      {
        "data-ocid": "mood.tasks.list",
        className: "rounded-2xl bg-card border border-border overflow-hidden",
        "aria-label": "Task list",
        children: tasks.map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TaskItem, { task, index: i, date }, task.id))
      }
    )
  ] });
}
function MoodPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full section-mood", "data-ocid": "mood.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MoodTracker, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-5 border-t border-border", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TaskList, {})
  ] });
}
export {
  MoodPage as default
};
