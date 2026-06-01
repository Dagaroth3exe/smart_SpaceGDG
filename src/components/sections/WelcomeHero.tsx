"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import HeroSection from "./HeroSection";

export default function WelcomeHero() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Still loading — render nothing to avoid flash
  if (user === undefined) return <div className="min-h-screen" />;

  if (!user) return <HeroSection />;

  const name = user.user_metadata?.full_name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "there";
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-14 relative overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-[120px]" />
      </div>

      <div className="relative max-w-2xl w-full text-center">

        {/* avatar */}
        <div className="animate-fade-in flex justify-center mb-7" style={{ animationDelay: "0ms" }}>
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full ring-2 ring-white/10 object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full ring-2 ring-white/10 bg-white/10 flex items-center justify-center text-2xl font-semibold text-white">
              {name[0].toUpperCase()}
            </div>
          )}
        </div>

        {/* greeting */}
        <p
          className="animate-fade-up text-[#666] text-base font-medium mb-3 tracking-wide"
          style={{ animationDelay: "80ms" }}
        >
          Welcome back
        </p>

        {/* bold name */}
        <h1
          className="animate-fade-up text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6"
          style={{ animationDelay: "160ms" }}
        >
          {name}
        </h1>

        {/* sub */}
        <p
          className="animate-fade-up text-[#555] text-lg mb-12 leading-relaxed"
          style={{ animationDelay: "240ms" }}
        >
          Ready to find your next property?<br />
          Let SmartSpace AI guide you.
        </p>

        {/* actions */}
        <div
          className="animate-fade-up flex flex-wrap justify-center gap-3"
          style={{ animationDelay: "320ms" }}
        >
          <a
            href="#search"
            className="px-6 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Search properties
          </a>
          <a
            href="/pricepulse"
            className="px-6 py-2.5 rounded-lg border border-white/12 text-sm text-[#aaa] hover:text-white hover:border-white/25 transition-colors"
          >
            PricePulse
          </a>
          <a
            href="#assistant"
            className="px-6 py-2.5 rounded-lg border border-white/12 text-sm text-[#aaa] hover:text-white hover:border-white/25 transition-colors"
          >
            Ask AI
          </a>
        </div>

      </div>
    </section>
  );
}
