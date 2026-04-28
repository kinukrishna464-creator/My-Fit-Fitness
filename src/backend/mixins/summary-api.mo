import WorkoutLib "../lib/workout";
import HydrationLib "../lib/hydration";
import MoodLib "../lib/mood";
import ReadingLib "../lib/reading";
import MeditationLib "../lib/meditation";
import SummaryTypes "../types/summary";

mixin (
  workoutStore : WorkoutLib.WorkoutMap,
  hydrationStore : HydrationLib.HydrationMap,
  moodStore : MoodLib.MoodMap,
  taskStore : MoodLib.TaskMap,
  readingStore : ReadingLib.ReadingMap,
  meditationStore : MeditationLib.MeditationMap,
) {
  /// Get full day summary for a specific date (used on home screen)
  public query func getDailySummary(date : Text) : async SummaryTypes.DaySummary {
    {
      date;
      workout = WorkoutLib.getByDate(workoutStore, date);
      hydration = HydrationLib.getByDate(hydrationStore, date);
      mood = MoodLib.getMoodByDate(moodStore, date);
      tasks = MoodLib.getTasksByDate(taskStore, date);
      reading = ReadingLib.getByDate(readingStore, date);
      meditation = MeditationLib.getByDate(meditationStore, date);
    };
  };
};
