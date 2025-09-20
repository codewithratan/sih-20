import { Link } from "react-router-dom";

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

export default function Dashboard() {
  return (
    <div className="container mx-auto py-10">
      {/* Header */}
      <header className="rounded-xl overflow-hidden border bg-white dark:bg-zinc-900">
        <div className="relative grid md:grid-cols-2">
          <div className="p-8 md:p-12 space-y-3">
            <h1 className="text-2xl md:text-3xl font-extrabold">
              Top 10 Indian Solar Panel Manufacturers 2025: Price Comparison, Models, and Official Links
            </h1>
            <p className="text-sm text-muted-foreground">
              Compare High-Efficiency Solar Panels for Your Home or Business – Updated September 2025
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
          India’s solar market continues to surge in 2025, crossing 74 GW of installed capacity with strong
          momentum from domestic manufacturing and the Production Linked Incentive (PLI) scheme. Comparing
          Tier-1 manufacturers helps buyers balance efficiency, warranty, and total system cost. The prices
          below reflect typical market averages for 500–600 W mono PERC/TOPCon modules and include 12% GST;
          actual quotes vary by city, logistics, and dealer margins. Rooftop households can additionally benefit
          from central/state incentives such as PM Surya Ghar. Use this guide to shortlist reliable brands,
          check warranties, and pick the best fit for your home or business.
        </p>
      </section>

      {/* Comparison Table */}
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
                  <td className="p-3">₹{c.priceWp} / ₹{c.total1kW.toLocaleString("en-IN")}</td>
                  <td className="p-3">{c.warrantyProduct}/{c.warrantyPerformance} yrs</td>
                  <td className="p-3">{c.strengths}</td>
                  <td className="p-3 text-[#4CAF50] underline"><a href={c.website} target="_blank" rel="noreferrer">{c.websiteLabel}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Note: Prices are indicative (Sep 2025), exclude installation/BOS. Check official websites and market reports for latest figures.
        </p>
      </section>

      {/* Detailed Cards */}
      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {COMPANIES.map((c) => (
          <article key={c.company} className="rounded-lg border p-5 bg-white/50 dark:bg-zinc-900/50">
            <h3 className="text-lg font-semibold">{c.company}</h3>
            <p className="text-xs text-muted-foreground">Model: {c.model} • {c.efficiency}%</p>
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
            <p className="mt-2 text-sm"><span className="font-medium">Best for:</span> {c.useCase}</p>
            <div className="mt-3 flex items-center gap-3">
              <a
                href={c.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-md bg-[#4CAF50] px-3 py-2 text-white text-sm"
              >
                Buy Now
              </a>
              <a href={c.website} target="_blank" rel="noreferrer" className="text-sm text-[#4CAF50] underline">
                Official Site
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* Footer CTA */}
      <footer className="mt-10 rounded-xl border p-6 bg-[#4CAF50]/5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Get a Free Quote</h2>
            <p className="text-sm text-muted-foreground">Talk to certified installers for exact pricing and subsidy guidance.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noreferrer" className="rounded-md bg-[#4CAF50] px-4 py-2 text-white text-sm">
              PM Surya Ghar Subsidy
            </a>
            <Link to="/" className="rounded-md border px-4 py-2 text-sm">Check Eligibility</Link>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Disclaimer: Prices vary by location, inventory and dealer margins. Always consult local dealers for final quotes.
        </p>
      </footer>
    </div>
  );
}
