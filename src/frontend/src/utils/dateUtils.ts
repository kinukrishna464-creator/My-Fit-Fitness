/**
 * Returns YYYY-MM-DD string for any Date object.
 */
export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns today's date key in YYYY-MM-DD format.
 */
export function todayKey(): string {
  return formatDateKey(new Date());
}

/**
 * Returns yesterday's date key in YYYY-MM-DD format.
 */
export function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return formatDateKey(d);
}

/**
 * Formats a YYYY-MM-DD string to a human-friendly label like "Monday, June 14"
 */
export function formatDisplayDate(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/**
 * Converts bigint seconds to a human-friendly duration string.
 */
export function formatDuration(seconds: bigint): string {
  const totalSecs = Number(seconds);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}
