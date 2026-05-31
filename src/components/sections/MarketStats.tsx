"use client";

import { useState } from "react";

const cities = ["Mumbai", "Bengaluru", "Hyderabad", "Pune", "Delhi NCR", "Goa"];

type CityData = {
  avgPrice: string;
  growth: string;
  rentalYield: string;
  inventory: string;
  hotZone: string;
  trend: "up" | "down";
  bars: number[];
};

const cityData: Record<string, CityData> = {
  Mumbai: { avgPrice: "₹24,800", growth: "+8.3%", rentalYield: "3.2%", inventory: "18,400", hotZone: "Bandra-Kurla Complex", trend: "up", bars: [40, 55, 48, 62, 58, 70, 65, 78, 72, 88, 82, 95] },
  Bengaluru: { avgPrice: "₹9,200", growth: "+14.1%", rentalYield: "4.1%", inventory: "24,600", hotZone: "Whitefield", trend: "up", bars: [38, 42, 50, 58, 55, 65, 70, 75, 80, 85, 90, 98] },
  Hyderabad: { avgPrice: "₹6,800", growth: "+11.5%", rentalYield: "3.8%", inventory: "31,200", hotZone: "Gachibowli", trend: "up", bars: [30, 38, 45, 42, 55, 60, 58, 68, 72, 78, 82, 90] },
  Pune: { avgPrice: "₹7,400", growth: "+9.2%", rentalYield: "3.5%", inventory: "22,800", hotZone: "Wakad", trend: "up", bars: [35, 40, 44, 50, 48, 58, 62, 68, 65, 75, 78, 86] },
  "Delhi NCR": { avgPrice: "₹12,600", growth: "+6.8%", rentalYield: "2.9%", inventory: "41,500", hotZone: "Sector 150, Noida", trend: "up", bars: [50, 52, 48, 55, 60, 58, 65, 62, 70, 72, 68, 75] },
  Goa: { avgPrice: "₹8,800", growth: "+22.4%", rentalYield: "5.2%", inventory: "4,200", hotZone: "Panaji North", trend: "up", bars: [25, 30, 38, 45, 55, 62, 70, 80, 88, 92, 96, 100] },
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function MarketStats() {
  const [city, setCity] = useState("Mumbai");
  const data = cityData[city];

  return (
    <section id="market" className="py-24 px-6 relative">
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-3">
            Real-time Data
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            City-Wide
            <span className="gradient-text"> Market Intelligence</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Live price trends, appreciation forecasts, and rental yield data across India's top real estate markets.
          </p>
        </div>

        {/* City selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                city === c
                  ? "bg-brand-600 text-white glow-brand"
                  : "glass glass-hover text-slate-400 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* KPI cards */}
          <div className="lg:col-span-1 grid grid-cols-2 gap-4 content-start">
            {[
              { label: "Avg Price/sqft", value: data.avgPrice, sub: "current", icon: "💰", color: "text-yellow-400" },
              { label: "YoY Growth", value: data.growth, sub: "annual", icon: "📈", color: "text-accent-400" },
              { label: "Rental Yield", value: data.rentalYield, sub: "gross avg", icon: "🏦", color: "text-brand-400" },
              { label: "Active Listings", value: data.inventory, sub: "properties", icon: "🏘️", color: "text-pink-400" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass glass-hover rounded-2xl p-5 transition-all cursor-default"
              >
                <span className="text-2xl">{stat.icon}</span>
                <p className={`text-2xl font-bold mt-2 mb-0.5 ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}

            {/* Hot zone */}
            <div className="col-span-2 glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span className="text-xs text-slate-500 uppercase tracking-wider">Hottest Zone</span>
              </div>
              <p className="text-white font-semibold">{data.hotZone}</p>
              <p className="text-xs text-slate-500 mt-1">Highest demand · {city}</p>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 glass rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-semibold text-white">{city} Price Trend</p>
                <p className="text-xs text-slate-500 mt-0.5">₹/sqft · 12 month view</p>
              </div>
              <div className="flex items-center gap-2 text-accent-400 text-sm font-medium">
                <TrendIcon />
                {data.growth} this year
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-2 h-48">
              {data.bars.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-brand-700 to-brand-500 group-hover:from-brand-600 group-hover:to-accent-400 transition-all duration-300 relative"
                    style={{ height: `${val}%` }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-600 text-white text-xs px-2 py-0.5 rounded-lg whitespace-nowrap">
                      {val}%
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-600">{months[i]}</span>
                </div>
              ))}
            </div>

            {/* Bottom legend */}
            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-brand-600" />
                <span className="text-xs text-slate-500">Price index</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-accent-500" />
                <span className="text-xs text-slate-500">Demand index</span>
              </div>
              <span className="ml-auto text-xs text-slate-600">Data via SmartSpace AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
