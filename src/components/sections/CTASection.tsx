export default function CTASection() {
  return (
    <section className="py-24 px-6 border-t border-white/6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-semibold text-white mb-2">Ready to find your space?</h2>
          <p className="text-[#666] text-sm">Free during beta · No credit card required</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="text-sm text-[#666] hover:text-white transition-colors">Watch demo</button>
          <button className="text-sm px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-white/90 transition-colors">
            Get started free
          </button>
        </div>
      </div>
    </section>
  );
}
