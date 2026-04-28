import type { backendInterface } from "../backend";

const today = new Date().toISOString().split("T")[0];

export const mockBackend: backendInterface = {
  addMeditationSession: async (_date: string, _durationSeconds: bigint) => undefined,
  addTask: async (_date: string, _text: string) => undefined,
  decrementHydration: async (_date: string) => undefined,
  getDailySummary: async (_date: string) => ({
    date: today,
    workout: [
      { category: "Push-ups", reps: BigInt(15), sets: BigInt(3) },
      { category: "Squats", reps: BigInt(20), sets: BigInt(4) },
    ],
    hydration: BigInt(6),
    mood: BigInt(4),
    tasks: [
      { id: "t1", text: "Morning journal", completed: true },
      { id: "t2", text: "Review notes", completed: false },
    ],
    reading: [
      { category: "Fiction", pages: BigInt(35), minutes: BigInt(40) },
      { category: "Non-Fiction", pages: BigInt(20), minutes: BigInt(25) },
    ],
    meditation: [
      { id: "m1", durationSeconds: BigInt(600) },
      { id: "m2", durationSeconds: BigInt(300) },
    ],
  }),
  getHydrationByDate: async (_date: string) => BigInt(6),
  getMeditationByDate: async (_date: string) => [
    { id: "m1", durationSeconds: BigInt(600) },
    { id: "m2", durationSeconds: BigInt(300) },
  ],
  getMoodByDate: async (_date: string) => BigInt(4),
  getReadingByDate: async (_date: string) => [
    { category: "Fiction", pages: BigInt(35), minutes: BigInt(40) },
    { category: "Non-Fiction", pages: BigInt(20), minutes: BigInt(25) },
  ],
  getTasksByDate: async (_date: string) => [
    { id: "t1", text: "Morning journal", completed: true },
    { id: "t2", text: "Review notes", completed: false },
    { id: "t3", text: "Drink 8 glasses of water", completed: false },
  ],
  getWorkoutsByDate: async (_date: string) => [
    { category: "Push-ups", reps: BigInt(15), sets: BigInt(3) },
    { category: "Squats", reps: BigInt(20), sets: BigInt(4) },
    { category: "Plank", reps: BigInt(1), sets: BigInt(3) },
  ],
  incrementHydration: async (_date: string) => undefined,
  removeMeditationSession: async (_date: string, _sessionId: string) => undefined,
  removeReadingEntry: async (_date: string, _category: string) => undefined,
  removeTask: async (_date: string, _taskId: string) => undefined,
  removeWorkoutEntry: async (_date: string, _category: string) => undefined,
  setHydration: async (_date: string, _glasses: bigint) => undefined,
  setMood: async (_date: string, _score: bigint) => undefined,
  toggleTask: async (_date: string, _taskId: string) => undefined,
  upsertReadingEntry: async (_date: string, _category: string, _pages: bigint, _minutes: bigint) => undefined,
  upsertWorkoutEntry: async (_date: string, _category: string, _reps: bigint, _sets: bigint) => undefined,
};
