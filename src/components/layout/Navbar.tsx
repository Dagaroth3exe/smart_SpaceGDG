"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "border-b border-white/8 bg-[#0a0a0a]/90 backdrop-blur-md" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-sm font-semibold tracking-tight text-white">
            SmartSpace
          </a>
          <div className="hidden md:flex items-center gap-6">
            {["Search", "Market", "Assistant", "Listings"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-[#888] hover:text-white transition-colors">
                {l}
              </a>
            ))}
            <a href="/pricepulse" className="text-sm text-[#888] hover:text-white transition-colors flex items-center gap-1.5">
              PricePulse
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-white font-medium uppercase tracking-wide">New</span>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:block text-xs text-[#666] truncate max-w-[140px]">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="text-sm text-[#888] hover:text-white transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <a href="/auth/login" className="text-sm text-[#888] hover:text-white transition-colors">Sign in</a>
              <a href="/auth/login" className="text-sm px-3.5 py-1.5 rounded-md bg-white text-black font-medium hover:bg-white/90 transition-colors">
                Get started
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
