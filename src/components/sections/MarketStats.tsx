"use client";

import { useState } from "react";

const CITIES = ["Mumbai", "Bengaluru", "Hyderabad", "Pune", "Delhi NCR", "Goa"];

const DATA: Record<string, { price: string; growth: string; yield: string; zone: string; bars: number[] }> = {
  Mumbai:     { price: "₹24,800", growth: "+8.3%",  yield: "3.2%", zone: "Bandra-Kurla Complex", bars: [40,55,48,62,58,70,65,78,72,88,82,95] },
  Bengaluru:  { price: "₹9,200",  growth: "+14.1%", yield: "4.1%", zone: "Whitefield",           bars: [38,42,50,58,55,65,70,75,80,85,90,98] },
  Hyderabad:  { price: "₹6,800",  growth: "+11.5%", yield: "3.8%", zone: "Gachibowli",           bars: [30,38,45,42,55,60,58,68,72,78,82,90] },
  Pune:       { price: "₹7,400",  growth: "+9.2%",  yield: "3.5%", zone: "Wakad",                bars: [35,40,44,50,48,58,62,68,65,75,78,86] },
  "Delhi NCR":{ price: "₹12,600", growth: "+6.8%",  yield: "2.9%", zone: "Sector 150, Noida",    bars: [50,52,48,55,60,58,65,62,70,72,68,75] },
  Goa:        { price: "₹8,800",  growth: "+22.4%", yield: "5.2%", zone: "Panaji North",          bars: [25,30,38,45,55,62,70,80,88,92,96,100] },
};

const MONTHS = ["J","F","M","A","M","J","J","A","S","O","N","D"];

export default function MarketStats() {
  const [city, setCity] = useState("Mumbai");
  const d = DATA[city];

  return (
    <section id="market" className="py-24 px-6 border-t border-white/6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-12">
          <p className="text-xs text-[#555] uppercase tracking-widest mb-3">Market</p>
          <h2 className="text-3xl font-semibold text-white">City intelligence</h2>
        </div>

        {/* City tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                city === c
                  ? "border-white/20 text-white bg-white/6"
                  : "border-white/6 text-[#666] hover:text-white hover:border-white/14"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/6 mb-px">
          {[
            { label: "Avg price / sqft", value: d.price },
            { label: "YoY growth",       value: d.growth },
            { label: "Rental yield",     value: d.yield },
          ].map((s) => (
            <div key={s.label} className="bg-[#0a0a0a] px-8 py-6">
              <p className="text-xs text-[#555] mb-2">{s.label}</p>
              <p className="text-2xl font-semibold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Chart + hot zone */}
        <div className="grid md:grid-cols-[1fr_200px] gap-px bg-white/6">
          <div className="bg-[#0a0a0a] px-8 py-6">
            <p className="text-xs text-[#555] mb-5">12-month price index</p>
            <div className="flex items-end gap-1.5 h-28">
              {d.bars.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    className="w-full rounded-sm bg-white/10 group-hover:bg-white/25 transition-colors"
                    style={{ height: `${v}%` }}
                  />
                  <span className="text-[8px] text-[#444]">{MONTHS[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#0a0a0a] px-8 py-6">
            <p className="text-xs text-[#555] mb-2">Hottest zone</p>
            <p className="text-sm font-medium text-white">{d.zone}</p>
            <p className="text-xs text-[#555] mt-1">{city}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
