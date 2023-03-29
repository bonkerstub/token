import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

  let owner : Principal = Principal.fromText("7wsj2-apxc3-wbb74-yfggs-cpxtu-aehj4-hly3y-yvuld-uimss-tb2yb-nqe");
  let totalSupply : Nat = 1000000000;
  let symbol : Text = "TUB";

  private stable var balanceEntries : [(Principal, Nat)] = [];

  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

  // Empty balance means program is fresh, this happens on fresh build
  if (balances.size() < 1) {
      balances.put(owner, totalSupply);
  };

  public query func balanceOf(who: Principal) : async Nat {
    
    let balance : Nat = switch (balances.get(who)) {
        case null 0;
        case (?result) result;
    };

    return balance;
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared(msg) func payOut() : async Text {
    //Debug.print(debug_show(msg.caller));
    let amount = 10000;
    Debug.print(debug_show(msg.caller));

    if (balances.get(msg.caller) == null) {
        let result = await transfer(msg.caller, amount);
        return result;
    } else {
        return "Already Claimed";
    }

  };
    
  // From is whoever is calling this function
  public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
    Debug.print(debug_show(msg));
    Debug.print(debug_show(to));
    let fromBalance = await balanceOf(msg.caller);
    let toBalance = await balanceOf(to);

    if (fromBalance > amount) {
        let newFromBalance: Nat = fromBalance - amount;
        let newToBalance: Nat = toBalance + amount;

        balances.put(msg.caller, newFromBalance);
        balances.put(to, newToBalance);

        return "Success";
    } else {
        return "Inefficient funds";
    }

  };

  system func preupgrade() {
    // Runs before upgrade, save hashmap to stable variable
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade() {
    // Runs after upgrade, take stable array and move it into a hashmap
    balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
    
    // Empty balance means program is fresh
    if (balances.size() < 1) {
        balances.put(owner, totalSupply);
    };
  };
}