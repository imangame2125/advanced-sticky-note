// src/components/StartScene.tsx
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

type Stage =
  | "intro"
  | "quiz"
  | "earth"
  | "paper"
  | "rain"
  | "video"
  | "barrage"
  | "prompt"
  | "collapse";

export default function StartScene({ onFinish }: { onFinish: () => void }) {
  const [stage, setStage] = useState<Stage>("intro");
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  // Random quiz pool (short, playful, globally safe)
  const quiz = useMemo(() => {
    const pool = [
      {
        q: "What’s the capital of Iran?",
        a: ["Tehran", "Isfahan", "Shiraz"],
        correct: "Tehran",
      },
      {
        q: "Pick the best note color for focus:",
        a: ["Yellow", "Pink", "Mint"],
        correct: "Yellow",
      },
      {
        q: "Where should a sticky note live?",
        a: ["Monitor", "Fridge", "On Mars 🚀"],
        correct: "Monitor",
      },
    ];
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  // Timed stage progression driven by interactions and animations
  useEffect(() => {
    let t: number | undefined;

    if (stage === "intro") {
      t = window.setTimeout(() => setStage("quiz"), 4500);
    }
    if (stage === "quiz" && quizAnswer) {
      // playful branch
      t = window.setTimeout(() => setStage("earth"), 1500);
    }
    if (stage === "earth") {
      t = window.setTimeout(() => setStage("paper"), 4000);
    }
    if (stage === "paper") {
      t = window.setTimeout(() => setStage("rain"), 3500);
    }
    if (stage === "rain") {
      t = window.setTimeout(() => setStage("video"), 5000);
    }
    if (stage === "video") {
      // moved by onEnded too, but add fallback
      t = window.setTimeout(() => setStage("barrage"), 9000);
    }
    if (stage === "barrage") {
      t = window.setTimeout(() => setStage("prompt"), 3000);
    }
    if (stage === "prompt") {
      // user can skip or continue; no auto advance here
    }
    if (stage === "collapse") {
      t = window.setTimeout(() => onFinish(), 2200);
    }

    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [stage, quizAnswer, onFinish]);

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white overflow-hidden">
      {/* HUD: top-right skip and status */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <span className="text-xs text-white/60">Stage: {stage}</span>
        <button
          className="px-3 py-1 text-xs rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition"
          onClick={() => setStage("collapse")}
          aria-label="Skip intro"
        >
          Skip calmly
        </button>
      </div>

      {/* Global ambiance layers */}
      <BackgroundGrid />
      <ParticleAura />

      <AnimatePresence mode="wait">
        {stage === "intro" && <IntroCard onContinue={() => setStage("quiz")} />}

        {stage === "quiz" && (
          <QuizStage
            quiz={quiz}
            onAnswer={(ans) => setQuizAnswer(ans)}
            onContinue={() => setStage("earth")}
          />
        )}

        {stage === "earth" && <EarthStage onMorph={() => setStage("paper")} />}

        {stage === "paper" && <PaperMorphStage onContinue={() => setStage("rain")} />}

        {stage === "rain" && <StickyRain onContinue={() => setStage("video")} />}

        {stage === "video" && (
          <VideoInterlude onEnd={() => setStage("barrage")} src="/notes-army.mp4" />
        )}

        {stage === "barrage" && <BarrageStage onContinue={() => setStage("prompt")} />}

        {stage === "prompt" && (
          <PromptStage
            onCollapse={() => setStage("collapse")}
            onChaos={() => setStage("barrage")}
          />
        )}

        {stage === "collapse" && <LiquidCollapse onEnd={onFinish} />}
      </AnimatePresence>
    </div>
  );
}

/* --------------------------- ambiance layers --------------------------- */

function BackgroundGrid() {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.3, 0.15] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      style={{
        backgroundImage:
          "linear-gradient(transparent 39px, rgba(255,255,255,0.06) 40px), linear-gradient(90deg, transparent 39px, rgba(255,255,255,0.06) 40px)",
        backgroundSize: "40px 40px",
      }}
    />
  );
}

function ParticleAura() {
  const dots = Array.from({ length: 60 });
  return (
    <>
      {dots.map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-0 w-1 h-1 rounded-full bg-white/50"
          initial={{ x: "50%", y: "50%", opacity: 0 }}
          animate={{
            x: `${50 + Math.sin(i * 0.7) * 36}%`,
            y: `${50 + Math.cos(i * 0.9) * 26}%`,
            opacity: [0, 0.7, 0.2],
          }}
          transition={{ duration: 6 + (i % 10), repeat: Infinity, repeatType: "mirror" }}
        />
      ))}
    </>
  );
}

