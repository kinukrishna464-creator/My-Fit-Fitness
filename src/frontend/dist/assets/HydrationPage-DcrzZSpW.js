import { r as reactExports, j as jsxRuntimeExports } from "./index-D6AznCEg.js";
import { t as todayKey, c as useHydration, d as useHydrationTarget, e as useAddLitres, g as useRemoveLitres, h as useSetHydrationTarget } from "./useHabitBackend-CFoa_XeP.js";
import { T as Target } from "./target-uGuI49e1.js";
import { c as createLucideIcon } from "./createLucideIcon-DH0K0O4P.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
const CIRCLE_R = 88;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;
function ProgressRing({
  litres,
  target,
  loading
}) {
  const fraction = target > 0 ? Math.min(litres / target, 1) : 0;
  const targetOffset = CIRCUMFERENCE * (1 - fraction);
  const [offset, setOffset] = reactExports.useState(CIRCUMFERENCE);
  const raf = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => setOffset(targetOffset));
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [targetOffset]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "220", height: "220", viewBox: "0 0 220 220", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "hyd-grad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.65 0.18 215)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.52 0.22 200)" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "circle",
      {
        cx: "110",
        cy: "110",
        r: CIRCLE_R,
        fill: "none",
        stroke: "rgba(147,210,240,0.25)",
        strokeWidth: "14"
      }
    ),
    !loading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "circle",
      {
        cx: "110",
        cy: "110",
        r: CIRCLE_R,
        fill: "none",
        stroke: "url(#hyd-grad)",
        strokeWidth: "14",
        strokeLinecap: "round",
        strokeDasharray: CIRCUMFERENCE,
        strokeDashoffset: offset,
        transform: "rotate(-90 110 110)",
        style: {
          transition: "stroke-dashoffset 0.65s cubic-bezier(0.4,0,0.2,1)"
        }
      }
    )
  ] });
}
function SetGoalDialog({
  currentTarget,
  onSave,
  onClose
}) {
  const dialogRef = reactExports.useRef(null);
  const [value, setValue] = reactExports.useState(String(currentTarget));
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    const el = dialogRef.current;
    if (el) el.showModal();
  }, []);
  function handleBackdrop(e) {
    const rect = e.target.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      onClose();
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const num = Number.parseFloat(value);
    if (Number.isNaN(num) || num < 0.5 || num > 5) {
      setError("Enter a value between 0.5 and 5.0 litres");
      return;
    }
    onSave(Math.round(num * 4) / 4);
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      ref: dialogRef,
      onClick: handleBackdrop,
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      "aria-label": "Set daily water goal",
      "data-ocid": "hydration.dialog",
      style: { all: "unset", position: "fixed", inset: 0, zIndex: 50 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed inset-0 flex items-end justify-center sm:items-center",
          style: { background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "w-full max-w-sm rounded-t-3xl sm:rounded-3xl bg-card shadow-xl p-6 pb-8",
              onClick: (e) => e.stopPropagation(),
              onKeyDown: (e) => e.stopPropagation(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-foreground", children: "Set Daily Goal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      "aria-label": "Close",
                      "data-ocid": "hydration.close_button",
                      className: "transition-smooth w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted active:scale-95",
                      children: "✕"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "goal-input",
                        className: "block text-sm font-medium text-foreground mb-1.5",
                        children: "Target (Litres)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "goal-input",
                          type: "number",
                          step: "0.25",
                          min: "0.5",
                          max: "5.0",
                          value,
                          onChange: (e) => {
                            setValue(e.target.value);
                            setError("");
                          },
                          ref: (el) => {
                            if (el) setTimeout(() => el.focus(), 50);
                          },
                          "data-ocid": "hydration.input",
                          className: "w-full rounded-2xl border border-input bg-background px-4 py-3 text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-sky-400/60 transition-smooth",
                          placeholder: "2.0"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground pointer-events-none", children: "L" })
                    ] }),
                    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs mt-1.5 font-medium text-destructive",
                        "data-ocid": "hydration.field_error",
                        children: error
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-3 flex-wrap", children: [1.5, 2, 2.5, 3].map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          setValue(String(preset));
                          setError("");
                        },
                        className: "transition-smooth px-3 py-1.5 rounded-full text-sm font-medium border border-border hover:bg-muted active:scale-95 text-foreground",
                        children: [
                          preset,
                          " L"
                        ]
                      },
                      preset
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      "data-ocid": "hydration.confirm_button",
                      className: "transition-smooth w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-base active:scale-[.97] shadow-md",
                      children: "Save Goal"
                    }
                  )
                ] })
              ]
            }
          )
        }
      )
    }
  );
}
function HydrationPage() {
  const dateKey = todayKey();
  const { data: litres = 0, isLoading: hydrationLoading } = useHydration(dateKey);
  const { data: targetLitres = 2, isLoading: targetLoading } = useHydrationTarget(dateKey);
  const addLitres = useAddLitres(dateKey);
  const removeLitres = useRemoveLitres(dateKey);
  const setTarget = useSetHydrationTarget(dateKey);
  const [showGoalDialog, setShowGoalDialog] = reactExports.useState(false);
  const isLoading = hydrationLoading || targetLoading;
  const goalReached = litres >= targetLitres;
  const remaining = Math.max(targetLitres - litres, 0);
  const percentPct = Math.round(Math.min(litres / targetLitres * 100, 100));
  const displayDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  function formatLitres(l) {
    return l % 1 === 0 ? `${l.toFixed(1)} L` : `${l.toFixed(2)} L`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col section-hydration",
      "data-ocid": "hydration.page",
      children: [
        goalReached && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "output",
          {
            className: "mx-4 mt-4 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm",
            style: {
              background: "oklch(0.78 0.12 215 / 0.25)",
              border: "1px solid oklch(0.65 0.18 215 / 0.35)"
            },
            "aria-live": "polite",
            "data-ocid": "hydration.success_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl select-none", "aria-hidden": true, children: "🎉" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Daily goal reached!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs opacity-75 text-muted-foreground", children: [
                  "You've had ",
                  formatLitres(litres),
                  " today — great work!"
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "header",
          {
            className: "px-6 pt-6 pb-2 flex items-start justify-between",
            "data-ocid": "hydration.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Hydration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5 font-medium text-muted-foreground", children: displayDate })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setShowGoalDialog(true),
                  "aria-label": "Set daily goal",
                  "data-ocid": "hydration.open_modal_button",
                  className: "transition-smooth flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold border border-border bg-card/70 text-foreground active:scale-95 shadow-sm mt-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 15, "aria-hidden": true }),
                    "Set Goal"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 flex flex-col items-center justify-center gap-6 px-6 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", "data-ocid": "hydration.card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProgressRing,
              {
                litres,
                target: targetLitres,
                loading: isLoading
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-10 h-10 rounded-full border-4 border-t-sky-500 border-sky-200/50 animate-spin",
                "data-ocid": "hydration.loading_state"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-bold leading-none tabular-nums text-foreground",
                  style: { fontSize: "3rem" },
                  "aria-label": `${litres.toFixed(2)} litres logged`,
                  children: litres.toFixed(2)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-semibold mt-0.5 text-muted-foreground", children: "litres" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium mt-1 opacity-70 text-muted-foreground", children: goalReached ? "✓ goal reached" : `${percentPct}%` })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-muted-foreground -mt-2", children: [
            "Goal:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
              targetLitres.toFixed(1),
              " L"
            ] }),
            !goalReached && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 font-normal opacity-75", children: [
              "· ",
              formatLitres(remaining),
              " remaining"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-4 mt-1",
              "data-ocid": "hydration.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => void removeLitres.mutate(0.25),
                    disabled: litres <= 0 || removeLitres.isPending,
                    "aria-label": "Remove 0.25 litres",
                    "data-ocid": "hydration.secondary_button",
                    className: "transition-smooth flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-base active:scale-95 disabled:opacity-35 disabled:pointer-events-none bg-card/80 text-foreground border border-border shadow-sm",
                    children: [
                      removeLitres.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-sky-300/50 border-t-sky-600 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 19, strokeWidth: 2.5, "aria-hidden": true }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "−0.25 L" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => void addLitres.mutate(0.25),
                    disabled: addLitres.isPending,
                    "aria-label": "Add 0.25 litres",
                    "data-ocid": "hydration.primary_button",
                    className: "transition-smooth flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-base active:scale-95 disabled:opacity-60 disabled:pointer-events-none shadow-md",
                    style: { background: "oklch(0.52 0.22 200)", color: "#fff" },
                    children: [
                      addLitres.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-white/40 border-t-white animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 19, strokeWidth: 2.5, "aria-hidden": true }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+0.25 L" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center gap-2 flex-wrap justify-center max-w-xs",
              "data-ocid": "hydration.list",
              "aria-label": "Quick add presets",
              children: [0.5, 0.75, 1].map((amount, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => void addLitres.mutate(amount),
                  disabled: addLitres.isPending,
                  "data-ocid": `hydration.item.${i + 1}`,
                  className: "transition-smooth px-4 py-2 rounded-full text-sm font-semibold border border-border bg-card/60 text-foreground active:scale-95 disabled:opacity-40 shadow-sm",
                  children: [
                    "+",
                    amount.toFixed(2),
                    " L"
                  ]
                },
                amount
              ))
            }
          ),
          !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center font-medium text-muted-foreground max-w-xs opacity-80", children: litres === 0 ? `Tap +0.25 L to start — your goal is ${targetLitres.toFixed(1)} L 💧` : goalReached ? `${formatLitres(litres)} logged — keep it up! 💧` : `${formatLitres(remaining)} more to hit your ${targetLitres.toFixed(1)} L goal` })
        ] }),
        showGoalDialog && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SetGoalDialog,
          {
            currentTarget: targetLitres,
            onSave: (v) => void setTarget.mutate(v),
            onClose: () => setShowGoalDialog(false)
          }
        )
      ]
    }
  );
}
export {
  HydrationPage as default
};
