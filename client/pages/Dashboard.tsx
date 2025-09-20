import { Link } from "react-router-dom";

// Panels comparison types/data
type Company = {
  company: string;
  model: string;
  efficiency: number;
  priceWp: number; // INR per Wp
  total1kW: number; // INR
  warrantyProduct: number;
  warrantyPerformance: number;
  strengths: string;
  website: string;
  websiteLabel: string;
  pros: string[];
  cons: string[];
  useCase: string;
  shop?: string;
};

const COMPANIES: Company[] = [
  {
    company: "Waaree Energies",
    model: "Vertex S+ 550W TOPCon",
    efficiency: 21.5,
    priceWp: 24,
    total1kW: 24000,
    warrantyProduct: 12,
    warrantyPerformance: 30,
    strengths: "Highest capacity, exports",
    website: "https://waaree.com",
    websiteLabel: "waaree.com",
    pros: ["Wide distribution", "Bankable performance"],
    cons: ["Price slightly premium"],
    useCase: "Residential + commercial rooftop",
  },
  {
    company: "Adani Solar",
    model: "Shine TOPCon 550W",
    efficiency: 22.0,
    priceWp: 23,
    total1kW: 23000,
    warrantyProduct: 15,
    warrantyPerformance: 30,
    strengths: "Integrated chain, green H2",
    website: "https://www.adanisolar.com",
    websiteLabel: "adanisolar.com",
    pros: ["High efficiency", "Strong supply chain"],
    cons: ["Availability varies by region"],
    useCase: "High-output rooftops, small utility",
  },
  {
    company: "Tata Power Solar",
    model: "TP 540W Mono PERC",
    efficiency: 21.0,
    priceWp: 26,
    total1kW: 26000,
    warrantyProduct: 12,
    warrantyPerformance: 25,
    strengths: "EPC leader, rooftop focus",
    website: "https://www.tatapowersolar.com",
    websiteLabel: "tatapowersolar.com",
    pros: ["Trusted brand", "Excellent service"],
    cons: ["Higher price per Wp"],
    useCase: "Premium residential/EPC",
  },
  {
    company: "Vikram Solar",
    model: "Elite 550W Bifacial",
    efficiency: 21.8,
    priceWp: 23,
    total1kW: 23000,
    warrantyProduct: 12,
    warrantyPerformance: 30,
    strengths: "Global EPC, hybrid projects",
    website: "https://www.vikramsolar.com",
    websiteLabel: "vikramsolar.com",
    pros: ["Bifacial gains", "Export experience"],
    cons: ["Lead times can vary"],
    useCase: "Carports, high-albedo sites",
  },
  {
    company: "Goldi Solar",
    model: "GD-M 545W Mono PERC",
    efficiency: 21.2,
    priceWp: 22,
    total1kW: 22000,
    warrantyProduct: 12,
    warrantyPerformance: 25,
    strengths: "Affordable, n-type innovation",
    website: "https://goldisolar.com",
    websiteLabel: "goldisolar.com",
    pros: ["Good value", "Improving tech roadmap"],
    cons: ["Fewer top-end SKUs"],
    useCase: "Budget residential/commercial",
  },
  {
    company: "RenewSys India",
    model: "DESERV 550W TOPCon",
    efficiency: 22.5,
    priceWp: 22,
    total1kW: 22000,
    warrantyProduct: 12,
    warrantyPerformance: 30,
    strengths: "Vertically integrated, cells",
    website: "https://www.renewsysworld.com",
    websiteLabel: "renewsysworld.com",
    pros: ["High efficiency options", "Cell manufacturing"],
    cons: ["Regional dealer coverage"],
    useCase: "Performance-focused rooftops",
  },
  {
    company: "Insolation Energy",
    model: "INA 540W Bifacial",
    efficiency: 21.3,
    priceWp: 21,
    total1kW: 21000,
    warrantyProduct: 10,
    warrantyPerformance: 25,
    strengths: "AI manufacturing, rapid growth",
    website: "https://insolationenergy.in",
    websiteLabel: "insolationenergy.in",
    pros: ["Competitive pricing", "Growing network"],
    cons: ["Shorter product warranty"],
    useCase: "Cost-optimized installs",
  },
  {
    company: "Emmvee Photovoltaics",
    model: "E580 580W TOPCon",
    efficiency: 22.0,
    priceWp: 21,
    total1kW: 21000,
    warrantyProduct: 12,
    warrantyPerformance: 30,
    strengths: "Water heating integration",
    website: "https://emmvee.com",
    websiteLabel: "emmvee.com",
    pros: ["Balanced specs", "Long performance warranty"],
    cons: ["Regional availability"],
    useCase: "Residential + MSME",
  },
  {
    company: "Servotech Power",
    model: "Mono PERC 500W",
    efficiency: 20.5,
    priceWp: 20,
    total1kW: 20000,
    warrantyProduct: 10,
    warrantyPerformance: 25,
    strengths: "EPC focus, after-sales",
    website: "https://servotech.in",
    websiteLabel: "servotech.in",
    pros: ["Value-focused", "Service network"],
    cons: ["Lower wattage options"],
    useCase: "Entry-level systems",
  },
  {
    company: "Solex Energy",
    model: "Solex 550W Mono",
    efficiency: 21.0,
    priceWp: 22,
    total1kW: 22000,
    warrantyProduct: 12,
    warrantyPerformance: 25,
    strengths: "Eco-friendly, commercial",
    website: "https://solex.in",
    websiteLabel: "solex.in",
    pros: ["Reliable", "Commercial pedigree"],
    cons: ["Fewer n-type lines"],
    useCase: "SME/commercial rooftops",
  },
];