/* ----------------------------- stage: intro ---------------------------- */

function IntroCard({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.section
      className="absolute inset-0 z-10 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-3xl w-full grid grid-cols-1 md:grid-cols-[200px,1fr] gap-8 items-center">
        <motion.img
          src="/me.jpg"
          alt="Iman portrait"
          className="w-40 h-40 md:w-48 md:h-48 rounded-xl object-cover ring-1 ring-white/20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="space-y-3">
          <motion.h1
            className="text-xl md:text-2xl font-semibold"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Hi, I’m Iman — building Sticky Note OS to practice global-grade structure and clarity.
          </motion.h1>
          <motion.p
            className="text-white/80"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Purpose: strong architecture, readable patterns, and disciplined code. Inspiration:
            Miro-like flows. This demo evolves constantly — I keep tuning it to be more original,
            playful, and globally competitive.
          </motion.p>
          <motion.p
            className="text-white/60 text-sm"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Reference board: miro.com — and I adapt the ideas, not copy them. The goal is world-class
            learning and polish.
          </motion.p>

          <motion.div
            className="pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <button
              onClick={onContinue}
              className="px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-white/90 transition"
            >
              Start the playful sequence
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

/* ------------------------------ stage: quiz ---------------------------- */

function QuizStage({
  quiz,
  onAnswer,
  onContinue,
}: {
  quiz: { q: string; a: string[]; correct: string };
  onAnswer: (a: string) => void;
  onContinue: () => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    if (picked) {
      const t = setTimeout(onContinue, 1200);
      return () => clearTimeout(t);
    }
  }, [picked, onContinue]);

  return (
    <motion.section
      className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-semibold text-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Quick playful question:
      </motion.h2>

      <motion.p
        className="mt-3 text-white/80 text-lg md:text-xl text-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {quiz.q}
      </motion.p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-xl">
        {quiz.a.map((ans) => {
          const isCorrect = ans === quiz.correct;
          const chosen = picked === ans;
          return (
            <motion.button
              key={ans}
              onClick={() => {
                setPicked(ans);
                onAnswer(ans);
              }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-3 rounded-lg border transition ${
                chosen
                  ? isCorrect
                    ? "bg-green-500 text-black border-green-400"
                    : "bg-red-500 text-white border-red-400"
                  : "border-white/20 bg-white/5 text-white"
              }`}
            >
              {ans}
            </motion.button>
          );
        })}
      </div>

      {picked && (
        <motion.div
          className="mt-6 text-sm text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {picked === quiz.correct
            ? "Nice! You’ve got taste. Let’s go deeper."
            : "Bold choice. Let’s embrace chaos anyway."}
        </motion.div>
      )}
    </motion.section>
  );
}

/* ----------------------------- stage: earth ---------------------------- */

function EarthStage({ onMorph }: { onMorph: () => void }) {
  useEffect(() => {
    const t = setTimeout(onMorph, 3500);
    return () => clearTimeout(t);
  }, [onMorph]);

  return (
    <motion.section
      className="absolute inset-0 z-10 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src="/earth.png"
        alt="Earth"
        className="w-52 h-52 md:w-72 md:h-72 rounded-full object-cover shadow-xl"
        initial={{ scale: 0.8, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 text-white/70 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Earth appears. Notes belong everywhere.
      </motion.div>
    </motion.section>
  );
}

/* ----------------------------- stage: paper ---------------------------- */

function PaperMorphStage({ onContinue }: { onContinue: () => void }) {
  useEffect(() => {
    const t = setTimeout(onContinue, 3000);
    return () => clearTimeout(t);
  }, [onContinue]);

  return (
    <motion.section
      className="absolute inset-0 z-20 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Minimal morph illusion: scale/clip to feel like earth flattening */}
      <motion.div
        className="w-[70vw] h-[60vh] bg-white/95 text-black rounded-xl shadow-2xl flex items-center justify-center"
        initial={{ scaleY: 0.3, borderRadius: "50%" }}
        animate={{ scaleY: 1, borderRadius: "16px" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <span className="text-xl font-semibold">Paper canvas — where sticky notes live.</span>
      </motion.div>
    </motion.section>
  );
}

/* ------------------------------ stage: rain ---------------------------- */

function StickyRain({ onContinue }: { onContinue: () => void }) {
  useEffect(() => {
    const t = setTimeout(onContinue, 5000);
    return () => clearTimeout(t);
  }, [onContinue]);

  const notes = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 90 + "%",
    delay: i * 0.06,
    text: i % 8 === 0 ? "From Mars 🚀" : i % 5 === 0 ? "Catch me!" : `Note #${i + 1}`,
  }));

  return (
    <motion.section
      className="absolute inset-0 z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {notes.map((n) => (
        <motion.div
          key={n.id}
          className="absolute top-[-10%] w-24 h-24 bg-yellow-300 text-black rounded-md shadow flex items-center justify-center text-xs"
          style={{ left: n.x }}
          initial={{ y: "-10vh", rotate: 0, opacity: 0 }}
          animate={{ y: "110vh", rotate: Math.random() * 40 - 20, opacity: [0, 1, 1, 0.8] }}
          transition={{ duration: 5.5, delay: n.delay, ease: "easeInOut" }}
        >
          {n.text}
        </motion.div>
      ))}
    </motion.section>
  );
}

/* ------------------------------ stage: video --------------------------- */

function VideoInterlude({ src, onEnd }: { src: string; onEnd: () => void }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const handler = () => onEnd();
    v.addEventListener("ended", handler);
    // auto fallback end after 9s
    const t = setTimeout(onEnd, 9000);
    return () => {
      v.removeEventListener("ended", handler);
      clearTimeout(t);
    };
  }, [onEnd]);

  return (
    <motion.section
      className="absolute inset-0 z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover opacity-90"
      />
      <div className="absolute bottom-6 w-full text-center text-white/80 text-sm">
        Notes army reporting for duty. Keep your calm and keep scrolling.
      </div>
    </motion.section>
  );
}

