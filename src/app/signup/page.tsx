"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [plan, setPlan] = useState<"starter" | "pro">("starter");
  const [ageChecked, setAgeChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!ageChecked) {
      setError("You must confirm you are 18 or older.");
      return;
    }
    if (!termsChecked) {
      setError("You must accept the Terms of Service.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push("/login"), 2000);
  }

  return (
    <div className="min-h-screen bg-[#0F0A1E] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            adult entertain
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4 mb-1">Create your account</h1>
          <p className="text-gray-400 text-sm">Start your free trial today</p>
        </div>

        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-8">
          {success ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-4">🎉</div>
              <h2 className="text-xl font-bold text-white mb-2">Account Created!</h2>
              <p className="text-gray-300 text-sm">Redirecting you to login...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-900/30 border border-red-500/40 text-red-300 text-sm px-4 py-3 rounded-lg mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:border-purple-400 placeholder-gray-600"
                  />
                </div>

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
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                    className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:border-purple-400 placeholder-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    required
                    className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:border-purple-400 placeholder-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Choose Plan</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPlan("starter")}
                      className={`p-4 rounded-lg border text-left transition-colors ${
                        plan === "starter"
                          ? "border-purple-500 bg-purple-900/30"
                          : "border-purple-500/20 bg-[#0D0920] hover:border-purple-500/50"
                      }`}
                    >
                      <div className="font-semibold text-white text-sm">Starter</div>
                      <div className="text-purple-400 font-bold">$10<span className="text-xs text-gray-400">/mo</span></div>
                      <div className="text-xs text-gray-400 mt-1">10 videos/mo · 15s max</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlan("pro")}
                      className={`p-4 rounded-lg border text-left transition-colors relative ${
                        plan === "pro"
                          ? "border-purple-500 bg-purple-900/30"
                          : "border-purple-500/20 bg-[#0D0920] hover:border-purple-500/50"
                      }`}
                    >
                      <div className="absolute -top-2 right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Popular</div>
                      <div className="font-semibold text-white text-sm">Pro</div>
                      <div className="text-purple-400 font-bold">$50<span className="text-xs text-gray-400">/mo</span></div>
                      <div className="text-xs text-gray-400 mt-1">Unlimited · 60s max</div>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ageChecked}
                      onChange={(e) => setAgeChecked(e.target.checked)}
                      className="w-4 h-4 accent-purple-600 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-300">
                      I confirm that I am <strong className="text-white">18 years of age or older</strong>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsChecked}
                      onChange={(e) => setTermsChecked(e.target.checked)}
                      className="w-4 h-4 accent-purple-600 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-300">
                      I agree to the{" "}
                      <Link href="/terms" className="text-purple-400 hover:text-purple-300">Terms of Service</Link>
                      {" "}and{" "}
                      <Link href="/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
