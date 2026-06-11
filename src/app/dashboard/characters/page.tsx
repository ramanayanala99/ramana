"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Plus, Trash2, Users } from "lucide-react";

const HAIR_COLORS = [
  { name: "Black", hex: "#1C1C1C" },
  { name: "Brown", hex: "#7B3F00" },
  { name: "Blonde", hex: "#F5DEB3" },
  { name: "Red", hex: "#C0392B" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Blue", hex: "#4169E1" },
  { name: "Purple", hex: "#9B59B6" },
  { name: "Pink", hex: "#FFB6C1" },
];

const BODY_TYPES = ["Slim", "Athletic", "Curvy", "Muscular", "Petite", "Plus Size"];
const ATTIRE_PRESETS = ["Casual", "Formal", "Swimwear", "Lingerie", "Athletic", "Fantasy"];
const GENDERS = ["Female", "Male", "Non-binary"];

export default function CharactersPage() {
  const { user, characters, addCharacter, deleteCharacter } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [hairColor, setHairColor] = useState("#1C1C1C");
  const [bodyType, setBodyType] = useState("Slim");
  const [attire, setAttire] = useState("Casual");
  const [gender, setGender] = useState("Female");

  const isPro = user?.plan === "pro" || user?.plan === "admin";
  const slotLimit = isPro ? 5 : 2;
  const atLimit = characters.length >= slotLimit;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    addCharacter({ name, hairColor, bodyType, attire, gender });
    setName("");
    setHairColor("#1C1C1C");
    setBodyType("Slim");
    setAttire("Casual");
    setGender("Female");
    setShowForm(false);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Characters</h1>
          <p className="text-gray-400 text-sm mt-1">
            {characters.length} / {slotLimit} character slots used
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          disabled={atLimit}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Character
        </button>
      </div>

      {atLimit && !isPro && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 rounded-xl px-5 py-4 text-sm mb-6">
          You have reached the 2-character limit for Starter plan.{" "}
          <a href="/dashboard/billing" className="underline">Upgrade to Pro</a> for 5 character slots.
        </div>
      )}

      {/* Create Form */}
      {showForm && (
        <div className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Create New Character</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Character name"
                required
                className="bg-[#0D0920] border border-purple-500/30 text-white rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-purple-400 placeholder-gray-600"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Gender</label>
              <div className="flex gap-2">
                {GENDERS.map((g) => (
                  <button type="button" key={g} onClick={() => setGender(g)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${gender === g ? "bg-purple-600 text-white" : "bg-purple-500/10 text-gray-400 hover:text-white border border-purple-500/20"}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Hair Color</label>
              <div className="flex gap-2 flex-wrap">
                {HAIR_COLORS.map((h) => (
                  <button type="button" key={h.hex} onClick={() => setHairColor(h.hex)} title={h.name}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${hairColor === h.hex ? "border-white scale-110" : "border-transparent hover:border-gray-400"}`}
                    style={{ backgroundColor: h.hex }} />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Body Type</label>
              <div className="flex gap-2 flex-wrap">
                {BODY_TYPES.map((b) => (
                  <button type="button" key={b} onClick={() => setBodyType(b)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${bodyType === b ? "bg-purple-600 text-white" : "bg-purple-500/10 text-gray-400 hover:text-white border border-purple-500/20"}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Attire</label>
              <div className="flex gap-2 flex-wrap">
                {ATTIRE_PRESETS.map((a) => (
                  <button type="button" key={a} onClick={() => setAttire(a)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${attire === a ? "bg-pink-600 text-white" : "bg-pink-500/10 text-gray-400 hover:text-white border border-pink-500/20"}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Save Character
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="border border-purple-500/30 hover:bg-purple-500/10 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Characters Grid */}
      {characters.length === 0 ? (
        <div className="rounded-xl border border-dashed border-purple-500/30 bg-[#1A1030] p-16 text-center">
          <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No characters yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map((c) => (
            <div key={c.id} className="rounded-xl border border-purple-500/20 bg-[#1A1030] p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-purple-500/30 flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: c.hairColor + "40" }}
                  >
                    {c.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{c.name}</div>
                    <div className="text-xs text-gray-400">{c.gender}</div>
                  </div>
                </div>
                <button
                  onClick={() => deleteCharacter(c.id)}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Hair Color</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full border border-gray-600" style={{ backgroundColor: c.hairColor }} />
                    <span className="text-gray-300">{c.hairColor}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Body Type</span>
                  <span className="text-gray-300">{c.bodyType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Attire</span>
                  <span className="text-purple-300">{c.attire}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Created</span>
                  <span className="text-gray-400">{c.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
