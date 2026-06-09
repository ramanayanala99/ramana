import Link from "next/link";
import { BookOpen, Clock, CheckCircle, Star, ArrowRight, Zap, Shield, Users, BarChart3, FileText, Globe } from "lucide-react";

const testimonials = [
  {
    quote: "I used to spend 3–4 hours making a single question paper for my Class 10 boards. With AT Tool, I'm done in 15 minutes — and the questions are perfectly aligned to CBSE patterns. This is a game-changer.",
    name: "Mrs. Kavitha Ramachandran",
    title: "Senior Mathematics Teacher",
    school: "Kendriya Vidyalaya, Chennai",
  },
  {
    quote: "Managing 12 teachers across 3 campuses was chaotic. AT Tool's admin panel lets me see exactly what papers are being made, standardise our templates, and ensure every teacher follows our school format. Finally, control.",
    name: "Mr. Suresh Nambiar",
    title: "Principal",
    school: "Sunrise Public School Group, Kochi",
  },
  {
    quote: "We operate on a tight budget, so ₹799/month felt like a risk. But we recovered that cost in the first week alone — just from hours saved. The Tamil Nadu Board support is surprisingly accurate.",
    name: "Ms. Deepa Iyer",
    title: "Academics Coordinator",
    school: "Bharathi Matriculation School, Coimbatore",
  },
];

