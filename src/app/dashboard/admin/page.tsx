"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Users, BarChart3, Shield, Settings, UserCheck, Mail, Trash2, Ban } from "lucide-react";

type Tab = "users" | "analytics" | "moderation" | "system";

const MOCK_USERS = [
  { id: "u1", name: "Alex Morgan", email: "demo@example.com", plan: "pro", status: "Active", joined: "2026-05-15" },
  { id: "u2", name: "Sam Lee", email: "starter@example.com", plan: "starter", status: "Active", joined: "2026-06-01" },
  { id: "u3", name: "Jordan K.", email: "jordan@example.com", plan: "pro", status: "Active", joined: "2026-05-20" },
  { id: "u4", name: "Riley M.", email: "riley@example.com", plan: "starter", status: "Suspended", joined: "2026-04-10" },
  { id: "u5", name: "Casey T.", email: "casey@example.com", plan: "pro", status: "Active", joined: "2026-06-05" },
];

const MOCK_FLAGGED = [
  { id: "f1", videoId: "v99", reason: "Inappropriate content", reportedBy: "user123", date: "2026-06-10" },
  { id: "f2", videoId: "v88", reason: "Spam", reportedBy: "user456", date: "2026-06-09" },
];

const ANALYTICS = [
  { label: "Total Users", value: "1,284", change: "+12%", color: "bg-purple-500" },
  { label: "Videos Generated", value: "45,832", change: "+28%", color: "bg-pink-500" },
  { label: "Monthly Revenue", value: "$38,450", change: "+8%", color: "bg-blue-500" },
  { label: "Active Subscriptions", value: "892", change: "+5%", color: "bg-green-500" },
];

const MONTHLY_DATA = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 72 },
  { month: "Mar", value: 80 },
  { month: "Apr", value: 75 },
  { month: "May", value: 88 },
  { month: "Jun", value: 95 },
];

export default function AdminPage() {
  const { user } = useAppStore();
  const [tab, setTab] = useState<Tab>("users");
  const [userSearch, setUserSearch] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [newRegistrations, setNewRegistrations] = useState(true);
  const [communityEnabled, setCommunityEnabled] = useState(true);

  if (!user?.isAdmin) {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-gray-400">You do not have permission to view this page.</p>
      </div>
    );
  }

  const filteredUsers = MOCK_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
    { key: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { key: "moderation", label: "Moderation", icon: <Shield className="w-4 h-4" /> },
    { key: "system", label: "System", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <p className="text-gray-400 text-sm mt-1">Platform management and oversight</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key ? "bg-purple-600 text-white" : "bg-purple-500/10 text-gray-400 hover:text-white"
            }`}
          >
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {tab === "users" && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">All Users ({MOCK_USERS.length})</h2>
            <input
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search users..."
              className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-purple-400 placeholder-gray-600"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs border-b border-purple-500/20">
                  <th className="text-left pb-3">User</th>
                  <th className="text-left pb-3">Plan</th>
                  <th className="text-left pb-3">Status</th>
                  <th className="text-left pb-3">Joined</th>
                  <th className="text-left pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b border-purple-500/10">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-purple-600/40 rounded-full flex items-center justify-center text-xs font-bold">
                          {u.name[0]}
                        </div>
                        <div>
                          <div className="text-white text-xs font-medium">{u.name}</div>
                          <div className="text-gray-500 text-xs">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${u.plan === "pro" ? "bg-purple-600/30 text-purple-300" : "bg-gray-700/50 text-gray-300"}`}>
                        {u.plan}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${u.status === "Active" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400 text-xs">{u.joined}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-gray-500 hover:text-blue-400 transition-colors" title="Email user">
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                        <button className="text-gray-500 hover:text-yellow-400 transition-colors" title="Verify user">
                          <UserCheck className="w-3.5 h-3.5" />
                        </button>
                        <button className="text-gray-500 hover:text-orange-400 transition-colors" title="Suspend">
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                        <button className="text-gray-500 hover:text-red-400 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {tab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ANALYTICS.map((a) => (
              <div key={a.label} className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-5">
                <div className="text-2xl font-bold text-white mb-1">{a.value}</div>
                <div className="text-xs text-gray-400 mb-2">{a.label}</div>
                <div className="text-xs text-green-400">{a.change} this month</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
            <h2 className="text-lg font-semibold mb-5">Video Generations (Monthly)</h2>
            <div className="flex items-end gap-3 h-40">
              {MONTHLY_DATA.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs text-gray-400">{d.value}%</div>
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-sm"
                    style={{ height: `${d.value}%` }}
                  />
                  <div className="text-xs text-gray-500">{d.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Moderation Tab */}
      {tab === "moderation" && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            Flagged Content ({MOCK_FLAGGED.length})
          </h2>
          {MOCK_FLAGGED.length === 0 ? (
            <p className="text-gray-400 text-sm">No flagged content to review.</p>
          ) : (
            <div className="space-y-3">
              {MOCK_FLAGGED.map((f) => (
                <div key={f.id} className="bg-[#0D0920] border border-red-500/20 rounded-lg p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-white mb-1">Video #{f.videoId}</div>
                    <div className="text-xs text-gray-400">
                      <span className="text-red-400">{f.reason}</span> · Reported by {f.reportedBy} · {f.date}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs bg-green-900/30 text-green-400 border border-green-500/30 px-3 py-1.5 rounded hover:bg-green-900/50 transition-colors">
                      Approve
                    </button>
                    <button className="text-xs bg-red-900/30 text-red-400 border border-red-500/30 px-3 py-1.5 rounded hover:bg-red-900/50 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* System Tab */}
      {tab === "system" && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 space-y-5">
          <h2 className="text-lg font-semibold">System Settings</h2>
          {[
            { label: "Maintenance Mode", desc: "Put site in maintenance mode for all users", value: maintenanceMode, set: setMaintenanceMode, danger: true },
            { label: "New Registrations", desc: "Allow new users to sign up", value: newRegistrations, set: setNewRegistrations, danger: false },
            { label: "Community Feed", desc: "Enable the community video sharing feed", value: communityEnabled, set: setCommunityEnabled, danger: false },
          ].map((s) => (
            <div key={s.label} className="flex items-start justify-between gap-4 py-3 border-b border-purple-500/10 last:border-0">
              <div>
                <div className={`text-sm font-medium ${s.danger ? "text-red-300" : "text-white"}`}>{s.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
              </div>
              <button
                onClick={() => s.set(!s.value)}
                className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${s.value ? (s.danger ? "bg-red-600" : "bg-purple-600") : "bg-gray-700"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${s.value ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
          <div className="pt-2">
            <button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg text-sm transition-colors">
              Clear All User Sessions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
