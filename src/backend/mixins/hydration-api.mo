import HydrationLib "../lib/hydration";

mixin (
  hydrationStore : HydrationLib.HydrationMap,
  hydrationTargetStore : HydrationLib.TargetMap,
) {
  /// Get litres consumed for a specific date
  public query func getHydrationByDate(date : Text) : async Float {
    HydrationLib.getByDate(hydrationStore, date);
  };

  /// Add litres to the current total for a specific date
  public func addLitres(date : Text, amount : Float) : async () {
    HydrationLib.addLitres(hydrationStore, date, amount);
  };

  /// Remove litres from the current total for a specific date (min 0.0)
  public func removeLitres(date : Text, amount : Float) : async () {
    HydrationLib.removeLitres(hydrationStore, date, amount);
  };

  /// Set exact litres consumed for a specific date
  public func setHydration(date : Text, amount : Float) : async () {
    HydrationLib.setLitres(hydrationStore, date, amount);
  };

  /// Get the daily hydration target in litres for a specific date
  public query func getHydrationTarget(date : Text) : async Float {
    HydrationLib.getTarget(hydrationTargetStore, date);
  };

  /// Set the daily hydration target in litres for a specific date
  public func setHydrationTarget(date : Text, target : Float) : async () {
    HydrationLib.setTarget(hydrationTargetStore, date, target);
  };
};
