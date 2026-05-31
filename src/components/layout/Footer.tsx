export default function Footer() {
  return (
    <footer className="border-t border-white/6 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs text-[#444]">SmartSpace · Built for GDG</p>
        <div className="flex items-center gap-6">
          {["Search", "Market", "Assistant", "Listings"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-xs text-[#444] hover:text-[#888] transition-colors">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
