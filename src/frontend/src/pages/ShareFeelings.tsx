import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Heart, Mic, MicOff, RefreshCw, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ShareFeelingsProps {
  onSaved: () => void;
}

const EMPATHETIC_RESPONSES: { keywords: string[]; responses: string[] }[] = [
  {
    keywords: ["stressed", "stress", "overwhelmed", "pressure", "too much"],
    responses: [
      "I hear you. Feeling overwhelmed is so heavy, and it makes complete sense that you're feeling this way. You don't have to carry all of this alone. 💛",
      "That sounds really exhausting. When everything piles up at once, it can feel like there's no space to breathe. I see you, and I'm here. 🌸",
    ],
  },
  {
    keywords: ["sad", "unhappy", "cry", "crying", "tears", "heartbroken"],
    responses: [
      "I'm so sorry you're feeling this way. Sadness can feel so isolating, but please know — your feelings are real and they matter deeply. 🌷",
      "It's okay to feel sad. You don't have to pretend to be okay. I'm right here with you. 💜",
    ],
  },
  {
    keywords: ["lonely", "alone", "isolated", "no one", "nobody"],
    responses: [
      "Loneliness is one of the hardest feelings. Even when it doesn't feel like it, you are seen and you are not alone in this moment. 🤍",
      "I hear how lonely you feel right now. That emptiness is real. I'm glad you came here to share. 💗",
    ],
  },
  {
    keywords: ["angry", "anger", "mad", "furious", "frustrated", "annoyed"],
    responses: [
      "It makes total sense that you're angry. Your feelings are valid — all of them. Sometimes anger is just hurt that needed somewhere to go. 🍂",
      "That frustration is real. You're allowed to feel this. I'm listening without any judgment at all. 💛",
    ],
  },
  {
    keywords: ["tired", "exhausted", "drained", "burnt out", "no energy"],
    responses: [
      "Being this tired isn't just about sleep — it's about how much you've been carrying. Please be gentle with yourself today. 🌙",
      "I hear how drained you are. You've been giving a lot, and it's okay to need rest — in every sense of the word. 💛",
    ],
  },
  {
    keywords: ["anxious", "anxiety", "worried", "scared", "afraid", "nervous"],
    responses: [
      "Anxiety can feel so overwhelming, like your mind won't stop racing. You're safe here. Breathe slowly — I'm with you. 🌸",
      "I hear how worried you are. That fear is real, and I want you to know: you are brave for sharing it. 💜",
    ],
  },
  {
    keywords: ["happy", "good", "great", "excited", "joy", "wonderful"],
    responses: [
      "That warmth in your words makes me smile. Hold onto that feeling — you deserve every bit of joy that comes your way. 🌟",
      "I love hearing this! Your happiness matters just as much as everything else. Keep shining. ✨",
    ],
  },
  {
    keywords: ["confused", "lost", "don't know", "unsure", "uncertain"],
    responses: [
      "Feeling lost is one of the most uncomfortable feelings — and it's completely okay not to have all the answers right now. 🌿",
      "Not knowing where you stand is hard. But you reached out, and that takes courage. I'm here with you in the uncertainty. 💙",
    ],
  },
];

const FALLBACK_RESPONSES = [
  "Thank you for trusting me with this. Whatever you're going through, you don't have to go through it alone. I hear you. 💜",
  "I'm really glad you shared this. Your feelings are valid, and you are so much more than what you're going through right now. 🌸",
  "It takes courage to open up like this. I see you, and I'm here — no judgment, just care. 💛",
  "Whatever is on your heart, it matters. You matter. Thank you for letting me be here with you. 🌷",
  "I hear you, and I want you to know: you are not alone in this. You are seen, valued, and cared for. 🤍",
];

function pickResponse(text: string): string {
  const lower = text.toLowerCase();
  for (const group of EMPATHETIC_RESPONSES) {
    if (group.keywords.some((k) => lower.includes(k))) {
      const r =
        group.responses[Math.floor(Math.random() * group.responses.length)];
      return r;
    }
  }
  return FALLBACK_RESPONSES[
    Math.floor(Math.random() * FALLBACK_RESPONSES.length)
  ];
}

