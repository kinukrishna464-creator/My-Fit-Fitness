import Map "mo:core/Map";
import Array "mo:core/Array";
import Types "../types/mood";

module {
  public type MoodMap = Map.Map<Text, Nat>;
  public type TaskMap = Map.Map<Text, [Types.Task]>;

  /// Returns mood score for a given date, null if not set
  public func getMoodByDate(store : MoodMap, date : Text) : ?Nat {
    store.get(date);
  };

  /// Sets mood score (1-5) for a given date
  public func setMood(store : MoodMap, date : Text, score : Nat) {
    store.add(date, score);
  };

  /// Returns tasks for a given date
  public func getTasksByDate(store : TaskMap, date : Text) : [Types.Task] {
    switch (store.get(date)) {
      case (?tasks) tasks;
      case null [];
    };
  };

  /// Adds a new task for a given date
  public func addTask(store : TaskMap, date : Text, task : Types.Task) {
    let existing = getTasksByDate(store, date);
    store.add(date, existing.concat([task]));
  };

  /// Toggles the completed flag on a task by id for a given date
  public func toggleTask(store : TaskMap, date : Text, taskId : Text) {
    let existing = getTasksByDate(store, date);
    let updated = existing.map(func(t : Types.Task) : Types.Task {
      if (t.id == taskId) { { t with completed = not t.completed } } else { t };
    });
    store.add(date, updated);
  };

  /// Removes a task by id for a given date
  public func removeTask(store : TaskMap, date : Text, taskId : Text) {
    let existing = getTasksByDate(store, date);
    let filtered = existing.filter(func(t : Types.Task) : Bool {
      t.id != taskId
    });
    store.add(date, filtered);
  };
};
