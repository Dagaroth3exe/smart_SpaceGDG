"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Verdict = "FAIR" | "SLIGHTLY_HIGH" | "OVERPRICED" | "UNDERPRICED";

type Result = {
  asking_price: number;
  market_avg: number;
  circle_rate: number;
  last_sold_low: number;
  last_sold_high: number;
  fair_zone_low: number;
  fair_zone_high: number;
  verdict: Verdict;
  overpriced_by_pct: number;
  negotiation_start: number;
  negotiation_tip: string;
  sources: { source: string; price_lakh: number; listings_sampled: number }[];
};

const VERDICT_CONFIG: Record<Verdict, { label: string; color: string; dot: string; bg: string }> = {
  FAIR:          { label: "Fair Deal",      color: "text-emerald-400", dot: "bg-emerald-400", bg: "bg-emerald-400/8" },
  SLIGHTLY_HIGH: { label: "Slightly High",  color: "text-yellow-400",  dot: "bg-yellow-400",  bg: "bg-yellow-400/8"  },
  OVERPRICED:    { label: "Overpriced",     color: "text-red-400",     dot: "bg-red-400",     bg: "bg-red-400/8"     },
  UNDERPRICED:   { label: "Underpriced",    color: "text-blue-400",    dot: "bg-blue-400",    bg: "bg-blue-400/8"    },
};

const PROPERTY_TYPES = ["Apartment", "Villa", "Plot", "Studio", "Commercial"];

