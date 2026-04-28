import Time "mo:core/Time";
import MeditationLib "../lib/meditation";
import MeditationTypes "../types/meditation";

mixin (meditationStore : MeditationLib.MeditationMap) {
  /// Get all meditation sessions for a specific date
  public query func getMeditationByDate(date : Text) : async [MeditationTypes.MeditationSession] {
    MeditationLib.getByDate(meditationStore, date);
  };

  /// Add a meditation session for a specific date, generating a unique id
  public func addMeditationSession(date : Text, durationSeconds : Nat) : async () {
    let id = Time.now().toText();
    let session : MeditationTypes.MeditationSession = { id; durationSeconds };
    MeditationLib.addSession(meditationStore, date, session);
  };

  /// Remove a meditation session by id from a specific date
  public func removeMeditationSession(date : Text, sessionId : Text) : async () {
    MeditationLib.removeSession(meditationStore, date, sessionId);
  };
};