/* ----------------------------- stage: barrage -------------------------- */

function BarrageStage({ onContinue }: { onContinue: () => void }) {
  useEffect(() => {
    const t = setTimeout(onContinue, 3000);
    return () => clearTimeout(t);
  }, [onContinue]);

  const count = 120;
  const items = Array.from({ length: count });

  return (
    <motion.section
      className="absolute inset-0 z-40 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {items.map((_, i) => {
        const fromSide = i % 4;
        const start =
          fromSide === 0
            ? { x: -200, y: Math.random() * window.innerHeight }
            : fromSide === 1
            ? { x: window.innerWidth + 200, y: Math.random() * window.innerHeight }
            : fromSide === 2
            ? { x: Math.random() * window.innerWidth, y: -200 }
            : { x: Math.random() * window.innerWidth, y: window.innerHeight + 200 };

        return (
          <motion.div
            key={i}
            className="absolute w-16 h-16 bg-yellow-300 text-black rounded-md shadow flex items-center justify-center text-[10px]"
            initial={{ ...start, opacity: 0 }}
            animate={{
              x: window.innerWidth / 2 + (Math.random() * 300 - 150),
              y: window.innerHeight / 2 + (Math.random() * 300 - 150),
              rotate: Math.random() * 180 - 90,
              opacity: [0, 1, 0.9],
            }}
            transition={{ duration: 2.2, ease: "easeOut", delay: i * 0.01 }}
          >
            BOO!
          </motion.div>
        );
      })}
    </motion.section>
  );
}

/* ------------------------------ stage: prompt -------------------------- */

function PromptStage({
  onCollapse,
  onChaos,
}: {
  onCollapse: () => void;
  onChaos: () => void;
}) {
  return (
    <motion.section
      className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h3
        className="text-2xl font-semibold"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Do you expect the main project now?
      </motion.h3>
      <motion.p
        className="mt-2 text-white/75"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Not so fast, my friend. Keep your calm. We’ll go together.
      </motion.p>
      <div className="mt-6 flex gap-4">
        <button
          className="px-5 py-2 rounded-full bg-white text-black hover:bg-white/90 transition"
          onClick={onCollapse}
        >
          Okay, show me the board
        </button>
        <button
          className="px-5 py-2 rounded-full border border-white/30 text-white/80 hover:bg-white/10 transition"
          onClick={onChaos}
        >
          I dare you (one more chaos)
        </button>
      </div>

      <motion.p
        className="mt-6 text-xs text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        If you want a mind-bending vibe, explore zoomquilt.org later — this keeps evolving here too.
      </motion.p>
    </motion.section>
  );
}

/* --------------------------- stage: liquid collapse -------------------- */

function LiquidCollapse({ onEnd }: { onEnd: () => void }) {
  // SVG filter turbulence for a liquid feel
  return (
    <motion.section
      className="absolute inset-0 z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="liquid">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="2" />
            <feDisplacementMap in="SourceGraphic" scale="35" />
          </filter>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          filter="url(#liquid)"
          fill="url(#g)"
          initial={{ scale: 0, rx: 300 }}
          animate={{ scale: 1.8, rx: 0 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
          onAnimationComplete={onEnd}
        />
      </svg>
    </motion.section>
  );
}
