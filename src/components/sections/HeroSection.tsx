"use client";

import { useState } from "react";

const chips = [
  "3BHK under ₹80L near metro",
  "Sea-view flat in Mumbai",
  "Investment plot in Hyderabad",
];

export default function HeroSection() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-14 overflow-hidden">

      {/* background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-white/[0.03] blur-[100px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/[0.04] blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-purple-500/[0.04] blur-[80px]" />
      </div>

      <div className="relative max-w-3xl w-full text-center">

        {/* badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-[#777]" style={{ animationDelay: "0ms" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI-powered · Hindi &amp; English
        </div>

        {/* headline */}
        <h1
          className="animate-fade-up font-bold tracking-tight text-white leading-[1.05] mb-6"
          style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", animationDelay: "80ms" }}
        >
          Find your next<br />
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #fff 30%, #666 100%)" }}>
            property with AI
          </span>
        </h1>

        {/* sub */}
        <p
          className="animate-fade-up text-[#555] text-lg mb-12 leading-relaxed max-w-xl mx-auto"
          style={{ animationDelay: "180ms" }}
        >
          Describe what you're looking for in plain language.
          SmartSpace finds, analyzes, and guides you to close.
        </p>

        {/* search */}
        <div
          className="animate-fade-up mb-5"
          style={{ animationDelay: "260ms" }}
        >
          <div className="flex items-center gap-2 border border-white/10 rounded-2xl px-5 py-4 bg-white/[0.03] focus-within:border-white/20 focus-within:bg-white/[0.05] transition-all shadow-[0_0_40px_rgba(255,255,255,0.03)]">
            <svg className="w-4 h-4 text-[#444] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your ideal property…"
              className="flex-1 bg-transparent text-sm text-white placeholder-[#444] outline-none"
            />
            <button className="shrink-0 text-sm px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* chips */}
        <div
          className="animate-fade-up flex flex-wrap justify-center gap-2"
          style={{ animationDelay: "340ms" }}
        >
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => setQuery(c)}
              className="text-xs text-[#555] hover:text-white border border-white/8 hover:border-white/20 px-3.5 py-1.5 rounded-full transition-colors hover:bg-white/[0.04]"
            >
              {c}
            </button>
          ))}
        </div>

        {/* stats strip */}
        <div
          className="animate-fade-up mt-16 flex flex-wrap justify-center gap-8"
          style={{ animationDelay: "420ms" }}
        >
          {[["50k+", "Properties"], ["120+", "Cities"], ["4.9★", "Rating"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-white">{val}</p>
              <p className="text-xs text-[#555] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
