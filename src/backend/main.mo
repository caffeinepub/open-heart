import List "mo:core/List";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

actor {
  // DATA TYPES
  type Mood = {
    #happy;
    #okay;
    #sad;
    #anxious;
    #overwhelmed;
  };

  type Entry = {
    id : Nat;
    nickname : ?Text;
    mood : Mood;
    text : Text;
    timestamp : Time.Time;
    response : Text;
  };

  module Entry {
    public func compareByTimestamp(entry1 : Entry, entry2 : Entry) : Order.Order {
      Int.compare(entry2.timestamp, entry1.timestamp);
    };
  };

  // STATE
  var nextId = 0;
  let entries = List.empty<Entry>();

  // TEMPLATES
  let happyResponses = [
    "Your happiness is contagious! Keep shining bright.",
    "It's wonderful to hear you're feeling happy! Remember, every day is a new opportunity for joy.",
    "Celebrate your happy moments, big or small. You deserve it!",
    "Happiness looks good on you! Keep spreading smiles.",
    "Cherish these joyful moments – they are the building blocks of a positive life.",
  ];

  let okayResponses = [
    "It's okay to have those 'just okay' days. Remember to be kind to yourself.",
    "Being 'okay' is perfectly normal. You're doing great, even if it doesn't always feel that way.",
    "Your feelings are valid, whether you feel okay or not. Take things at your own pace.",
    "Remember, it's okay to be okay. Growth happens in these moments too.",
    "It's important to care for yourself, especially on the 'okay' days. You're not alone.",
  ];

  let sadResponses = [
    "I'm here for you. It's okay to feel sad sometimes. Let yourself feel and process your emotions.",
    "Remember, it's okay to ask for help. You're not alone in this.",
    "Sadness is a part of life, but it doesn't define you. Brighter days are ahead.",
    "Take time to care for yourself. You are important and your feelings matter.",
    "You are stronger than you think. This sad moment is just a chapter, not the whole story.",
  ];

  let anxiousResponses = [
    "Anxiety can be overwhelming, but you have the strength to get through it.",
    "Take deep breaths and remind yourself that this feeling will pass.",
    "It's okay to slow down and take things one step at a time.",
    "Remember, your mental health matters. Take breaks when you need them.",
    "You are resilient. These anxious moments will pass, and you will find calm again.",
  ];

  let overwhelmedResponses = [
    "When everything feels like too much, remember to take things one small step at a time.",
    "It's okay to ask for help and take breaks when you need them.",
    "You are doing the best you can, and that's enough. Be gentle with yourself.",
    "Remember, you don't have to do it all at once. Prioritize your well-being.",
    "This overwhelmed feeling is temporary. You are capable of handling challenges.",
  ];

  // HELPER FUNCTIONS
  func selectRandomResponse(responses : [Text]) : Text {
    let time = Time.now();
    let index = Int.abs(time) % responses.size();
    responses[index];
  };

  func generateResponse(mood : Mood) : Text {
    switch (mood) {
      case (#happy) { selectRandomResponse(happyResponses) };
      case (#okay) { selectRandomResponse(okayResponses) };
      case (#sad) { selectRandomResponse(sadResponses) };
      case (#anxious) { selectRandomResponse(anxiousResponses) };
      case (#overwhelmed) { selectRandomResponse(overwhelmedResponses) };
    };
  };

  // CORE FUNCTIONS
  public shared ({ caller }) func addEntry(nickname : ?Text, mood : Mood, text : Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let entry : Entry = {
      id;
      nickname;
      mood;
      text;
      timestamp = Time.now();
      response = generateResponse(mood);
    };

    entries.add(entry);
    id;
  };

  public shared ({ caller }) func deleteEntry(id : Nat) : async () {
    let entryCount = entries.size();
    if (id >= entryCount) {
      Runtime.trap("Entry not found");
    };

    let currentEntries = entries.toArray();
    if (id >= currentEntries.size()) {
      Runtime.trap("Entry not found");
    };

    let filteredEntries = currentEntries.filter(
      func(entry) { entry.id != id }
    );

    entries.clear();
    entries.addAll(filteredEntries.values());
  };

  public query ({ caller }) func getRecentEntries() : async [Entry] {
    entries.toArray().sort(Entry.compareByTimestamp : (Entry, Entry) -> Order.Order).values().take(20).toArray();
  };

  public query ({ caller }) func getEntriesByNickname(nickname : Text) : async [Entry] {
    let filtered = entries.toArray().sort(Entry.compareByTimestamp : (Entry, Entry) -> Order.Order).filter(
      func(entry) {
        switch (entry.nickname) {
          case (null) { false };
          case (?n) { n == nickname };
        };
      }
    );
    filtered.values().take(20).toArray();
  };

  func internalGetEntries() : [Entry] {
    entries.toArray();
  };

  public query ({ caller }) func getEntryCount() : async Nat {
    entries.size();
  };
};
