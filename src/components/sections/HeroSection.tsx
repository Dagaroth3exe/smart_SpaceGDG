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
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-14">
      <div className="max-w-2xl w-full text-center">

        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full border border-white/10 text-xs text-[#888]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          AI-powered · Hindi &amp; English
        </div>

        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.1] mb-5">
          Find your next<br />
          <span className="text-[#666]">property with AI</span>
        </h1>

        <p className="text-[#666] text-lg mb-10 leading-relaxed">
          Describe what you're looking for in plain language.<br />
          SmartSpace finds, analyzes, and guides you to close.
        </p>

        {/* Search */}
        <div className="flex items-center gap-2 border border-white/10 rounded-xl px-4 py-3 bg-white/[0.03] focus-within:border-white/20 transition-colors mb-4">
          <svg className="w-4 h-4 text-[#555] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your ideal property…"
            className="flex-1 bg-transparent text-sm text-white placeholder-[#555] outline-none"
          />
          <button className="shrink-0 text-sm px-3.5 py-1.5 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors">
            Search
          </button>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => setQuery(c)}
              className="text-xs text-[#666] hover:text-white border border-white/8 hover:border-white/20 px-3 py-1.5 rounded-full transition-colors"
            >
              {c}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
