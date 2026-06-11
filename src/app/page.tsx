"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Shield, Zap, Lock, Eye, Star, ChevronDown, ChevronUp, Play } from "lucide-react";

export default function LandingPage() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const verifyAge = useAppStore((s) => s.verifyAge);

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified");
    if (verified === "true") {
      setAgeVerified(true);
    } else {
      setShowGate(true);
    }
  }, []);

  function handleEnter() {
    localStorage.setItem("ageVerified", "true");
    setAgeVerified(true);
    setShowGate(false);
    verifyAge();
  }

  function handleLeave() {
    window.location.href = "https://google.com";
  }

  const features = [
    { icon: <Shield className="w-6 h-6" />, title: "100% Synthetic", desc: "Every character is AI-generated. No real people, no exploitation, no exceptions." },
    { icon: <Lock className="w-6 h-6" />, title: "Private by Default", desc: "Your creations stay yours. End-to-end encryption and zero data selling." },
    { icon: <Zap className="w-6 h-6" />, title: "Instant Generation", desc: "Create high-quality AI videos in seconds with our advanced diffusion models." },
    { icon: <Eye className="w-6 h-6" />, title: "Full Customization", desc: "Design every detail: hair, body, attire, style, mood, and narrative arc." },
    { icon: <Star className="w-6 h-6" />, title: "Unlimited Creativity", desc: "Thousands of style presets, poses, and cinematic options at your fingertips." },
    { icon: <Play className="w-6 h-6" />, title: "Community Gallery", desc: "Optionally share your creations and explore what others have made." },
  ];

  const faqs = [
    { q: "Are real people used in any videos?", a: "Absolutely not. Every character, face, and body is 100% AI-generated. We use advanced synthetic media technology that creates entirely fictional people." },
    { q: "Is my content private?", a: "Yes. All generated content is private by default. You control what gets shared. We never sell or distribute your content without explicit permission." },
    { q: "What is the difference between Starter and Pro?", a: "Starter gives you 10 videos/month up to 15 seconds, 2 saved characters, and basic styles. Pro gives unlimited videos, up to 60 seconds, 5 saved characters, all styles, and advanced controls." },
    { q: "How do I cancel my subscription?", a: "You can cancel anytime from your billing settings. No hidden fees, no lock-in. Your account remains active until the end of your billing period." },
    { q: "Is this legal?", a: "Yes. All content is synthetic and fictional. We comply with all applicable laws regarding AI-generated content and adult entertainment platforms." },
  ];

  return (
    <div className="min-h-screen bg-[#0F0A1E] text-white">
      {/* Age Gate Modal */}
      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="bg-[#1A1030] border border-purple-500/40 rounded-2xl p-10 max-w-md w-full mx-4 text-center shadow-2xl">
            <div className="text-5xl mb-4">🔞</div>
            <h2 className="text-2xl font-bold text-white mb-3">Age Verification Required</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              You must be <strong className="text-purple-400">18 years or older</strong> to enter this site.
              By continuing, you confirm that you are an adult and agree to view adult content.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleEnter}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                I am 18+ — Enter
              </button>
              <button
                onClick={handleLeave}
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="border-b border-purple-500/20 bg-[#0F0A1E]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            adult entertain
          </span>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            <Link href="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-[#0F0A1E] to-pink-900/20" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm px-4 py-1.5 rounded-full mb-6">
            100% Synthetic · No Real People · Fully Private
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
              Ethical AI
            </span>
            <br />
            Adult Entertainment
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create stunning synthetic AI couple videos with fully customizable characters.
            No real people. Ever. Your imagination, unlimited.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Start Free Trial
            </Link>
            <Link href="/login" className="border border-purple-500/40 hover:border-purple-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Ethical & Legal", desc: "All content is fully synthetic. We pioneered responsible AI adult entertainment with zero exploitation.", icon: "⚖️" },
              { title: "Ultimate Privacy", desc: "Your sessions are encrypted. We never store personal data or sell your information to third parties.", icon: "🔒" },
              { title: "Unmatched Quality", desc: "Our state-of-the-art diffusion models produce cinematic quality synthetic videos unlike anything else.", icon: "✨" },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 text-center">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Design Your Characters", desc: "Customize hair, body type, attire, and personality for each AI character in your scene." },
              { step: "2", title: "Describe Your Scene", desc: "Write a prompt describing the setting, mood, and action. Our AI understands natural language." },
              { step: "3", title: "Generate & Enjoy", desc: "Our diffusion model renders your scene in seconds. Download or save to your private gallery." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
                <div className="text-purple-400 mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-gray-300 text-center mb-12">Start free, upgrade anytime. No hidden fees.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-8">
              <h3 className="text-xl font-bold mb-1">Starter</h3>
              <div className="text-4xl font-bold text-purple-400 mb-4">$10<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                {["10 videos per month", "Up to 15 seconds duration", "2 saved characters", "Basic styles (Realistic, Artistic)", "Private gallery", "Email support"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="text-purple-400">✓</span>{f}</li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-white px-4 py-3 rounded-lg transition-colors">
                Get Started
              </Link>
            </div>
            <div className="rounded-xl border border-purple-400/50 bg-gradient-to-b from-purple-900/30 to-[#1A1030] p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-1">Pro</h3>
              <div className="text-4xl font-bold text-purple-400 mb-4">$50<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-3 text-sm text-gray-300 mb-8">
                {["Unlimited videos", "Up to 60 seconds duration", "5 saved characters", "All styles + Cinematic", "Advanced controls & poses", "Community sharing", "Priority support", "Early access features"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="text-purple-400">✓</span>{f}</li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors">
                Start Pro Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Jordan K.", plan: "Pro", text: "Finally a platform I can trust. The synthetic characters are incredibly realistic and the privacy is unmatched." },
              { name: "Riley M.", plan: "Starter", text: "The customization options are insane. I can create exactly what I want with full control over every detail." },
              { name: "Taylor S.", plan: "Pro", text: "Switched from other platforms and never looked back. The quality here is on another level entirely." },
            ].map((t) => (
              <div key={t.name} className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">{"★★★★★"}</div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-600/50 rounded-full flex items-center justify-center text-sm font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-purple-400">{t.plan} Plan</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-purple-500/20 bg-[#1A1030] overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-purple-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-300 text-sm leading-relaxed border-t border-purple-500/20 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t border-purple-500/20 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              adult entertain
            </span>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/login" className="hover:text-white transition-colors">Login</Link>
              <Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link>
            </div>
            <p className="text-sm text-gray-500">© 2026 adult entertain. All rights reserved.</p>
          </div>
          <p className="text-xs text-gray-600 mt-6 text-center">
            All content is 100% AI-generated and synthetic. No real people are depicted. For adults 18+ only.
          </p>
        </div>
      </footer>
    </div>
  );
}
