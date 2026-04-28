import HydrationLib "../lib/hydration";

mixin (hydrationStore : HydrationLib.HydrationMap) {
  /// Get glass count for a specific date
  public query func getHydrationByDate(date : Text) : async Nat {
    HydrationLib.getByDate(hydrationStore, date);
  };

  /// Set glass count for a specific date (unbounded)
  public func setHydration(date : Text, glasses : Nat) : async () {
    HydrationLib.setGlasses(hydrationStore, date, glasses);
  };

  /// Increment glass count by 1 for a specific date
  public func incrementHydration(date : Text) : async () {
    HydrationLib.incrementGlasses(hydrationStore, date);
  };

  /// Decrement glass count by 1 for a specific date
  public func decrementHydration(date : Text) : async () {
    HydrationLib.decrementGlasses(hydrationStore, date);
  };
};
