export type PumpType = "standalone" | "grid-connected";
export type IrrigationMethod = "diesel" | "electric" | "manual";

export interface EligibilityInput {
  landSize: number; // acres
  state: string;
  pumpType: PumpType;
  pumpHP: number; // horsepower
  crop: string;
  irrigation: IrrigationMethod;
  stateSupport: boolean; // whether state provides matching support
}

export interface EligibilityResult {
  component: "A" | "B" | "C";
  probability: number; // 0-1
  estimatedSubsidyINR: number;
  requiredDocs: string[];
  notes: string[];
  suggestions?: string[];
}

// Basic cost per HP approximation (INR) for solar pump + installation
const COST_PER_HP: Record<number, number> = {
  2: 90000,
  3: 110000,
  5: 160000,
  7.5: 230000,
  10: 300000,
} as unknown as Record<number, number>;

export const APPROVED_STATES_WITH_MATCHING = new Set([
  "Rajasthan",
  "Gujarat",
  "Madhya Pradesh",
  "Maharashtra",
  "Karnataka",
  "Uttar Pradesh",
]);

export function estimateCost(pumpHP: number): number {
  // Fallback linear estimate if exact HP not in table
  const known = Object.keys(COST_PER_HP).map(Number).sort((a, b) => a - b);
  if (COST_PER_HP[pumpHP]) return COST_PER_HP[pumpHP];
  const min = known[0];
  const max = known[known.length - 1];
  if (pumpHP <= min) return COST_PER_HP[min];
  if (pumpHP >= max) return COST_PER_HP[max];
  for (let i = 0; i < known.length - 1; i++) {
    const a = known[i];
    const b = known[i + 1];
    if (pumpHP >= a && pumpHP <= b) {
      const t = (pumpHP - a) / (b - a);
      return Math.round(COST_PER_HP[a] + t * (COST_PER_HP[b] - COST_PER_HP[a]));
    }
  }
  return 180000;
}

export function predictEligibility(input: EligibilityInput): EligibilityResult {
  const { landSize, state, pumpType, pumpHP, irrigation, stateSupport } = input;

  // Rule-based score influenced by guidelines-like heuristics
  let score = 0;

  // Land size thresholds
  if (landSize >= 0.5 && landSize <= 10) score += 0.45;
  else if (landSize > 10 && landSize <= 20) score += 0.25;
  else score -= 0.2;

  // State matching support boosts eligibility and subsidy
  const hasMatching = stateSupport || APPROVED_STATES_WITH_MATCHING.has(state);
  if (hasMatching) score += 0.15;

  // Pump type - standalone often simpler for off-grid areas
  if (pumpType === "standalone") score += 0.1; else score += 0.05;

  // Irrigation replacement - moving from diesel is prioritized
  if (irrigation === "diesel") score += 0.15;
  if (irrigation === "electric") score += 0.05;

  // Pump size realistic range
  if (pumpHP >= 2 && pumpHP <= 10) score += 0.1; else score -= 0.1;

  // Clamp to [0, 1]
  const probability = Math.max(0, Math.min(1, score));

  // Component mapping heuristic
  const component: "A" | "B" | "C" = pumpType === "standalone" ? "B" : "C";

  const baseCost = estimateCost(pumpHP);

  // Subsidy: Assume 60% Central Financial Assistance + optional state 30%
  const central = 0.6 * baseCost;
  const stateCofinance = hasMatching ? 0.3 * baseCost : 0;
  const estimatedSubsidyINR = Math.round(central + stateCofinance);

  const requiredDocs = [
    "Aadhaar-linked mobile number",
    "Land ownership proof / 7/12 extract",
    "Bank passbook (for DBT)",
    "Passport photo",
    "Address proof",
  ];

  const notes = [
    "Advisory only: final decision per MNRE/state portal.",
    "Ensure land records match application details.",
  ];

  const suggestions: string[] = [];
  if (!hasMatching) {
    suggestions.push("Check if your state offers matching support to increase subsidy up to 90%.");
  }
  if (irrigation === "electric") {
    suggestions.push("Consider Component C (grid-connected) for potential feed-in benefits if available.");
  } else if (irrigation === "diesel") {
    suggestions.push("High savings by replacing diesel with solar; prioritize Component B (standalone).");
  }

  return {
    component,
    probability,
    estimatedSubsidyINR,
    requiredDocs,
    notes,
    suggestions,
  };
}

export function solarPotentialLabel(ghiKWhPerM2PerDay: number): {
  label: "Low" | "Moderate" | "High";
  color: string;
} {
  if (ghiKWhPerM2PerDay >= 5.5) return { label: "High", color: "text-green-600" };
  if (ghiKWhPerM2PerDay >= 4.5) return { label: "Moderate", color: "text-amber-600" };
  return { label: "Low", color: "text-red-600" };
}
