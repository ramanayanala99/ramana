"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { SUBJECTS, INDIAN_BOARDS } from "@/lib/data";
import { LANGUAGES } from "@/lib/i18n";
import { Settings, User, Bell, Globe, Check } from "lucide-react";

export default function SettingsPage() {
  const { user, login, language, setLanguage } = useAppStore();
  const [tab, setTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your profile and preferences.</p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-100">
        {[
          { key: "profile", label: "Profile", icon: User },
          { key: "preferences", label: "Preferences", icon: Globe },
          { key: "notifications", label: "Notifications", icon: Bell },
        ].map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px ${tab === key ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-xl mb-4 flex items-center gap-2">
          <Check className="w-4 h-4" /> Settings saved successfully!
        </div>
      )}

      {tab === "profile" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.[0] || "U"}
            </div>
            <div>
              <button className="text-sm text-indigo-600 hover:underline">Upload Photo</button>
              <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
            </div>
          </div>
          {[
            { label: "Full Name", defaultValue: user?.name, type: "text" },
            { label: "Email", defaultValue: user?.email, type: "email" },
            { label: "School Name", defaultValue: user?.schoolName, type: "text" },
          ].map(({ label, defaultValue, type }) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input type={type} defaultValue={defaultValue}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select defaultValue={user?.role}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="teacher">Teacher</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <button onClick={save} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl transition">Save Profile</button>
        </div>
      )}

      {tab === "preferences" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Boards</label>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {INDIAN_BOARDS.slice(0, 10).map((b) => (
                <button key={b}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition ${user?.boards?.includes(b) ? "bg-indigo-100 border-indigo-400 text-indigo-700" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Subjects</label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.slice(0, 8).map((s) => (
                <button key={s}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition ${user?.subjects?.includes(s) ? "bg-green-100 border-green-400 text-green-700" : "border-gray-200 text-gray-600 hover:border-green-300"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">App Language</label>
            <div className="grid grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => (
                <button key={lang.code}
                  onClick={() => setLanguage(lang.code as Parameters<typeof setLanguage>[0])}
                  className={`flex flex-col items-center p-2.5 rounded-xl border text-center transition ${language === lang.code ? "bg-indigo-50 border-indigo-400 text-indigo-700" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
                  <span className="font-medium text-sm">{lang.native}</span>
                  <span className="text-xs text-gray-400 mt-0.5">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
          <button onClick={save} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl transition">Save Preferences</button>
        </div>
      )}

      {tab === "notifications" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          {[
            { label: "Syllabus update alerts", desc: "Get notified when boards update their syllabus" },
            { label: "Team activity", desc: "Notifications when teammates create or edit papers" },
            { label: "Subscription reminders", desc: "Billing and renewal reminders" },
            { label: "New feature announcements", desc: "Stay updated with AT Tool releases" },
            { label: "Weekly summary", desc: "A weekly digest of your paper generation activity" },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
              <div>
                <div className="font-medium text-sm text-gray-900">{label}</div>
                <div className="text-xs text-gray-400">{desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition peer-checked:after:translate-x-4"></div>
              </label>
            </div>
          ))}
          <button onClick={save} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl transition">Save Notifications</button>
        </div>
      )}
    </div>
  );
}
