"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { CreditCard, CheckCircle } from "lucide-react";

const MOCK_INVOICES = [
  { id: "INV-001", date: "2026-05-11", amount: "$50.00", status: "Paid" },
  { id: "INV-002", date: "2026-04-11", amount: "$50.00", status: "Paid" },
  { id: "INV-003", date: "2026-03-11", amount: "$50.00", status: "Paid" },
];

export default function BillingPage() {
  const { user } = useAppStore();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const trialEnd = user?.trialEndsAt ? new Date(user.trialEndsAt) : null;
  const today = new Date("2026-06-11");
  const daysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Billing</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your subscription and payment details.</p>
      </div>

      {/* Current plan */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-bold text-white mb-4">Current Plan</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-black text-white capitalize">{user?.plan} Plan</p>
            <p className="text-sm text-gray-400">{user?.plan === "starter" ? "$10/month" : user?.plan === "pro" ? "$50/month" : "Free (Admin)"}</p>
          </div>
          <div className="text-right">
            {daysLeft > 0 && (
              <div className="px-3 py-1.5 rounded-full bg-green-900/30 border border-green-800/50 text-green-400 text-sm font-medium">
                {daysLeft} days trial remaining
              </div>
            )}
          </div>
        </div>
        {daysLeft > 0 && (
          <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-800/30 text-sm text-purple-300">
            Your free trial ends on {user?.trialEndsAt}. Add a payment method below to continue after your trial.
          </div>
        )}
      </div>

      {/* Plan comparison */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-bold text-white mb-4">Available Plans</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Starter", price: "$10/mo", features: ["2 characters", "10 videos/mo", "720p quality"] },
            { name: "Pro", price: "$50/mo", features: ["5 characters", "Unlimited videos", "4K quality", "AI Voice"] },
          ].map((plan) => (
            <div key={plan.name} className={`p-4 rounded-xl border ${plan.name === "Pro" ? "border-purple-500 bg-purple-900/10" : "border-purple-900/40"}`}>
              <p className="font-bold text-white">{plan.name}</p>
              <p className="text-purple-400 font-semibold mb-3">{plan.price}</p>
              <ul className="space-y-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs text-gray-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-purple-400 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              {user?.plan !== plan.name.toLowerCase() && (
                <button className="mt-3 w-full py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium transition-colors">
                  Switch to {plan.name}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment method */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-purple-400" /> Payment Method
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Card Number</label>
            <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" maxLength={19}
              className="w-full px-4 py-3 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Expiry</label>
              <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM / YY" maxLength={7}
                className="w-full px-4 py-3 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm" />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-2 block">CVC</label>
              <input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" maxLength={4}
                className="w-full px-4 py-3 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm" />
            </div>
          </div>
          <button className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors">
            Save Payment Method
          </button>
        </div>
      </div>

      {/* Invoice history */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-bold text-white mb-4">Invoice History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-900/30">
                <th className="text-left text-gray-400 font-medium py-2">Invoice</th>
                <th className="text-left text-gray-400 font-medium py-2">Date</th>
                <th className="text-left text-gray-400 font-medium py-2">Amount</th>
                <th className="text-left text-gray-400 font-medium py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.id} className="border-b border-purple-900/20">
                  <td className="py-3 text-white">{inv.id}</td>
                  <td className="py-3 text-gray-400">{inv.date}</td>
                  <td className="py-3 text-white">{inv.amount}</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full text-xs bg-green-900/30 text-green-400">{inv.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center">
        <button className="text-sm text-red-400 hover:text-red-300 transition-colors">Cancel Subscription</button>
      </div>
    </div>
  );
}
