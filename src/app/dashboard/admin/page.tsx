"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

const MOCK_USERS = [
  { id: "u1", username: "alexmorgan", email: "demo@example.com", plan: "Pro", status: "Active", joined: "2026-01-10" },
  { id: "u2", username: "samlee", email: "starter@example.com", plan: "Starter", status: "Active", joined: "2026-02-03" },
  { id: "u3", username: "admin", email: "admin@example.com", plan: "Admin", status: "Active", joined: "2025-12-01" },
  { id: "u4", username: "user_4821", email: "user4821@example.com", plan: "Pro", status: "Active", joined: "2026-03-15" },
  { id: "u5", username: "creative_99", email: "c99@example.com", plan: "Starter", status: "Suspended", joined: "2026-04-01" },
  { id: "u6", username: "anon_5512", email: "anon@example.com", plan: "Starter", status: "Active", joined: "2026-04-20" },
  { id: "u7", username: "user_2271", email: "u2271@example.com", plan: "Pro", status: "Active", joined: "2026-05-02" },
  { id: "u8", username: "newuser_1", email: "new1@example.com", plan: "Starter", status: "Trial", joined: "2026-06-01" },
  { id: "u9", username: "newuser_2", email: "new2@example.com", plan: "Pro", status: "Trial", joined: "2026-06-05" },
  { id: "u10", username: "poweruser", email: "power@example.com", plan: "Pro", status: "Active", joined: "2026-02-28" },
];

const FLAGGED_CONTENT = [
  { id: "fc1", user: "user_4821", title: "Scene 44", reason: "Community report", date: "2026-06-10" },
  { id: "fc2", user: "anon_5512", title: "Night Video", reason: "Auto-flagged", date: "2026-06-09" },
  { id: "fc3", user: "newuser_1", title: "Test Scene", reason: "Community report", date: "2026-06-11" },
];

const ANALYTICS = [
  { label: "Total Users", value: "10" },
  { label: "Active Subscriptions", value: "7" },
  { label: "Videos Generated Today", value: "42" },
  { label: "Total Revenue", value: "$1,240" },
];

const BAR_DATA = [
  { label: "Mon", val: 30 }, { label: "Tue", val: 50 }, { label: "Wed", val: 42 },
  { label: "Thu", val: 68 }, { label: "Fri", val: 55 }, { label: "Sat", val: 80 }, { label: "Sun", val: 35 },
];

export default function AdminPage() {
  const { user } = useAppStore();
  const [activeTab, setActiveTab] = useState<"users" | "analytics" | "moderation" | "system">("users");
  const [search, setSearch] = useState("");
  const [system, setSystem] = useState({ maintenance: false, registrations: true, community: true, moderation: true });

  if (!user?.isAdmin) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400">You do not have admin privileges.</p>
        </div>
      </div>
    );
  }

  const filteredUsers = MOCK_USERS.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const TABS = [
    { key: "users" as const, label: "Users" },
    { key: "analytics" as const, label: "Analytics" },
    { key: "moderation" as const, label: "Moderation" },
    { key: "system" as const, label: "System Settings" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded">Admin Only</span>
      </div>

      <div className="flex gap-1 border-b border-purple-500/20 flex-wrap">
        {TABS.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition -mb-px ${activeTab === tab.key ? "border-purple-500 text-purple-300" : "border-transparent text-gray-400 hover:text-white"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Users */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full max-w-sm text-sm focus:outline-none placeholder-gray-600" />
          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0D0920]">
                  <tr className="text-gray-400">
                    {["Username", "Email", "Plan", "Status", "Joined", "Actions"].map((h) => (
                      <th key={h} className="text-left px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-t border-purple-500/10 text-gray-300 hover:bg-white/5">
                      <td className="px-4 py-3 font-medium">{u.username}</td>
                      <td className="px-4 py-3">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded ${u.plan === "Pro" ? "bg-amber-400/20 text-amber-300" : u.plan === "Admin" ? "bg-red-500/20 text-red-400" : "bg-purple-600/20 text-purple-300"}`}>
                          {u.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs ${u.status === "Active" ? "text-green-400" : u.status === "Trial" ? "text-amber-400" : "text-red-400"}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{u.joined}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="text-xs bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-2 py-1 rounded transition">Suspend</button>
                          <button className="text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 px-2 py-1 rounded transition">Delete</button>
                          {u.plan !== "Pro" && <button className="text-xs bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 px-2 py-1 rounded transition">→ Pro</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ANALYTICS.map((a) => (
              <div key={a.label} className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-5">
                <div className="text-2xl font-bold text-white">{a.value}</div>
                <div className="text-xs text-gray-400 mt-1">{a.label}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
            <h3 className="font-semibold text-white mb-4">Videos Generated This Week</h3>
            <div className="flex items-end gap-2 h-32">
              {BAR_DATA.map((d) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-purple-600/70 rounded-t" style={{ height: `${(d.val / 80) * 100}%` }} />
                  <span className="text-xs text-gray-500">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Moderation */}
      {activeTab === "moderation" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] overflow-hidden">
            <div className="p-4 border-b border-purple-500/20">
              <h3 className="font-semibold text-white">Flagged Content</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-[#0D0920]">
                <tr className="text-gray-400">
                  {["User", "Title", "Reason", "Date", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FLAGGED_CONTENT.map((fc) => (
                  <tr key={fc.id} className="border-t border-purple-500/10 text-gray-300">
                    <td className="px-4 py-3">{fc.user}</td>
                    <td className="px-4 py-3">{fc.title}</td>
                    <td className="px-4 py-3 text-amber-400">{fc.reason}</td>
                    <td className="px-4 py-3 text-gray-500">{fc.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs bg-green-500/20 text-green-400 hover:bg-green-500/30 px-2 py-1 rounded transition">Approve</button>
                        <button className="text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 px-2 py-1 rounded transition">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-5">
            <h3 className="font-semibold text-white mb-3">Content Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                "All characters must be visibly adult (18+) AI-generated only",
                "No real-person likenesses permitted",
                "No non-consensual depiction themes",
                "Community content must be opted-in explicitly",
                "Violating content is subject to immediate removal",
              ].map((g) => <li key={g} className="flex items-start gap-2"><span className="text-purple-400 mt-0.5">•</span>{g}</li>)}
            </ul>
          </div>
        </div>
      )}

      {/* System Settings */}
      {activeTab === "system" && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 space-y-5">
          {[
            { key: "maintenance" as const, label: "Maintenance Mode", desc: "Take the platform offline for maintenance", danger: true },
            { key: "registrations" as const, label: "New Registrations", desc: "Allow new users to sign up" },
            { key: "community" as const, label: "Community Features", desc: "Enable community sharing and browsing" },
            { key: "moderation" as const, label: "Content Moderation Required", desc: "Require manual review before community posts go live" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <div className={`font-medium ${item.danger ? "text-red-400" : "text-white"}`}>{item.label}</div>
                <div className="text-sm text-gray-400">{item.desc}</div>
              </div>
              <button onClick={() => setSystem({ ...system, [item.key]: !system[item.key] })}
                className={`relative w-10 h-5 rounded-full transition-colors ${system[item.key] ? (item.danger ? "bg-red-600" : "bg-purple-600") : "bg-gray-700"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${system[item.key] ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
