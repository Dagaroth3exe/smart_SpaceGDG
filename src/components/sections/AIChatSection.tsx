"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Namaste! I'm SmartSpace AI. I can help you find properties, analyze markets, or walk you through paperwork. What are you looking for today?",
    timestamp: new Date(),
  },
];

const quickReplies = [
  "2BHK under ₹60L in Pune",
  "Show market trends in Mumbai",
  "Help me with home loan",
  "Best areas for investment",
];

const dummyResponses: Record<string, string> = {
  "2BHK under ₹60L in Pune": "Great choice! I found 47 matching properties in Pune. Top picks: **Wakad** (avg ₹52L, excellent connectivity), **Hinjewadi** (avg ₹55L, IT hub proximity), and **Kharadi** (avg ₹58L, premium amenities). Want me to filter by possession date or floor preference?",
  "Show market trends in Mumbai": "Mumbai market update: Prices up **8.3% YoY**. Bandra-Kurla Complex leads at ₹32,000/sqft (+12%). Affordable zones: Panvel (₹6,200/sqft), Virar (₹5,800/sqft). Rental yield is strongest in Andheri East at **3.8%**. Shall I generate a full report?",
  "Help me with home loan": "I can guide you! With a ₹60L property, typical requirements: **20% down payment** (₹12L), EMI ~₹42,000/month at 8.5% for 20 years. Top banks: SBI (8.4%), HDFC (8.5%), ICICI (8.6%). Want me to check your eligibility or compare lenders?",
  "Best areas for investment": "Top 3 investment picks for 2024: **1. Navi Mumbai** — NMSEZ expansion, 22% appreciation expected. **2. Whitefield, Bengaluru** — Metro Phase 2 completion boost. **3. Gachibowli, Hyderabad** — 15% rental yield growth. Which city interests you most?",
};

export default function AIChatSection() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response =
        dummyResponses[text] ||
        `I understand you're asking about "${text}". Let me analyze the market data and property listings for you. Based on current trends, I can provide detailed insights. Would you like to narrow down by location, budget, or property type?`;

      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1400);
  };

  return (
    <section id="assistant" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-accent-400 rounded-full" />
            <span className="text-xs text-slate-400">Powered by Claude AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your AI Real Estate
            <span className="gradient-text"> Companion</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Ask anything in English or Hindi — from property search to loan calculations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Chat window */}
          <div className="glass rounded-3xl overflow-hidden h-[560px] flex flex-col">
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-white/8 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                <span className="text-white text-sm">AI</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">SmartSpace Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-accent-400 rounded-full" />
                  <span className="text-xs text-slate-500">Online</span>
                </div>
              </div>
              <div className="ml-auto flex gap-1.5">
                <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors">
                  <PhoneIcon />
                </button>
                <button className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors">
                  <ExpandIcon />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 message-enter ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium ${
                      msg.role === "assistant"
                        ? "bg-gradient-to-br from-brand-500 to-accent-500 text-white"
                        : "bg-surface-600 text-slate-300"
                    }`}
                  >
                    {msg.role === "assistant" ? "AI" : "U"}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-brand-600 text-white rounded-tr-sm"
                        : "bg-surface-700 text-slate-200 rounded-tl-sm"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: msg.text.replace(
                        /\*\*(.*?)\*\*/g,
                        "<strong class='text-white'>$1</strong>"
                      ),
                    }}
                  />
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 message-enter">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-xs text-white">
                    AI
                  </div>
                  <div className="bg-surface-700 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                    <span className="typing-dot w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <span className="typing-dot w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <span className="typing-dot w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 bg-surface-700 rounded-2xl px-4 py-3 border border-white/5 focus-within:border-brand-500/40 transition-colors">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask about properties, markets, loans…"
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Features + quick replies */}
          <div className="space-y-6">
            {/* Quick reply chips */}
            <div>
              <p className="text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider">Try asking</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="px-4 py-2 glass glass-hover rounded-xl text-sm text-slate-300 hover:text-white transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Capability cards */}
            {[
              {
                icon: "🏠",
                title: "Spatial Matchmaking",
                desc: "Tell your lifestyle and we'll find spaces that fit — school proximity, commute time, vibe.",
              },
              {
                icon: "📊",
                title: "Live Market Intel",
                desc: "Real-time price trends, appreciation forecasts, and rental yield analysis by micro-market.",
              },
              {
                icon: "🎤",
                title: "Voice in Hindi & English",
                desc: "Speak naturally in your language. AI understands mixed Hinglish too.",
              },
              {
                icon: "📄",
                title: "Zero-Friction Paperwork",
                desc: "Auto-fill agreements, spot red flags in documents, get legal summaries.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="glass glass-hover rounded-2xl p-5 flex gap-4 cursor-pointer transition-all group"
              >
                <span className="text-2xl shrink-0 mt-0.5">{card.icon}</span>
                <div>
                  <p className="font-medium text-white mb-1 group-hover:text-brand-300 transition-colors">
                    {card.title}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}