// Pumps comparison types/data
type PumpBrand = {
  rank: number;
  company: string;
  strengths: string;
  hpRange: string;
  share: string;
  site: string;
  siteLabel: string;
  buy?: string;
};

const PUMP_BRANDS: PumpBrand[] = [
  {
    rank: 1,
    company: "Shakti Pumps",
    strengths: "Pioneer; ~40% higher discharge; exports to 100+ countries",
    hpRange: "1-100",
    share: "25-30%",
    site: "https://www.shaktipumps.com",
    siteLabel: "shaktipumps.com",
    buy: "https://www.shaktipumps.com/solar-pumps/",
  },
  {
    rank: 2,
    company: "Tata Power Solar",
    strengths: "Integrated EPC; reliable for large farms; 97,000+ installs",
    hpRange: "1-50",
    share: "15-20%",
    site: "https://www.tatapowersolar.com",
    siteLabel: "tatapowersolar.com",
    buy: "https://www.tatapowersolar.com/solutions/solar-pumps/",
  },
  {
    rank: 3,
    company: "Waaree Energies (Waa Motors)",
    strengths: "Affordable kits; high-efficiency panels; after-sales",
    hpRange: "1-10",
    share: "10-15%",
    site: "https://waaree.com",
    siteLabel: "waaree.com",
    buy: "https://www.waamotors.com/",
  },
  {
    rank: 4,
    company: "Kirloskar Brothers (KBL)",
    strengths: "Robust for irrigation; 14 global plants; 2-50 HP",
    hpRange: "2-50",
    share: "8-10%",
    site: "https://www.kbl.co.in",
    siteLabel: "kbl.co.in",
  },
  {
    rank: 5,
    company: "KSB Limited",
    strengths: "Industrial-grade; submersible experts; 7 India facilities",
    hpRange: "1-20",
    share: "7-9%",
    site: "https://www.ksb.com/in",
    siteLabel: "ksb.com/in",
  },
  {
    rank: 6,
    company: "C.R.I. Pumps",
    strengths: "Versatile AC/DC; strong in rural water supply",
    hpRange: "1-15",
    share: "5-7%",
    site: "https://www.cripumps.com",
    siteLabel: "cripumps.com",
  },
  {
    rank: 7,
    company: "Lubi Pumps",
    strengths: "Cost-effective surface/submersible; farmer-favorite",
    hpRange: "1-10",
    share: "5-6%",
    site: "https://www.lubipumps.com",
    siteLabel: "lubipumps.com",
  },
  {
    rank: 8,
    company: "Oswal Pumps",
    strengths: "Heavy-duty for large farms; eco-efficient",
    hpRange: "1-20",
    share: "4-5%",
    site: "https://www.oswalpumps.com",
    siteLabel: "oswalpumps.com",
  },
  {
    rank: 9,
    company: "Falcon Pumps",
    strengths: "Advanced tech; exports; durable monoblocks",
    hpRange: "1-10",
    share: "3-4%",
    site: "https://www.falconpump.com",
    siteLabel: "falconpump.com",
  },
  {
    rank: 10,
    company: "Texmo (Aqua Group)",
    strengths: "Farmer-centric; reliable for borewells",
    hpRange: "1-7.5",
    share: "3-4%",
    site: "https://www.aquaagroup.com",
    siteLabel: "aquaagroup.com",
  },
];

