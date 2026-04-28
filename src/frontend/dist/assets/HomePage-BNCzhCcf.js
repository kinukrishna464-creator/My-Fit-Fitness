import { j as jsxRuntimeExports } from "./index-De6_TF5Z.js";
import { S as Skeleton } from "./skeleton-DCxdagqc.js";
import { t as todayKey, y as yesterdayKey, u as usePreviousDaySummary, f as formatDisplayDate } from "./useHabitBackend-hZtoiFj0.js";
import "./utils-2v2HxlWs.js";
const MOOD_EMOJI = {
  1: "😔",
  2: "😕",
  3: "😐",
  4: "🙂",
  5: "😄"
};
function getMoodEmoji(score) {
  if (score == null) return "";
  const n = Number(score);
  const bucket = Math.max(1, Math.min(5, Math.ceil(n / 2)));
  return MOOD_EMOJI[bucket] ?? "😐";
}
function Ring({
  pct,
  color,
  size = 44
}) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = Math.min(pct / 100, 1) * circ;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      className: "-rotate-90 shrink-0",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: size / 2,
            cy: size / 2,
            r,
            strokeWidth: 3.5,
            stroke: color,
            fill: "none",
            strokeOpacity: 0.18
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: size / 2,
            cy: size / 2,
            r,
            strokeWidth: 3.5,
            stroke: color,
            fill: "none",
            strokeDasharray: `${dash} ${circ}`,
            strokeLinecap: "round"
          }
        )
      ]
    }
  );
}
function SummaryCard({
  icon,
  accent,
  title,
  value,
  sub,
  ring,
  onClick,
  ocid
}) {
  const Tag = onClick ? "button" : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Tag,
    {
      "data-ocid": ocid,
      type: onClick ? "button" : void 0,
      onClick,
      className: [
        "rounded-2xl bg-card border border-border p-4 text-left shadow-sm",
        "flex flex-col gap-1 min-h-[140px]",
        onClick ? "cursor-pointer transition-smooth active:scale-95 hover:shadow-md hover:border-border/60" : ""
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-xl flex items-center justify-center mb-1 shrink-0",
            style: { background: `${accent}18` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: accent }, children: icon })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider leading-none", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mt-auto gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground leading-tight break-words", children: value }),
            sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-snug", children: sub })
          ] }),
          ring && /* @__PURE__ */ jsxRuntimeExports.jsx(Ring, { pct: ring.pct, color: accent, size: 40 })
        ] })
      ]
    }
  );
}
const DumbbellIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    viewBox: "0 0 24 24",
    className: "w-5 h-5",
    strokeWidth: 2,
    stroke: "currentColor",
    fill: "none",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "10", width: "4", height: "4", rx: "1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "18", y: "10", width: "4", height: "4", rx: "1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "5", y: "7", width: "3", height: "10", rx: "1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "16", y: "7", width: "3", height: "10", rx: "1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "8", y: "9", width: "8", height: "6", rx: "1" })
    ]
  }
);
const DropIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "svg",
  {
    viewBox: "0 0 24 24",
    className: "w-5 h-5",
    strokeWidth: 2,
    stroke: "currentColor",
    fill: "none",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2C12 2 5 10.5 5 15a7 7 0 0 0 14 0c0-4.5-7-13-7-13Z" })
  }
);
const FaceIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    viewBox: "0 0 24 24",
    className: "w-5 h-5",
    strokeWidth: 2,
    stroke: "currentColor",
    fill: "none",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "9" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "10.5", r: "1", fill: "currentColor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "15", cy: "10.5", r: "1", fill: "currentColor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 15c.83 1 5.17 1 6 0" })
    ]
  }
);
const CheckIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    viewBox: "0 0 24 24",
    className: "w-5 h-5",
    strokeWidth: 2,
    stroke: "currentColor",
    fill: "none",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 11l3 3L22 4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" })
    ]
  }
);
const BookIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "svg",
  {
    viewBox: "0 0 24 24",
    className: "w-5 h-5",
    strokeWidth: 2,
    stroke: "currentColor",
    fill: "none",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 4h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4V4Zm16 0h-7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7V4Z" })
  }
);
const LotusIcon = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    viewBox: "0 0 24 24",
    className: "w-5 h-5",
    strokeWidth: 2,
    stroke: "currentColor",
    fill: "none",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "5", r: "2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 13c0-2.8 2.2-5 5-5s5 2.2 5 5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 13h14" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 13l-3 4h16l-3-4" })
    ]
  }
);
function hasAnyData(s) {
  if (!s) return false;
  return s.workout.length > 0 || Number(s.hydration) > 0 || s.mood != null || s.tasks.length > 0 || s.reading.length > 0 || s.meditation.length > 0;
}
function HomePage({ onNavigate }) {
  const today = todayKey();
  const yesterday = yesterdayKey();
  const { data: summary, isLoading } = usePreviousDaySummary(today);
  const workoutCount = (summary == null ? void 0 : summary.workout.length) ?? 0;
  const hydrationGlasses = Number((summary == null ? void 0 : summary.hydration) ?? 0n);
  const moodScore = (summary == null ? void 0 : summary.mood) ?? null;
  const tasksTotal = (summary == null ? void 0 : summary.tasks.length) ?? 0;
  const tasksDone = (summary == null ? void 0 : summary.tasks.filter((t) => t.completed).length) ?? 0;
  const totalPages = (summary == null ? void 0 : summary.reading.reduce((s, e) => s + Number(e.pages), 0)) ?? 0;
  const totalMinutesRead = (summary == null ? void 0 : summary.reading.reduce((s, e) => s + Number(e.minutes), 0)) ?? 0;
  const totalMedSecs = (summary == null ? void 0 : summary.meditation.reduce((s, e) => s + Number(e.durationSeconds), 0)) ?? 0;
  const totalMedMins = Math.round(totalMedSecs / 60);
  const noData = !isLoading && !hasAnyData(summary);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: {
        background: "linear-gradient(160deg, oklch(0.99 0 0) 0%, oklch(0.96 0.015 260) 50%, oklch(0.97 0.01 30) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "pt-12 pb-5 px-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1", children: formatDisplayDate(today) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground tracking-tight font-display", children: "Good morning ☀️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            "Here's how yesterday went —",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70 font-medium", children: formatDisplayDate(yesterday) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "section",
          {
            "data-ocid": "home.summary.section",
            className: "px-4 pb-6 grid grid-cols-2 gap-3",
            children: isLoading ? ["w1", "w2", "w3", "w4", "w5", "w6"].map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Skeleton,
              {
                "data-ocid": `home.loading_state.${i + 1}`,
                className: "h-[140px] rounded-2xl"
              },
              k
            )) : noData ? (
              // Empty state — full width
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "home.empty_state",
                  className: "col-span-2 rounded-2xl bg-card border border-border p-8 text-center shadow-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🌱" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base", children: "Every journey starts somewhere" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-snug", children: "No data logged for yesterday. Start tracking today and watch your progress grow!" })
                  ]
                }
              )
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SummaryCard,
                {
                  ocid: "home.workout.card",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DumbbellIcon, {}),
                  accent: "oklch(0.45 0.14 25)",
                  title: "Workout",
                  value: workoutCount > 0 ? `${workoutCount} exercise${workoutCount !== 1 ? "s" : ""} logged` : "No workouts logged",
                  sub: workoutCount > 0 ? "Great effort!" : "Rest day",
                  ring: { pct: workoutCount > 0 ? 100 : 0 },
                  onClick: () => onNavigate("workout")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SummaryCard,
                {
                  ocid: "home.hydration.card",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DropIcon, {}),
                  accent: "oklch(0.5 0.14 220)",
                  title: "Hydration",
                  value: hydrationGlasses > 0 ? `${hydrationGlasses} glass${hydrationGlasses !== 1 ? "es" : ""}` : "Not logged",
                  sub: hydrationGlasses >= 8 ? "Goal reached! 🎉" : hydrationGlasses > 0 ? "Goal: 8 glasses" : "",
                  ring: { pct: Math.min(hydrationGlasses / 8 * 100, 100) },
                  onClick: () => onNavigate("hydration")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SummaryCard,
                {
                  ocid: "home.mood.card",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaceIcon, {}),
                  accent: "oklch(0.58 0.12 40)",
                  title: "Mood",
                  value: moodScore != null ? `${getMoodEmoji(moodScore)} Score ${Number(moodScore)}/10` : "Not logged",
                  sub: moodScore != null ? "Reflection captured" : "How did you feel?"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SummaryCard,
                {
                  ocid: "home.tasks.card",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, {}),
                  accent: "oklch(0.5 0.1 280)",
                  title: "Tasks",
                  value: tasksTotal > 0 ? `${tasksDone}/${tasksTotal} done` : "No tasks",
                  sub: tasksTotal > 0 && tasksDone === tasksTotal ? "All complete! ✨" : tasksTotal > 0 ? `${tasksTotal - tasksDone} remaining` : "",
                  ring: tasksTotal > 0 ? { pct: tasksDone / tasksTotal * 100 } : void 0
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SummaryCard,
                {
                  ocid: "home.reading.card",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookIcon, {}),
                  accent: "oklch(0.42 0.12 240)",
                  title: "Reading",
                  value: totalPages > 0 || totalMinutesRead > 0 ? totalPages > 0 ? `${totalPages} page${totalPages !== 1 ? "s" : ""}` : `${totalMinutesRead} min` : "Not logged",
                  sub: totalPages > 0 && totalMinutesRead > 0 ? `${totalMinutesRead} min read` : totalPages > 0 ? "Keep reading!" : "",
                  onClick: () => onNavigate("reading")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SummaryCard,
                {
                  ocid: "home.meditation.card",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LotusIcon, {}),
                  accent: "oklch(0.48 0.13 145)",
                  title: "Meditation",
                  value: totalMedMins > 0 ? `${totalMedMins} min` : "No session",
                  sub: totalMedMins > 0 ? `${(summary == null ? void 0 : summary.meditation.length) ?? 0} session${((summary == null ? void 0 : summary.meditation.length) ?? 0) !== 1 ? "s" : ""}` : "Start mindful practice",
                  ring: { pct: Math.min(totalMedSecs / 900 * 100, 100) },
                  onClick: () => onNavigate("meditation")
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "px-5 py-6 text-center border-t border-border mt-2 bg-card/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ".",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
              className: "underline underline-offset-2 hover:text-foreground transition-colors",
              target: "_blank",
              rel: "noopener noreferrer",
              children: "Built with love using caffeine.ai"
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  HomePage as default
};
