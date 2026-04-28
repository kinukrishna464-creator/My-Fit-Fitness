import WorkoutTypes "workout";
import HydrationTypes "hydration";
import MoodTypes "mood";
import ReadingTypes "reading";
import MeditationTypes "meditation";

module {
  public type DaySummary = {
    date : Text;
    workout : [WorkoutTypes.WorkoutEntry];
    hydration : Nat; // glass count
    mood : ?Nat; // score 1-5, null if not set
    tasks : [MoodTypes.Task];
    reading : [ReadingTypes.ReadingEntry];
    meditation : [MeditationTypes.MeditationSession];
  };
};
