import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export interface DaySummary {
    reading: Array<ReadingEntry>;
    meditation: Array<MeditationSession>;
    tasks: Array<Task>;
    date: string;
    mood?: bigint;
    workout: Array<WorkoutEntry>;
    hydration: number;
}
export interface WorkoutEntry {
    reps: bigint;
    sets: bigint;
    category: string;
}
export interface MeditationSession {
    id: string;
    durationSeconds: bigint;
}
export interface backendInterface {
    addLitres(date: string, amount: number): Promise<void>;
    addMeditationSession(date: string, durationSeconds: bigint): Promise<void>;
    addTask(date: string, text: string): Promise<void>;
    getDailySummary(date: string): Promise<DaySummary>;
    getHydrationByDate(date: string): Promise<number>;
    getHydrationTarget(date: string): Promise<number>;
    getMeditationByDate(date: string): Promise<Array<MeditationSession>>;
    getMoodByDate(date: string): Promise<bigint | null>;
    getReadingByDate(date: string): Promise<Array<ReadingEntry>>;
    getTasksByDate(date: string): Promise<Array<Task>>;
    getWorkoutsByDate(date: string): Promise<Array<WorkoutEntry>>;
    removeLitres(date: string, amount: number): Promise<void>;
    removeMeditationSession(date: string, sessionId: string): Promise<void>;
    removeReadingEntry(date: string, category: string): Promise<void>;
    removeTask(date: string, taskId: string): Promise<void>;
    removeWorkoutEntry(date: string, category: string): Promise<void>;
    setHydration(date: string, amount: number): Promise<void>;
    setHydrationTarget(date: string, target: number): Promise<void>;
    setMood(date: string, score: bigint): Promise<void>;
    toggleTask(date: string, taskId: string): Promise<void>;
    upsertReadingEntry(date: string, category: string, pages: bigint, minutes: bigint): Promise<void>;
    upsertWorkoutEntry(date: string, category: string, reps: bigint, sets: bigint): Promise<void>;
}