const faqs = [
  {
    q: "How do you keep up with changing syllabus and board patterns?",
    a: "Our dedicated content team continuously updates the question bank in sync with official board notifications. We track curriculum changes across all 28 state boards plus CBSE and ICSE, so your papers are always syllabus-compliant."
  },
  {
    q: "We already use a generic AI tool. Why switch to AT Tool?",
    a: "Generic tools don't know that Maharashtra Board Class 10 uses a different marking scheme than CBSE, or that Tamil Nadu Board requires a specific answer format. AT Tool is built ground-up for Indian educational boards with verified, curriculum-mapped questions."
  },
  {
    q: "Our teachers are not very tech-savvy. Will they be able to use this?",
    a: "Yes — and we designed specifically for this. AT Tool requires zero technical knowledge. If a teacher can use WhatsApp, they can use AT Tool. The onboarding wizard gets teachers creating their first paper in under 10 minutes."
  },
  {
    q: "Is this affordable for a small school or individual teacher?",
    a: "Absolutely. Our Starter plan is ₹799/month — less than the cost of printing a few reams of paper. We also offer a 14-day free trial, no credit card required, so you can see the value before paying."
  },
  {
    q: "How secure is our school's data and question papers?",
    a: "All data is encrypted at rest and in transit using AES-256 and TLS 1.3. Your question papers are private by default. We follow DPDP Act 2023 compliance guidelines for Indian users."
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-700">
            <div className="bg-indigo-600 text-white rounded-lg p-1.5"><BookOpen className="w-5 h-5" /></div>
            AT Tool
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="#boards" className="hover:text-indigo-600">Boards</a>
            <a href="#testimonials" className="hover:text-indigo-600">Reviews</a>
            <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
            <a href="#faq" className="hover:text-indigo-600">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">Log In</Link>
            <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      <section className="gradient-hero text-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 text-yellow-300" />
            Built for Indian Educators · Trusted by 1,200+ Schools
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Stop Wasting Sundays<br />
            <span className="text-yellow-300">Making Question Papers.</span>
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
            AT Tool auto-generates CBSE, ICSE, and all 28 state board–compliant question papers in minutes — not hours. Reclaim your weekends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-2 transition">
              Generate My First Paper Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login" className="border-2 border-white/50 hover:border-white text-white font-semibold px-8 py-4 rounded-xl text-lg transition">
              Log In
            </Link>
          </div>
          <p className="mt-4 text-sm text-indigo-200">14-day free trial · No credit card required · Cancel anytime</p>
        </div>
      </section>

      <section className="bg-indigo-50 py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { stat: "4.2 hrs", label: "Average time saved per paper vs. manual creation", icon: Clock },
            { stat: "28+", label: "Indian state boards + CBSE & ICSE supported from day one", icon: Globe },
            { stat: "50,000+", label: "Board-verified questions across subjects and classes", icon: FileText },
          ].map(({ stat, label, icon: Icon }) => (
            <div key={stat} className="text-center bg-white rounded-2xl p-8 shadow-sm card-hover">
              <Icon className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <div className="text-5xl font-extrabold text-indigo-700 mb-2">{stat}</div>
              <p className="text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need. Nothing You Don&apos;t.</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Purpose-built for Indian school teachers and administrators.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "All 28 State Boards + CBSE/ICSE", desc: "Not just CBSE. Maharashtra, Tamil Nadu, Kerala, Rajasthan — every state board mapped with accurate syllabus data." },
              { icon: Zap, title: "AI-Powered Question Suggestions", desc: "Smart recommendations based on topic, difficulty, past paper patterns, and the specific board you're targeting." },
              { icon: FileText, title: "PDF Export with School Branding", desc: "Your logo, your school name, your format. Export publication-ready papers that look professional instantly." },
              { icon: BarChart3, title: "Visualise Your Paper Balance", desc: "See distribution of topics, difficulty, and question types as you build — so no chapter gets ignored." },
              { icon: Users, title: "Team Collaboration for Institutes", desc: "Multiple teachers can co-create a single paper. Admins manage access, roles, and institute-wide templates." },
              { icon: Shield, title: "Your Data, Your Questions", desc: "Add custom questions, edit existing ones, and build a private question bank that grows with your school." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6 card-hover border border-gray-100">
                <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="boards" className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Every Board. Every State.</h2>
          <p className="text-gray-400 mb-10">From Kashmir to Kanyakumari — AT Tool covers the full map of Indian school education.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["CBSE", "ICSE", "Maharashtra", "Tamil Nadu", "Karnataka", "Kerala", "Gujarat", "Rajasthan", "UP Board", "MP Board", "West Bengal", "Punjab", "Haryana", "Bihar", "Odisha", "Assam", "Telangana", "Andhra Pradesh", "Delhi", "+ 12 more boards"].map((b) => (
              <span key={b} className="bg-indigo-800 text-indigo-100 px-3 py-1.5 rounded-lg text-sm font-medium">{b}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 bg-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Real Teachers. Real Results.</h2>
            <div className="flex justify-center gap-1 mb-2">{[1,2,3,4,5].map((i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
            <p className="text-gray-500">Rated 4.8/5 by 1,200+ educators across India</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm card-hover border border-gray-100">
                <div className="flex gap-1 mb-4">{[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <p className="text-gray-700 italic text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-indigo-600">{t.title}</div>
                  <div className="text-xs text-gray-400">{t.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transparent Pricing. Zero Surprises.</h2>
            <p className="text-gray-500 text-lg">Both plans include a 14-day free trial. No credit card needed to start.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="border-2 border-gray-200 rounded-2xl p-8">
              <div className="text-sm font-semibold text-indigo-600 mb-2">STARTER</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-extrabold text-gray-900">₹799</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">Perfect for individual teachers or small schools</p>
              <ul className="space-y-3 mb-8">
                {["Up to 3 teachers", "All 28+ boards", "50 papers/month", "PDF export with branding", "Basic question bank", "Email support"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=starter" className="w-full block text-center border-2 border-indigo-600 text-indigo-600 font-semibold py-3 rounded-xl hover:bg-indigo-50 transition">
                Start Free Trial
              </Link>
            </div>
            <div className="border-2 border-indigo-600 rounded-2xl p-8 bg-indigo-50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
              <div className="text-sm font-semibold text-indigo-600 mb-2">PRO</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-extrabold text-gray-900">₹5,999</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">For schools and educational institutes</p>
              <ul className="space-y-3 mb-8">
                {["Unlimited teachers", "All 28+ boards", "Unlimited papers", "AI question suggestions", "Collaborative editing", "Admin dashboard", "LMS integration", "Custom templates", "Priority support + onboarding call"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=pro" className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition">
                Start Free Trial
              </Link>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">Prices in Indian Rupees (INR) · GST applicable · Annual plans available at 20% discount</p>
        </div>
      </section>

      <section id="faq" className="bg-gray-50 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">You Have Questions. We Have Answers.</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="border border-gray-200 rounded-xl p-5 group bg-white">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900 text-base list-none">
                  {f.q}
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-hero text-white py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Next Question Paper Takes 10 Minutes.</h2>
        <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">Join 1,200+ Indian schools already saving hours every week. Start free — no card needed.</p>
        <Link href="/signup" className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-10 py-4 rounded-xl text-lg transition">
          Generate My First Paper Free <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-white mb-3">
              <div className="bg-indigo-600 rounded-lg p-1"><BookOpen className="w-4 h-4" /></div>
              AT Tool
            </div>
            <p className="text-sm">The most accurate AI-powered question paper generator for Indian educators.</p>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Product</div>
            <div className="space-y-2 text-sm">
              <div><a href="#features" className="hover:text-white">Features</a></div>
              <div><a href="#pricing" className="hover:text-white">Pricing</a></div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Company</div>
            <div className="space-y-2 text-sm">
              <div><a href="#" className="hover:text-white">About</a></div>
              <div><a href="#" className="hover:text-white">Contact</a></div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white mb-3">Legal</div>
            <div className="space-y-2 text-sm">
              <div><Link href="/terms" className="hover:text-white">Terms of Service</Link></div>
              <div><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          © 2026 AT Tool. All rights reserved. Made with ❤️ for Indian Educators.
        </div>
      </footer>
    </div>
  );
}
