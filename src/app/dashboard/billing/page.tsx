"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { CreditCard, Check, Zap, Shield, Clock } from "lucide-react";

const MOCK_HISTORY = [
  { date: "2026-06-01", desc: "Pro Plan - Monthly", amount: "$50.00", status: "Paid" },
  { date: "2026-05-01", desc: "Pro Plan - Monthly", amount: "$50.00", status: "Paid" },
  { date: "2026-04-01", desc: "Pro Plan - Monthly", amount: "$50.00", status: "Paid" },
];

export default function BillingPage() {
  const { user } = useAppStore();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [saveMsg, setSaveMsg] = useState("");

  if (!user) return null;

  const trialDays = Math.max(0, Math.ceil(
    (new Date(user.trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  ));

  function handlePayment(e: React.FormEvent) {
    e.preventDefault();
    setSaveMsg("Payment method saved successfully!");
    setTimeout(() => setSaveMsg(""), 3000);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your subscription and payment methods</p>
      </div>

      {/* Current Plan */}
      <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          Current Plan
        </h2>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-bold text-white capitalize">{user.plan} Plan</span>
              <span className="bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs px-2 py-0.5 rounded">Active</span>
            </div>
            <div className="text-sm text-gray-400">
              {user.plan === "pro" ? "$50/month" : user.plan === "starter" ? "$10/month" : "Admin Account"}
            </div>
          </div>
          <div className="flex items-center gap-2 text-yellow-400 text-sm">
            <Clock className="w-4 h-4" />
            {trialDays > 0 ? `${trialDays} trial days remaining` : "Active subscription"}
          </div>
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className={`rounded-xl border p-6 ${user.plan === "starter" ? "border-purple-400/50 bg-purple-900/10" : "border-purple-500/20 bg-[#1A1030]"}`}>
          <h3 className="text-lg font-bold mb-1">Starter</h3>
          <div className="text-3xl font-bold text-purple-400 mb-4">$10<span className="text-sm text-gray-400">/mo</span></div>
          <ul className="space-y-2 text-sm text-gray-300 mb-5">
            {["10 videos/month", "Up to 15s duration", "2 saved characters", "Realistic & Artistic styles", "Private gallery"].map((f) => (
              <li key={f} className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />{f}</li>
            ))}
          </ul>
          {user.plan === "starter" && (
            <div className="text-center text-purple-300 text-sm border border-purple-500/30 rounded-lg py-2">Current Plan</div>
          )}
        </div>

        <div className={`rounded-xl border p-6 ${user.plan === "pro" ? "border-purple-400/50 bg-purple-900/10" : "border-purple-500/20 bg-[#1A1030]"}`}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold">Pro</h3>
            <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Most Popular</span>
          </div>
          <div className="text-3xl font-bold text-purple-400 mb-4">$50<span className="text-sm text-gray-400">/mo</span></div>
          <ul className="space-y-2 text-sm text-gray-300 mb-5">
            {["Unlimited videos", "Up to 60s duration", "5 saved characters", "All styles + Cinematic", "Advanced controls", "Community sharing", "Priority support"].map((f) => (
              <li key={f} className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />{f}</li>
            ))}
          </ul>
          {user.plan === "pro" ? (
            <div className="text-center text-purple-300 text-sm border border-purple-500/30 rounded-lg py-2">Current Plan</div>
          ) : (
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Upgrade to Pro
            </button>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-purple-400" />
          Payment Method
        </h2>

        {/* Mock existing card */}
        <div className="bg-[#0D0920] border border-purple-500/20 rounded-lg p-4 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-xs font-bold">VISA</div>
            <div>
              <div className="text-sm text-white">•••• •••• •••• 4242</div>
              <div className="text-xs text-gray-500">Expires 12/27</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-green-400 text-xs">
            <Check className="w-3 h-3" /> Default
          </div>
        </div>

        {saveMsg && (
          <div className="bg-green-900/30 border border-green-500/40 text-green-300 text-sm px-4 py-3 rounded-lg mb-4">
            {saveMsg}
          </div>
        )}

        <form onSubmit={handlePayment} className="space-y-4">
          <div className="text-sm font-medium text-gray-300 mb-3">Add New Card</div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Card Number</label>
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-400 placeholder-gray-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Expiry</label>
              <input
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-400 placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">CVC</label>
              <input
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="123"
                className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-400 placeholder-gray-600"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="w-3.5 h-3.5" />
            Payments are secured with 256-bit SSL encryption
          </div>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Save Card
          </button>
        </form>
      </div>

      {/* Billing History */}
      <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
        <h2 className="text-lg font-semibold mb-4">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs border-b border-purple-500/20">
                <th className="text-left pb-3">Date</th>
                <th className="text-left pb-3">Description</th>
                <th className="text-left pb-3">Amount</th>
                <th className="text-left pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {MOCK_HISTORY.map((row, i) => (
                <tr key={i} className="border-b border-purple-500/10">
                  <td className="py-3 text-gray-400">{row.date}</td>
                  <td className="py-3 text-white">{row.desc}</td>
                  <td className="py-3 text-white">{row.amount}</td>
                  <td className="py-3">
                    <span className="bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel */}
      <div className="text-center py-4">
        <button className="text-sm text-gray-500 hover:text-red-400 transition-colors">
          Cancel Subscription
        </button>
      </div>
    </div>
  );
}
