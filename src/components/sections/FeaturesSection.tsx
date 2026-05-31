const features = [
  {
    icon: "🗣️",
    title: "Conversational AI Search",
    desc: "Describe your ideal home in plain language — budget, lifestyle, commute. SmartSpace understands context, not just keywords.",
    badge: "Claude AI",
    badgeColor: "bg-brand-600/20 text-brand-300",
  },
  {
    icon: "📸",
    title: "Visual Property Analysis",
    desc: "Upload any listing photo. AI detects room dimensions, sunlight direction, quality issues, and suggests fair price.",
    badge: "Multimodal",
    badgeColor: "bg-purple-600/20 text-purple-300",
  },
  {
    icon: "🎤",
    title: "Hindi & English Voice",
    desc: "Speak naturally in Hindi, English, or Hinglish. Powered by Whisper for near-perfect transcription.",
    badge: "Whisper AI",
    badgeColor: "bg-accent-600/20 text-accent-300",
  },
  {
    icon: "🗺️",
    title: "Spatial Intelligence",
    desc: "See school zones, flood maps, noise levels, future metro lines, and micro-market heatmaps on one map.",
    badge: "Google Maps",
    badgeColor: "bg-yellow-600/20 text-yellow-300",
  },
  {
    icon: "📊",
    title: "Investment Analytics",
    desc: "Compare rental yield, capital appreciation, and liquidity scores across neighbourhoods. Back every decision with data.",
    badge: "Live Data",
    badgeColor: "bg-teal-600/20 text-teal-300",
  },
  {
    icon: "📝",
    title: "Smart Document Assistant",
    desc: "Upload any property document. AI flags red clauses, summarises legal jargon, and auto-fills sale agreements.",
    badge: "Zero Friction",
    badgeColor: "bg-orange-600/20 text-orange-300",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-800/50 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-3">
            Everything You Need
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for the Full
            <span className="gradient-text"> Property Lifecycle</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            From first search to final signature — SmartSpace handles every step.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass glass-hover rounded-3xl p-7 group cursor-pointer transition-all duration-300 relative overflow-hidden"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 shimmer rounded-3xl" />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{f.icon}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${f.badgeColor}`}>
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-brand-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
