module {
  public type MeditationSession = {
    id : Text;
    durationSeconds : Nat;
  };

  public type MeditationLog = {
    date : Text;
    sessions : [MeditationSession];
  };
};
