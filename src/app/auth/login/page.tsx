"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const supabase = createClient();

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      });
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "success", text: "Check your email to confirm your account." });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        window.location.href = "/";
      }
    }
    setLoading(false);
  }

  async function handleGoogle() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
    if (error) {
      setMessage({ type: "error", text: error.message });
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      {/* subtle radial glow */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* logo */}
        <a href="/" className="block text-center text-sm font-semibold tracking-tight text-white mb-8">
          SmartSpace
        </a>

        {/* card */}
        <div className="rounded-xl border border-white/8 bg-white/[0.04] backdrop-blur-md p-8">
          {/* tab toggle */}
          <div className="flex rounded-lg bg-white/5 p-1 mb-7 gap-1">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setMessage(null); }}
                className={`flex-1 py-1.5 text-sm rounded-md font-medium transition-all ${
                  mode === m
                    ? "bg-white text-black"
                    : "text-[#888] hover:text-white"
                }`}
              >
                {m === "signin" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm text-white hover:bg-white/10 transition-colors disabled:opacity-50 mb-5"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-[#555]">or</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* email form */}
          <form onSubmit={handleEmailAuth} className="space-y-3">
            <div>
              <label className="block text-xs text-[#666] mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-[#444] focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[#666] mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-[#444] focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {message && (
              <p className={`text-xs rounded-lg px-3 py-2.5 ${
                message.type === "error"
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : "bg-green-500/10 text-green-400 border border-green-500/20"
              }`}>
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50 mt-1"
            >
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#444] mt-5">
          By continuing you agree to SmartSpace&apos;s{" "}
          <span className="text-[#666] underline underline-offset-2 cursor-pointer">Terms</span>
          {" "}and{" "}
          <span className="text-[#666] underline underline-offset-2 cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
