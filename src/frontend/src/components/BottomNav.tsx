import type { TabId } from "@/types/habit";
import type { FC } from "react";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function WorkoutIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      aria-hidden="true"
      strokeWidth={1.75}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {active ? (
        <>
          <rect
            x="2"
            y="10"
            width="4"
            height="4"
            rx="1"
            fill="currentColor"
            stroke="none"
          />
          <rect
            x="18"
            y="10"
            width="4"
            height="4"
            rx="1"
            fill="currentColor"
            stroke="none"
          />
          <rect
            x="5"
            y="7"
            width="3"
            height="10"
            rx="1"
            fill="currentColor"
            stroke="none"
          />
          <rect
            x="16"
            y="7"
            width="3"
            height="10"
            rx="1"
            fill="currentColor"
            stroke="none"
          />
          <rect
            x="8"
            y="9"
            width="8"
            height="6"
            rx="1"
            fill="currentColor"
            stroke="none"
          />
        </>
      ) : (
        <>
          <rect x="2" y="10" width="4" height="4" rx="1" />
          <rect x="18" y="10" width="4" height="4" rx="1" />
          <rect x="5" y="7" width="3" height="10" rx="1" />
          <rect x="16" y="7" width="3" height="10" rx="1" />
          <rect x="8" y="9" width="8" height="6" rx="1" />
        </>
      )}
    </svg>
  );
}

function HydrationIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      aria-hidden="true"
      strokeWidth={1.75}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {active ? (
        <path
          d="M12 2C12 2 5 10.5 5 15a7 7 0 0 0 14 0c0-4.5-7-13-7-13Z"
          fill="currentColor"
          stroke="none"
        />
      ) : (
        <path d="M12 2C12 2 5 10.5 5 15a7 7 0 0 0 14 0c0-4.5-7-13-7-13Z" />
      )}
    </svg>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      aria-hidden="true"
      strokeWidth={1.75}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M3 11L12 3l9 8v9a1 1 0 0 1-1 1H15v-5h-6v5H4a1 1 0 0 1-1-1v-9Z"
        fill={active ? "currentColor" : "none"}
        stroke={active ? "none" : "currentColor"}
      />
    </svg>
  );
}

function ReadingIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      aria-hidden="true"
      strokeWidth={1.75}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M4 4h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4V4Zm16 0h-7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7V4Z"
        fill={active ? "currentColor" : "none"}
        stroke={active ? "none" : "currentColor"}
      />
    </svg>
  );
}

function MeditationIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      aria-hidden="true"
      strokeWidth={1.75}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="5"
        r="2"
        fill={active ? "currentColor" : "none"}
        stroke={active ? "none" : "currentColor"}
      />
      <path
        d="M7 13c0-2.8 2.2-5 5-5s5 2.2 5 5"
        fill="none"
        stroke="currentColor"
      />
      <path d="M5 13h14" stroke="currentColor" strokeWidth={1.75} />
      <path
        d="M7 13l-3 4h16l-3-4"
        fill={active ? "currentColor" : "none"}
        stroke={active ? "none" : "currentColor"}
      />
    </svg>
  );
}

function MoodIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6"
      aria-hidden="true"
      strokeWidth={1.75}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill={active ? "currentColor" : "none"}
        stroke={active ? "none" : "currentColor"}
      />
      {active ? (
        <>
          <circle cx="9" cy="10.5" r="1" fill="white" stroke="none" />
          <circle cx="15" cy="10.5" r="1" fill="white" stroke="none" />
          <path
            d="M8.5 15c.9 1.3 2.2 2 3.5 2s2.6-.7 3.5-2"
            stroke="white"
            strokeWidth={1.75}
            fill="none"
          />
        </>
      ) : (
        <>
          <circle cx="9" cy="10.5" r="1" fill="currentColor" />
          <circle cx="15" cy="10.5" r="1" fill="currentColor" />
          <path d="M8.5 15c.9 1.3 2.2 2 3.5 2s2.6-.7 3.5-2" />
        </>
      )}
    </svg>
  );
}

// ─── Tab Config ───────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string; Icon: FC<{ active: boolean }> }[] = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "workout", label: "Workout", Icon: WorkoutIcon },
  { id: "hydration", label: "Water", Icon: HydrationIcon },
  { id: "mood", label: "Mood", Icon: MoodIcon },
  { id: "reading", label: "Reading", Icon: ReadingIcon },
  { id: "meditation", label: "Zen", Icon: MeditationIcon },
];

const ACTIVE_COLORS: Record<TabId, string> = {
  home: "text-foreground",
  workout: "text-[oklch(0.35_0.06_20)]",
  hydration: "text-[oklch(0.5_0.1_220)]",
  mood: "text-[oklch(0.55_0.1_50)]",
  reading: "text-[oklch(0.32_0.08_260)]",
  meditation: "text-[oklch(0.48_0.12_140)]",
};

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      data-ocid="bottom_nav"
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border"
      style={{ height: 64, paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch h-full max-w-md mx-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const colorClass = isActive
            ? ACTIVE_COLORS[tab.id]
            : "text-muted-foreground";
          return (
            <button
              key={tab.id}
              type="button"
              data-ocid={`bottom_nav.${tab.id}.tab`}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 transition-smooth ${colorClass} active:scale-90`}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <tab.Icon active={isActive} />
              <span
                className={`text-[10px] font-medium leading-none ${isActive ? "opacity-100" : "opacity-60"}`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