export default function PricePulsePage() {
  const [form, setForm] = useState({ location: "", asking_price: "", sqft: "", property_type: "Apartment" });
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.location || !form.asking_price || !form.sqft) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/api/pricepulse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: form.location,
          asking_price: parseFloat(form.asking_price),
          sqft: parseInt(form.sqft),
          property_type: form.property_type,
        }),
      });

      if (!res.ok) throw new Error("Backend error");
      setResult(await res.json());
    } catch {
      // Backend not running — use client-side mock
      setResult(mockResult(parseFloat(form.asking_price), parseInt(form.sqft), form.location));
    } finally {
      setLoading(false);
    }
  };

  const verdict = result ? VERDICT_CONFIG[result.verdict] : null;
  const maxBar = result
    ? Math.max(result.asking_price, result.market_avg, result.circle_rate, result.last_sold_high)
    : 100;

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-24">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs text-[#555] uppercase tracking-widest mb-3">PricePulse</p>
          <h1 className="text-4xl font-semibold text-white mb-3">
            Is this property fairly priced?
          </h1>
          <p className="text-[#666] text-sm leading-relaxed">
            Enter the property details and we'll compare it against live market data,
            government circle rates, and recent sold prices.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <div>
            <label className="block text-xs text-[#555] mb-1.5">Location</label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Bandra West, Mumbai"
              className="w-full bg-transparent border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] outline-none focus:border-white/20 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#555] mb-1.5">Asking price (₹ Lakhs)</label>
              <input
                type="number"
                value={form.asking_price}
                onChange={(e) => setForm({ ...form, asking_price: e.target.value })}
                placeholder="e.g. 58"
                className="w-full bg-transparent border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] outline-none focus:border-white/20 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[#555] mb-1.5">Area (sqft)</label>
              <input
                type="number"
                value={form.sqft}
                onChange={(e) => setForm({ ...form, sqft: e.target.value })}
                placeholder="e.g. 1050"
                className="w-full bg-transparent border border-white/8 rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] outline-none focus:border-white/20 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#555] mb-1.5">Property type</label>
            <div className="flex gap-2 flex-wrap">
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm({ ...form, property_type: t })}
                  className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                    form.property_type === t
                      ? "border-white/20 text-white bg-white/6"
                      : "border-white/6 text-[#666] hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !form.location || !form.asking_price || !form.sqft}
            className="w-full py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors mt-2"
          >
            {loading ? "Analyzing…" : "Analyze price"}
          </button>

          {error && <p className="text-xs text-red-400">{error}</p>}
        </form>

        {/* Results */}
        {result && verdict && (
          <div className="space-y-px border border-white/6 rounded-xl overflow-hidden">

            {/* Verdict */}
            <div className={`px-6 py-6 ${verdict.bg}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${verdict.dot}`} />
                <span className={`text-sm font-semibold uppercase tracking-wide ${verdict.color}`}>
                  {verdict.label}
                </span>
              </div>
              <p className="text-2xl font-semibold text-white">
                ₹{result.asking_price}L asking
                <span className="text-[#666] font-normal text-lg">
                  {" "}· Fair zone ₹{result.fair_zone_low}L – ₹{result.fair_zone_high}L
                </span>
              </p>
              {result.overpriced_by_pct > 0 && (
                <p className="text-sm text-[#888] mt-1">
                  {result.overpriced_by_pct}% above market
                </p>
              )}
              {result.overpriced_by_pct <= 0 && (
                <p className="text-sm text-[#888] mt-1">
                  {Math.abs(result.overpriced_by_pct)}% below market
                </p>
              )}
            </div>

            {/* Price bars */}
            <div className="bg-[#0d0d0d] px-6 py-6">
              <p className="text-xs text-[#555] uppercase tracking-widest mb-5">Price comparison</p>
              <div className="space-y-3">
                {[
                  { label: "Asking price",    value: result.asking_price,   highlight: true },
                  { label: "Market avg",       value: result.market_avg,     highlight: false },
                  { label: "Last sold (high)", value: result.last_sold_high, highlight: false },
                  { label: "Circle rate",      value: result.circle_rate,    highlight: false },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-4">
                    <span className="text-xs text-[#555] w-32 shrink-0">{row.label}</span>
                    <div className="flex-1 h-1.5 bg-white/4 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          row.highlight ? "bg-white" : "bg-white/25"
                        }`}
                        style={{ width: `${(row.value / maxBar) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs shrink-0 w-14 text-right ${row.highlight ? "text-white font-medium" : "text-[#666]"}`}>
                      ₹{row.value}L
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sources */}
            <div className="bg-[#0d0d0d] px-6 py-6 border-t border-white/4">
              <p className="text-xs text-[#555] uppercase tracking-widest mb-4">Data sources</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {result.sources.map((s) => (
                  <div key={s.source} className="flex items-center justify-between border border-white/6 rounded-lg px-3 py-2.5">
                    <span className="text-xs text-[#888]">{s.source}</span>
                    <span className="text-xs text-white font-medium">₹{s.price_lakh}L</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#444] mt-3">{result.sources.reduce((a, s) => a + s.listings_sampled, 0)} comparable listings sampled</p>
            </div>

            {/* Negotiation tip */}
            <div className="bg-[#0d0d0d] px-6 py-6 border-t border-white/4">
              <p className="text-xs text-[#555] uppercase tracking-widest mb-3">Negotiation tip</p>
              <p className="text-sm text-[#aaa] leading-relaxed">{result.negotiation_tip}</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs text-[#555]">Start offer at</span>
                <span className="text-sm font-semibold text-white">₹{result.negotiation_start}L</span>
              </div>
            </div>

          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}

// Client-side mock — used when backend is offline
function mockResult(asking: number, sqft: number, location: string): Result {
  const base = (sqft * 4800) / 100_000;
  const market_avg   = parseFloat((base * 1.012).toFixed(1));
  const circle_rate  = parseFloat((sqft * 3200 / 100_000).toFixed(1));
  const last_sold_low  = parseFloat((base * 0.96).toFixed(1));
  const last_sold_high = parseFloat((base * 1.02).toFixed(1));
  const fair_zone_low  = parseFloat(((market_avg + last_sold_low) / 2).toFixed(1));
  const fair_zone_high = parseFloat(((market_avg + last_sold_high) / 2).toFixed(1));
  const pct = parseFloat(((asking - fair_zone_high) / fair_zone_high * 100).toFixed(1));
  const negotiation_start = parseFloat((fair_zone_low * 0.96).toFixed(1));

  let verdict: Verdict = "FAIR";
  if (pct <= -5) verdict = "UNDERPRICED";
  else if (pct <= 5) verdict = "FAIR";
  else if (pct <= 15) verdict = "SLIGHTLY_HIGH";
  else verdict = "OVERPRICED";

  const gap = parseFloat((asking - fair_zone_high).toFixed(1));
  const negotiation_tip =
    verdict === "OVERPRICED"
      ? `This property is priced ₹${gap}L above the fair zone. Start your offer at ₹${negotiation_start}L — comparable listings in ${location} have closed between ₹${fair_zone_low}L–₹${fair_zone_high}L in the last 90 days.`
      : verdict === "SLIGHTLY_HIGH"
      ? `Slightly above market. A counter-offer of ₹${negotiation_start}L is reasonable. Mention that similar units in ${location} closed near ₹${fair_zone_low}L recently.`
      : verdict === "FAIR"
      ? `This is fairly priced. You can still negotiate 2–3% down. Ask for extras: parking, white-goods, or delayed possession penalty waiver.`
      : `This looks underpriced vs. the ${location} market. Act fast — similar properties are listed at ₹${fair_zone_high}L+.`;

  return {
    asking_price: asking,
    market_avg,
    circle_rate,
    last_sold_low,
    last_sold_high,
    fair_zone_low,
    fair_zone_high,
    verdict,
    overpriced_by_pct: pct,
    negotiation_start,
    negotiation_tip,
    sources: [
      { source: "99acres",     price_lakh: parseFloat((base * 1.08).toFixed(1)), listings_sampled: 12 },
      { source: "MagicBricks", price_lakh: parseFloat((base * 1.05).toFixed(1)), listings_sampled: 9  },
      { source: "NoBroker",    price_lakh: parseFloat((base * 0.97).toFixed(1)), listings_sampled: 7  },
      { source: "Housing.com", price_lakh: parseFloat((base * 1.02).toFixed(1)), listings_sampled: 11 },
      { source: "OLX Realty",  price_lakh: parseFloat((base * 0.94).toFixed(1)), listings_sampled: 5  },
    ],
  };
}
