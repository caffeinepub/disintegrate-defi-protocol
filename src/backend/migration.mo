import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  type OldActor = {
    burnEvents : Map.Map<Time.Time, Nat>;
    balances : Map.Map<Principal, Nat>;
  };

  public func run(old : OldActor) : OldActor {
    old;
  };
};
