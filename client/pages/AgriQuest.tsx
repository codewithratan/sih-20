import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Missions from "@/components/agriquest/Missions";

interface RecommendationInput {
  state: string;
  crop: string;
}

interface Recommendation {
  sowingWindow: string;
  irrigation: string;
  fertilizer: string;
  notes: string[];
}

const CROPS = [
  "Paddy",
  "Wheat",
  "Maize",
  "Sugarcane",
  "Cotton",
  "Groundnut",
  "Mustard",
  "Turmeric",
  "Banana",
  "Vegetables",
];

const STATES = [
  "Kerala",
  "Maharashtra",
  "Rajasthan",
  "Punjab",
  "Gujarat",
  "Tamil Nadu",
  "Karnataka",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Bihar",
];

const RECS: Record<string, Record<string, Recommendation>> = {
  Kerala: {
    Paddy: {
      sowingWindow: "Kharif: May–June, Rabi: Sep–Oct, Summer: Jan–Feb",
      irrigation: "Maintain 5 cm water after transplanting; drain before harvest.",
      fertilizer:
        "Basal: 40:20:20 NPK kg/ha; Topdress: 20 kg N/ha at tillering and panicle initiation.",
      notes: [
        "Use short-duration varieties for second crop.",
        "Adopt SRI where feasible to save water.",
      ],
    },
    Banana: {
      sowingWindow: "Planting: Aug–Sep or Feb–Mar",
      irrigation: "Drip at 4–8 L/plant/day increasing with canopy; mulch to retain moisture.",
      fertilizer:
        "200:60:200 g NPK/plant/year split monthly; add 10–15 kg FYM per pit.",
      notes: [
        "Provide windbreaks in coastal belts.",
        "Prophylactic spray against sigatoka as per advisory.",
      ],
    },
  },
  Maharashtra: {
    Cotton: {
      sowingWindow: "Rainfed: June–July, Irrigated: Apr–May",
      irrigation: "Irrigate at square and boll development; avoid waterlogging.",
      fertilizer: "80:40:40 NPK kg/ha; add 25 kg ZnSO4/ha once in 2–3 years.",
      notes: [
        "Follow pink bollworm management with synchronized sowing and pheromone traps.",
      ],
    },
    Soybean: {
      sowingWindow: "Mid-June to early July with onset of monsoon",
      irrigation: "Mostly rainfed; provide lifesaving irrigation at pod fill if dry spell.",
      fertilizer: "30:60:30 NPK kg/ha; seed treat with Rhizobium and PSB.",
      notes: ["Avoid waterlogging; choose 90–110 day varieties."],
    } as any,
  },
  Rajasthan: {
    Mustard: {
      sowingWindow: "Mid-Oct to mid-Nov",
      irrigation:
        "First irrigation 25–30 DAS; then at flowering and pod formation.",
      fertilizer: "60:40:40 NPK kg/ha; 20 kg S/ha recommended in S-deficit soils.",
      notes: ["Use seed rate 4–5 kg/ha; treat seed with Thiram 3 g/kg."],
    },
    Cumin: {
      sowingWindow: "Nov–Dec",
      irrigation: "Light irrigation every 12–15 days; avoid humidity spike.",
      fertilizer: "20:30:0 NPK kg/ha; 10–15 t/ha FYM improves soil structure.",
      notes: ["Manage wilt with rotation and solarization in summer."],
    } as any,
  },
};

const TIPS = [
  {
    title: "Soil Health",
    detail:
      "Test soil every 2–3 years. Maintain pH 6.5–7.5. Add 5–10 t/ha compost or FYM to improve structure and microbial activity.",
  },
  {
    title: "Irrigation",
    detail:
      "Prefer drip/sprinkler. Irrigate early morning or evening. Mulch to reduce evaporation and weed pressure.",
  },
  {
    title: "Pest Management",
    detail:
      "Scout weekly. Use pheromone traps and biocontrols first; rotate modes of action to avoid resistance.",
  },
  {
    title: "Weather Risk",
    detail:
      "Stagger sowing by 7–10 days. Use short-duration varieties in late monsoon. Ensure field drainage before heavy rain.",
  },
];

