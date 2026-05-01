import Map "mo:core/Map";

module {
  // Old stable state: hydrationStore was Map<Text, Nat> (glass count)
  type OldActor = {
    hydrationStore : Map.Map<Text, Nat>;
  };

  // New stable state: hydrationStore is Map<Text, Float> (litres), hydrationTargetStore added
  type NewActor = {
    hydrationStore : Map.Map<Text, Float>;
    hydrationTargetStore : Map.Map<Text, Float>;
  };

  public func run(old : OldActor) : NewActor {
    // Convert glass count (Nat) to litres (Float) at 0.25 L per glass
    let hydrationStore = old.hydrationStore.map(
      func(_date, glasses) { glasses.toFloat() * 0.25 }
    );
    let hydrationTargetStore : Map.Map<Text, Float> = Map.empty();
    { hydrationStore; hydrationTargetStore };
  };
};
