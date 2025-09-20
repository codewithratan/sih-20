import { useEffect } from "react";

export default function Insurance() {
  useEffect(() => {
    document.title = "Kerala 2025: Solar Panels & Insurance Comparison";
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900">
      <header className="bg-green-600 text-white">
        <div className="container py-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Top Solar Panel Manufacturers and Insurance Options in Kerala 2025
          </h1>
          <p className="mt-2 text-sm sm:text-base">
            Discover Kerala’s Top Solar Panels and Insurance Plans for Your Solar Journey – Updated September 2025
          </p>
          <div className="mt-6">
            <img
              src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1600&auto=format&fit=crop"
              alt="Kerala solar rooftop installation in a lush landscape"
              className="mx-auto rounded-lg shadow-lg w-full max-h-[320px] object-cover"
            />
          </div>
        </div>
      </header>

      <main className="container py-10">
        <section aria-labelledby="intro" className="mx-auto max-w-4xl bg-white rounded-lg shadow p-6">
          <h2 id="intro" className="text-2xl font-semibold mb-4">
            Kerala’s Solar Surge and Why Insurance Matters
          </h2>
          <p className="leading-7 text-gray-700">
            Kerala’s solar market is thriving in 2025, crossing roughly 1,000 MW of installed capacity with an estimated
            80% from rooftop systems. The growth is propelled by ANERT’s Soura initiatives and the PM Surya Ghar subsidy
            program, which make high-quality modules more affordable for households and businesses. Five manufacturers—Waaree
            Energies, Adani Solar, Tata Power Solar, Vikram Solar, and Bluebird Solar—collectively account for about 60% of
            new installations in the state. Their dominance stems from ALMM-compliant portfolios, reliable local installer
            networks (including Sunsenz Solar, El Sol, and Galian Watts), and a shift to high-efficiency TOPCon and bifacial
            technologies that perform well in Kerala’s varied conditions. Given the state’s strong monsoons and coastal climate,
            insurance is increasingly essential to safeguard systems against weather damage, theft, transit risks, and latent
            defects. Leading insurers such as Tata AIG and ICICI Lombard offer policies that cover equipment failures and
            natural calamities over long warranty horizons. Pricing in the tables below is indicative (for 500–600W modules,
            ex‑GST) and will vary by vendor and site conditions; with ANERT facilitation, subsidies can reduce upfront costs
            significantly, improving payback. Use the comparisons below to select modules and coverage that fit your site,
            budget, and performance needs.
          </p>
        </section>

        <section aria-labelledby="solar-table" className="mt-10 mx-auto max-w-6xl bg-white rounded-lg shadow p-6">
          <h2 id="solar-table" className="text-2xl font-semibold mb-4">Top Solar Panel Manufacturers in Kerala</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-4 py-3 text-left">Company</th>
                  <th className="px-4 py-3 text-left">Sample Model</th>
                  <th className="px-4 py-3 text-left">Efficiency (%)</th>
                  <th className="px-4 py-3 text-left">Price (INR/Wp / 1kW Total)</th>
                  <th className="px-4 py-3 text-left">Warranty (Product/Perf)</th>
                  <th className="px-4 py-3 text-left">Key Strengths in Kerala</th>
                  <th className="px-4 py-3 text-left">Market Share (2025)</th>
                  <th className="px-4 py-3 text-left">Official Website</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="px-4 py-3">Waaree Energies</td>
                  <td className="px-4 py-3">Vertex S+ 550W TOPCon</td>
                  <td className="px-4 py-3">21.5</td>
                  <td className="px-4 py-3">₹22-24 / ₹22,000-24,000</td>
                  <td className="px-4 py-3">12/30 yrs</td>
                  <td className="px-4 py-3">Largest supplier, Kochi/Thrissur network</td>
                  <td className="px-4 py-3">20-25%</td>
                  <td className="px-4 py-3">
                    <a className="text-blue-600 hover:underline" href="https://waaree.com" target="_blank" rel="noopener noreferrer">waaree.com</a>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Adani Solar</td>
                  <td className="px-4 py-3">Shine TOPCon 550W</td>
                  <td className="px-4 py-3">22.0</td>
                  <td className="px-4 py-3">₹23-25 / ₹23,000-25,000</td>
                  <td className="px-4 py-3">15/30 yrs</td>
                  <td className="px-4 py-3">High-efficiency, Mundra supply, subsidies</td>
                  <td className="px-4 py-3">15-20%</td>
                  <td className="px-4 py-3">
                    <a className="text-blue-600 hover:underline" href="https://www.adanisolar.com" target="_blank" rel="noopener noreferrer">adanisolar.com</a>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3">Tata Power Solar</td>
                  <td className="px-4 py-3">TP 540W Mono PERC</td>
                  <td className="px-4 py-3">21.0</td>
                  <td className="px-4 py-3">₹25-27 / ₹25,000-27,000</td>
                  <td className="px-4 py-3">12/25 yrs</td>
                  <td className="px-4 py-3">EPC expertise, 101 MW Kayamkulam project</td>
                  <td className="px-4 py-3">10-15%</td>
                  <td className="px-4 py-3">
                    <a className="text-blue-600 hover:underline" href="https://www.tatapowersolar.com" target="_blank" rel="noopener noreferrer">tatapowersolar.com</a>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Vikram Solar</td>
                  <td className="px-4 py-3">Elite 550W Bifacial</td>
                  <td className="px-4 py-3">21.8</td>
                  <td className="px-4 py-3">₹23-25 / ₹23,000-25,000</td>
                  <td className="px-4 py-3">12/30 yrs</td>
                  <td className="px-4 py-3">Hybrid projects, rural growth</td>
                  <td className="px-4 py-3">8-10%</td>
                  <td className="px-4 py-3">
                    <a className="text-blue-600 hover:underline" href="https://www.vikramsolar.com" target="_blank" rel="noopener noreferrer">vikramsolar.com</a>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3">Bluebird Solar</td>
                  <td className="px-4 py-3">Mono PERC 550W</td>
                  <td className="px-4 py-3">21.0</td>
                  <td className="px-4 py-3">₹21-23 / ₹21,000-23,000</td>
                  <td className="px-4 py-3">10/25 yrs</td>
                  <td className="px-4 py-3">Affordable, subsidy-aligned, installer ties</td>
                  <td className="px-4 py-3">5-7%</td>
                  <td className="px-4 py-3">
                    <a className="text-blue-600 hover:underline" href="https://bluebirdsolar.com" target="_blank" rel="noopener noreferrer">bluebirdsolar.com</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">*Prices approximate (Sep 2025, ex-installation/GST); source: KSEB/ANERT, installer data.</p>
        </section>

        <section aria-labelledby="insurance-table" className="mt-10 mx-auto max-w-6xl bg-white rounded-lg shadow p-6">
          <h2 id="insurance-table" className="text-2xl font-semibold mb-4">Top Solar Insurance Providers in Kerala</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="px-4 py-3 text-left">Insurer</th>
                  <th className="px-4 py-3 text-left">Policy Name</th>
                  <th className="px-4 py-3 text-left">Coverage Highlights</th>
                  <th className="px-4 py-3 text-left">Premium (5 kW)</th>
                  <th className="px-4 py-3 text-left">Best For</th>
                  <th className="px-4 py-3 text-left">Official Website</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="px-4 py-3">Tata AIG General Insurance</td>
                  <td className="px-4 py-3">Solar Module Warranty Insurance</td>
                  <td className="px-4 py-3">Warranty (12/30 yrs), weather damage, theft</td>
                  <td className="px-4 py-3">₹8,000-15,000</td>
                  <td className="px-4 py-3">Residential, EPC integrations</td>
                  <td className="px-4 py-3">
                    <a className="text-blue-600 hover:underline" href="https://www.tataaig.com" target="_blank" rel="noopener noreferrer">tataaig.com</a>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">ICICI Lombard</td>
                  <td className="px-4 py-3">Photovoltaic Panel Warranty Insurance</td>
                  <td className="px-4 py-3">Defects, breakdowns, natural calamities (10/25 yrs)</td>
                  <td className="px-4 py-3">₹7,000-12,000</td>
                  <td className="px-4 py-3">Commercial, warranty focus</td>
                  <td className="px-4 py-3">
                    <a className="text-blue-600 hover:underline" href="https://www.icicilombard.com" target="_blank" rel="noopener noreferrer">icicilombard.com</a>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3">HDFC ERGO</td>
                  <td className="px-4 py-3">Solar Panel Warranty Insurance</td>
                  <td className="px-4 py-3">Theft, vandalism, equipment failure; transit option</td>
                  <td className="px-4 py-3">₹6,500-14,000</td>
                  <td className="px-4 py-3">C&I, manufacturer protection</td>
                  <td className="px-4 py-3">
                    <a className="text-blue-600 hover:underline" href="https://www.hdfcergo.com" target="_blank" rel="noopener noreferrer">hdfcergo.com</a>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3">Reliance General Insurance</td>
                  <td className="px-4 py-3">Solar Rooftop Insurance (1-Year)</td>
                  <td className="px-4 py-3">Hurricanes, fire, inverters/batteries</td>
                  <td className="px-4 py-3">₹5,000-10,000</td>
                  <td className="px-4 py-3">New installs, budget-friendly</td>
                  <td className="px-4 py-3">
                    <a className="text-blue-600 hover:underline" href="https://www.reliancegeneral.co.in" target="_blank" rel="noopener noreferrer">reliancegeneral.co.in</a>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3">Cholamandalam MS</td>
                  <td className="px-4 py-3">Chola Solar Plant Protect Policy</td>
                  <td className="px-4 py-3">All-risks, business interruption, liability</td>
                  <td className="px-4 py-3">₹9,000-18,000</td>
                  <td className="px-4 py-3">Utility-scale, hybrid projects</td>
                  <td className="px-4 py-3">
                    <a className="text-blue-600 hover:underline" href="https://www.cholainsurance.com" target="_blank" rel="noopener noreferrer">cholainsurance.com</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-600 mt-2">*Premiums approximate (Sep 2025, ex-GST); vary by location. Source: MNRE/IRDAI.</p>
        </section>

        <section aria-labelledby="detail-solar" className="mt-10 mx-auto max-w-6xl bg-white rounded-lg shadow p-6">
          <h2 id="detail-solar" className="text-2xl font-semibold mb-4">Solar Panel Manufacturers: Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-bold">Waaree Energies</h3>
              <p className="mt-2 text-gray-700">With a 20–25% share, Waaree’s Vertex S+ 550W TOPCon balances affordability (₹22–24/Wp) and durability—ideal for Kerala’s rooftops. Pros: strong Kochi/Thrissur partner network, subsidy alignment. Cons: fewer very-high-wattage options. Best for: residential 3–5 kW systems.</p>
              <a href="https://waaree.com/contact" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Get Quote</a>
            </article>
            <article className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-bold">Adani Solar</h3>
              <p className="mt-2 text-gray-700">Adani’s Shine 550W TOPCon (22% efficiency) serves both C&I and utility segments, with reliable Mundra supply. Pros: high efficiency and subsidy access. Cons: higher pricing (₹23–25/Wp). Best for: commercial arrays needing top performance.</p>
              <a href="https://www.adanisolar.com/contact-us" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Get Quote</a>
            </article>
            <article className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-bold">Tata Power Solar</h3>
              <p className="mt-2 text-gray-700">Trusted EPC leader with 250 MW+ in Kerala; the TP 540W Mono PERC suits premium installs. Pros: robust service, floating solar (Kayamkulam). Cons: premium price (₹25–27/Wp). Best for: commercial and high-end residential installs.</p>
              <a href="https://www.tatapowersolar.com/contact-us" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Get Quote</a>
            </article>
            <article className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-bold">Vikram Solar</h3>
              <p className="mt-2 text-gray-700">Elite 550W Bifacial excels in rural and hybrid projects across Kerala. Pros: bifacial gains in monsoon/cloud cover, EPC know-how. Cons: relatively smaller network. Best for: rural/commercial sites seeking reliability.</p>
              <a href="https://www.vikramsolar.com/contact-us" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Get Quote</a>
            </article>
            <article className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-xl font-bold">Bluebird Solar</h3>
              <p className="mt-2 text-gray-700">Mono PERC 550W offers a value-first choice aligned with subsidies. Pros: budget-friendly, good installer ties (e.g., Sunsenz). Cons: slightly lower efficiency. Best for: cost-conscious rooftops.</p>
              <a href="https://bluebirdsolar.com/pages/contact-us" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Get Quote</a>
            </article>
          </div>
        </section>

        <section aria-labelledby="detail-insurance" className="mt-10 mx-auto max-w-6xl bg-white rounded-lg shadow p-6">
          <h2 id="detail-insurance" className="text-2xl font-semibold mb-4">Solar Insurance Providers: Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-lg font-bold">Tata AIG General Insurance</h3>
              <p className="mt-2 text-gray-700">Fast claims and broad coverage for warranty, monsoon damage, and theft. Best for residential users and EPC tie-ins seeking smoother service.</p>
              <a href="https://www.tataaig.com/contact-us" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Buy Policy</a>
            </article>
            <article className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-lg font-bold">ICICI Lombard</h3>
              <p className="mt-2 text-gray-700">Strong warranty-focus with defect and breakdown coverage plus natural calamities. A good match for C&I projects prioritizing uptime.</p>
              <a href="https://www.icicilombard.com/contact-us" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Buy Policy</a>
            </article>
            <article className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-lg font-bold">HDFC ERGO</h3>
              <p className="mt-2 text-gray-700">Covers theft, vandalism, and equipment failures with an optional transit add-on—useful for distributed assets and OEM logistics.</p>
              <a href="https://www.hdfcergo.com/contact-us" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Buy Policy</a>
            </article>
            <article className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-lg font-bold">Reliance General Insurance</h3>
              <p className="mt-2 text-gray-700">Budget-friendly protection against hurricanes, fire, and major component failures—ideal for new, smaller rooftop installs.</p>
              <a href="https://www.reliancegeneral.co.in/Insurance/Contact-Us.aspx" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Buy Policy</a>
            </article>
            <article className="p-6 bg-gray-50 rounded-lg shadow">
              <h3 className="text-lg font-bold">Cholamandalam MS</h3>
              <p className="mt-2 text-gray-700">All-risks cover with business interruption and liability options—well-suited to utility-scale or hybrid plants seeking comprehensive risk transfer.</p>
              <a href="https://www.cholainsurance.com/ContactUs" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Buy Policy</a>
            </article>
          </div>
        </section>

        <section aria-labelledby="kerala-insights" className="mt-10 mx-auto max-w-4xl bg-white rounded-lg shadow p-6">
          <h2 id="kerala-insights" className="text-2xl font-semibold mb-4">Kerala-Specific Insights</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>300+ sunny days, net metering, and ANERT support enable 4–6 year ROI for typical rooftops.</li>
            <li>Bifacial/TOPCon modules (Adani, Vikram) help in diffuse light during monsoons and coastal conditions.</li>
            <li>Local installer ecosystem—Sunsenz, El Sol, Galian Watts—drives rapid adoption and service coverage.</li>
            <li>ANERT and KSEB empanelment streamlines subsidy access; many vendors align with PM Surya Ghar requirements.</li>
          </ul>
        </section>
      </main>

      <footer className="bg-green-600 text-white">
        <div className="container py-8 text-center space-y-3">
          <h2 className="text-xl font-semibold">Get Your Solar + Insurance Quote Today</h2>
          <p className="text-sm">Consult dealers for exact pricing. Visit <a className="underline" href="https://anert.gov.in" target="_blank" rel="noopener noreferrer">ANERT</a> or <a className="underline" href="https://mnre.gov.in" target="_blank" rel="noopener noreferrer">MNRE</a> for subsidies.</p>
          <p className="text-sm">Follow us: <a className="underline" href="#">Twitter</a> | <a className="underline" href="#">Facebook</a></p>
        </div>
      </footer>
    </div>
  );
}
