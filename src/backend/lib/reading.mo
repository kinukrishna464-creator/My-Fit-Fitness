import Map "mo:core/Map";
import Array "mo:core/Array";
import Types "../types/reading";

module {
  public type ReadingMap = Map.Map<Text, [Types.ReadingEntry]>;

  /// Returns all reading entries for a given date
  public func getByDate(store : ReadingMap, date : Text) : [Types.ReadingEntry] {
    switch (store.get(date)) {
      case (?entries) entries;
      case null [];
    };
  };

  /// Upserts a reading entry (by category) for a given date
  public func upsertEntry(store : ReadingMap, date : Text, entry : Types.ReadingEntry) {
    let existing = getByDate(store, date);
    let filtered = existing.filter(func(e : Types.ReadingEntry) : Bool {
      e.category != entry.category
    });
    store.add(date, filtered.concat([entry]));
  };

  /// Removes a reading entry by category for a given date
  public func removeEntry(store : ReadingMap, date : Text, category : Text) {
    let existing = getByDate(store, date);
    let filtered = existing.filter(func(e : Types.ReadingEntry) : Bool {
      e.category != category
    });
    store.add(date, filtered);
  };
};
