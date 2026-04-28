import WorkoutLib "../lib/workout";
import WorkoutTypes "../types/workout";

mixin (workoutStore : WorkoutLib.WorkoutMap) {
  /// Get all workout entries for a specific date
  public query func getWorkoutsByDate(date : Text) : async [WorkoutTypes.WorkoutEntry] {
    WorkoutLib.getByDate(workoutStore, date);
  };

  /// Upsert a workout entry (reps+sets for a category) on a specific date
  public func upsertWorkoutEntry(date : Text, category : Text, reps : Nat, sets : Nat) : async () {
    WorkoutLib.upsertEntry(workoutStore, date, { category; reps; sets });
  };

  /// Remove a workout category entry from a specific date
  public func removeWorkoutEntry(date : Text, category : Text) : async () {
    WorkoutLib.removeEntry(workoutStore, date, category);
  };
};
