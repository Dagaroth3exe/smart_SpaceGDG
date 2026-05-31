import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <span className="font-semibold text-white text-lg tracking-tight">
                Smart<span className="gradient-text">Space</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              AI-powered real estate for India. Find, analyze, and close properties with intelligence.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Search", "Market Analytics", "AI Assistant", "Document Tools"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Press"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-slate-600">© 2025 SmartSpace. Built for GDG.</p>
          <p className="text-xs text-slate-600">Powered by Claude AI · Whisper · Supabase</p>
        </div>
      </div>
    </footer>
  );
}
