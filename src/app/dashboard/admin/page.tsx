"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Users, Plus, Trash2, BarChart3, FileText, Settings, UserCheck, Shield, Mail } from "lucide-react";

export default function AdminPage() {
  const { teachers, papers, addTeacher, removeTeacher, user } = useAppStore();
  const [tab, setTab] = useState<"users" | "analytics" | "settings">("users");
  const [showAdd, setShowAdd] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: "", email: "", role: "teacher" });

  const handleAdd = () => {
    if (!newTeacher.name || !newTeacher.email) return;
    addTeacher({ id: "t_" + Date.now(), ...newTeacher, addedAt: new Date().toISOString().split("T")[0] });
    setNewTeacher({ name: "", email: "", role: "teacher" });
    setShowAdd(false);
  };

  const boardDist = papers.reduce((acc, p) => { acc[p.board] = (acc[p.board] || 0) + 1; return acc; }, {} as Record<string, number>);
  const subjectDist = papers.reduce((acc, p) => { acc[p.subject] = (acc[p.subject] || 0) + 1; return acc; }, {} as Record<string, number>);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage your team, view analytics, and configure institute settings.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-100">
        {[
          { key: "users", label: "User Management", icon: Users },
          { key: "analytics", label: "Analytics", icon: BarChart3 },
          { key: "settings", label: "Settings", icon: Settings },
        ].map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px ${tab === key ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* User Management */}
      {tab === "users" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">{teachers.length} members in your institute</div>
            <button onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition">
              <Plus className="w-4 h-4" />
              Add Teacher
            </button>
          </div>

          {showAdd && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Add New Teacher</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <input type="text" placeholder="Full Name" value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <input type="email" placeholder="Email" value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <select value={newTeacher.role} onChange={(e) => setNewTeacher({ ...newTeacher, role: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 mt-3">
                <button onClick={handleAdd} className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg">Add Teacher</button>
                <button onClick={() => setShowAdd(false)} className="text-sm text-gray-500 px-4 py-2">Cancel</button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Name", "Email", "Role", "Added", "Actions"].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {teachers.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {t.name[0]}
                        </div>
                        <span className="font-medium text-sm text-gray-900">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{t.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${t.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}>
                        {t.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{t.addedAt}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => removeTeacher(t.id)}
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-red-100 flex items-center justify-center transition">
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics */}
      {tab === "analytics" && (
        <div>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Papers", value: papers.length, icon: FileText, color: "bg-indigo-500" },
              { label: "Team Members", value: teachers.length, icon: Users, color: "bg-purple-500" },
              { label: "Published Papers", value: papers.filter((p) => p.status === "published").length, icon: UserCheck, color: "bg-green-500" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">Papers by Board</h3>
              <div className="space-y-3">
                {Object.entries(boardDist).map(([board, count]) => (
                  <div key={board} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-20 shrink-0">{board}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${(count / papers.length) * 100}%` }} />
                    </div>
                    <span className="text-sm text-gray-500 w-6">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">Papers by Subject</h3>
              <div className="space-y-3">
                {Object.entries(subjectDist).map(([subj, count]) => (
                  <div key={subj} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-32 shrink-0 truncate">{subj}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(count / papers.length) * 100}%` }} />
                    </div>
                    <span className="text-sm text-gray-500 w-6">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings */}
      {tab === "settings" && (
        <div className="max-w-2xl space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Settings className="w-4 h-4 text-indigo-600" />Institute Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name</label>
                <input type="text" defaultValue={user?.schoolName}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                <input type="email" defaultValue={user?.email}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Board</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>CBSE</option><option>ICSE</option><option>State Board</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-medium text-sm text-gray-900">Allow teacher self-signup</div>
                  <div className="text-xs text-gray-400">Teachers can create accounts under your institute</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition"></div>
                </label>
              </div>
            </div>
            <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl transition">Save Settings</button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-red-500" />Danger Zone</h3>
            <div className="border border-red-200 rounded-xl p-4">
              <div className="font-medium text-sm text-gray-900">Delete Institute Account</div>
              <div className="text-xs text-gray-400 mt-1 mb-3">This will permanently delete all papers, question banks, and team data.</div>
              <button className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-lg transition">Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