export default function AgriQuest() {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState<RecommendationInput>({ state: "Kerala", crop: "Paddy" });
  const [answer, setAnswer] = useState<string>("");
  const reportRef = useRef<HTMLDivElement>(null);

  const rec = useMemo(() => {
    const stateRecs = RECS[input.state] || {};
    const cropKey = Object.keys(stateRecs).find(
      (k) => k.toLowerCase() === input.crop.toLowerCase(),
    );
    return cropKey ? stateRecs[cropKey] : undefined;
  }, [input]);

  const handleAsk = () => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      setAnswer("Please type a specific question about your crop, soil, or irrigation.");
      return;
    }

    const patterns: Array<{ test: (q: string) => boolean; reply: () => string }> = [
      {
        test: (q) => /when .*sow|sowing|plant/i.test(q),
        reply: () =>
          rec
            ? `Recommended sowing window for ${input.crop} in ${input.state}: ${rec.sowingWindow}.`
            : `Sowing window depends on monsoon onset and temperature; check local agri advisory for ${input.state}.`,
      },
      {
        test: (q) => /irrigat|water|drip|sprinkler/i.test(q),
        reply: () =>
          rec
            ? `Irrigation guidance: ${rec.irrigation}`
            : `Adopt drip/sprinkler where possible; irrigate at critical crop stages and avoid waterlogging.`,
      },
      {
        test: (q) => /fertil|npk|manure|fym/i.test(q),
        reply: () =>
          rec
            ? `Fertilizer program: ${rec.fertilizer}`
            : `Base with compost/FYM; apply NPK as per soil test. Split N into 2–3 doses aligned with growth stages.`,
      },
      {
        test: (q) => /pest|disease|bollworm|sigatoka|wilt/i.test(q),
        reply: () =>
          `Practice IPM: field sanitation, traps, resistant varieties, and rotate actives. Use biocontrols first and follow label doses.`,
      },
    ];

    const match = patterns.find((p) => p.test(normalized));
    if (match) setAnswer(match.reply());
    else
      setAnswer(
        "I could not match this question. Try asking about sowing, irrigation, fertilizer, or pest management.",
      );
  };

  const exportPdf = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;
    const x = (pageWidth - imgWidth) / 2;
    const y = 24;
    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save(`AgriQuest_${input.state}_${input.crop}.pdf`);
  };

  return (
    <div className="container py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">AgriQuest</h1>
            <p className="text-muted-foreground">Decision help for crops, water, and nutrients — tailored to your state.</p>
          </div>
          <button
            onClick={exportPdf}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted"
          >
            Export PDF
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 rounded-xl border p-4 bg-background/50">
            <label className="block text-sm font-medium mb-1">Ask a question</label>
            <div className="flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., When should I irrigate paddy after transplanting?"
                className="flex-1 rounded-lg border px-3 py-2 bg-background"
              />
              <button onClick={handleAsk} className="rounded-lg bg-primary text-primary-foreground px-4">
                Ask
              </button>
            </div>
            {answer && (
              <div className="mt-3 rounded-lg bg-muted/40 p-3 text-sm">
                {answer}
              </div>
            )}
          </div>

          <div className="rounded-xl border p-4 bg-background/50">
            <label className="block text-sm font-medium mb-1">State</label>
            <select
              value={input.state}
              onChange={(e) => setInput((s) => ({ ...s, state: e.target.value }))}
              className="w-full rounded-lg border px-3 py-2 bg-background"
            >
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium mt-3 mb-1">Crop</label>
            <input
              list="crop-list"
              value={input.crop}
              onChange={(e) => setInput((s) => ({ ...s, crop: e.target.value }))}
              className="w-full rounded-lg border px-3 py-2 bg-background"
            />
            <datalist id="crop-list">
              {CROPS.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        </section>

        <section ref={reportRef} className="rounded-2xl border p-6 bg-white text-black">
          <h2 className="text-xl font-semibold">Recommendation Sheet</h2>
          <p className="text-sm text-gray-600">State: {input.state} • Crop: {input.crop}</p>

          {rec ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Sowing Window</h3>
                <p className="text-sm mt-1">{rec.sowingWindow}</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Irrigation</h3>
                <p className="text-sm mt-1">{rec.irrigation}</p>
              </div>
              <div className="rounded-lg border p-4 md:col-span-2">
                <h3 className="font-medium">Fertilizer</h3>
                <p className="text-sm mt-1">{rec.fertilizer}</p>
              </div>
              <div className="rounded-lg border p-4 md:col-span-2">
                <h3 className="font-medium">Notes</h3>
                <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                  {rec.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-lg border p-4">
              <p className="text-sm">
                No curated sheet for this combination yet. Use the Ask box above for general guidance,
                and consult your local agriculture officer for a soil-test based plan.
              </p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {TIPS.map((t) => (
              <div key={t.title} className="rounded-lg border p-4 bg-gray-50">
                <h4 className="font-medium">{t.title}</h4>
                <p className="text-sm mt-1 text-gray-700">{t.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
