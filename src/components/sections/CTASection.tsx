export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass glow-brand rounded-3xl p-12 md:p-16 relative overflow-hidden">
          {/* Background blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-brand-600/20 px-4 py-1.5 rounded-full mb-8">
              <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
              <span className="text-xs text-brand-300">Free during beta</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Start Your Smarter
              <br />
              <span className="gradient-text">Real Estate Journey</span>
            </h2>

            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join 12,000+ buyers, sellers, and investors who use SmartSpace to make
              better property decisions every day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base transition-all hover:shadow-xl hover:shadow-brand-600/30 hover:-translate-y-0.5">
                Get Started Free
              </button>
              <button className="px-8 py-4 rounded-2xl glass glass-hover text-white font-medium text-base transition-all hover:-translate-y-0.5">
                Watch Demo →
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-white/8">
              {[
                { value: "12K+", label: "Active Users" },
                { value: "2.4M", label: "Properties" },
                { value: "₹480Cr+", label: "Deals Closed" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold gradient-text">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
