import { createActor } from "@/backend";
import type {
  DaySummary,
  MeditationSession,
  ReadingEntry,
  Task,
  WorkoutEntry,
} from "@/types/habit";
import { formatDateKey, todayKey } from "@/utils/dateUtils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Query Keys ──────────────────────────────────────────────────────────────

const keys = {
  daySummary: (date: string) => ["daySummary", date],
  previousDay: (date: string) => ["previousDay", date],
  workout: (date: string) => ["workout", date],
  hydration: (date: string) => ["hydration", date],
  mood: (date: string) => ["mood", date],
  tasks: (date: string) => ["tasks", date],
  reading: (date: string) => ["reading", date],
  meditation: (date: string) => ["meditation", date],
};

// ─── Summary Hooks ───────────────────────────────────────────────────────────

export function useDaySummary(date: string = todayKey()) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DaySummary>({
    queryKey: keys.daySummary(date),
    queryFn: async () => {
      if (!actor)
        return {
          date,
          workout: [],
          hydration: 0n,
          tasks: [],
          reading: [],
          meditation: [],
        };
      return actor.getDailySummary(date) as Promise<DaySummary>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePreviousDaySummary(currentDate: string = todayKey()) {
  const { actor, isFetching } = useActor(createActor);
  // Compute yesterday's date from currentDate
  const [y, m, d] = currentDate.split("-").map(Number);
  const prev = new Date(y, m - 1, d);
  prev.setDate(prev.getDate() - 1);
  const prevKey = formatDateKey(prev);

  return useQuery<DaySummary | null>({
    queryKey: keys.previousDay(currentDate),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDailySummary(prevKey) as Promise<DaySummary>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Workout Hooks ───────────────────────────────────────────────────────────

export function useWorkoutLog(date: string = todayKey()) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WorkoutEntry[]>({
    queryKey: keys.workout(date),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWorkoutsByDate(date) as Promise<WorkoutEntry[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveWorkout(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry: WorkoutEntry) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.upsertWorkoutEntry(
        date,
        entry.category,
        entry.reps,
        entry.sets,
      );
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: keys.workout(date) });
      void qc.invalidateQueries({ queryKey: keys.daySummary(date) });
    },
  });
}

export function useDeleteWorkout(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (category: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.removeWorkoutEntry(date, category);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: keys.workout(date) });
    },
  });
}

// ─── Hydration Hooks ─────────────────────────────────────────────────────────

export function useHydration(date: string = todayKey()) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<bigint>({
    queryKey: keys.hydration(date),
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getHydrationByDate(date) as Promise<bigint>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIncrementHydration(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      await actor.incrementHydration(date);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: keys.hydration(date) }),
  });
}

export function useDecrementHydration(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      await actor.decrementHydration(date);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: keys.hydration(date) }),
  });
}

export function useSetHydration(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (glasses: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.setHydration(date, glasses);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: keys.hydration(date) }),
  });
}

// ─── Mood Hooks ──────────────────────────────────────────────────────────────

export function useMood(date: string = todayKey()) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<bigint | null>({
    queryKey: keys.mood(date),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMoodByDate(date) as Promise<bigint | null>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveMood(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (score: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.setMood(date, score);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: keys.mood(date) }),
  });
}

// ─── Task Hooks ──────────────────────────────────────────────────────────────

export function useTasks(date: string = todayKey()) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Task[]>({
    queryKey: keys.tasks(date),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTasksByDate(date) as Promise<Task[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTask(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (task: Task) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.addTask(date, task.text);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: keys.tasks(date) }),
  });
}

export function useToggleTask(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (taskId: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.toggleTask(date, taskId);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: keys.tasks(date) }),
  });
}

export function useDeleteTask(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (taskId: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.removeTask(date, taskId);
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: keys.tasks(date) }),
  });
}

// ─── Reading Hooks ───────────────────────────────────────────────────────────

export function useReadingLog(date: string = todayKey()) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ReadingEntry[]>({
    queryKey: keys.reading(date),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReadingByDate(date) as Promise<ReadingEntry[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveReading(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entry: ReadingEntry) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.upsertReadingEntry(
        date,
        entry.category,
        entry.pages,
        entry.minutes,
      );
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: keys.reading(date) }),
  });
}

export function useDeleteReading(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (category: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.removeReadingEntry(date, category);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: keys.reading(date) }),
  });
}

// ─── Meditation Hooks ─────────────────────────────────────────────────────────

export function useMeditationLog(date: string = todayKey()) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MeditationSession[]>({
    queryKey: keys.meditation(date),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMeditationByDate(date) as Promise<MeditationSession[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMeditation(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (session: MeditationSession) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.addMeditationSession(date, session.durationSeconds);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: keys.meditation(date) }),
  });
}

export function useDeleteMeditation(date: string = todayKey()) {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sessionId: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.removeMeditationSession(date, sessionId);
    },
    onSuccess: () =>
      void qc.invalidateQueries({ queryKey: keys.meditation(date) }),
  });
}

// ─── End of hooks ─────────────────────────────────────────────────────────────