type PumpPrice = {
  hp: string;
  type: string;
  pre: string;
  post: string;
  use: string;
};

const PUMP_PRICES: PumpPrice[] = [
  {
    hp: "1 HP",
    type: "Surface DC (Shakti/Lubi)",
    pre: "₹80,000 - ₹1,25,000",
    post: "₹32,000 - ₹50,000",
    use: "Small farms/shallow wells",
  },
  {
    hp: "1.5 HP",
    type: "Submersible AC (Tata/Waaree)",
    pre: "₹1,00,000 - ₹1,50,000",
    post: "₹40,000 - ₹60,000",
    use: "Medium irrigation",
  },
  {
    hp: "3 HP",
    type: "Submersible DC/AC (KSB/Morca)",
    pre: "₹1,50,000 - ₹2,50,000",
    post: "₹60,000 - ₹1,00,000",
    use: "Large fields/borewells",
  },
  {
    hp: "5 HP",
    type: "Surface/Submersible (Kirloskar)",
    pre: "₹2,00,000 - ₹3,50,000",
    post: "₹80,000 - ₹1,40,000",
    use: "Commercial/rural supply",
  },
  {
    hp: "7.5–10 HP",
    type: "High-Capacity AC (C.R.I./Oswal)",
    pre: "₹3,00,000 - ₹4,50,000",
    post: "₹1,20,000 - ₹1,80,000",
    use: "Utility-scale farming",
  },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto py-10">
      {/* Header */}
      <header className="rounded-xl overflow-hidden border bg-white dark:bg-zinc-900">
        <div className="relative grid md:grid-cols-2">
          <div className="p-8 md:p-12 space-y-3">
            <h1 className="text-2xl md:text-3xl font-extrabold">
              Top 10 Indian Solar Panel Manufacturers 2025: Price Comparison,
              Models, and Official Links
            </h1>
            <p className="text-sm text-muted-foreground">
              Compare High-Efficiency Solar Panels for Your Home or Business –
              Updated September 2025
            </p>
            <div className="h-1 w-24 bg-[#4CAF50] rounded" />
          </div>
          <div className="relative min-h-[180px] md:min-h-full">
            <img
              src="/solar-panels-india.jpg"
              alt="Solar panels in India under bright sun"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4CAF50]/20 to-transparent" />
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="mt-8 prose prose-zinc dark:prose-invert max-w-none">
        <p>
          India’s solar market continues to surge in 2025, crossing 74 GW of
          installed capacity with strong momentum from domestic manufacturing
          and the Production Linked Incentive (PLI) scheme. Comparing Tier-1
          manufacturers helps buyers balance efficiency, warranty, and total
          system cost. The prices below reflect typical market averages for
          500–600 W mono PERC/TOPCon modules and include 12% GST; actual quotes
          vary by city, logistics, and dealer margins. Rooftop households can
          additionally benefit from central/state incentives such as PM Surya
          Ghar. Use this guide to shortlist reliable brands, check warranties,
          and pick the best fit for your home or business.
        </p>
      </section>

      {/* Panels Comparison Table */}
      <section className="mt-6">
        <div className="rounded-xl border overflow-x-auto">
          <table className="min-w-[800px] w-full text-sm">
            <thead className="bg-[#4CAF50]/10">
              <tr className="text-left">
                <th className="p-3 font-semibold">Company</th>
                <th className="p-3 font-semibold">Sample Model</th>
                <th className="p-3 font-semibold">Efficiency (%)</th>
                <th className="p-3 font-semibold">Price (INR/Wp / 1kW)</th>
                <th className="p-3 font-semibold">Warranty (Prod/Perf)</th>
                <th className="p-3 font-semibold">Key Strengths</th>
                <th className="p-3 font-semibold">Official Website</th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.map((c) => (
                <tr key={c.company} className="border-t">
                  <td className="p-3 font-medium">{c.company}</td>
                  <td className="p-3">{c.model}</td>
                  <td className="p-3">{c.efficiency}%</td>
                  <td className="p-3">
                    ₹{c.priceWp} / ₹{c.total1kW.toLocaleString("en-IN")}
                  </td>
                  <td className="p-3">
                    {c.warrantyProduct}/{c.warrantyPerformance} yrs
                  </td>
                  <td className="p-3">{c.strengths}</td>
                  <td className="p-3 text-[#4CAF50] underline">
                    <a href={c.website} target="_blank" rel="noreferrer">
                      {c.websiteLabel}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Note: Prices are indicative (Sep 2025), exclude installation/BOS.
          Check official websites and market reports for latest figures.
        </p>
      </section>

      {/* Detailed Panels Cards */}
      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {COMPANIES.map((c) => (
          <article
            key={c.company}
            className="rounded-lg border p-5 bg-white/50 dark:bg-zinc-900/50"
          >
            <h3 className="text-lg font-semibold">{c.company}</h3>
            <p className="text-xs text-muted-foreground">
              Model: {c.model} • {c.efficiency}%
            </p>
            <div className="mt-3">
              <h4 className="text-sm font-medium">Pros</h4>
              <ul className="list-disc pl-5 text-sm">
                {c.pros.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <h4 className="text-sm font-medium">Cons</h4>
              <ul className="list-disc pl-5 text-sm">
                {c.cons.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <p className="mt-2 text-sm">
              <span className="font-medium">Best for:</span> {c.useCase}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <a
                href={c.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-md bg-[#4CAF50] px-3 py-2 text-white text-sm"
              >
                Buy Now
              </a>
              <a
                href={c.website}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#4CAF50] underline"
              >
                Official Site
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* Pumps Guide Header */}
      <section className="mt-12">
        <h2 className="text-xl md:text-2xl font-extrabold">
          Solar Water Pumps in India: Complete Guide (September 2025)
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          Solar pumps use PV power to run submersible or surface motors—ideal
          for irrigation, livestock and rural water. Cut diesel/electric bills
          by up to 90% with 2–4 year ROI. PM-KUSUM targets 1.75M off-grid pumps
          by 2026; subsidies cover 30–90% depending on category and state.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">How They Work</h3>
            <ol className="mt-2 list-decimal pl-5 text-sm space-y-1">
              <li>Panels generate DC</li>
              <li>Controller/Inverter regulates/AC</li>
              <li>Pump motor (submersible/surface)</li>
              <li>Optional batteries/storage</li>
            </ol>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Types</h3>
            <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
              <li>DC (1–3 HP) efficient, shallow</li>
              <li>AC (3–10+ HP) hybrid/grid</li>
              <li>Submersible for &gt;10m depth</li>
              <li>Surface for shallow/open wells</li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Benefits</h3>
            <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
              <li>Zero fuel post-install</li>
              <li>Low maintenance (10–15 yrs)</li>
              <li>Up to 90% subsidy for small farmers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pumps Best Picks */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold">Best Picks 2025</h3>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          {PUMP_BRANDS.slice(0, 3).map((b) => (
            <article key={b.company} className="rounded-lg border p-4">
              <h4 className="font-semibold">{b.company}</h4>
              <p className="text-sm text-muted-foreground">{b.strengths}</p>
              <p className="mt-1 text-xs">HP Range: {b.hpRange}</p>
              <div className="mt-2 flex items-center gap-2">
                <a
                  href={b.buy || b.site}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md bg-[#4CAF50] px-3 py-1.5 text-white text-sm"
                >
                  Buy Now
                </a>
                <a
                  href={b.site}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4CAF50] text-sm underline"
                >
                  Official
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Pumps Comparison Table */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold">
          Top Solar Pump Manufacturers (2025)
        </h3>
        <div className="mt-2 rounded-xl border overflow-x-auto">
          <table className="min-w-[800px] w-full text-sm">
            <thead className="bg-[#4CAF50]/10">
              <tr className="text-left">
                <th className="p-3 font-semibold">Rank</th>
                <th className="p-3 font-semibold">Company</th>
                <th className="p-3 font-semibold">Key Strengths</th>
                <th className="p-3 font-semibold">HP Range</th>
                <th className="p-3 font-semibold">Est. Share</th>
                <th className="p-3 font-semibold">Website</th>
              </tr>
            </thead>
            <tbody>
              {PUMP_BRANDS.map((b) => (
                <tr key={b.company} className="border-t">
                  <td className="p-3 font-medium">{b.rank}</td>
                  <td className="p-3">{b.company}</td>
                  <td className="p-3">{b.strengths}</td>
                  <td className="p-3">{b.hpRange}</td>
                  <td className="p-3">{b.share}</td>
                  <td className="p-3 text-[#4CAF50] underline">
                    <a href={b.site} target="_blank" rel="noreferrer">
                      {b.siteLabel}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Market shares are indicative from 2025 H1 industry reports. Prefer
          ALMM-approved models for subsidies.
        </p>
      </section>

      {/* Pump Prices Table */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold">
          Solar Water Pump Prices in India (2025)
        </h3>
        <div className="mt-2 rounded-xl border overflow-x-auto">
          <table className="min-w-[800px] w-full text-sm">
            <thead className="bg-[#4CAF50]/10">
              <tr className="text-left">
                <th className="p-3 font-semibold">HP Rating</th>
                <th className="p-3 font-semibold">Type/Example</th>
                <th className="p-3 font-semibold">
                  Approx. Price (Pre-Subsidy)
                </th>
                <th className="p-3 font-semibold">Post-Subsidy (60% Avg.)</th>
                <th className="p-3 font-semibold">Best Use Case</th>
              </tr>
            </thead>
            <tbody>
              {PUMP_PRICES.map((p) => (
                <tr key={p.hp} className="border-t">
                  <td className="p-3 font-medium">{p.hp}</td>
                  <td className="p-3">{p.type}</td>
                  <td className="p-3">{p.pre}</td>
                  <td className="p-3">{p.post}</td>
                  <td className="p-3">{p.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Estimates (Sep 2025). Exclude GST/installation; add ₹10,000–20,000 for
          batteries/piping. Quotes vary by location.
        </p>
      </section>

      {/* Subsidies & Kerala Tips */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border p-5">
          <h3 className="text-lg font-semibold">Subsidies and How to Avail</h3>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
            <li>
              <strong>PM-KUSUM:</strong> Central + State = ~60% base; up to 90%
              for eligible categories (1–7.5 HP).
            </li>
            <li>
              <strong>Eligibility:</strong> Farmers with ≥1 acre; no agri-loan
              defaults. Apply via state nodal agencies.
            </li>
            <li>
              <strong>Process:</strong> Register on portal → Select empaneled
              vendor → Submit docs → Install → DBT in 15–30 days.
            </li>
          </ul>
          <div className="mt-3 flex items-center gap-3">
            <a
              href="https://kusum.mnre.gov.in"
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-[#4CAF50] px-3 py-2 text-white text-sm"
            >
              PM-KUSUM Portal
            </a>
            <a
              href="https://mnre.gov.in"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#4CAF50] underline"
            >
              MNRE
            </a>
          </div>
        </article>
        <article className="rounded-lg border p-5">
          <h3 className="text-lg font-semibold">Buying Tips for Kerala</h3>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
            <li>
              Local availability: Waaree and Tata dominate (20–25% share).
            </li>
            <li>
              Maintenance: Clean panels quarterly; expect 5–10% annual
              efficiency drop.
            </li>
            <li>
              Challenges: Monsoon shading—prefer bifacial panels; ensure
              corrosion protection.
            </li>
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">
            Check KSEB/ANERT empaneled installers. Latest guidelines:{" "}
            <a
              className="underline"
              href="https://mnre.gov.in"
              target="_blank"
              rel="noreferrer"
            >
              mnre.gov.in
            </a>
          </p>
        </article>
      </section>

      {/* Footer CTA */}
      <footer className="mt-10 rounded-xl border p-6 bg-[#4CAF50]/5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Get a Free Quote</h2>
            <p className="text-sm text-muted-foreground">
              Talk to certified installers for exact pricing and subsidy
              guidance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://pmsuryaghar.gov.in"
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-[#4CAF50] px-4 py-2 text-white text-sm"
            >
              PM Surya Ghar Subsidy
            </a>
            <Link to="/" className="rounded-md border px-4 py-2 text-sm">
              Check Eligibility
            </Link>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Disclaimer: Prices vary by location, inventory and dealer margins.
          Always consult local dealers for final quotes.
        </p>
      </footer>
    </div>
  );
}
