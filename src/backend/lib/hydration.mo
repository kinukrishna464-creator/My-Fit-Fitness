import Map "mo:core/Map";

module {
  public type HydrationMap = Map.Map<Text, Float>;
  public type TargetMap = Map.Map<Text, Float>;

  /// Returns litres consumed for a given date (default 0.0)
  public func getByDate(store : HydrationMap, date : Text) : Float {
    switch (store.get(date)) {
      case (?n) n;
      case null 0.0;
    };
  };

  /// Sets the litres consumed for a given date
  public func setLitres(store : HydrationMap, date : Text, amount : Float) {
    store.add(date, amount);
  };

  /// Adds amount to current litres for a given date
  public func addLitres(store : HydrationMap, date : Text, amount : Float) {
    let current = getByDate(store, date);
    store.add(date, current + amount);
  };

  /// Subtracts amount from current litres for a given date (min 0.0)
  public func removeLitres(store : HydrationMap, date : Text, amount : Float) {
    let current = getByDate(store, date);
    let updated = current - amount;
    store.add(date, if (updated < 0.0) 0.0 else updated);
  };

  /// Returns the daily target in litres for a given date (default 2.0)
  public func getTarget(targetStore : TargetMap, date : Text) : Float {
    switch (targetStore.get(date)) {
      case (?t) t;
      case null 2.0;
    };
  };

  /// Sets the daily target in litres for a given date
  public func setTarget(targetStore : TargetMap, date : Text, target : Float) {
    targetStore.add(date, target);
  };
};
