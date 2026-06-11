"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Shield, Eye, Lock, Settings } from "lucide-react";

const TABS = ["Profile", "Privacy", "Security", "Content"];

export default function SettingsPage() {
  const { user } = useAppStore();
  const [tab, setTab] = useState("Profile");
  const [communityVisible, setCommunityVisible] = useState(false);
  const [analyticsOptOut, setAnalyticsOptOut] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [intensity, setIntensity] = useState(3);
  const [preferredStyles, setPreferredStyles] = useState<string[]>(["Realistic"]);

  function toggleStyle(s: string) {
    setPreferredStyles((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }

  function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
    return (
      <button onClick={onChange} className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-purple-600" : "bg-gray-700"}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`} />
      </button>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-[#1A1030] text-gray-400 hover:text-white border border-purple-900/40"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Profile" && (
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-bold text-white flex items-center gap-2"><Settings className="w-4 h-4 text-purple-400" /> Profile Settings</h2>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Display Name</label>
            <input defaultValue={user?.name} className="w-full px-4 py-3 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white focus:outline-none focus:border-purple-500 text-sm" />
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Email</label>
            <input defaultValue={user?.email} className="w-full px-4 py-3 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white focus:outline-none focus:border-purple-500 text-sm" />
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Avatar</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center text-2xl font-bold text-white">
                {user?.name?.charAt(0)}
              </div>
              <button className="px-4 py-2 rounded-lg border border-purple-900/50 text-gray-300 hover:text-white text-sm transition-colors">Upload Photo</button>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1030]">
            <span className="text-sm text-gray-300">Age Verification Status</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-green-900/30 text-green-400 font-medium">Verified 18+</span>
          </div>
          <button className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors">Save Profile</button>
        </div>
      )}

      {tab === "Privacy" && (
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-bold text-white flex items-center gap-2"><Eye className="w-4 h-4 text-purple-400" /> Privacy Settings</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Community Visibility</p>
              <p className="text-xs text-gray-400">Allow others to see your profile in the community</p>
            </div>
            <Toggle checked={communityVisible} onChange={() => setCommunityVisible(!communityVisible)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Opt Out of Analytics</p>
              <p className="text-xs text-gray-400">Disable usage analytics collection</p>
            </div>
            <Toggle checked={analyticsOptOut} onChange={() => setAnalyticsOptOut(!analyticsOptOut)} />
          </div>
          <div className="pt-2 border-t border-purple-900/30">
            <button className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors">
              Request Data Deletion
            </button>
            <p className="text-xs text-gray-600 mt-1">All your data will be permanently deleted within 30 days.</p>
          </div>
        </div>
      )}

      {tab === "Security" && (
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-bold text-white flex items-center gap-2"><Lock className="w-4 h-4 text-purple-400" /> Security Settings</h2>
          <div className="space-y-3">
            <p className="text-sm font-medium text-white">Change Password</p>
            <input type="password" placeholder="Current password" className="w-full px-4 py-3 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm" />
            <input type="password" placeholder="New password" className="w-full px-4 py-3 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm" />
            <input type="password" placeholder="Confirm new password" className="w-full px-4 py-3 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm" />
            <button className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition-colors">Update Password</button>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-purple-900/30">
            <div>
              <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
              <p className="text-xs text-gray-400">Add an extra layer of security</p>
            </div>
            <Toggle checked={twoFAEnabled} onChange={() => setTwoFAEnabled(!twoFAEnabled)} />
          </div>
          {twoFAEnabled && (
            <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-800/30 text-sm text-purple-300">
              2FA enabled. You&apos;ll receive a code via email on each login.
            </div>
          )}
        </div>
      )}

      {tab === "Content" && (
        <div className="glass-card p-6 space-y-6">
          <h2 className="font-bold text-white flex items-center gap-2"><Shield className="w-4 h-4 text-purple-400" /> Content Preferences</h2>
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-white">Intensity Filter</label>
              <span className="text-purple-400 font-semibold">{intensity}/5</span>
            </div>
            <input type="range" min={1} max={5} value={intensity} onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-purple-500" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Mild</span><span>Moderate</span><span>Explicit</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-white mb-3 block">Preferred Styles</label>
            <div className="flex flex-wrap gap-2">
              {["Realistic", "Artistic", "Cinematic", "Animated"].map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={preferredStyles.includes(s)} onChange={() => toggleStyle(s)} className="accent-purple-500" />
                  <span className="text-sm text-gray-300">{s}</span>
                </label>
              ))}
            </div>
          </div>
          <button className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors">Save Preferences</button>
        </div>
      )}
    </div>
  );
}
