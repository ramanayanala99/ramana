"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Shield, Users, BarChart2, AlertTriangle, Settings } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MOCK_USERS = [
  { id: "u1", name: "Alex Morgan", email: "demo@example.com", plan: "Pro", status: "Active", joined: "2026-05-01" },
  { id: "u2", name: "Sam Lee", email: "starter@example.com", plan: "Starter", status: "Active", joined: "2026-05-15" },
  { id: "u3", name: "Admin User", email: "admin@example.com", plan: "Admin", status: "Active", joined: "2026-01-01" },
  { id: "u4", name: "Jordan Blake", email: "jordan@example.com", plan: "Pro", status: "Trial", joined: "2026-06-01" },
  { id: "u5", name: "Riley Chen", email: "riley@example.com", plan: "Starter", status: "Suspended", joined: "2026-04-20" },
];

const CHART_DATA = [
  { day: "Jun 5", videos: 24 },
  { day: "Jun 6", videos: 38 },
  { day: "Jun 7", videos: 31 },
  { day: "Jun 8", videos: 55 },
  { day: "Jun 9", videos: 47 },
  { day: "Jun 10", videos: 62 },
  { day: "Jun 11", videos: 58 },
];

const FLAGGED = [
  { id: "f1", type: "Policy Violation", description: "Flagged for review: content_v99", reporter: "AutoMod", date: "2026-06-10" },
  { id: "f2", type: "User Report", description: "User reported community post", reporter: "u4", date: "2026-06-11" },
];

const ADMIN_TABS = ["Users", "Analytics", "Moderation", "Settings"];

export default function AdminPage() {
  const { user } = useAppStore();
  const [tab, setTab] = useState("Users");
  const [maintenance, setMaintenance] = useState(false);
  const [ageGateRequired, setAgeGateRequired] = useState(true);

  if (!user?.isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Shield className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-gray-400">You do not have permission to access the admin dashboard.</p>
      </div>
    );
  }

  function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
    return (
      <button onClick={onChange} className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-purple-600" : "bg-gray-700"}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`} />
      </button>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="w-7 h-7 text-purple-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm">Manage users, content, and platform settings.</p>
        </div>
      </div>

      <div className="flex gap-2">
        {ADMIN_TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-[#1A1030] text-gray-400 hover:text-white border border-purple-900/40"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Users" && (
        <div className="glass-card p-6">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-purple-400" /> All Users ({MOCK_USERS.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-900/30">
                  {["Name", "Email", "Plan", "Status", "Joined"].map((h) => (
                    <th key={h} className="text-left text-gray-400 font-medium py-2 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_USERS.map((u) => (
                  <tr key={u.id} className="border-b border-purple-900/20 hover:bg-purple-900/10">
                    <td className="py-3 pr-4 text-white font-medium">{u.name}</td>
                    <td className="py-3 pr-4 text-gray-400">{u.email}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.plan === "Pro" ? "bg-purple-900/40 text-purple-300" : u.plan === "Admin" ? "bg-red-900/40 text-red-300" : "bg-gray-800 text-gray-300"}`}>
                        {u.plan}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.status === "Active" ? "bg-green-900/30 text-green-400" : u.status === "Suspended" ? "bg-red-900/30 text-red-400" : "bg-yellow-900/30 text-yellow-400"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "Analytics" && (
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total Users", value: "1,284" },
              { label: "Videos Generated", value: "18,392" },
              { label: "Active Today", value: "247" },
              { label: "Revenue MTD", value: "$12,450" },
            ].map((s) => (
              <div key={s.label} className="glass-card p-5">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="glass-card p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-purple-400" /> Videos Generated (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={CHART_DATA}>
                <XAxis dataKey="day" tick={{ fill: "#6B7280", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: "#0D0820", border: "1px solid #581c87", borderRadius: "8px", color: "#fff" }} />
                <Line type="monotone" dataKey="videos" stroke="#7C3AED" strokeWidth={2} dot={{ fill: "#7C3AED" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === "Moderation" && (
        <div className="glass-card p-6">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-yellow-400" /> Moderation Queue ({FLAGGED.length})</h2>
          {FLAGGED.length === 0 ? (
            <p className="text-gray-400 text-sm">No items in moderation queue.</p>
          ) : (
            <div className="space-y-3">
              {FLAGGED.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-[#1A1030] border border-yellow-900/30 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-white text-sm">{item.type}</p>
                    <p className="text-xs text-gray-400">{item.description}</p>
                    <p className="text-xs text-gray-600 mt-1">Reported by {item.reporter} · {item.date}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="px-3 py-1 rounded-lg bg-green-900/30 text-green-400 text-xs hover:bg-green-900/50 transition-colors">Approve</button>
                    <button className="px-3 py-1 rounded-lg bg-red-900/30 text-red-400 text-xs hover:bg-red-900/50 transition-colors">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "Settings" && (
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-bold text-white flex items-center gap-2"><Settings className="w-5 h-5 text-purple-400" /> Platform Settings</h2>
          <div className="flex items-center justify-between py-3 border-b border-purple-900/20">
            <div>
              <p className="text-sm font-medium text-white">Maintenance Mode</p>
              <p className="text-xs text-gray-400">Temporarily disable the platform for all users</p>
            </div>
            <Toggle checked={maintenance} onChange={() => setMaintenance(!maintenance)} />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-purple-900/20">
            <div>
              <p className="text-sm font-medium text-white">Age Gate Required</p>
              <p className="text-xs text-gray-400">Show age verification modal on landing page</p>
            </div>
            <Toggle checked={ageGateRequired} onChange={() => setAgeGateRequired(!ageGateRequired)} />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-white">Community Feed</p>
              <p className="text-xs text-gray-400">Enable the community sharing feature platform-wide</p>
            </div>
            <Toggle checked={true} onChange={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
}
