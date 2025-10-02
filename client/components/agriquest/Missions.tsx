import { useEffect, useMemo, useState } from "react";
import PestPatrol from "./PestPatrol";
import CropCombo from "./CropCombo";
import MulchMission from "./MulchMission";

export type QuestCategory = "Organic Inputs" | "Mixed Cropping" | "Soil Health";
export type QuestType = "interactive" | "quiz" | "checkin";

export interface QuizSpec {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Quest {
  id: string;
  title: string;
  category: QuestCategory;
  type: QuestType;
  description: string;
  quiz?: QuizSpec;
}

interface StoredProgress {
  completed: string[];
  answers: Record<string, number>;
}

const STORAGE_KEY = "agriquest_progress_v1";

const defaultQuests: Quest[] = [
  // Interactive anchors
  {
    id: "pest-patrol",
    title: "Pest Patrol",
    category: "Organic Inputs",
    type: "interactive",
    description:
      "Identify pests via photo upload, apply a bio-spray, and track with before/after photos. Optional AR soil scan unlocks a tip.",
  },
  {
    id: "crop-combo",
    title: "Crop Combo Challenge",
    category: "Mixed Cropping",
    type: "interactive",
    description:
      "Plan a field layout mixing legumes with grains. Create an alternating pattern and validate your design.",
  },
  {
    id: "mulch-mission",
    title: "Mulch Mission",
    category: "Soil Health",
    type: "interactive",
    description:
      "Log weekly mulching sessions with GPS-timed check-ins. Complete 3 check-ins to finish.",
  },
  // Organic Inputs quizzes
  {
    id: "oi-1",
    title: "When to spray neem?",
    category: "Organic Inputs",
    type: "quiz",
    description: "Pick the best timing for neem-based sprays.",
    quiz: {
      question: "Best time to apply neem oil to manage sucking pests?",
      options: [
        "Midday, bright sun",
        "Early morning or late evening",
        "During heavy rain",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "oi-2",
    title: "Compost moisture check",
    category: "Organic Inputs",
    type: "quiz",
    description: "How moist should good compost feel?",
    quiz: {
      question: "Ideal compost moisture level feels like:",
      options: ["Completely dry", "Soggy wet", "A wrung-out sponge"],
      correctIndex: 2,
    },
  },
  {
    id: "oi-3",
    title: "Jeevamruth basics",
    category: "Organic Inputs",
    type: "quiz",
    description: "Simple inputs and schedule.",
    quiz: {
      question: "Jeevamruth is mainly used to:",
      options: [
        "Increase soil microbes",
        "Kill weeds",
        "Lower soil pH drastically",
      ],
      correctIndex: 0,
    },
  },
  {
    id: "oi-4",
    title: "Bio-spray intervals",
    category: "Organic Inputs",
    type: "quiz",
    description: "Choose interval between two sprays.",
    quiz: {
      question: "Recommended gap between preventive bio-sprays is:",
      options: ["1–3 days", "7–10 days", "30 days"],
      correctIndex: 1,
    },
  },
  {
    id: "oi-5",
    title: "Pest scouting frequency",
    category: "Organic Inputs",
    type: "quiz",
    description: "How often to scout?",
    quiz: {
      question: "For vegetables in season, scout for pests at least:",
      options: ["Once a month", "Weekly", "Only after damage is visible"],
      correctIndex: 1,
    },
  },
  // Mixed Cropping quizzes
  {
    id: "mc-1",
    title: "Nitrogen fixers",
    category: "Mixed Cropping",
    type: "quiz",
    description: "Pick the legume.",
    quiz: {
      question: "Which is a legume typically used for N-fixation?",
      options: ["Maize", "Cowpea", "Wheat"],
      correctIndex: 1,
    },
  },
  {
    id: "mc-2",
    title: "Row ratio",
    category: "Mixed Cropping",
    type: "quiz",
    description: "Common cereal:legume row ratio.",
    quiz: {
      question: "A common cereal:legume row ratio is:",
      options: ["1:1", "2:1", "4:1"],
      correctIndex: 1,
    },
  },
  {
    id: "mc-3",
    title: "Pest break",
    category: "Mixed Cropping",
    type: "quiz",
    description: "Benefits of mixing crops.",
    quiz: {
      question: "One advantage of mixed cropping is:",
      options: [
        "Higher uniform pest spread",
        "Pest break and resource complementarity",
        "More fertilizer need",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "mc-4",
    title: "Trap crops",
    category: "Mixed Cropping",
    type: "quiz",
    description: "Identify a trap crop use.",
    quiz: {
      question: "Trap crops are used mainly to:",
      options: [
        "Attract and divert pests",
        "Increase soil salinity",
        "Shade main crop excessively",
      ],
      correctIndex: 0,
    },
  },
  // Soil Health quizzes
  {
    id: "sh-1",
    title: "Mulch thickness",
    category: "Soil Health",
    type: "quiz",
    description: "Pick ideal mulch depth.",
    quiz: {
      question: "Typical organic mulch thickness is:",
      options: ["0.5–1 cm", "3–7 cm", "15–20 cm"],
      correctIndex: 1,
    },
  },
  {
    id: "sh-2",
    title: "Soil test interval",
    category: "Soil Health",
    type: "quiz",
    description: "How often to test?",
    quiz: {
      question: "Recommended soil testing frequency is:",
      options: ["Every 2–3 years", "Every 10 years", "Never"],
      correctIndex: 0,
    },
  },
  {
    id: "sh-3",
    title: "Cover crops",
    category: "Soil Health",
    type: "quiz",
    description: "Benefits of cover.",
    quiz: {
      question: "Cover crops primarily help to:",
      options: [
        "Erode soil more",
        "Improve structure and reduce weeds",
        "Increase evaporation",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "sh-4",
    title: "Residue retention",
    category: "Soil Health",
    type: "quiz",
    description: "Residue management.",
    quiz: {
      question: "Leaving crop residues on soil surface:",
      options: [
        "Worsens moisture retention",
        "Improves moisture and biology",
        "Always spreads disease",
      ],
      correctIndex: 1,
    },
  },
  // Additional quests to reach ~20
  {
    id: "oi-6",
    title: "Botanical extract basics",
    category: "Organic Inputs",
    type: "quiz",
    description: "Learn safe dilution.",
    quiz: {
      question: "Before spraying botanical extracts you should:",
      options: [
        "Skip filtering",
        "Do a patch test and filter mix",
        "Spray at noon",
      ],
      correctIndex: 1,
    },
  },
  {
    id: "mc-5",
    title: "Spacing awareness",
    category: "Mixed Cropping",
    type: "quiz",
    description: "Row spacing check.",
    quiz: {
      question: "Mixed stands often need spacing adjustments to:",
      options: [
        "Reduce competition and optimize light",
        "Increase lodging",
        "Trap humidity",
      ],
      correctIndex: 0,
    },
  },
  {
    id: "sh-5",
    title: "Mulch materials",
    category: "Soil Health",
    type: "quiz",
    description: "Choose materials.",
    quiz: {
      question: "Good organic mulches include:",
      options: ["Plastic waste", "Straw, leaves, compost", "Bare soil"],
      correctIndex: 1,
    },
  },
  {
    id: "oi-7",
    title: "Sprayer hygiene",
    category: "Organic Inputs",
    type: "quiz",
    description: "Rinse and clean.",
    quiz: {
      question: "After spraying, sprayers should be:",
      options: [
        "Stored without rinsing",
        "Rinsed and flushed with clean water",
        "Left with residue",
      ],
      correctIndex: 1,
    },
  },
];

function useProgress() {
  const [progress, setProgress] = useState<StoredProgress>({
    completed: [],
    answers: {},
  });
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);
  const markDone = (id: string) =>
    setProgress((p) => ({
      ...p,
      completed: Array.from(new Set([...p.completed, id])),
    }));
  const saveAnswer = (id: string, idx: number) =>
    setProgress((p) => ({ ...p, answers: { ...p.answers, [id]: idx } }));
  const reset = () => setProgress({ completed: [], answers: {} });
  return { progress, markDone, saveAnswer, reset };
}

function ProgressFarm({ pct }: { pct: number }) {
  const level = pct >= 100 ? 3 : pct >= 50 ? 2 : pct >= 10 ? 1 : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="w-40 h-10 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
      <div className="flex items-center gap-1 text-2xl">
        {Array.from({ length: level }).map((_, i) => (
          <span key={i}>🌾</span>
        ))}
        {level >= 3 && <span>🏡</span>}
      </div>
    </div>
  );
}

function QuizCard({
  q,
  onAnswered,
  selected,
}: {
  q: Quest;
  onAnswered: (ok: boolean, idx: number) => void;
  selected?: number;
}) {
  if (!q.quiz) return null;
  return (
    <div className="rounded-lg border p-3">
      <p className="font-medium">{q.quiz.question}</p>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {q.quiz.options.map((opt, idx) => {
          const isSel = selected === idx;
          return (
            <button
              key={idx}
              onClick={() => onAnswered(idx === q.quiz!.correctIndex, idx)}
              className={`rounded-lg border px-3 py-2 text-sm text-left ${
                isSel
                  ? idx === q.quiz!.correctIndex
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "hover:bg-muted"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Missions() {
  const { progress, markDone, saveAnswer, reset } = useProgress();
  const [filter, setFilter] = useState<QuestCategory | "All">("All");
  const [active, setActive] = useState<string | null>(null);

  const quests = defaultQuests;
  const filtered = quests.filter((q) =>
    filter === "All" ? true : q.category === filter,
  );
  const completedCount = progress.completed.length;
  const pct = Math.round((completedCount / quests.length) * 100);

  const begin = (q: Quest) => setActive(q.id);
  const current = useMemo(
    () => quests.find((q) => q.id === active) || null,
    [active],
  );

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold">Missions</h2>
          <p className="text-sm text-muted-foreground">
            Help Farmer Raj save the village — complete daily quests to upgrade
            your virtual farm.
          </p>
        </div>
        <ProgressFarm pct={pct} />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {["All", "Organic Inputs", "Mixed Cropping", "Soil Health"].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c as any)}
            className={`rounded-full border px-3 py-1 text-sm ${filter === c ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            {c}
          </button>
        ))}
        <button
          onClick={reset}
          className="ml-auto text-xs text-muted-foreground underline"
        >
          Reset Progress
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((q) => {
          const done = progress.completed.includes(q.id);
          const sel = progress.answers[q.id];
          return (
            <div
              key={q.id}
              className={`rounded-xl border p-4 bg-background/50 ${done ? "opacity-80" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium">{q.title}</h3>
                  <p className="text-xs text-muted-foreground">{q.category}</p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border ${done ? "bg-green-600 text-white border-green-600" : "bg-amber-100 text-amber-900 border-amber-200"}`}
                >
                  {done ? "Completed" : "Pending"}
                </span>
              </div>
              <p className="text-sm mt-2">{q.description}</p>

              {q.type === "quiz" && q.quiz && (
                <div className="mt-3">
                  <QuizCard
                    q={q}
                    selected={typeof sel === "number" ? sel : undefined}
                    onAnswered={(ok, idx) => {
                      saveAnswer(q.id, idx);
                      if (ok) markDone(q.id);
                    }}
                  />
                </div>
              )}

              {q.type === "interactive" && (
                <div className="mt-3">
                  {active === q.id ? (
                    <div className="space-y-3">
                      {q.id === "pest-patrol" && (
                        <PestPatrol onComplete={() => markDone(q.id)} />
                      )}
                      {q.id === "crop-combo" && (
                        <CropCombo onComplete={() => markDone(q.id)} />
                      )}
                      {q.id === "mulch-mission" && (
                        <MulchMission onComplete={() => markDone(q.id)} />
                      )}
                      <div className="text-right">
                        <button
                          className="text-xs underline"
                          onClick={() => setActive(null)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => begin(q)}
                      className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm"
                    >
                      Start
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
