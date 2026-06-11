"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

const MOCK_INVOICES = [
  { date: "2026-05-11", amount: "$10.00", status: "Paid", plan: "Starter" },
  { date: "2026-04-11", amount: "$10.00", status: "Paid", plan: "Starter" },
  { date: "2026-03-11", amount: "$10.00", status: "Paid", plan: "Starter" },
];

export default function BillingPage() {
  const { user } = useAppStore();
  const [showCardForm, setShowCardForm] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvv: "" });

  const today = new Date("2026-06-11");
  const trialEnd = user?.trialEndsAt ? new Date(user.trialEndsAt) : null;
  const trialDays = trialEnd ? Math.max(0, Math.ceil((trialEnd.getTime() - today.getTime()) / 86400000)) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Billing</h1>

      {/* Current plan */}
      <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
          <div>
            <h2 className="text-lg font-semibold text-white capitalize">{user?.plan} Plan</h2>
            {trialDays > 0 ? (
              <span className="text-sm text-amber-300">Trial — {trialDays} days remaining</span>
            ) : (
              <span className="text-sm text-green-400">Active</span>
            )}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user?.plan === "pro" ? "bg-amber-400/20 text-amber-300" : "bg-purple-600/20 text-purple-300"}`}>
            {user?.plan?.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Plan comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { name: "Starter", price: "$10/mo", features: ["5–15 second videos", "2 character slots", "Basic customization", "Private gallery"] },
          { name: "Pro", price: "$50/mo", features: ["Up to 60 second videos", "5 character slots", "Advanced pose controls", "AI voice dialogue", "Community access", "Priority generation"] },
        ].map((plan) => {
          const current = (user?.plan ?? "starter").toLowerCase() === plan.name.toLowerCase();
          return (
            <div key={plan.name} className={`rounded-xl border p-6 ${current ? "border-purple-500 bg-purple-900/20" : "border-purple-500/20 bg-[#1A1030]"}`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                {current && <span className="text-xs bg-purple-600/30 text-purple-300 px-2 py-1 rounded">Current</span>}
              </div>
              <div className="text-2xl font-bold text-white mb-4">{plan.price}</div>
              <ul className="space-y-2 mb-5 text-sm text-gray-300">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="text-purple-400">✓</span>{f}</li>
                ))}
              </ul>
              {!current && (
                <button className={`w-full py-2.5 rounded-lg font-semibold text-sm transition ${plan.name === "Pro" ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-[#0D0920] border border-purple-500/30 text-gray-300 hover:border-purple-400"}`}>
                  {plan.name === "Pro" ? "Upgrade to Pro" : "Downgrade to Starter"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment method */}
      <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Payment Method</h2>
          <button onClick={() => setShowCardForm(!showCardForm)} className="text-sm text-purple-400 hover:text-purple-300">
            {showCardForm ? "Cancel" : "Update Card"}
          </button>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-[#0D0920] border border-purple-500/20 mb-4">
          <span className="text-2xl">💳</span>
          <div>
            <div className="text-white font-mono">•••• •••• •••• 4242</div>
            <div className="text-xs text-gray-400">Expires 12/27</div>
          </div>
        </div>
        {showCardForm && (
          <div className="space-y-3">
            <input value={cardForm.number} onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
              placeholder="Card number (1234 5678 9012 3456)"
              className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none placeholder-gray-600" />
            <div className="grid grid-cols-2 gap-3">
              <input value={cardForm.expiry} onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                placeholder="MM / YY"
                className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 text-sm focus:outline-none placeholder-gray-600" />
              <input value={cardForm.cvv} onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                placeholder="CVV"
                className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 text-sm focus:outline-none placeholder-gray-600" />
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition">
              Save Card
            </button>
          </div>
        )}
      </div>

      {/* Billing history */}
      <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-purple-500/20">
                <th className="text-left py-2 pb-3">Date</th>
                <th className="text-left py-2 pb-3">Plan</th>
                <th className="text-left py-2 pb-3">Amount</th>
                <th className="text-left py-2 pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.date} className="border-b border-purple-500/10 text-gray-300">
                  <td className="py-3">{inv.date}</td>
                  <td className="py-3">{inv.plan}</td>
                  <td className="py-3">{inv.amount}</td>
                  <td className="py-3"><span className="text-green-400">{inv.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel */}
      <div className="text-center">
        {!showCancel ? (
          <button onClick={() => setShowCancel(true)} className="text-sm text-gray-500 hover:text-red-400 transition">
            Cancel Subscription
          </button>
        ) : (
          <div className="rounded-xl border border-red-500/30 bg-red-900/20 p-5 text-center">
            <p className="text-gray-300 mb-4">Are you sure? You&apos;ll lose access at the end of your billing period.</p>
            <div className="flex justify-center gap-3">
              <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition">Yes, Cancel</button>
              <button onClick={() => setShowCancel(false)} className="bg-[#0D0920] border border-purple-500/30 text-gray-300 px-5 py-2 rounded-lg text-sm transition">Keep Plan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
