import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddMeditation,
  useDeleteMeditation,
  useMeditationLog,
} from "@/hooks/useHabitBackend";
import { formatDuration, todayKey } from "@/utils/dateUtils";
import { useEffect, useRef, useState } from "react";

// ── constants ──────────────────────────────────────────────────────────────────

const PRESETS = [
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "15 min", seconds: 900 },
  { label: "20 min", seconds: 1200 },
];

const CIRCLE_R = 54;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

type TimerState = "idle" | "running" | "paused" | "completed";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function padTwo(n: number): string {
  return String(n).padStart(2, "0");
}

// ── MountainLandscape ─────────────────────────────────────────────────────────

function MountainLandscape() {
  return (
    <svg
      viewBox="0 0 390 160"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
      className="w-full"
    >
      {/* Far mountains — lightest */}
      <polygon
        points="0,160 60,80 130,130 200,65 270,115 340,72 390,105 390,160"
        fill="oklch(0.72 0.09 140)"
      />
      {/* Mid mountains — medium */}
      <polygon
        points="0,160 40,105 100,145 160,90 240,135 310,88 370,118 390,110 390,160"
        fill="oklch(0.66 0.10 138)"
      />
      {/* Foreground hills — darkest */}
      <polygon
        points="0,160 0,145 50,128 110,148 170,120 230,145 290,118 360,140 390,130 390,160"
        fill="oklch(0.60 0.12 136)"
      />
      {/* Moon */}
      <circle
        cx="330"
        cy="30"
        r="14"
        fill="oklch(0.97 0.02 80)"
        opacity="0.9"
      />
      {/* Small cloud left */}
      <ellipse cx="80" cy="45" rx="24" ry="9" fill="white" opacity="0.55" />
      <ellipse cx="96" cy="40" rx="16" ry="8" fill="white" opacity="0.55" />
      {/* Small cloud right */}
      <ellipse cx="250" cy="52" rx="20" ry="7" fill="white" opacity="0.45" />
      <ellipse cx="264" cy="47" rx="12" ry="6" fill="white" opacity="0.45" />
    </svg>
  );
}

// ── CircularTimer ─────────────────────────────────────────────────────────────

interface CircularTimerProps {
  remaining: number;
  total: number;
  state: TimerState;
  flash: boolean;
}

