import Map "mo:core/Map";

module {
  public type HydrationMap = Map.Map<Text, Nat>;

  /// Returns glass count for a given date (default 0)
  public func getByDate(store : HydrationMap, date : Text) : Nat {
    switch (store.get(date)) {
      case (?n) n;
      case null 0;
    };
  };

  /// Sets the glass count for a given date (unbounded)
  public func setGlasses(store : HydrationMap, date : Text, glasses : Nat) {
    store.add(date, glasses);
  };

  /// Increments glass count for a given date by 1 (unbounded)
  public func incrementGlasses(store : HydrationMap, date : Text) {
    let current = getByDate(store, date);
    store.add(date, current + 1);
  };

  /// Decrements glass count for a given date by 1 (min 0)
  public func decrementGlasses(store : HydrationMap, date : Text) {
    let current = getByDate(store, date);
    if (current > 0) {
      store.add(date, current - 1);
    };
  };
};
