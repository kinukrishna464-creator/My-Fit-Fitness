export interface WorkoutEntry {
  reps: bigint;
  sets: bigint;
  category: string;
}

export interface HydrationLog {
  date: string;
  glasses: bigint;
  targetGlasses: number;
}

export interface MoodLog {
  date: string;
  score: bigint;
  notes?: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface ReadingEntry {
  minutes: bigint;
  category: string;
  pages: bigint;
}

export interface MeditationSession {
  id: string;
  durationSeconds: bigint;
}

export interface DaySummary {
  date: string;
  workout: WorkoutEntry[];
  hydration: bigint;
  mood?: bigint;
  tasks: Task[];
  reading: ReadingEntry[];
  meditation: MeditationSession[];
}

export type TabId =
  | "home"
  | "workout"
  | "hydration"
  | "mood"
  | "reading"
  | "meditation";

export interface NavTab {
  id: TabId;
  label: string;
}
