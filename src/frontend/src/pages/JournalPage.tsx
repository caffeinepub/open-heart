import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Leaf, Send, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Mood,
  useAddEntry,
  useDeleteEntry,
  useRecentEntries,
} from "../hooks/useQueries";
import type { Entry } from "../hooks/useQueries";

const MOODS: { value: Mood; emoji: string; label: string }[] = [
  { value: Mood.happy, emoji: "😊", label: "Happy" },
  { value: Mood.okay, emoji: "😌", label: "Okay" },
  { value: Mood.sad, emoji: "😔", label: "Sad" },
  { value: Mood.anxious, emoji: "😰", label: "Anxious" },
  { value: Mood.overwhelmed, emoji: "😵", label: "Overwhelmed" },
];

function formatTime(nanos: bigint): string {
  const ms = Number(nanos / BigInt(1_000_000));
  const date = new Date(ms);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return date.toLocaleDateString("en", { weekday: "short" });
  return date.toLocaleDateString("en", { month: "short", day: "numeric" });
}

function getMoodEmoji(mood: Mood): string {
  return MOODS.find((m) => m.value === mood)?.emoji ?? "😶";
}

export default function JournalPage() {
  const [nickname, setNickname] = useState<string>(
    () => localStorage.getItem("bloom_nickname") ?? "",
  );
  const [nicknameInput, setNicknameInput] = useState(nickname);
  const [showNicknamePrompt, setShowNicknamePrompt] = useState(!nickname);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [text, setText] = useState("");
  const [latestEntry, setLatestEntry] = useState<Entry | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const { data: entries = [], isLoading: entriesLoading } = useRecentEntries();
  const addEntry = useAddEntry();
  const deleteEntry = useDeleteEntry();

  useEffect(() => {
    if (latestEntry != null && responseRef.current) {
      responseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [latestEntry]);

  function saveNickname() {
    const trimmed = nicknameInput.trim();
    if (trimmed) {
      localStorage.setItem("bloom_nickname", trimmed);
      setNickname(trimmed);
    }
    setShowNicknamePrompt(false);
  }

  async function handleSubmit() {
    if (!selectedMood || !text.trim()) return;
    try {
      const id = await addEntry.mutateAsync({
        nickname: nickname || null,
        mood: selectedMood,
        text: text.trim(),
      });
      setLatestEntry({
        id,
        nickname: nickname || undefined,
        mood: selectedMood,
        text: text.trim(),
        response: "",
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setText("");
      setSelectedMood(null);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    if (latestEntry != null && entries.length > 0) {
      const found = entries.find((e) => e.id === latestEntry.id);
      if (found?.response) {
        setLatestEntry(found);
      }
    }
  }, [entries, latestEntry]);

  async function handleDelete(id: bigint) {
    await deleteEntry.mutateAsync(id);
    if (latestEntry?.id === id) setLatestEntry(null);
    toast.success("Entry removed.");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <AnimatePresence>
        {showNicknamePrompt && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="mb-8 bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-border/30 max-w-lg mx-auto text-center"
            data-ocid="journal.nickname.modal"
          >
            <div className="text-4xl mb-4">🌱</div>
            <h2 className="text-2xl font-extrabold text-foreground mb-2">
              What should I call you?
            </h2>
            <p className="text-muted-foreground mb-5 text-sm">
              Totally optional — you can skip this and remain anonymous.
            </p>
            <input
              type="text"
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveNickname()}
              placeholder="Your name or nickname..."
              maxLength={30}
              className="w-full rounded-2xl border border-border px-4 py-3 text-sm bg-background/60 mb-4 outline-none focus:ring-2 focus:ring-ring/40"
              data-ocid="journal.nickname.input"
            />
            <div className="flex gap-3 justify-center">
              <Button
                onClick={saveNickname}
                className="rounded-full px-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="journal.nickname.submit_button"
              >
                {nicknameInput.trim() ? "Save" : "Stay anonymous"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowNicknamePrompt(false)}
                className="rounded-full px-6 text-muted-foreground"
                data-ocid="journal.nickname.cancel_button"
              >
                Skip
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-soft border border-border/30"
            data-ocid="journal.compose.panel"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-foreground">
                  {nickname ? `Hi, ${nickname} 🌸` : "Hi there 🌸"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  I'm here to listen. Take your time.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-bold text-muted-foreground mb-3">
                How are you feeling right now?
              </p>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((mood) => (
                  <button
                    type="button"
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    data-ocid={`journal.mood.${mood.value}.toggle`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                      selectedMood === mood.value
                        ? "bg-primary text-primary-foreground border-primary shadow-soft"
                        : "bg-background/60 border-border hover:bg-muted/50 text-foreground"
                    }`}
                  >
                    <span>{mood.emoji}</span>
                    <span>{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind? I'm here to listen..."
                className="min-h-32 rounded-2xl border-border bg-background/60 resize-none text-base leading-relaxed focus:ring-2 focus:ring-ring/40"
                data-ocid="journal.entry.textarea"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!selectedMood || !text.trim() || addEntry.isPending}
              className="rounded-full px-8 font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft disabled:opacity-50 flex items-center gap-2"
              data-ocid="journal.entry.submit_button"
            >
              {addEntry.isPending ? (
                <span className="animate-pulse-gentle">
                  Open Heart is listening...
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Share with Open Heart
                </>
              )}
            </Button>
          </motion.div>

          {addEntry.isPending && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/60 rounded-3xl p-6 shadow-soft border border-border/30 space-y-3"
              data-ocid="journal.response.loading_state"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center animate-pulse-gentle">
                  <Leaf className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground font-semibold">
                  Open Heart is thinking...
                </span>
              </div>
              <Skeleton className="h-4 w-4/5 rounded-full" />
              <Skeleton className="h-4 w-3/5 rounded-full" />
              <Skeleton className="h-4 w-2/3 rounded-full" />
            </motion.div>
          )}

          <AnimatePresence>
            {latestEntry?.response && (
              <motion.div
                ref={responseRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-soft border border-border/30"
                data-ocid="journal.response.panel"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-primary mb-2">
                      Open Heart says
                    </p>
                    <div className="bloom-ai-bubble rounded-2xl rounded-tl-sm p-4">
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {latestEntry.response}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 shadow-soft border border-border/30 sticky top-24">
            <h2 className="text-base font-extrabold text-foreground mb-4">
              Recent Entries
            </h2>
            {entriesLoading ? (
              <div
                className="space-y-3"
                data-ocid="journal.entries.loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-2xl" />
                ))}
              </div>
            ) : entries.length === 0 ? (
              <div
                className="text-center py-8 text-muted-foreground"
                data-ocid="journal.entries.empty_state"
              >
                <div className="text-3xl mb-2">📖</div>
                <p className="text-sm">
                  No entries yet. Your first one is waiting.
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[60vh]">
                <div className="space-y-2 pr-2">
                  {entries.map((entry, idx) => (
                    <motion.div
                      key={String(entry.id)}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-muted/40 transition-colors cursor-pointer"
                      onClick={() => setLatestEntry(entry)}
                      data-ocid={`journal.entries.item.${idx + 1}`}
                    >
                      <span className="text-xl flex-shrink-0 mt-0.5">
                        {getMoodEmoji(entry.mood)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground truncate">
                          {entry.text}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatTime(entry.timestamp)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(entry.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                        aria-label="Delete entry"
                        data-ocid={`journal.entries.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </aside>
      </div>

      <div className="lg:hidden mt-6">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full flex items-center justify-between px-5 py-4 bg-white/60 rounded-3xl shadow-soft border border-border/30 font-bold text-sm"
          data-ocid="journal.entries.toggle"
        >
          <span>My Recent Entries</span>
          {sidebarOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 bg-white/60 rounded-3xl p-4 shadow-soft border border-border/30 overflow-hidden"
            >
              {entries.length === 0 ? (
                <div
                  className="text-center py-6 text-muted-foreground"
                  data-ocid="journal.mobile.entries.empty_state"
                >
                  <p className="text-sm">No entries yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {entries.map((entry, idx) => (
                    <div
                      key={String(entry.id)}
                      className="flex items-start gap-3 p-3 rounded-2xl hover:bg-muted/40 transition-colors"
                      data-ocid={`journal.mobile.entries.item.${idx + 1}`}
                    >
                      <span className="text-xl flex-shrink-0">
                        {getMoodEmoji(entry.mood)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground truncate">
                          {entry.text}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(entry.timestamp)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(entry.id)}
                        className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                        aria-label="Delete entry"
                        data-ocid={`journal.mobile.entries.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
