"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Gem, ArrowRight, CheckCircle, Zap, Star } from "lucide-react";

export default function LandingPage() {
  const [showAgeGate, setShowAgeGate] = useState(false);
  const verifyAge = useAppStore((s) => s.verifyAge);

  useEffect(() => {
    const verified = localStorage.getItem("age-verified");
    if (!verified) setShowAgeGate(true);
  }, []);

  function handleEnter() {
    localStorage.setItem("age-verified", "true");
    verifyAge();
    setShowAgeGate(false);
  }

  function handleExit() {
    window.location.href = "https://google.com";
  }

  return (
    <div className="min-h-screen bg-[#0F0A1E] text-white">
      {/* Age Gate Modal */}
      {showAgeGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/70">
          <div className="glass-card p-10 max-w-md w-full mx-4 text-center">
            <div className="text-5xl mb-4">🔞</div>
            <h2 className="text-3xl font-bold text-white mb-3">Adults Only (18+)</h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              This platform contains adult content intended for mature audiences only.
              By entering, you confirm that you are 18 years of age or older and that
              it is legal to view such content in your jurisdiction.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleEnter}
                className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 font-semibold transition-colors"
              >
                I am 18 or older — Enter
              </button>
              <button
                onClick={handleExit}
                className="w-full py-3 rounded-lg border border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-200 font-semibold transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="border-b border-purple-900/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gem className="text-purple-400 w-6 h-6" />
            <span className="text-xl font-bold text-white">AdultEntertain</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link href="/signup" className="text-sm px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F0A1E] to-[#1A1030] py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 border border-purple-800/40 text-purple-300 text-sm mb-8">
            <Zap className="w-4 h-4" />
            100% Synthetic · No Real People
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text">Ethical AI Adult Entertainment,</span>
            <br />
            <span className="text-white">Fully Synthetic</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create fully AI-generated synthetic couples with customizable characters, styles, and narratives.
            No real likenesses. No privacy concerns. Pure creative freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold text-white transition-colors text-lg">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center justify-center gap-2 px-8 py-4 border border-purple-700/50 hover:border-purple-500 rounded-xl font-semibold text-gray-300 hover:text-white transition-colors text-lg">
              Watch Demo
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-5">14-day free trial · No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* Why Ethical AI */}
      <section className="py-20 px-6 bg-[#0D0820]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-white">Why Ethical AI?</h2>
          <p className="text-center text-gray-400 mb-12">We built this platform on three uncompromising principles.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🚫", title: "No Real People", desc: "Every character is 100% AI-generated from scratch. No photos of real individuals were used in training or output." },
              { icon: "🤖", title: "Fully Synthetic", desc: "Our models produce entirely synthetic imagery. No real likenesses, no non-consensual deepfakes — ever." },
              { icon: "🔒", title: "Privacy First", desc: "All generated content is private by default. Only you can see your creations unless you explicitly choose to share." },
            ].map((item) => (
              <div key={item.title} className="glass-card p-8 card-hover text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-[#0F0A1E]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-white">Everything You Need</h2>
          <p className="text-center text-gray-400 mb-12">A complete studio in your browser.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "✏️", title: "Character Customization", desc: "Design unique AI characters with custom hair, body type, attire, and personality." },
              { icon: "🎬", title: "Text-to-Video", desc: "Describe any scene and our AI renders a high-fidelity synthetic video in seconds." },
              { icon: "🖼️", title: "Private Gallery", desc: "All your creations stored securely in your personal encrypted gallery." },
              { icon: "🎙️", title: "AI Voice", desc: "Add synthetic voice-over to any video. Choose from 20+ voice styles." },
              { icon: "📽️", title: "Pro Long-Form", desc: "Pro users unlock up to 5-minute videos with narrative arcs and multi-scene cuts." },
              { icon: "🌐", title: "Community", desc: "Opt-in community feed to share your synthetic creations and discover others." },
            ].map((f) => (
              <div key={f.title} className="glass-card p-7 card-hover">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-[#0D0820]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "1", title: "Create Your Characters", desc: "Use our visual editor to design AI characters. Choose hair, body type, attire — fully synthetic." },
              { n: "2", title: "Write Your Scene", desc: "Describe what you want in plain English. Our AI understands context, mood, and style." },
              { n: "3", title: "Generate & Enjoy", desc: "Hit generate and receive your synthetic video in 30–60 seconds. Download or save to gallery." },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-black mx-auto mb-4">
                  {step.n}
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-[#0F0A1E]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-white">Simple Pricing</h2>
          <p className="text-center text-gray-400 mb-12">Start free. Upgrade anytime.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <div className="inline-block px-3 py-1 rounded-full text-xs bg-gray-700 text-gray-300 mb-4">14-day free trial</div>
              <h3 className="text-2xl font-bold text-white mb-1">Starter</h3>
              <div className="text-4xl font-black text-white mb-6">$10<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {["2 custom characters", "10 videos/month (max 30s)", "Private gallery", "720p quality"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=starter" className="block w-full text-center py-3 border border-purple-600 text-purple-400 rounded-lg hover:bg-purple-600 hover:text-white transition-colors font-semibold">
                Start Free Trial
              </Link>
            </div>
            <div className="glass-card p-8 relative" style={{ borderColor: "rgb(168 85 247 / 0.7)" }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs bg-purple-600 text-white font-bold whitespace-nowrap">MOST POPULAR</div>
              <div className="inline-block px-3 py-1 rounded-full text-xs bg-purple-900/50 text-purple-300 mb-4">14-day free trial</div>
              <h3 className="text-2xl font-bold text-white mb-1">Pro</h3>
              <div className="text-4xl font-black text-white mb-6">$50<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {["5 custom characters", "Unlimited videos (up to 5min)", "Private gallery + community", "4K quality", "AI Voice-over", "Narrative arc scenes", "Priority generation"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=pro" className="block w-full text-center py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[#0D0820]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">What Creators Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Finally an adult platform that respects both creators and privacy. The AI quality is stunning.", author: "J.K., Creative Director" },
              { quote: "The character customization is insane. I spent hours just designing. The output is photorealistic.", author: "M.R., Digital Artist" },
              { quote: "Pro tier is worth every penny. Long-form narrative videos are a game changer for storytelling.", author: "D.T., Content Creator" },
            ].map((t) => (
              <div key={t.author} className="glass-card p-7">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-gray-500 text-xs">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-[#0F0A1E]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Are any real people used in the content?", a: "Absolutely not. Every character is generated entirely by AI models trained on synthetic data. No real photos or likenesses of actual people are ever used in training or output." },
              { q: "Is my generated content private?", a: "Yes. All content you generate is private by default and stored with end-to-end encryption. Only you can access it. The community sharing feature is strictly opt-in." },
              { q: "What content quality can I expect?", a: "Starter plan delivers 720p video at up to 30 seconds. Pro plan delivers 4K quality with videos up to 5 minutes, AI voice-over, and multi-scene narrative arcs." },
              { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel at any time from your billing settings. You retain access until the end of your billing period with no additional charges." },
              { q: "Is this legal to use?", a: "Yes. All content is 100% AI-generated synthetic media with no real persons involved. We comply with 18 U.S.C. 2257 record-keeping requirements for synthetic content platforms." },
            ].map((faq) => (
              <details key={faq.q} className="glass-card">
                <summary className="p-6 cursor-pointer text-white font-semibold flex items-center justify-between list-none">
                  {faq.q}
                  <span className="text-purple-400 ml-4 flex-shrink-0">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/30 py-10 px-6 bg-[#0D0820]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gem className="text-purple-400 w-5 h-5" />
            <span className="font-bold text-white">AdultEntertain</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <a href="#" className="hover:text-white transition-colors">DMCA</a>
            <a href="#" className="hover:text-white transition-colors">18 U.S.C. 2257</a>
          </div>
          <p className="text-xs text-gray-600">© 2026 AdultEntertain. All content is 100% AI-synthetic.</p>
        </div>
      </footer>
    </div>
  );
}
