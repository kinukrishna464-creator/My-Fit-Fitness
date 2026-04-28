import Time "mo:core/Time";
import Int "mo:core/Int";
import MoodLib "../lib/mood";
import MoodTypes "../types/mood";

mixin (moodStore : MoodLib.MoodMap, taskStore : MoodLib.TaskMap) {
  /// Get mood score for a specific date (null if not set)
  public query func getMoodByDate(date : Text) : async ?Nat {
    MoodLib.getMoodByDate(moodStore, date);
  };

  /// Set mood score (1-5) for a specific date
  public func setMood(date : Text, score : Nat) : async () {
    MoodLib.setMood(moodStore, date, score);
  };

  /// Get all tasks for a specific date
  public query func getTasksByDate(date : Text) : async [MoodTypes.Task] {
    MoodLib.getTasksByDate(taskStore, date);
  };

  /// Add a new task for a specific date, generating a unique id
  public func addTask(date : Text, text : Text) : async () {
    let id = Time.now().toText();
    let task : MoodTypes.Task = { id; text; completed = false };
    MoodLib.addTask(taskStore, date, task);
  };

  /// Toggle completed flag on a task
  public func toggleTask(date : Text, taskId : Text) : async () {
    MoodLib.toggleTask(taskStore, date, taskId);
  };

  /// Delete a task by id
  public func removeTask(date : Text, taskId : Text) : async () {
    MoodLib.removeTask(taskStore, date, taskId);
  };
};
