import { Anchor, Phone, Wind } from "lucide-react";
import { motion } from "motion/react";

const breathingExercises = [
  {
    title: "Box Breathing",
    emoji: "📦",
    description:
      "Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat 4 times. This is a gentle way to calm your nervous system.",
    bg: "bloom-mint",
  },
  {
    title: "4-7-8 Breathing",
    emoji: "🫁",
    description:
      "Breathe in for 4 counts, hold for 7, and exhale slowly for 8 counts. This signals your body that it's safe to relax.",
    bg: "bloom-peach",
  },
  {
    title: "Belly Breathing",
    emoji: "🌬️",
    description:
      "Place one hand on your belly. Breathe in deeply through your nose, letting your belly rise. Exhale slowly through pursed lips.",
    bg: "bloom-lavender",
  },
  {
    title: "Equal Breathing",
    emoji: "⚖️",
    description:
      "Breathe in for 5 counts, then out for 5 counts. Focus only on the breath — nothing else. Do this for 2 minutes.",
    bg: "bloom-mint",
  },
  {
    title: "Sighing Breath",
    emoji: "😮‍💨",
    description:
      "Take a deep breath in through your nose, then let out a long, slow sigh through your mouth. Repeat 5 times. Release the tension you're holding.",
    bg: "bloom-peach",
  },
];

const groundingTechniques = [
  {
    title: "5-4-3-2-1 Senses",
    emoji: "🖐️",
    description:
      "Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. Brings you right back to the present moment.",
  },
  {
    title: "Cold Water Trick",
    emoji: "💧",
    description:
      "Hold your wrists under cold water for 30 seconds, or splash cold water on your face. This quickly activates your body's calming response.",
  },
  {
    title: "Body Scan",
    emoji: "🧘",
    description:
      "Close your eyes and slowly notice each part of your body from toes to head. Breathe into any areas that feel tight or tense.",
  },
  {
    title: "Safe Place Visualization",
    emoji: "🏡",
    description:
      "Close your eyes and imagine a place that feels completely safe and calm — real or imaginary. Notice the details: colors, sounds, smells.",
  },
  {
    title: "Progressive Muscle Relaxation",
    emoji: "💪",
    description:
      "Tense each muscle group for 5 seconds, then release. Start with your feet and work up. Feel the difference between tension and release.",
  },
];

export default function ResourcesPage() {
  return (
    <div
      className="max-w-5xl mx-auto px-4 sm:px-6 py-12"
      data-ocid="resources.page"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <div className="text-5xl mb-4">🌿</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4">
          Tools to Find Your Calm
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          These simple practices can help when everything feels like too much.
          You don't have to do them perfectly — just try.
        </p>
      </motion.div>

      {/* Crisis card - always first */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-12 bg-white/70 backdrop-blur-sm rounded-3xl p-7 shadow-bloom border border-border/40 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        data-ocid="resources.crisis.card"
      >
        <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
          <Phone className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-extrabold text-foreground mb-1">
            You're not alone — help is here
          </h2>
          <p className="text-muted-foreground">
            If you're in crisis or just need someone to talk to right now,
            please reach out:
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-bold text-primary">
              📱 Text HOME to 741741 (Crisis Text Line)
            </div>
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-bold text-primary">
              📞 Call or text 988 (Suicide & Crisis Lifeline)
            </div>
          </div>
        </div>
      </motion.div>

      {/* Breathing Exercises */}
      <section className="mb-14" data-ocid="resources.breathing.section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-7"
        >
          <div className="w-10 h-10 rounded-2xl bg-bloom-mint flex items-center justify-center">
            <Wind className="w-5 h-5 text-foreground/70" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-foreground">
              Breathing Exercises
            </h2>
            <p className="text-muted-foreground text-sm">
              Slow your breath, slow your thoughts.
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {breathingExercises.map((ex, i) => (
            <motion.div
              key={ex.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`${ex.bg} rounded-3xl p-6 shadow-soft`}
              data-ocid={`resources.breathing.item.${i + 1}`}
            >
              <div className="text-3xl mb-3">{ex.emoji}</div>
              <h3 className="text-base font-extrabold text-foreground mb-2">
                {ex.title}
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">
                {ex.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Grounding Techniques */}
      <section data-ocid="resources.grounding.section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-7"
        >
          <div className="w-10 h-10 rounded-2xl bg-bloom-lavender flex items-center justify-center">
            <Anchor className="w-5 h-5 text-foreground/70" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-foreground">
              Grounding Techniques
            </h2>
            <p className="text-muted-foreground text-sm">
              Anchor yourself back to the present.
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {groundingTechniques.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-soft border border-border/30"
              data-ocid={`resources.grounding.item.${i + 1}`}
            >
              <div className="text-3xl mb-3">{tech.emoji}</div>
              <h3 className="text-base font-extrabold text-foreground mb-2">
                {tech.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom reminder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-14 text-center"
      >
        <div className="inline-block bg-white/60 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-soft border border-border/30">
          <p className="text-lg font-semibold text-foreground">
            💛 Be gentle with yourself. Healing isn't linear.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            You're doing the best you can, and that's enough.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
