module {
  public type ReadingEntry = {
    category : Text;
    pages : Nat;
    minutes : Nat;
  };

  public type ReadingLog = {
    date : Text;
    entries : [ReadingEntry];
  };
};
