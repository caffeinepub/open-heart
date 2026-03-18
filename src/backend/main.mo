import List "mo:core/List";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Time "mo:core/Time";



actor {
  // DATA TYPES
  type Category = {
    #school;
    #health;
    #social;
    #personal;
    #justToday;
  };

  type Win = {
    id : Nat;
    text : Text;
    category : ?Category;
    timestamp : Time.Time;
    response : Text;
  };

  module Win {
    public func compareByTimestamp(win1 : Win, win2 : Win) : Order.Order {
      Int.compare(win2.timestamp, win1.timestamp);
    };
  };

  // STATE
  var nextId = 0;
  let wins = List.empty<Win>();

  // ENCOURAGEMENT MESSAGES
  let encouragements = [
    "That's awesome! Every win counts. 🎉",
    "Way to go, keep up the great work!",
    "You're making progress, celebrate every step!",
    "Proud of you for taking action and winning!",
    "Every small win adds up to big success!",
    "Keep it up, you're doing amazing!",
    "Your effort is inspiring, congrats on the win!",
    "Each win is a building block to greatness.",
    "Celebrate your achievements, no matter the size!",
    "You're unstoppable - keep crushing it!",
  ];

  // HELPER FUNCTIONS
  func selectRandomEncouragement() : Text {
    let time = Time.now();
    let index = Int.abs(time) % encouragements.size();
    encouragements[index];
  };

  // CORE FUNCTIONS
  public shared ({ caller }) func addWin(text : Text, category : ?Category) : async Nat {
    let id = nextId;
    nextId += 1;

    let win : Win = {
      id;
      text;
      category;
      timestamp = Time.now();
      response = selectRandomEncouragement();
    };

    wins.add(win);
    id;
  };

  public shared ({ caller }) func deleteWin(id : Nat) : async () {
    let winsCount = wins.size();
    if (id >= winsCount) {
      Runtime.trap("Win not found");
    };

    let currentWins = wins.toArray();
    if (id >= currentWins.size()) {
      Runtime.trap("Win not found");
    };

    let filteredWins = currentWins.filter(
      func(win) { win.id != id }
    );

    wins.clear();
    wins.addAll(filteredWins.values());
  };

  public query ({ caller }) func getRecentWins() : async [Win] {
    wins.toArray().sort(Win.compareByTimestamp : (Win, Win) -> Order.Order).values().take(20).toArray();
  };

  public query ({ caller }) func getWinsByCategory(category : Category) : async [Win] {
    let filtered = wins.toArray().sort(Win.compareByTimestamp : (Win, Win) -> Order.Order).filter(
      func(win) {
        switch (win.category) {
          case (null) { false };
          case (?c) { c == category };
        };
      }
    );
    filtered.values().take(20).toArray();
  };

  func internalGetWins() : [Win] {
    wins.toArray();
  };

  public query ({ caller }) func getWinCount() : async Nat {
    wins.size();
  };
};

