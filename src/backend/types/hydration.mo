module {
  public type HydrationLog = {
    date : Text;
    litres : Float; // litres consumed (e.g. 0.25 per cup)
    targetLitres : Float; // daily target in litres (default 2.0)
  };
};
