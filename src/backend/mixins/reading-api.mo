import ReadingLib "../lib/reading";
import ReadingTypes "../types/reading";

mixin (readingStore : ReadingLib.ReadingMap) {
  /// Get all reading entries for a specific date
  public query func getReadingByDate(date : Text) : async [ReadingTypes.ReadingEntry] {
    ReadingLib.getByDate(readingStore, date);
  };

  /// Upsert a reading entry (pages+minutes for a category) on a specific date
  public func upsertReadingEntry(date : Text, category : Text, pages : Nat, minutes : Nat) : async () {
    ReadingLib.upsertEntry(readingStore, date, { category; pages; minutes });
  };

  /// Remove a reading category entry from a specific date
  public func removeReadingEntry(date : Text, category : Text) : async () {
    ReadingLib.removeEntry(readingStore, date, category);
  };
};
