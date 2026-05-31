"use client";

import { useState } from "react";

const suggestions = [
  "3BHK under ₹80L near metro in Bengaluru",
  "Pet-friendly apartments in Bandra with sea view",
  "Investment plots in Hyderabad under 50L",
  "Luxury villas in Goa with private pool",
];

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient noise">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating stat chips */}
      <div className="absolute top-32 left-12 hidden lg:flex items-center gap-2 glass px-4 py-2.5 rounded-full float" style={{ animationDelay: "0s" }}>
        <span className="w-2 h-2 bg-accent-400 rounded-full" />
        <span className="text-xs text-slate-300">2.4M+ Properties Listed</span>
      </div>
      <div className="absolute top-44 right-16 hidden lg:flex items-center gap-2 glass px-4 py-2.5 rounded-full float" style={{ animationDelay: "1.5s" }}>
        <span className="w-2 h-2 bg-brand-400 rounded-full" />
        <span className="text-xs text-slate-300">AI-Powered Matching</span>
      </div>
      <div className="absolute bottom-32 left-20 hidden lg:flex items-center gap-2 glass px-4 py-2.5 rounded-full float" style={{ animationDelay: "3s" }}>
        <span className="w-2 h-2 bg-yellow-400 rounded-full" />
        <span className="text-xs text-slate-300">Live Market Intelligence</span>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-8">
          <span className="text-xs font-medium text-brand-400">NEW</span>
          <span className="w-px h-3 bg-white/20" />
          <span className="text-xs text-slate-400">Voice search in Hindi & English now live</span>
          <span className="text-brand-400 text-xs">→</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Find Your
          <span className="gradient-text"> Perfect Space</span>
          <br />
          <span className="text-slate-400 font-light text-4xl md:text-5xl">with AI that gets you</span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          SmartSpace combines conversational AI, spatial intelligence, and live market
          analytics to guide you through every step of your real estate journey.
        </p>

        {/* Search bar */}
        <div className="glass glow-brand rounded-2xl p-2 max-w-2xl mx-auto mb-6">
          <div className="flex items-center gap-3">
            {/* Lang toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="shrink-0 px-3 py-2 rounded-xl bg-surface-600 text-xs font-medium text-slate-300 hover:text-white hover:bg-surface-500 transition-all ml-1"
            >
              {lang === "en" ? "EN" : "हि"}
            </button>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                lang === "en"
                  ? "Describe your dream property…"
                  : "अपनी पसंद की प्रॉपर्टी बताएं…"
              }
              className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm outline-none py-2"
            />

            {/* Voice btn */}
            <button
              onClick={() => setIsListening(!isListening)}
              className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                isListening
                  ? "bg-red-500/20 text-red-400 pulse-ring"
                  : "bg-surface-600 text-slate-400 hover:text-white hover:bg-surface-500"
              }`}
            >
              <MicIcon />
            </button>

            {/* Search btn */}
            <button className="shrink-0 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-brand-600/30">
              Search
            </button>
          </div>
        </div>

        {/* Suggestion pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="text-xs text-slate-400 hover:text-slate-200 glass hover:border-brand-500/30 px-3 py-1.5 rounded-full transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 text-slate-600">
          <span className="text-xs">Explore features</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}
