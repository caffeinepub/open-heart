import { Button } from "@/components/ui/button";
import { BookOpen, Heart, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";

interface Props {
  onNavigate: (page: Page) => void;
}

const MOCK_ENTRIES = [
  { mood: "😊", text: "Feeling good about today's...", time: "Today" },
  { mood: "😔", text: "Had a hard day at school...", time: "Yesterday" },
  { mood: "😰", text: "Really anxious about the...", time: "Mon" },
];

export default function LandingPage({ onNavigate }: Props) {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center"
        data-ocid="home.section"
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-10 right-10 w-64 h-64 blob-shape animate-float-slow opacity-60"
          style={{ background: "oklch(var(--bloom-blob1))" }}
        />
        <div
          className="absolute bottom-20 right-32 w-40 h-40 blob-shape-2 animate-float opacity-50"
          style={{ background: "oklch(var(--bloom-blob2))" }}
        />
        <div
          className="absolute top-32 left-10 w-32 h-32 blob-shape-3 animate-float-delay opacity-40"
          style={{ background: "oklch(var(--bloom-blob3))" }}
        />
        <div
          className="absolute bottom-40 left-20 w-20 h-20 blob-shape animate-float-slow opacity-50"
          style={{ background: "oklch(var(--bloom-seafoam))" }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/60 rounded-full px-4 py-2 text-sm font-semibold text-primary border border-border/40">
              <Sparkles className="w-4 h-4" />A safe space just for you
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-foreground leading-tight">
              You don't have to{" "}
              <span className="text-primary">feel this alone.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Open Heart is your calm, judgment-free companion. Share what's on
              your mind, and get a gentle, understanding response — like a kind
              friend who always listens.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => onNavigate("journal")}
                className="rounded-full px-8 py-3 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-bloom h-auto"
                data-ocid="home.journal.primary_button"
              >
                Open My Journal
              </Button>
              <Button
                onClick={() => onNavigate("resources")}
                variant="outline"
                className="rounded-full px-8 py-3 text-base font-semibold border-border hover:bg-muted/50 h-auto"
                data-ocid="home.resources.secondary_button"
              >
                Browse Resources
              </Button>
            </div>
          </motion.div>

          {/* Right column: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="flex justify-center"
          >
            <div
              className="relative w-72 h-72 sm:w-96 sm:h-96 blob-shape overflow-hidden shadow-bloom"
              style={{ background: "oklch(var(--bloom-seafoam) / 0.5)" }}
            >
              <img
                src="/assets/generated/bloom-hero-illustration.dim_600x600.png"
                alt="Open Heart illustration — gentle pastel organic shapes"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="relative py-20 px-4 sm:px-6"
        data-ocid="home.features.section"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Your Cozy Corner
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Everything you need to feel heard, grounded, and a little more
              okay.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart className="w-6 h-6" />,
                emoji: "😌",
                title: "Mood Check-in",
                description:
                  "Tell Open Heart how you're feeling right now. No pressure, no judgment — just a gentle check-in.",
                bg: "bloom-mint",
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                emoji: "✏️",
                title: "Digital Journal",
                description:
                  "Write out your thoughts, feelings, or worries. Your entries are private and always here for you.",
                bg: "bloom-peach",
              },
              {
                icon: <MessageCircle className="w-6 h-6" />,
                emoji: "💬",
                title: "Kind AI Support",
                description:
                  "Get a warm, thoughtful response from Open Heart — like a caring friend who's always available to listen.",
                bg: "bloom-lavender",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`${card.bg} rounded-3xl p-8 shadow-soft`}
              >
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h3 className="text-xl font-extrabold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 px-4 sm:px-6" data-ocid="home.preview.section">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Simple. Safe. Supportive.
            </p>
          </motion.div>

          {/* Mock app window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-bloom overflow-hidden border border-border/40 max-w-4xl mx-auto"
          >
            {/* Window chrome */}
            <div className="bg-muted/30 px-6 py-3 border-b border-border/30 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <div className="w-3 h-3 rounded-full bg-bloom-peach" />
              <div className="w-3 h-3 rounded-full bg-bloom-mint" />
              <span className="ml-3 text-sm text-muted-foreground font-semibold">
                Open Heart Journal
              </span>
            </div>

            <div className="flex h-72">
              {/* Sidebar */}
              <div className="hidden sm:block w-56 border-r border-border/30 p-4 space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Recent Entries
                </p>
                {MOCK_ENTRIES.map((entry) => (
                  <div
                    key={entry.time}
                    className="flex items-start gap-2 p-2 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <span className="text-lg">{entry.mood}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground truncate">
                        {entry.text}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {entry.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat area */}
              <div className="flex-1 flex flex-col p-4 gap-3">
                <div className="bloom-ai-bubble rounded-2xl rounded-tl-sm p-3 max-w-xs">
                  <p className="text-sm text-foreground">
                    Hey there 🌱 I'm here for you. How are you feeling today?
                  </p>
                </div>
                <div className="bloom-user-bubble rounded-2xl rounded-tr-sm p-3 max-w-xs self-end">
                  <p className="text-sm text-foreground">
                    I've been feeling really overwhelmed with everything
                    lately...
                  </p>
                </div>
                <div className="bloom-ai-bubble rounded-2xl rounded-tl-sm p-3 max-w-xs">
                  <p className="text-sm text-foreground">
                    That sounds really hard. It takes courage to acknowledge
                    those feelings. I'm listening 💛
                  </p>
                </div>
                <div className="mt-auto flex gap-2">
                  <div className="flex-1 bg-muted/40 rounded-full px-4 py-2 text-sm text-muted-foreground">
                    Share what's on your mind...
                  </div>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                  >
                    <span className="text-white text-sm">→</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6" data-ocid="home.cta.section">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-soft border border-border/30"
          >
            <div className="text-5xl mb-6">🌸</div>
            <h2 className="text-3xl font-extrabold text-foreground mb-4">
              Ready to take a breath?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Open Heart is always here — no sign-up required. Just open your
              journal and start.
            </p>
            <Button
              onClick={() => onNavigate("journal")}
              className="rounded-full px-10 py-4 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-bloom h-auto"
              data-ocid="home.cta.primary_button"
            >
              Start Journaling ✨
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
