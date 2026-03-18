import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Mic } from "lucide-react";
import { motion } from "motion/react";

interface HomeProps {
  onStart: () => void;
}

const FEATURE_CARDS = [
  {
    icon: (
      <Heart className="w-6 h-6" style={{ color: "oklch(0.62 0.17 15)" }} />
    ),
    bg: "oklch(0.95 0.04 20)",
    title: "Express yourself",
    desc: "Write or speak your feelings — whatever feels right for you.",
  },
  {
    icon: <Mic className="w-6 h-6" style={{ color: "oklch(0.55 0.09 295)" }} />,
    bg: "oklch(0.94 0.04 295)",
    title: "Voice or text",
    desc: "Speak it out loud or write it down — both are welcome here.",
  },
  {
    icon: (
      <BookOpen className="w-6 h-6" style={{ color: "oklch(0.58 0.10 50)" }} />
    ),
    bg: "oklch(0.94 0.05 50)",
    title: "Your journal",
    desc: "Look back on your entries and see how far you've come.",
  },
];

export default function Home({ onStart }: HomeProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        className="absolute top-[-60px] right-[-80px] w-72 h-72 blob-shape opacity-30 pointer-events-none"
        style={{ background: "oklch(0.85 0.10 15)" }}
      />
      <div
        className="absolute bottom-40 left-[-60px] w-56 h-56 blob-shape-2 opacity-25 pointer-events-none"
        style={{ background: "oklch(0.82 0.09 295)" }}
      />
      <div
        className="absolute top-1/2 right-10 w-40 h-40 blob-shape opacity-20 pointer-events-none"
        style={{ background: "oklch(0.88 0.10 50)" }}
      />

      {/* Hero */}
      <section className="relative max-w-3xl mx-auto px-4 pt-16 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="/assets/generated/open-heart-logo-transparent.dim_400x400.png"
            alt="Open Heart"
            className="w-24 h-24 object-contain mb-6 animate-float mx-auto"
          />

          <h1 className="font-fraunces text-5xl md:text-6xl font-bold text-gradient-rose mb-4 leading-tight">
            Open Heart
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light mb-3">
            a safe space to share how you feel
          </p>
          <p className="text-base text-muted-foreground max-w-sm mx-auto mb-10 leading-relaxed">
            No judgment. No pressure. Just a warm, caring space to let it all
            out.
          </p>

          <Button
            onClick={onStart}
            size="lg"
            className="rounded-full px-8 py-6 text-base shadow-glow hover:shadow-warm transition-all duration-300 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.17 15), oklch(0.65 0.15 350))",
            }}
            data-ocid="home.primary_button"
          >
            <Heart className="w-4 h-4 mr-2 fill-current" />
            Share what&apos;s on your heart
          </Button>
        </motion.div>
      </section>

      {/* Feature cards */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURE_CARDS.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + FEATURE_CARDS.indexOf(card) * 0.12,
                ease: "easeOut",
              }}
            >
              <div className="card-soft rounded-2xl p-5 h-full shadow-soft hover:shadow-warm transition-shadow">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: card.bg }}
                >
                  {card.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gentle reminder */}
      <section className="max-w-xl mx-auto px-4 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="rounded-3xl p-6 shadow-soft"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.96 0.025 295 / 0.6), oklch(0.96 0.025 20 / 0.6))",
          }}
        >
          <p className="text-sm text-foreground leading-relaxed">
            💜 You don&apos;t have to have it all figured out. Whatever
            you&apos;re feeling right now — it&apos;s valid, and it matters.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
