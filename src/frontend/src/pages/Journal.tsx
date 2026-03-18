import type { JournalEntry } from "@/pages/ShareFeelings";
import { BookOpen, Heart, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("oh_journal");
    if (raw) setEntries(JSON.parse(raw));
  }, []);

  const deleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("oh_journal", JSON.stringify(updated));
  };

  const formatDate = (ts: number) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(ts));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 shadow-warm"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.88 0.09 20), oklch(0.82 0.13 15))",
          }}
        >
          <BookOpen
            className="w-7 h-7"
            style={{ color: "oklch(0.62 0.17 15)" }}
          />
        </div>
        <h2 className="font-fraunces text-3xl font-bold text-gradient-rose mb-2">
          Your Journal
        </h2>
        <p className="text-muted-foreground text-sm">
          {entries.length > 0
            ? `${entries.length} entr${entries.length === 1 ? "y" : "ies"} — every feeling matters`
            : "Your entries will appear here"}
        </p>
      </div>

      {entries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
          data-ocid="journal.empty_state"
        >
          <div className="text-5xl mb-4">💜</div>
          <p className="text-muted-foreground text-sm">
            Nothing here yet — share what&apos;s on your heart first.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Your entries are private and saved only on this device.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4" data-ocid="journal.list">
          <AnimatePresence>
            {entries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="card-soft rounded-2xl p-5 shadow-soft group"
                data-ocid={`journal.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 fill-current text-oh-rose flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground">
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteEntry(entry.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-destructive/10 transition-all text-muted-foreground hover:text-destructive"
                    data-ocid={`journal.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-sm text-foreground leading-relaxed mb-3 line-clamp-3">
                  {entry.text}
                </p>

                <div
                  className="rounded-xl p-3"
                  style={{ background: "oklch(0.96 0.018 295 / 0.5)" }}
                >
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    {entry.response}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {entries.length > 0 && (
        <p className="text-center text-xs text-muted-foreground/60 mt-8">
          🔒 Your journal is private and lives only on this device.
        </p>
      )}
    </div>
  );
}
