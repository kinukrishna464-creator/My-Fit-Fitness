import Map "mo:core/Map";
import WorkoutTypes "types/workout";
import MoodTypes "types/mood";
import ReadingTypes "types/reading";
import MeditationTypes "types/meditation";

import WorkoutApi "mixins/workout-api";
import HydrationApi "mixins/hydration-api";
import MoodApi "mixins/mood-api";
import ReadingApi "mixins/reading-api";
import MeditationApi "mixins/meditation-api";
import SummaryApi "mixins/summary-api";

actor {
  let workoutStore : Map.Map<Text, [WorkoutTypes.WorkoutEntry]> = Map.empty<Text, [WorkoutTypes.WorkoutEntry]>();
  let hydrationStore : Map.Map<Text, Nat> = Map.empty<Text, Nat>();
  let moodStore : Map.Map<Text, Nat> = Map.empty<Text, Nat>();
  let taskStore : Map.Map<Text, [MoodTypes.Task]> = Map.empty<Text, [MoodTypes.Task]>();
  let readingStore : Map.Map<Text, [ReadingTypes.ReadingEntry]> = Map.empty<Text, [ReadingTypes.ReadingEntry]>();
  let meditationStore : Map.Map<Text, [MeditationTypes.MeditationSession]> = Map.empty<Text, [MeditationTypes.MeditationSession]>();

  include WorkoutApi(workoutStore);
  include HydrationApi(hydrationStore);
  include MoodApi(moodStore, taskStore);
  include ReadingApi(readingStore);
  include MeditationApi(meditationStore);
  include SummaryApi(workoutStore, hydrationStore, moodStore, taskStore, readingStore, meditationStore);
};
