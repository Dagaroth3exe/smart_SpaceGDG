"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { id: number; role: "user" | "ai"; text: string };

const INIT: Msg[] = [
  { id: 0, role: "ai", text: "Hi! I'm SmartSpace AI. Tell me what kind of property you're looking for." },
];

const REPLIES: Record<string, string> = {
  "2bhk in pune under 60l": "Found 47 matches. Top areas: Wakad (avg ₹52L), Hinjewadi (₹55L), Kharadi (₹58L). Want to filter by possession date?",
  "market trends mumbai": "Mumbai prices up 8.3% YoY. BKC leads at ₹32k/sqft. Best rental yield: Andheri East at 3.8%. Generate full report?",
  "home loan help": "For a ₹60L property: 20% down (₹12L), EMI ~₹42k/month at 8.5% over 20 years. Top lenders: SBI 8.4%, HDFC 8.5%. Check eligibility?",
};

const PROMPTS = ["2BHK in Pune under 60L", "Market trends Mumbai", "Home loan help"];

export default function AIChatSection() {
  const [msgs, setMsgs] = useState<Msg[]>(INIT);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((p) => [...p, { id: Date.now(), role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = REPLIES[text.toLowerCase()] ?? `Let me look into "${text}" — analyzing listings and market data now. Could you share your preferred city and budget range?`;
      setMsgs((p) => [...p, { id: Date.now(), role: "ai", text: reply }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <section id="assistant" className="py-24 px-6 border-t border-white/6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-16">
          <p className="text-xs text-[#555] uppercase tracking-widest mb-3">Assistant</p>
          <h2 className="text-3xl font-semibold text-white">Ask anything</h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">

          {/* Chat */}
          <div className="border border-white/8 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-white/6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-[#888]">SmartSpace AI</span>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-5 space-y-4">
              {msgs.map((m) => (
                <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <span className={`shrink-0 w-6 h-6 rounded-full text-[10px] font-medium flex items-center justify-center ${
                    m.role === "ai" ? "bg-white/10 text-white" : "bg-white text-black"
                  }`}>
                    {m.role === "ai" ? "AI" : "U"}
                  </span>
                  <p className={`text-sm leading-relaxed max-w-[80%] ${
                    m.role === "user" ? "text-white" : "text-[#aaa]"
                  }`}>
                    {m.text}
                  </p>
                </div>
              ))}
              {typing && (
                <div className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-white/10 text-[10px] font-medium flex items-center justify-center text-white">AI</span>
                  <div className="flex gap-1 items-center pt-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1 h-1 rounded-full bg-[#555] animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 border border-white/8 rounded-lg px-3 py-2.5 focus-within:border-white/20 transition-colors">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  placeholder="Ask about properties, markets, loans…"
                  className="flex-1 bg-transparent text-sm text-white placeholder-[#555] outline-none"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim()}
                  className="text-[#555] hover:text-white disabled:opacity-30 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Prompts */}
          <div className="space-y-2">
            <p className="text-xs text-[#555] mb-4">Try asking</p>
            {PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="w-full text-left text-sm text-[#666] hover:text-white border border-white/6 hover:border-white/14 rounded-lg px-4 py-3 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
