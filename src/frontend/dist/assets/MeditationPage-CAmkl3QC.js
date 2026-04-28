import { j as jsxRuntimeExports, r as reactExports } from "./index-De6_TF5Z.js";
import { S as Slot, a as cva, B as Button } from "./button-DScs97lM.js";
import { c as cn } from "./utils-2v2HxlWs.js";
import { S as Skeleton } from "./skeleton-DCxdagqc.js";
import { t as todayKey, o as useMeditationLog, p as useAddMeditation, q as useDeleteMeditation, r as formatDuration } from "./useHabitBackend-hZtoiFj0.js";
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const PRESETS = [
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "15 min", seconds: 900 },
  { label: "20 min", seconds: 1200 }
];
const CIRCLE_R = 54;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
function padTwo(n) {
  return String(n).padStart(2, "0");
}
function MountainLandscape() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 390 160",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      preserveAspectRatio: "xMidYMax meet",
      className: "w-full",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polygon",
          {
            points: "0,160 60,80 130,130 200,65 270,115 340,72 390,105 390,160",
            fill: "oklch(0.72 0.09 140)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polygon",
          {
            points: "0,160 40,105 100,145 160,90 240,135 310,88 370,118 390,110 390,160",
            fill: "oklch(0.66 0.10 138)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polygon",
          {
            points: "0,160 0,145 50,128 110,148 170,120 230,145 290,118 360,140 390,130 390,160",
            fill: "oklch(0.60 0.12 136)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "330",
            cy: "30",
            r: "14",
            fill: "oklch(0.97 0.02 80)",
            opacity: "0.9"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "80", cy: "45", rx: "24", ry: "9", fill: "white", opacity: "0.55" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "96", cy: "40", rx: "16", ry: "8", fill: "white", opacity: "0.55" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "250", cy: "52", rx: "20", ry: "7", fill: "white", opacity: "0.45" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "264", cy: "47", rx: "12", ry: "6", fill: "white", opacity: "0.45" })
      ]
    }
  );
}
function CircularTimer({ remaining, total, state, flash }) {
  const progress = total > 0 ? remaining / total : 1;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: {
        width: 220,
        height: 220,
        transition: flash ? "none" : void 0,
        filter: flash ? "brightness(1.6)" : "brightness(1)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-full",
            style: {
              background: "radial-gradient(circle, oklch(0.88 0.14 80 / 0.3) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: "0 0 128 128",
            className: "absolute inset-0 w-full h-full -rotate-90",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: "64",
                  cy: "64",
                  r: CIRCLE_R,
                  strokeWidth: "5",
                  stroke: "oklch(0.55 0.10 140)",
                  fill: "none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: "64",
                  cy: "64",
                  r: CIRCLE_R,
                  strokeWidth: "5",
                  stroke: "url(#goldGrad)",
                  fill: "none",
                  strokeLinecap: "round",
                  style: {
                    strokeDasharray: CIRCUMFERENCE,
                    strokeDashoffset: dashOffset,
                    transition: state === "running" ? "stroke-dashoffset 1s linear" : "none"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "goldGrad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.78 0.16 75)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.88 0.14 80)" })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute rounded-full",
            style: {
              width: 174,
              height: 174,
              background: "oklch(0.55 0.10 140 / 0.45)",
              backdropFilter: "blur(8px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex flex-col items-center select-none", children: state === "completed" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "🌿" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-display font-semibold text-base leading-tight text-center px-4", children: "Session Complete!" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-mono font-bold text-white tabular-nums",
              style: { fontSize: 44, letterSpacing: 2 },
              children: [
                padTwo(mins),
                ":",
                padTwo(secs)
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs mt-1 font-body", children: state === "running" ? "Breathe…" : state === "paused" ? "Paused" : "Ready" })
        ] }) })
      ]
    }
  );
}
function MeditationPage() {
  const today = todayKey();
  const { data: sessions = [], isLoading } = useMeditationLog(today);
  const addSession = useAddMeditation(today);
  const deleteSession = useDeleteMeditation(today);
  const [selectedPreset, setSelectedPreset] = reactExports.useState(PRESETS[1]);
  const [timerState, setTimerState] = reactExports.useState("idle");
  const [remaining, setRemaining] = reactExports.useState(PRESETS[1].seconds);
  const [flash, setFlash] = reactExports.useState(false);
  const intervalRef = reactExports.useRef(null);
  const totalRef = reactExports.useRef(PRESETS[1].seconds);
  const handleCompleteRef = reactExports.useRef(() => {
  });
  function handleComplete(totalSeconds) {
    setTimerState("completed");
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
    addSession.mutate({
      id: generateId(),
      durationSeconds: BigInt(totalSeconds)
    });
  }
  handleCompleteRef.current = handleComplete;
  reactExports.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  reactExports.useEffect(() => {
    if (timerState === "running") {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            handleCompleteRef.current(totalRef.current);
            return 0;
          }
          return r - 1;
        });
      }, 1e3);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerState]);
  function handleStart() {
    totalRef.current = selectedPreset.seconds;
    setRemaining(selectedPreset.seconds);
    setTimerState("running");
  }
  function handleStop() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimerState("idle");
    setRemaining(selectedPreset.seconds);
  }
  function handleReset() {
    setTimerState("idle");
    setRemaining(selectedPreset.seconds);
  }
  function selectPreset(preset) {
    if (timerState !== "idle") return;
    setSelectedPreset(preset);
    setRemaining(preset.seconds);
  }
  const totalSecs = sessions.reduce((s, e) => s + Number(e.durationSeconds), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col relative overflow-hidden",
      style: { background: "var(--meditation-bg)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-5 pt-12 pb-2 flex-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground", children: "Meditation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/50 text-sm mt-0.5", children: today }),
          totalSecs > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-foreground/60 text-xs mt-1",
              "data-ocid": "meditation.daily_total",
              children: [
                "Today: ",
                Math.round(totalSecs / 60),
                " min · ",
                sessions.length,
                " session",
                sessions.length !== 1 ? "s" : ""
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            "data-ocid": "meditation.presets.section",
            className: "flex justify-center gap-2 px-5 pt-5 pb-2",
            children: PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `meditation.preset.${p.label.replace(" ", "_")}`,
                onClick: () => selectPreset(p),
                disabled: timerState !== "idle",
                className: "px-3 py-1.5 rounded-full text-sm font-semibold font-body transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:opacity-50",
                style: {
                  background: selectedPreset.seconds === p.seconds ? "oklch(0.78 0.16 75)" : "oklch(0.60 0.10 138 / 0.55)",
                  color: selectedPreset.seconds === p.seconds ? "oklch(0.18 0.04 60)" : "oklch(0.97 0.01 0)",
                  boxShadow: selectedPreset.seconds === p.seconds ? "0 2px 8px oklch(0.78 0.16 75 / 0.45)" : "none"
                },
                children: p.label
              },
              p.seconds
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            "data-ocid": "meditation.timer.section",
            className: "flex flex-col items-center justify-center py-8 flex-none",
            style: {
              transition: "filter 0.3s ease",
              filter: flash ? "brightness(1.5)" : "brightness(1)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircularTimer,
              {
                remaining,
                total: selectedPreset.seconds,
                state: timerState,
                flash
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "data-ocid": "meditation.controls.section",
            className: "flex justify-center gap-3 px-5 pb-4",
            children: [
              timerState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "meditation.start.primary_button",
                  onClick: handleStart,
                  className: "px-10 rounded-full font-semibold shadow-md",
                  style: {
                    background: "white",
                    color: "oklch(0.25 0.03 140)",
                    border: "none"
                  },
                  children: "Start"
                }
              ),
              timerState === "running" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "meditation.stop.primary_button",
                  onClick: handleStop,
                  variant: "outline",
                  className: "px-8 rounded-full font-semibold border-2",
                  style: {
                    background: "white",
                    color: "oklch(0.25 0.03 140)",
                    borderColor: "oklch(0.60 0.10 138)"
                  },
                  children: "Stop"
                }
              ),
              timerState === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "meditation.reset.primary_button",
                  onClick: handleReset,
                  className: "px-10 rounded-full font-semibold shadow-md",
                  style: {
                    background: "white",
                    color: "oklch(0.25 0.03 140)",
                    border: "none"
                  },
                  children: "New Session"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        (isLoading || sessions.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            "data-ocid": "meditation.sessions.list",
            className: "px-4 pb-4 mx-0 max-h-52 overflow-y-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-foreground/70 text-xs font-semibold uppercase tracking-widest mb-2 px-1", children: "Today's Sessions" }),
              isLoading ? ["sk1", "sk2"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Skeleton,
                {
                  className: "h-12 rounded-2xl mb-2",
                  style: { background: "oklch(0.55 0.10 140 / 0.35)" }
                },
                k
              )) : sessions.map((session, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `meditation.session.item.${i + 1}`,
                  className: "rounded-2xl px-4 py-3 mb-2 flex items-center justify-between",
                  style: { background: "oklch(0.60 0.10 138 / 0.45)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🧘" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white font-semibold text-sm truncate", children: [
                        "Session ",
                        i + 1
                      ] }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-none ml-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          "data-ocid": `meditation.duration_badge.${i + 1}`,
                          className: "rounded-full text-xs font-semibold",
                          style: {
                            background: "oklch(0.78 0.16 75 / 0.85)",
                            color: "oklch(0.18 0.04 60)",
                            border: "none"
                          },
                          children: formatDuration(session.durationSeconds)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `meditation.delete_button.${i + 1}`,
                          onClick: () => deleteSession.mutate(session.id),
                          "aria-label": "Remove session",
                          className: "text-white/40 hover:text-white/80 transition-colors p-1 rounded-full",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "svg",
                            {
                              viewBox: "0 0 24 24",
                              className: "w-4 h-4",
                              "aria-hidden": "true",
                              strokeWidth: 2,
                              stroke: "currentColor",
                              fill: "none",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 6L6 18M6 6l12 12" })
                            }
                          )
                        }
                      )
                    ] })
                  ]
                },
                session.id
              ))
            ]
          }
        ),
        sessions.length === 0 && !isLoading && timerState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "meditation.empty_state",
            className: "text-center pb-4 px-5",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/40 text-xs", children: "No sessions logged today. Start your first session above." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full flex-none pointer-events-none",
            "aria-hidden": "true",
            style: { marginBottom: -2 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(MountainLandscape, {})
          }
        )
      ]
    }
  );
}
export {
  MeditationPage as default
};
