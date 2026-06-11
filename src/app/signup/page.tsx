"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gem, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [plan, setPlan] = useState<"starter" | "pro">("pro");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ageConfirmed) {
      setError("You must confirm you are 18 or older.");
      return;
    }
    if (!termsAgreed) {
      setError("You must agree to the Terms of Service.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0F0A1E] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Gem className="text-purple-400 w-7 h-7" />
            <span className="text-2xl font-bold text-white">AdultEntertain</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mt-6 mb-2">Create your account</h1>
          <p className="text-gray-400 text-sm">Start with a 14-day free trial</p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                required
                className="w-full px-4 py-3 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Plan selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Select Plan</label>
              <div className="grid grid-cols-2 gap-3">
                {(["starter", "pro"] as const).map((p) => (
                  <label key={p} className={`flex flex-col gap-1 p-4 rounded-lg border cursor-pointer transition-colors ${plan === p ? "border-purple-500 bg-purple-900/20" : "border-purple-900/40 hover:border-purple-700"}`}>
                    <input type="radio" name="plan" value={p} checked={plan === p} onChange={() => setPlan(p)} className="sr-only" />
                    <span className="font-semibold text-white capitalize">{p}</span>
                    <span className="text-purple-400 font-bold">{p === "starter" ? "$10" : "$50"}<span className="text-gray-500 text-xs font-normal">/mo</span></span>
                    {p === "pro" && <span className="text-xs text-purple-300">Most Popular</span>}
                  </label>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${ageConfirmed ? "bg-purple-600 border-purple-600" : "border-gray-600"}`} onClick={() => setAgeConfirmed(!ageConfirmed)}>
                  {ageConfirmed && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-gray-300">I confirm I am <strong className="text-white">18 years of age or older</strong> and legally permitted to view adult content in my jurisdiction.</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${termsAgreed ? "bg-purple-600 border-purple-600" : "border-gray-600"}`} onClick={() => setTermsAgreed(!termsAgreed)}>
                  {termsAgreed && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-gray-300">I agree to the <Link href="/terms" className="text-purple-400 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-purple-400 hover:underline">Privacy Policy</Link>.</span>
              </label>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-900/30 border border-red-800/50 text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-60 font-semibold text-white transition-colors"
            >
              {loading ? "Creating account..." : "Create Account — Start Free Trial"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
