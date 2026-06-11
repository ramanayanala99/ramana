"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import Link from "next/link";

const HAIR_COLORS = [
  { label: "Black", value: "#1C1C1C" },
  { label: "Brown", value: "#6B3A2A" },
  { label: "Blonde", value: "#D4A017" },
  { label: "Red", value: "#C0392B" },
  { label: "White", value: "#F0F0F0" },
  { label: "Blue", value: "#2980B9" },
  { label: "Purple", value: "#8E44AD" },
  { label: "Pink", value: "#FF69B4" },
  { label: "Auburn", value: "#A0522D" },
  { label: "Silver", value: "#C0C0C0" },
];
const BODY_TYPES = ["Slim", "Athletic", "Curvy", "Muscular"];
const ATTIRES = ["Casual", "Formal", "Swimwear", "Lingerie", "Athletic", "Fantasy"];
const GENDERS = ["Masculine", "Feminine", "Androgynous"];

export default function CharactersPage() {
  const { user, characters, addCharacter, deleteCharacter } = useAppStore();
  const isPro = user?.plan === "pro" || user?.plan === "admin";
  const maxSlots = isPro ? 5 : 2;

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", hairColor: "#1C1C1C", bodyType: "Slim", attire: "Casual", gender: "Feminine" });

  function handleCreate() {
    if (!form.name.trim() || characters.length >= maxSlots) return;
    addCharacter(form);
    setForm({ name: "", hairColor: "#1C1C1C", bodyType: "Slim", attire: "Casual", gender: "Feminine" });
    setShowForm(false);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Characters</h1>
          <p className="text-gray-400 text-sm">
            {characters.length}/{maxSlots} slots used
            {!isPro && characters.length >= maxSlots && (
              <span> — <Link href="/dashboard/billing" className="text-purple-400 hover:text-purple-300">Upgrade for more</Link></span>
            )}
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} disabled={characters.length >= maxSlots}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white px-4 py-2 rounded-lg font-semibold text-sm transition">
          + Create New Character
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 space-y-4">
          <h3 className="font-semibold text-white">New Character</h3>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Character name"
              className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Hair Color</label>
            <div className="flex flex-wrap gap-2">
              {HAIR_COLORS.map((hc) => (
                <button key={hc.value} title={hc.label} onClick={() => setForm({ ...form, hairColor: hc.value })}
                  className={`w-7 h-7 rounded-full border-2 transition ${form.hairColor === hc.value ? "border-purple-400 scale-110" : "border-transparent hover:border-gray-500"}`}
                  style={{ backgroundColor: hc.value }} />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Body Type</label>
            <div className="flex flex-wrap gap-2">
              {BODY_TYPES.map((b) => (
                <button key={b} onClick={() => setForm({ ...form, bodyType: b })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${form.bodyType === b ? "bg-purple-600 text-white" : "bg-[#0D0920] border border-purple-500/30 text-gray-300"}`}>
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Attire</label>
            <div className="grid grid-cols-3 gap-2">
              {ATTIRES.map((a) => (
                <button key={a} onClick={() => setForm({ ...form, attire: a })}
                  className={`py-1.5 rounded-lg text-xs font-medium transition ${form.attire === a ? "bg-purple-600 text-white" : "bg-[#0D0920] border border-purple-500/30 text-gray-300"}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Gender / Presentation</label>
            <div className="flex gap-2">
              {GENDERS.map((g) => (
                <button key={g} onClick={() => setForm({ ...form, gender: g })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition ${form.gender === g ? "bg-purple-600 text-white" : "bg-[#0D0920] border border-purple-500/30 text-gray-300"}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleCreate} className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition">
              Save Character
            </button>
            <button onClick={() => setShowForm(false)} className="bg-[#0D0920] border border-purple-500/30 text-gray-300 px-5 py-2 rounded-lg text-sm transition">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Character grid */}
      {characters.length === 0 ? (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-12 text-center">
          <div className="text-4xl mb-3">👤</div>
          <p className="text-gray-400">No characters yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {characters.map((c) => (
            <div key={c.id} className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                  style={{ backgroundColor: c.hairColor + "80" }}>
                  {c.name[0]?.toUpperCase() ?? "?"}
                </div>
                <div>
                  <div className="font-semibold text-white">{c.name}</div>
                  <div className="text-xs text-gray-400">{c.gender}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400 space-y-1 mb-4">
                <div>Hair: <span className="text-gray-300">{HAIR_COLORS.find((h) => h.value === c.hairColor)?.label ?? c.hairColor}</span></div>
                <div>Body: <span className="text-gray-300">{c.bodyType}</span></div>
                <div>Attire: <span className="text-gray-300">{c.attire}</span></div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#0D0920] border border-purple-500/30 text-gray-300 hover:border-purple-400 py-1.5 rounded-lg text-xs transition">
                  Edit
                </button>
                <button onClick={() => deleteCharacter(c.id)} className="flex-1 bg-red-900/20 border border-red-500/30 text-red-400 hover:border-red-400 py-1.5 rounded-lg text-xs transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
