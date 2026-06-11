"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Gem, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAppStore((s) => s.login);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const success = login(email, password);
    setLoading(false);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0A1E] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <Gem className="text-purple-400 w-7 h-7" />
            <span className="text-2xl font-bold text-white">AdultEntertain</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mt-6 mb-2">Welcome back</h1>
          <p className="text-gray-400 text-sm">Sign in to your account</p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@example.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-900/30 border border-red-800/50 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-60 font-semibold text-white transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-lg bg-[#0D0820] border border-purple-900/30">
            <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">Demo credentials</p>
            <p className="text-xs text-gray-400">Pro: demo@example.com / demo</p>
            <p className="text-xs text-gray-400">Admin: admin@example.com / admin</p>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
