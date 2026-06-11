"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";

export default function SettingsPage() {
  const { user } = useAppStore();
  const [activeTab, setActiveTab] = useState<"profile" | "privacy" | "security" | "preferences">("profile");
  const [displayName, setDisplayName] = useState(user?.name ?? "");
  const [communityVisible, setCommunityVisible] = useState(false);
  const [analyticsOptOut, setAnalyticsOptOut] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [intensity, setIntensity] = useState(3);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const TABS = [
    { key: "profile" as const, label: "Profile" },
    { key: "privacy" as const, label: "Privacy" },
    { key: "security" as const, label: "Security" },
    { key: "preferences" as const, label: "Preferences" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <div className="flex gap-1 border-b border-purple-500/20">
        {TABS.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition -mb-px ${activeTab === tab.key ? "border-purple-500 text-purple-300" : "border-transparent text-gray-400 hover:text-white"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.[0] ?? "U"}
            </div>
            <button className="bg-[#0D0920] border border-purple-500/30 text-gray-300 hover:border-purple-400 px-4 py-2 rounded-lg text-sm transition">
              Upload Avatar
            </button>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Display Name</label>
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)}
              className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email (read-only)</label>
            <input value={user?.email ?? ""} readOnly
              className="bg-[#0D0920] border border-purple-500/20 text-gray-500 rounded-lg px-3 py-2 w-full text-sm cursor-not-allowed" />
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition">
            Save Profile
          </button>
        </div>
      )}

      {activeTab === "privacy" && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 space-y-5">
          {[
            { label: "Community Visibility", desc: "Show your profile in community", value: communityVisible, toggle: () => setCommunityVisible(!communityVisible) },
            { label: "Analytics Opt-Out", desc: "Opt out of anonymous usage analytics", value: analyticsOptOut, toggle: () => setAnalyticsOptOut(!analyticsOptOut) },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">{item.label}</div>
                <div className="text-sm text-gray-400">{item.desc}</div>
              </div>
              <button onClick={item.toggle} className={`relative w-10 h-5 rounded-full transition-colors ${item.value ? "bg-purple-600" : "bg-gray-700"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${item.value ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
          <div className="pt-3 border-t border-purple-500/20">
            <button className="text-sm text-red-400 hover:text-red-300 transition">Request Data Deletion</button>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 space-y-5">
          <h3 className="font-semibold text-white">Change Password</h3>
          {(["current", "next", "confirm"] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm text-gray-400 mb-1.5 capitalize">
                {field === "next" ? "New Password" : field === "confirm" ? "Confirm New Password" : "Current Password"}
              </label>
              <input type="password" value={passwords[field]} onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
                className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-500" />
            </div>
          ))}
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition">
            Update Password
          </button>
          <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-gray-400">Add an extra layer of security</div>
            </div>
            <span className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded">Coming Soon</span>
          </div>
        </div>
      )}

      {activeTab === "preferences" && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Content Intensity: {intensity}/5</label>
            <input type="range" min={1} max={5} value={intensity} onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-purple-600" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Mild</span><span>Moderate</span><span>Explicit</span>
            </div>
          </div>
          {[
            { label: "Push Notifications", desc: "Generation complete alerts", value: notifications, toggle: () => setNotifications(!notifications) },
            { label: "Email Updates", desc: "Product news and tips", value: emailUpdates, toggle: () => setEmailUpdates(!emailUpdates) },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">{item.label}</div>
                <div className="text-sm text-gray-400">{item.desc}</div>
              </div>
              <button onClick={item.toggle} className={`relative w-10 h-5 rounded-full transition-colors ${item.value ? "bg-purple-600" : "bg-gray-700"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${item.value ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition">
            Save Preferences
          </button>
        </div>
      )}
    </div>
  );
}
