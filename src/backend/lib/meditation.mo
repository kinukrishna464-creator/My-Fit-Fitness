import Map "mo:core/Map";
import Array "mo:core/Array";
import Types "../types/meditation";

module {
  public type MeditationMap = Map.Map<Text, [Types.MeditationSession]>;

  /// Returns all meditation sessions for a given date
  public func getByDate(store : MeditationMap, date : Text) : [Types.MeditationSession] {
    switch (store.get(date)) {
      case (?sessions) sessions;
      case null [];
    };
  };

  /// Adds a meditation session for a given date
  public func addSession(store : MeditationMap, date : Text, session : Types.MeditationSession) {
    let existing = getByDate(store, date);
    store.add(date, existing.concat([session]));
  };

  /// Removes a meditation session by id for a given date
  public func removeSession(store : MeditationMap, date : Text, sessionId : Text) {
    let existing = getByDate(store, date);
    let filtered = existing.filter(func(s : Types.MeditationSession) : Bool {
      s.id != sessionId
    });
    store.add(date, filtered);
  };
};
