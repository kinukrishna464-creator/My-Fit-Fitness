module {
  public type MoodLog = {
    date : Text;
    score : Nat; // 1-5
  };

  public type Task = {
    id : Text;
    text : Text;
    completed : Bool;
  };

  public type TaskLog = {
    date : Text;
    tasks : [Task];
  };
};