function CircularTimer({ remaining, total, state, flash }: CircularTimerProps) {
  const progress = total > 0 ? remaining / total : 1;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: 220,
        height: 220,
        transition: flash ? "none" : undefined,
        filter: flash ? "brightness(1.6)" : "brightness(1)",
      }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.88 0.14 80 / 0.3) 0%, transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 128 128"
        className="absolute inset-0 w-full h-full -rotate-90"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="64"
          cy="64"
          r={CIRCLE_R}
          strokeWidth="5"
          stroke="oklch(0.55 0.10 140)"
          fill="none"
        />
        {/* Progress arc */}
        <circle
          cx="64"
          cy="64"
          r={CIRCLE_R}
          strokeWidth="5"
          stroke="url(#goldGrad)"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: dashOffset,
            transition:
              state === "running" ? "stroke-dashoffset 1s linear" : "none",
          }}
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.78 0.16 75)" />
            <stop offset="100%" stopColor="oklch(0.88 0.14 80)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Inner circle background */}
      <div
        className="absolute rounded-full"
        style={{
          width: 174,
          height: 174,
          background: "oklch(0.55 0.10 140 / 0.45)",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Time display */}
      <div className="relative z-10 flex flex-col items-center select-none">
        {state === "completed" ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl">🌿</span>
            <span className="text-white font-display font-semibold text-base leading-tight text-center px-4">
              Session Complete!
            </span>
          </div>
        ) : (
          <>
            <span
              className="font-mono font-bold text-white tabular-nums"
              style={{ fontSize: 44, letterSpacing: 2 }}
            >
              {padTwo(mins)}:{padTwo(secs)}
            </span>
            <span className="text-white/60 text-xs mt-1 font-body">
              {state === "running"
                ? "Breathe…"
                : state === "paused"
                  ? "Paused"
                  : "Ready"}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

// ── MeditationPage ────────────────────────────────────────────────────────────

export default function MeditationPage() {
  const today = todayKey();
  const { data: sessions = [], isLoading } = useMeditationLog(today);
  const addSession = useAddMeditation(today);
  const deleteSession = useDeleteMeditation(today);

  const [selectedPreset, setSelectedPreset] = useState(PRESETS[1]); // 10 min default
  const [timerState, setTimerState] = useState<TimerState>("idle");
  const [remaining, setRemaining] = useState(PRESETS[1].seconds);
  const [flash, setFlash] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalRef = useRef(PRESETS[1].seconds);

  // Keep a ref to handleComplete so the setInterval closure always calls latest version
  const handleCompleteRef = useRef<(totalSeconds: number) => void>(() => {});

  function handleComplete(totalSeconds: number) {
    setTimerState("completed");
    // Visual flash
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
    // Save to backend
    addSession.mutate({
      id: generateId(),
      durationSeconds: BigInt(totalSeconds),
    });
  }

  // Keep ref in sync with latest version of handleComplete
  handleCompleteRef.current = handleComplete;

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Countdown logic
  useEffect(() => {
    if (timerState === "running") {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            handleCompleteRef.current(totalRef.current);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
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

  function selectPreset(preset: (typeof PRESETS)[0]) {
    if (timerState !== "idle") return;
    setSelectedPreset(preset);
    setRemaining(preset.seconds);
  }

  const totalSecs = sessions.reduce((s, e) => s + Number(e.durationSeconds), 0);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "var(--meditation-bg)" }}
    >
      {/* Header */}
      <header className="px-5 pt-12 pb-2 flex-none">
        <h1 className="text-2xl font-bold font-display text-foreground">
          Meditation
        </h1>
        <p className="text-foreground/50 text-sm mt-0.5">{today}</p>
        {totalSecs > 0 && (
          <p
            className="text-foreground/60 text-xs mt-1"
            data-ocid="meditation.daily_total"
          >
            Today: {Math.round(totalSecs / 60)} min · {sessions.length} session
            {sessions.length !== 1 ? "s" : ""}
          </p>
        )}
      </header>

      {/* Preset duration buttons */}
      <section
        data-ocid="meditation.presets.section"
        className="flex justify-center gap-2 px-5 pt-5 pb-2"
      >
        {PRESETS.map((p) => (
          <button
            key={p.seconds}
            type="button"
            data-ocid={`meditation.preset.${p.label.replace(" ", "_")}`}
            onClick={() => selectPreset(p)}
            disabled={timerState !== "idle"}
            className="px-3 py-1.5 rounded-full text-sm font-semibold font-body transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:opacity-50"
            style={{
              background:
                selectedPreset.seconds === p.seconds
                  ? "oklch(0.78 0.16 75)"
                  : "oklch(0.60 0.10 138 / 0.55)",
              color:
                selectedPreset.seconds === p.seconds
                  ? "oklch(0.18 0.04 60)"
                  : "oklch(0.97 0.01 0)",
              boxShadow:
                selectedPreset.seconds === p.seconds
                  ? "0 2px 8px oklch(0.78 0.16 75 / 0.45)"
                  : "none",
            }}
          >
            {p.label}
          </button>
        ))}
      </section>

      {/* Timer */}
      <section
        data-ocid="meditation.timer.section"
        className="flex flex-col items-center justify-center py-8 flex-none"
        style={{
          transition: "filter 0.3s ease",
          filter: flash ? "brightness(1.5)" : "brightness(1)",
        }}
      >
        <CircularTimer
          remaining={remaining}
          total={selectedPreset.seconds}
          state={timerState}
          flash={flash}
        />
      </section>

      {/* Controls */}
      <section
        data-ocid="meditation.controls.section"
        className="flex justify-center gap-3 px-5 pb-4"
      >
        {timerState === "idle" && (
          <Button
            data-ocid="meditation.start.primary_button"
            onClick={handleStart}
            className="px-10 rounded-full font-semibold shadow-md"
            style={{
              background: "white",
              color: "oklch(0.25 0.03 140)",
              border: "none",
            }}
          >
            Start
          </Button>
        )}

        {timerState === "running" && (
          <Button
            data-ocid="meditation.stop.primary_button"
            onClick={handleStop}
            variant="outline"
            className="px-8 rounded-full font-semibold border-2"
            style={{
              background: "white",
              color: "oklch(0.25 0.03 140)",
              borderColor: "oklch(0.60 0.10 138)",
            }}
          >
            Stop
          </Button>
        )}

        {timerState === "completed" && (
          <Button
            data-ocid="meditation.reset.primary_button"
            onClick={handleReset}
            className="px-10 rounded-full font-semibold shadow-md"
            style={{
              background: "white",
              color: "oklch(0.25 0.03 140)",
              border: "none",
            }}
          >
            New Session
          </Button>
        )}
      </section>

      {/* Spacer to push mountain to bottom */}
      <div className="flex-1" />

      {/* Session history */}
      {(isLoading || sessions.length > 0) && (
        <section
          data-ocid="meditation.sessions.list"
          className="px-4 pb-4 mx-0 max-h-52 overflow-y-auto"
        >
          <h2 className="text-foreground/70 text-xs font-semibold uppercase tracking-widest mb-2 px-1">
            Today's Sessions
          </h2>
          {isLoading
            ? ["sk1", "sk2"].map((k) => (
                <Skeleton
                  key={k}
                  className="h-12 rounded-2xl mb-2"
                  style={{ background: "oklch(0.55 0.10 140 / 0.35)" }}
                />
              ))
            : sessions.map((session, i) => (
                <div
                  key={session.id}
                  data-ocid={`meditation.session.item.${i + 1}`}
                  className="rounded-2xl px-4 py-3 mb-2 flex items-center justify-between"
                  style={{ background: "oklch(0.60 0.10 138 / 0.45)" }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-base">🧘</span>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        Session {i + 1}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-none ml-2">
                    <Badge
                      data-ocid={`meditation.duration_badge.${i + 1}`}
                      className="rounded-full text-xs font-semibold"
                      style={{
                        background: "oklch(0.78 0.16 75 / 0.85)",
                        color: "oklch(0.18 0.04 60)",
                        border: "none",
                      }}
                    >
                      {formatDuration(session.durationSeconds)}
                    </Badge>
                    <button
                      type="button"
                      data-ocid={`meditation.delete_button.${i + 1}`}
                      onClick={() => deleteSession.mutate(session.id)}
                      aria-label="Remove session"
                      className="text-white/40 hover:text-white/80 transition-colors p-1 rounded-full"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                        aria-hidden="true"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
        </section>
      )}

      {sessions.length === 0 && !isLoading && timerState === "idle" && (
        <div
          data-ocid="meditation.empty_state"
          className="text-center pb-4 px-5"
        >
          <p className="text-foreground/40 text-xs">
            No sessions logged today. Start your first session above.
          </p>
        </div>
      )}

      {/* Mountain landscape pinned to bottom */}
      <div
        className="w-full flex-none pointer-events-none"
        aria-hidden="true"
        style={{ marginBottom: -2 }}
      >
        <MountainLandscape />
      </div>
    </div>
  );
}
