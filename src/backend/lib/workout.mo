import Map "mo:core/Map";
import Array "mo:core/Array";
import Types "../types/workout";

module {
  public type WorkoutMap = Map.Map<Text, [Types.WorkoutEntry]>;

  /// Returns all workout entries for a given date
  public func getByDate(store : WorkoutMap, date : Text) : [Types.WorkoutEntry] {
    switch (store.get(date)) {
      case (?entries) entries;
      case null [];
    };
  };

  /// Sets workout entries for a date+category, merging into the day's list
  public func upsertEntry(store : WorkoutMap, date : Text, entry : Types.WorkoutEntry) {
    let existing = getByDate(store, date);
    let filtered = existing.filter(func(e : Types.WorkoutEntry) : Bool {
      e.category != entry.category
    });
    store.add(date, filtered.concat([entry]));
  };

  /// Removes a specific category entry from a date
  public func removeEntry(store : WorkoutMap, date : Text, category : Text) {
    let existing = getByDate(store, date);
    let filtered = existing.filter(func(e : Types.WorkoutEntry) : Bool {
      e.category != category
    });
    store.add(date, filtered);
  };
};
