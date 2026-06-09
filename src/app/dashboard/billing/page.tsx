"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { CreditCard, Check, Zap, Shield, Clock } from "lucide-react";

const PLANS = [
  {
    id: "starter", name: "Starter", priceINR: 799, label: "For individual teachers",
    features: ["Up to 3 teachers", "All 28+ boards", "50 papers/month", "PDF export with branding", "Basic question bank", "Email support"],
  },
  {
    id: "pro", name: "Pro", priceINR: 5999, label: "For schools & institutes",
    features: ["Unlimited teachers", "All 28+ boards", "Unlimited papers", "AI question suggestions", "Collaborative editing", "Admin dashboard", "LMS integration", "Custom templates", "Priority support + onboarding call"],
    popular: true,
  },
];

export default function BillingPage() {
  const { user } = useAppStore();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [selected, setSelected] = useState("pro");

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Plans</h1>
        <p className="text-gray-500 mt-1">Manage your subscription and billing details.</p>
      </div>

      {/* Current Plan */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-8 flex items-center justify-between">
        <div>
          <div className="text-sm text-indigo-600 font-medium">Current Plan</div>
          <div className="text-lg font-bold text-gray-900 mt-0.5">{user?.plan?.toUpperCase() || "FREE"} Plan</div>
          {user?.trialEndsAt && <div className="text-sm text-indigo-600 mt-1">Free trial ends: {user.trialEndsAt}</div>}
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-3 py-1.5 rounded-full">
          <Check className="w-4 h-4" />
          Active
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center gap-3 mb-6">
        <span className={`text-sm font-medium ${billing === "monthly" ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
        <button onClick={() => setBilling(billing === "monthly" ? "annual" : "monthly")}
          className={`relative w-12 h-6 rounded-full transition-colors ${billing === "annual" ? "bg-indigo-600" : "bg-gray-200"}`}>
          <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${billing === "annual" ? "translate-x-6" : "translate-x-0.5"}`} />
        </button>
        <span className={`text-sm font-medium ${billing === "annual" ? "text-gray-900" : "text-gray-400"}`}>
          Annual <span className="bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded-full ml-1">Save 20%</span>
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {PLANS.map((plan) => {
          const price = billing === "annual" ? Math.round(plan.priceINR * 0.8) : plan.priceINR;
          return (
            <div key={plan.id} onClick={() => setSelected(plan.id)}
              className={`rounded-2xl p-6 border-2 cursor-pointer transition relative ${selected === plan.id ? "border-indigo-600 bg-indigo-50" : "border-gray-200 bg-white hover:border-indigo-300"}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
              )}
              <div className="font-bold text-lg text-gray-900">{plan.name}</div>
              <div className="text-sm text-gray-500 mb-3">{plan.label}</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-extrabold text-gray-900">₹{price.toLocaleString("en-IN")}</span>
                <span className="text-gray-500">/month</span>
              </div>
              {billing === "annual" && <div className="text-xs text-green-600 mb-3">₹{(price * 12).toLocaleString("en-IN")}/year · Save ₹{(plan.priceINR * 12 - price * 12).toLocaleString("en-IN")}</div>}
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4 text-indigo-600" />Payment Details</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input type="text" placeholder="4242 4242 4242 4242"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
            <input type="text" placeholder="MM / YY"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input type="text" placeholder="•••"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <Shield className="w-4 h-4" />
          Payments processed securely by Razorpay. GST applicable. We do not store card details.
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Subscribe Now · {billing === "monthly" ? `₹${PLANS.find((p) => p.id === selected)?.priceINR.toLocaleString("en-IN")}/mo` : `₹${(Math.round((PLANS.find((p) => p.id === selected)?.priceINR || 0) * 0.8) * 12).toLocaleString("en-IN")}/yr`}
        </button>
      </div>

      <div className="mt-4 flex items-center gap-6 text-xs text-gray-400">
        <span className="flex items-center gap-1"><Check className="w-3 h-3" /> 14-day free trial</span>
        <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Cancel anytime</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Instant activation</span>
      </div>
    </div>
  );
}
