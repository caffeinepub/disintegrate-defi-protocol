import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import Migration "migration";

(with migration = Migration.run)
actor {
  type DisintegrateTokens = Nat;
  type BurnAmount = Nat;
  type BurnTransaction = (Time.Time, BurnAmount);
  type Balance = (Principal, DisintegrateTokens);

  module BurnTransaction {
    public func compare(transaction1 : BurnTransaction, transaction2 : BurnTransaction) : Order.Order {
      switch (Int.compare(transaction1.0, transaction2.0)) {
        case (#equal) { Nat.compare(transaction1.1, transaction2.1) };
        case (order) { order };
      };
    };

    public func compareByAmount(transaction1 : BurnTransaction, transaction2 : BurnTransaction) : Order.Order {
      switch (Nat.compare(transaction1.1, transaction2.1)) {
        case (#equal) { Int.compare(transaction1.0, transaction2.0) };
        case (order) { order };
      };
    };
  };

  module Balance {
    public func compare(balance1 : Balance, balance2 : Balance) : Order.Order {
      Nat.compare(balance1.1, balance2.1);
    };
  };

  let burnEvents = Map.empty<Time.Time, BurnAmount>();
  let balances = Map.empty<Principal, DisintegrateTokens>();

  public query ({ caller }) func getBalance(_principal : Principal) : async ?DisintegrateTokens {
    let balance = balances.get(caller);
    Runtime.trap("Balance for principal " # caller.toText() # " is " # debug_show (balance));
  };

  public shared ({ caller }) func claimTokens(caller : Principal, burnAmount : Nat) : async () {
    switch (balances.get(caller)) {
      case (null) {
        let newBalance = 1;
        balances.add(caller, newBalance);
      };
      case (?currentBalance) {
        let newBalance = currentBalance + 1;
        balances.add(caller, newBalance);
      };
    };
    recordBurn(burnAmount);
  };

  public query ({ caller }) func getAllBalances() : async [Balance] {
    balances.entries().toArray();
  };

  public query ({ caller }) func getAllBalancesSorted() : async [Balance] {
    balances.entries().toArray().sort();
  };

  public query ({ caller }) func getBurnAmount(time : Time.Time) : async BurnAmount {
    switch (burnEvents.get(time)) {
      case (null) { Runtime.trap("There was no burn at this time") };
      case (?burnAmount) { burnAmount };
    };
  };

  public query ({ caller }) func getAllBurnEvents() : async [BurnTransaction] {
    burnEvents.entries().toArray().sort();
  };

  public query ({ caller }) func getAllBurnEventsByAmount() : async [BurnTransaction] {
    burnEvents.entries().toArray().sort(BurnTransaction.compareByAmount);
  };

  public query ({ caller }) func getBurnEventsInRange(startTime : Time.Time, endTime : Time.Time) : async [BurnTransaction] {
    burnEvents.entries().toArray().sort().filter(func((time, _)) { time >= startTime and time <= endTime });
  };

  func recordBurn(burnAmount : BurnAmount) : () {
    let now = Time.now();
    if (now <= 0) {
      Runtime.trap("Failed to get current timestamp");
    };
    if (burnEvents.containsKey(now)) {
      Runtime.trap("Burn event with timestamp already exists - logging old burn");
    };
    burnEvents.add(now, burnAmount);
  };
};