export interface JournalEntry {
  id: string;
  text: string;
  response: string;
  timestamp: number;
}

export function saveEntry(entry: JournalEntry) {
  const raw = localStorage.getItem("oh_journal");
  const entries: JournalEntry[] = raw ? JSON.parse(raw) : [];
  entries.unshift(entry);
  localStorage.setItem("oh_journal", JSON.stringify(entries));
}

export default function ShareFeelings({ onSaved }: ShareFeelingsProps) {
  const [text, setText] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const toggleVoice = () => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SR) {
      toast.error(
        "Voice recording isn't supported in your browser. Try Chrome!",
      );
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (e: any) => {
      let transcript = "";
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setText(transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Couldn't hear you. Please try again.");
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const handleSubmit = () => {
    if (!text.trim()) {
      toast.error("Please share something first — even a few words.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const res = pickResponse(text);
      setResponse(res);
      const entry: JournalEntry = {
        id: crypto.randomUUID(),
        text: text.trim(),
        response: res,
        timestamp: Date.now(),
      };
      saveEntry(entry);
      setIsSubmitting(false);
    }, 900);
  };

  const handleReset = () => {
    setText("");
    setResponse(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <AnimatePresence mode="wait">
        {!response ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-8">
              <h2 className="font-fraunces text-3xl font-bold text-gradient-rose mb-2">
                What&apos;s on your heart today?
              </h2>
              <p className="text-muted-foreground text-sm">
                Write freely. There are no wrong answers here.
              </p>
            </div>

            <div className="card-soft rounded-3xl p-6 shadow-warm">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing, or tap the mic to speak..."
                className="min-h-[180px] text-base leading-relaxed border-0 bg-transparent resize-none focus-visible:ring-0 placeholder:text-muted-foreground/50 p-0"
                data-ocid="share.textarea"
              />

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
                <button
                  type="button"
                  onClick={toggleVoice}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isListening
                      ? "text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={
                    isListening
                      ? { background: "oklch(0.62 0.17 15)" }
                      : { background: "oklch(0.93 0.02 50)" }
                  }
                  data-ocid="share.toggle"
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-4 h-4" /> Stop listening
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4" /> Use voice
                    </>
                  )}
                </button>

                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !text.trim()}
                  className="rounded-full px-6 shadow-soft hover:shadow-warm transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.17 15), oklch(0.65 0.15 350))",
                  }}
                  data-ocid="share.submit_button"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? "Listening..." : "Share"}
                </Button>
              </div>
            </div>

            {isListening && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center"
              >
                <span className="inline-flex items-center gap-2 text-sm text-oh-rose">
                  <span className="w-2 h-2 rounded-full bg-oh-rose animate-pulse" />
                  Listening... speak freely
                </span>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="response"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-6">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-warm animate-float"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.88 0.09 20), oklch(0.82 0.13 15))",
                }}
              >
                <Heart className="w-8 h-8 fill-current text-oh-rose" />
              </div>
              <h2 className="font-fraunces text-2xl font-bold text-gradient-rose">
                I hear you
              </h2>
            </div>

            <div className="card-soft rounded-2xl p-4 mb-4 shadow-soft">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                You shared
              </p>
              <p className="text-sm text-foreground leading-relaxed line-clamp-4">
                {text}
              </p>
            </div>

            <div
              className="rounded-3xl p-6 mb-6 shadow-warm"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.96 0.025 295 / 0.7), oklch(0.96 0.030 20 / 0.7))",
              }}
              data-ocid="share.success_state"
            >
              <p className="text-base leading-relaxed text-foreground">
                {response}
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={handleReset}
                className="rounded-full px-5"
                data-ocid="share.secondary_button"
              >
                Share more
              </Button>
              <Button
                onClick={onSaved}
                className="rounded-full px-5"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.17 15), oklch(0.65 0.15 350))",
                }}
                data-ocid="share.primary_button"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                See my journal
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
