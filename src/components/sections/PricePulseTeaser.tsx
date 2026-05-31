import Link from "next/link";

export default function PricePulseTeaser() {
  return (
    <section className="border-t border-white/6">
      <Link href="/pricepulse" className="block max-w-5xl mx-auto px-6 py-10 group">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/8 text-white font-medium">New</span>
              <span className="text-xs text-[#555]">PricePulse</span>
            </div>
            <p className="text-white font-medium group-hover:text-white/80 transition-colors">
              Is this property fairly priced?
            </p>
            <p className="text-sm text-[#555] mt-0.5">
              Compare against live market data, circle rates, and recent sold prices. Get a verdict in seconds.
            </p>
          </div>
          <span className="text-[#555] group-hover:text-white transition-colors shrink-0 text-sm">
            Try it →
          </span>
        </div>
      </Link>
    </section>
  );
}
