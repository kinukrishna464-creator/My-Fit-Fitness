module {
  public type WorkoutEntry = {
    category : Text;
    reps : Nat;
    sets : Nat;
  };

  /// Map key: DateKey, value: [WorkoutEntry]
  public type WorkoutLog = {
    date : Text;
    entries : [WorkoutEntry];
  };
};
