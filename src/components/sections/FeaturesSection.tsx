const features = [
  { icon: "↗", title: "Conversational Search", desc: "Describe your needs naturally. AI understands budget, lifestyle, and commute — not just keywords." },
  { icon: "◎", title: "Visual Analysis", desc: "Upload any listing photo. AI reads room dimensions, sunlight, and quality to estimate fair price." },
  { icon: "♪", title: "Voice in Hindi & English", desc: "Speak naturally in Hindi, English, or Hinglish. Powered by Whisper for accurate transcription." },
  { icon: "⊕", title: "Spatial Intelligence", desc: "Schools, flood zones, metro lines, noise levels — layered on one live map." },
  { icon: "▦", title: "Market Analytics", desc: "Rental yield, appreciation forecasts, and liquidity scores across every micro-market." },
  { icon: "◻", title: "Document Assistant", desc: "Paste any agreement. AI flags red clauses, simplifies legal language, auto-fills forms." },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 border-t border-white/6">
      <div className="max-w-5xl mx-auto">

        <div className="mb-16">
          <p className="text-xs text-[#555] uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl font-semibold text-white">Everything in one place</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6">
          {features.map((f) => (
            <div key={f.title} className="bg-[#0a0a0a] p-8 hover:bg-white/[0.02] transition-colors group">
              <span className="text-[#444] text-xl mb-5 block group-hover:text-[#666] transition-colors">{f.icon}</span>
              <h3 className="text-sm font-medium text-white mb-2">{f.title}</h3>
              <p className="text-sm text-[#555] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
