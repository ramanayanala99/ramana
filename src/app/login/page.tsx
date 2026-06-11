"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAppStore((s) => s.login);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const ok = login(email, password);
    setLoading(false);
    if (ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0A1E] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            adult entertain
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4 mb-1">Welcome back</h1>
          <p className="text-gray-400 text-sm">Sign in to your account</p>
        </div>

        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-8">
          {error && (
            <div className="bg-red-900/30 border border-red-500/40 text-red-300 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:border-purple-400 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full pr-10 focus:outline-none focus:border-purple-400 placeholder-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                />
                <span className="text-sm text-gray-300">Remember me</span>
              </label>
              <button type="button" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-purple-500/20">
            <p className="text-xs text-gray-500 text-center mb-3">Demo accounts:</p>
            <div className="space-y-1.5 text-xs text-gray-400 text-center">
              <p>Pro: <span className="text-purple-300">demo@example.com</span> / <span className="text-purple-300">demo</span></p>
              <p>Starter: <span className="text-purple-300">starter@example.com</span> / <span className="text-purple-300">starter</span></p>
              <p>Admin: <span className="text-purple-300">admin@example.com</span> / <span className="text-purple-300">admin</span></p>
            </div>
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
