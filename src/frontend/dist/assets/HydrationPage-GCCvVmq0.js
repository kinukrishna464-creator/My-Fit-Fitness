import { j as jsxRuntimeExports, r as reactExports } from "./index-De6_TF5Z.js";
import { t as todayKey, c as useHydration, d as useIncrementHydration, e as useDecrementHydration } from "./useHabitBackend-hZtoiFj0.js";
import { c as createLucideIcon } from "./createLucideIcon-CAN4Aort.js";
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
const GOAL = 8;
const CIRCLE_R = 88;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;
function GlassIcon({ filled }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: "30",
      height: "30",
      "aria-hidden": "true",
      className: "transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M6 3h12l-1.8 15H7.8L6 3z",
            strokeWidth: "1.6",
            strokeLinejoin: "round",
            className: filled ? "fill-sky-400 stroke-sky-500" : "fill-none stroke-sky-300"
          }
        ),
        filled && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M8.2 11h7.6l-1.1 7H9.3L8.2 11z",
            className: "fill-sky-200 stroke-none opacity-70"
          }
        )
      ]
    }
  );
}
function ProgressRing({
  glasses,
  loading
}) {
  const fraction = glasses >= GOAL ? 1 : glasses / GOAL;
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
        stroke: "rgba(147,210,240,0.3)",
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
function HydrationPage() {
  const dateKey = todayKey();
  const { data: hydrationBigInt, isLoading } = useHydration(dateKey);
  const increment = useIncrementHydration(dateKey);
  const decrement = useDecrementHydration(dateKey);
  const glasses = hydrationBigInt !== void 0 ? Number(hydrationBigInt) : 0;
  const goalReached = glasses >= GOAL;
  const remaining = GOAL - glasses;
  const displayDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col section-hydration",
      "data-ocid": "hydration.page",
      children: [
        goalReached && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "output",
          {
            className: "mx-4 mt-4 px-5 py-3 rounded-2xl flex items-center gap-3 shadow bg-accent/20 border border-accent/30",
            "aria-live": "polite",
            "data-ocid": "hydration.success_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl select-none", children: "🎉" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Daily goal reached! Keep going!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs opacity-75 text-muted-foreground", children: [
                  "You've logged ",
                  glasses,
                  " glasses today — goal was ",
                  GOAL,
                  "."
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-6 pt-6 pb-2", "data-ocid": "hydration.section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Hydration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5 font-medium text-muted-foreground", children: displayDate })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 flex flex-col items-center justify-center gap-7 px-6 py-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", "data-ocid": "hydration.card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRing, { glasses, loading: isLoading }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-10 h-10 rounded-full border-4 border-t-sky-500 border-sky-200 animate-spin",
                "data-ocid": "hydration.loading_state"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-bold leading-none tabular-nums text-foreground",
                  style: { fontSize: "3.6rem" },
                  "aria-label": `${glasses} glasses logged`,
                  children: glasses
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium mt-1 text-muted-foreground", children: glasses === 1 ? "glass" : "glasses" }),
              goalReached && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold mt-0.5 text-accent-foreground opacity-80", children: "goal ✓" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center gap-1.5 flex-wrap justify-center max-w-xs",
              "aria-label": `${glasses} ${glasses === 1 ? "glass" : "glasses"} logged today`,
              "data-ocid": "hydration.list",
              children: Array.from({ length: Math.max(glasses, GOAL) }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "transition-smooth",
                  style: { transform: i < glasses ? "scale(1.15)" : "scale(1)" },
                  "data-ocid": `hydration.item.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassIcon, { filled: i < glasses })
                },
                `glass-${i + 1}`
              ))
            }
          ),
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
                    onClick: () => {
                      if (glasses > 0) void decrement.mutate();
                    },
                    disabled: glasses === 0 || decrement.isPending,
                    "aria-label": "Remove a glass of water",
                    "data-ocid": "hydration.secondary_button",
                    className: "transition-smooth flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base active:scale-95 disabled:opacity-35 disabled:pointer-events-none bg-secondary text-secondary-foreground border border-border shadow-sm",
                    children: [
                      decrement.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-sky-300 border-t-sky-600 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 19, strokeWidth: 2.5, "aria-hidden": true }),
                      "Remove"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      void increment.mutate();
                    },
                    disabled: increment.isPending,
                    "aria-label": "Add a glass of water",
                    "data-ocid": "hydration.primary_button",
                    className: "transition-smooth flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-base active:scale-95 disabled:opacity-60 disabled:pointer-events-none bg-primary text-primary-foreground shadow-md",
                    children: [
                      increment.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-white/50 border-t-white animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 19, strokeWidth: 2.5, "aria-hidden": true }),
                      "Add Glass"
                    ]
                  }
                )
              ]
            }
          ),
          !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-center font-medium text-muted-foreground", children: glasses === 0 ? `Tap Add Glass to start — goal is ${GOAL} 💧` : goalReached ? `${glasses} glasses logged — keep going, no limit! 💧` : `${remaining} more ${remaining === 1 ? "glass" : "glasses"} to reach your daily goal` })
        ] })
      ]
    }
  );
}
export {
  HydrationPage as default
};
