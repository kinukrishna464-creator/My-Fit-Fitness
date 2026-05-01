import { j as jsxRuntimeExports, r as reactExports } from "./index-D6AznCEg.js";
import { c as createSlot, B as Button } from "./button-BZxg97WT.js";
import { c as cn } from "./utils-2v2HxlWs.js";
import { S as Skeleton } from "./skeleton-DJ5iJ0SD.js";
import { t as todayKey, a as useWorkoutLog, b as useSaveWorkout, f as formatDisplayDate } from "./useHabitBackend-CFoa_XeP.js";
import { c as createLucideIcon } from "./createLucideIcon-DH0K0O4P.js";
import { T as Target } from "./target-uGuI49e1.js";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  [
    "path",
    {
      d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
      key: "9m4mmf"
    }
  ],
  ["path", { d: "m2.5 21.5 1.4-1.4", key: "17g3f0" }],
  ["path", { d: "m20.1 3.9 1.4-1.4", key: "1qn309" }],
  [
    "path",
    {
      d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
      key: "1t2c92"
    }
  ],
  ["path", { d: "m9.6 14.4 4.8-4.8", key: "6umqxw" }]
];
const Dumbbell = createLucideIcon("dumbbell", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2", key: "148xed" }],
  ["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2", key: "1u4tom" }],
  ["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2", key: "75valh" }]
];
const Wind = createLucideIcon("wind", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const CATEGORIES = [
  {
    name: "Full Body",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "w-7 h-7 stroke-2", strokeWidth: 2 }),
    accentClass: "workout-card-crimson"
  },
  {
    name: "Shoulders",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-7 h-7 stroke-2", strokeWidth: 2 }),
    accentClass: "workout-card-ruby"
  },
  {
    name: "Chest",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-7 h-7 stroke-2", strokeWidth: 2 }),
    accentClass: "workout-card-maroon"
  },
  {
    name: "Arms",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "w-7 h-7 stroke-2", strokeWidth: 2 }),
    accentClass: "workout-card-crimson"
  },
  {
    name: "Legs",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-7 h-7 stroke-2", strokeWidth: 2 }),
    accentClass: "workout-card-maroon"
  },
  {
    name: "Core",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-7 h-7 stroke-2", strokeWidth: 2 }),
    accentClass: "workout-card-ruby"
  },
  {
    name: "Cardio",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-7 h-7 stroke-2", strokeWidth: 2 }),
    accentClass: "workout-card-ember"
  },
  {
    name: "Back",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className: "w-7 h-7 stroke-2", strokeWidth: 2 }),
    accentClass: "workout-card-crimson"
  }
];
function LogModal({
  category,
  existing,
  onSave,
  onClose,
  isPending
}) {
  const [sets, setSets] = reactExports.useState(existing ? Number(existing.sets) : 3);
  const [reps, setReps] = reactExports.useState(existing ? Number(existing.reps) : 10);
  const dialogRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (!el.open) el.showModal();
    const handleClose = () => onClose();
    el.addEventListener("close", handleClose);
    return () => el.removeEventListener("close", handleClose);
  }, [onClose]);
  const handleBackdropClick = (e) => {
    var _a, _b;
    const rect = (_a = dialogRef.current) == null ? void 0 : _a.getBoundingClientRect();
    if (!rect) return;
    const { clientX: x, clientY: y } = e;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      (_b = dialogRef.current) == null ? void 0 : _b.close();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      ref: dialogRef,
      "data-ocid": "workout.dialog",
      "aria-labelledby": "workout-modal-title",
      onClick: handleBackdropClick,
      onKeyDown: (e) => {
        var _a;
        if (e.key === "Escape") (_a = dialogRef.current) == null ? void 0 : _a.close();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-t-3xl sm:rounded-3xl w-full max-w-sm mx-0 sm:mx-4 p-6 shadow-2xl",
          onClick: (e) => e.stopPropagation(),
          onKeyDown: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `workout-modal-icon ${category.accentClass}`, children: category.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    id: "workout-modal-title",
                    className: "text-lg font-bold text-foreground font-display",
                    children: category.name
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "workout.close_button",
                  onClick: onClose,
                  className: "text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "modal-sets",
                    className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    children: "Sets"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "modal-sets",
                    "data-ocid": "workout.sets.input",
                    type: "number",
                    min: 1,
                    max: 99,
                    value: sets,
                    onChange: (e) => setSets(Math.max(1, Number(e.target.value) || 1)),
                    className: "text-center text-lg font-bold h-12 rounded-xl"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "modal-reps",
                    className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    children: "Reps"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "modal-reps",
                    "data-ocid": "workout.reps.input",
                    type: "number",
                    min: 1,
                    max: 999,
                    value: reps,
                    onChange: (e) => setReps(Math.max(1, Number(e.target.value) || 1)),
                    className: "text-center text-lg font-bold h-12 rounded-xl"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  "data-ocid": "workout.cancel_button",
                  onClick: onClose,
                  className: "flex-1 h-12 rounded-xl font-semibold",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  "data-ocid": "workout.save_button",
                  onClick: () => onSave(BigInt(reps), BigInt(sets)),
                  disabled: isPending,
                  className: "flex-1 h-12 rounded-xl font-semibold workout-save-btn",
                  children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" }),
                    "Saving…"
                  ] }) : "Save"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function CategoryCard({ category, entry, index, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      "data-ocid": `workout.card.${index + 1}`,
      onClick,
      className: "workout-category-card group text-left",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "workout-card-inner", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `workout-icon-wrapper ${category.accentClass}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: category.icon }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-sm leading-tight mt-3", children: category.name }),
        entry ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/60 text-xs mt-0.5", children: [
          Number(entry.sets),
          " × ",
          Number(entry.reps)
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-xs mt-0.5", children: "Tap to log" }),
        entry && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "workout-done-dot", "aria-label": "Logged" })
      ] })
    }
  );
}
function WorkoutPage() {
  const today = todayKey();
  const { data: entries = [], isLoading } = useWorkoutLog(today);
  const saveWorkout = useSaveWorkout(today);
  const [activeCategory, setActiveCategory] = reactExports.useState(
    null
  );
  const getEntry = (name) => entries.find((e) => e.category === name);
  const handleSave = (reps, sets) => {
    if (!activeCategory) return;
    saveWorkout.mutate(
      { category: activeCategory.name, reps, sets },
      { onSuccess: () => setActiveCategory(null) }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen section-workout", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-5 pt-12 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5 text-white/70" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white font-display tracking-tight", children: "Workout" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-sm pl-7", children: formatDisplayDate(today) })
    ] }),
    !isLoading && entries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "workout.summary.panel",
        className: "inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5 text-white/70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/70 text-xs font-medium", children: [
            entries.length,
            " of ",
            CATEGORIES.length,
            " logged today"
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "workout.categories.section", className: "px-4 pb-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [1, 2, 3, 4, 5, 6, 7, 8].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Skeleton,
      {
        className: "h-32 rounded-2xl bg-white/10",
        "data-ocid": "workout.loading_state"
      },
      k
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: CATEGORIES.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CategoryCard,
      {
        category: cat,
        entry: getEntry(cat.name),
        index: i,
        onClick: () => setActiveCategory(cat)
      },
      cat.name
    )) }) }),
    activeCategory && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LogModal,
      {
        category: activeCategory,
        existing: getEntry(activeCategory.name),
        onSave: handleSave,
        onClose: () => setActiveCategory(null),
        isPending: saveWorkout.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        /* ── dialog overlay reset ───────────────────────── */
        dialog[data-ocid="workout.dialog"] {
          all: unset;
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          background: rgba(0,0,0,0.72);
          width: 100vw;
          max-width: 100vw;
          height: 100dvh;
          max-height: 100dvh;
          padding: 0;
          border: none;
          margin: 0;
          overflow: visible;
        }
        @media (min-width: 640px) {
          dialog[data-ocid="workout.dialog"] {
            align-items: center;
          }
        }
        dialog[data-ocid="workout.dialog"]::backdrop {
          display: none;
        }
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
      ` })
  ] });
}
export {
  WorkoutPage as default
};
