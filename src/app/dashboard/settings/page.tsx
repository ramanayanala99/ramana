"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { User, Lock, Eye, Bell } from "lucide-react";

type Tab = "profile" | "privacy" | "security" | "preferences";

export default function SettingsPage() {
  const { user } = useAppStore();
  const [tab, setTab] = useState<Tab>("profile");

  // Profile state
  const [username, setUsername] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileSaved, setProfileSaved] = useState(false);

  // Privacy state
  const [analyticsOptIn, setAnalyticsOptIn] = useState(false);
  const [showInCommunity, setShowInCommunity] = useState(true);
  const [storeHistory, setStoreHistory] = useState(true);

  // Security state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);
  const [pwMsg, setPwMsg] = useState("");

  // Preferences state
  const [intensity, setIntensity] = useState(50);
  const [stylePrefs, setStylePrefs] = useState({ realistic: true, artistic: false, cinematic: true });
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [communityNotifs, setCommunityNotifs] = useState(false);

  if (!user) return null;

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  }

  function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPw !== confirmPw) {
      setPwMsg("Passwords do not match.");
      return;
    }
    if (newPw.length < 8) {
      setPwMsg("Password must be at least 8 characters.");
      return;
    }
    setPwMsg("Password changed successfully!");
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    setTimeout(() => setPwMsg(""), 3000);
  }

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { key: "privacy", label: "Privacy", icon: <Eye className="w-4 h-4" /> },
    { key: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
    { key: "preferences", label: "Preferences", icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account preferences</p>
      </div>

      {/* Tabs */}
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

      {/* Profile Tab */}
      {tab === "profile" && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
          <h2 className="text-lg font-semibold mb-5">Profile Settings</h2>

          {profileSaved && (
            <div className="bg-green-900/30 border border-green-500/40 text-green-300 text-sm px-4 py-3 rounded-lg mb-4">
              Profile saved successfully!
            </div>
          )}

          <form onSubmit={saveProfile} className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 bg-purple-600/50 rounded-full flex items-center justify-center text-2xl font-bold">
                {user.name[0]}
              </div>
              <div>
                <button type="button" className="text-sm text-purple-400 hover:text-purple-300 underline">
                  Change avatar
                </button>
                <p className="text-xs text-gray-500 mt-0.5">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Display Name</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Plan</label>
              <div className="bg-[#0D0920] border border-purple-500/20 rounded-lg px-3 py-2 text-sm text-gray-400 capitalize">
                {user.plan} Plan
              </div>
            </div>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Privacy Tab */}
      {tab === "privacy" && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
          <h2 className="text-lg font-semibold mb-5">Privacy Settings</h2>
          <div className="space-y-5">
            {[
              { label: "Analytics Opt-in", desc: "Help improve the platform by sharing anonymous usage data", value: analyticsOptIn, set: setAnalyticsOptIn },
              { label: "Show in Community", desc: "Allow your shared videos to appear in the community feed", value: showInCommunity, set: setShowInCommunity },
              { label: "Store Generation History", desc: "Keep a history of all your generated videos", value: storeHistory, set: setStoreHistory },
            ].map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-white">{item.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                </div>
                <button
                  onClick={() => item.set(!item.value)}
                  className={`w-12 h-6 rounded-full transition-colors flex-shrink-0 relative ${item.value ? "bg-purple-600" : "bg-gray-700"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${item.value ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
            <div className="pt-4 border-t border-purple-500/20">
              <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
                Request Data Deletion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {tab === "security" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
            <h2 className="text-lg font-semibold mb-5">Change Password</h2>
            {pwMsg && (
              <div className={`text-sm px-4 py-3 rounded-lg mb-4 border ${pwMsg.includes("success") ? "bg-green-900/30 border-green-500/40 text-green-300" : "bg-red-900/30 border-red-500/40 text-red-300"}`}>
                {pwMsg}
              </div>
            )}
            <form onSubmit={changePassword} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Current Password</label>
                <input type="password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} required
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">New Password</label>
                <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} required minLength={8}
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Confirm New Password</label>
                <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} required
                  className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-400" />
              </div>
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Update Password
              </button>
            </form>
          </div>

          <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6">
            <h2 className="text-lg font-semibold mb-2">Two-Factor Authentication</h2>
            <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account.</p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white">{twoFaEnabled ? "2FA is enabled" : "2FA is disabled"}</div>
                <div className="text-xs text-gray-500 mt-0.5">Uses authenticator app</div>
              </div>
              <button
                onClick={() => setTwoFaEnabled(!twoFaEnabled)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${twoFaEnabled ? "bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
              >
                {twoFaEnabled ? "Disable 2FA" : "Enable 2FA"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {tab === "preferences" && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 space-y-6">
          <h2 className="text-lg font-semibold">Content Preferences</h2>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-white">Content Intensity</label>
              <span className="text-sm text-purple-400">{intensity}%</span>
            </div>
            <input
              type="range" min={0} max={100} value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Mild</span><span>Moderate</span><span>Explicit</span>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-white mb-3">Default Styles</div>
            <div className="space-y-2">
              {(Object.keys(stylePrefs) as Array<keyof typeof stylePrefs>).map((key) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stylePrefs[key]}
                    onChange={(e) => setStylePrefs((p) => ({ ...p, [key]: e.target.checked }))}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <span className="text-sm text-gray-300 capitalize">{key}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-white mb-3">Notifications</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Email notifications</span>
                <button onClick={() => setEmailNotifs(!emailNotifs)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${emailNotifs ? "bg-purple-600" : "bg-gray-700"}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${emailNotifs ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Community likes</span>
                <button onClick={() => setCommunityNotifs(!communityNotifs)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${communityNotifs ? "bg-purple-600" : "bg-gray-700"}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${communityNotifs ? "translate-x-6" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>
          </div>

          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Save Preferences
          </button>
        </div>
      )}
    </div>
  );
}
