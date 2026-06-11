"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Plus, Trash2, Users } from "lucide-react";

const BODY_TYPES = ["Slim", "Athletic", "Curvy", "Muscular"];
const ATTIRE_OPTIONS = ["Casual", "Formal", "Lingerie", "Athletic", "Fantasy", "Elegant"];
const GENDERS = ["Female", "Male", "Non-binary"];

export default function CharactersPage() {
  const { characters, addCharacter, deleteCharacter, user } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [hairColor, setHairColor] = useState("#D4A017");
  const [bodyType, setBodyType] = useState("Slim");
  const [attire, setAttire] = useState("Casual");
  const [gender, setGender] = useState("Female");

  const isPro = user?.plan === "pro" || user?.plan === "admin";
  const limit = isPro ? 5 : 2;
  const atLimit = characters.length >= limit;

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || atLimit) return;
    addCharacter({ name, hairColor, bodyType, attire, gender });
    setName(""); setHairColor("#D4A017"); setBodyType("Slim"); setAttire("Casual"); setGender("Female");
    setShowForm(false);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Characters</h1>
          <p className="text-gray-400 text-sm mt-1">{characters.length}/{limit} characters</p>
        </div>
        {!atLimit && (
          <button onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium text-sm transition-colors">
            <Plus className="w-4 h-4" /> New Character
          </button>
        )}
      </div>

      {atLimit && (
        <div className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-800/40 text-yellow-300 text-sm">
          You&apos;ve reached your {isPro ? "Pro" : "Starter"} limit of {limit} characters.
          {!isPro && " Upgrade to Pro for up to 5 characters."}
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <div className="glass-card p-6 animate-fade-in-up">
          <h3 className="font-bold text-white mb-4">Create New Character</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Character name"
                className="w-full px-4 py-2 rounded-lg bg-[#1A1030] border border-purple-900/50 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 text-sm" />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Hair Color</label>
              <input type="color" value={hairColor} onChange={(e) => setHairColor(e.target.value)}
                className="w-12 h-10 rounded cursor-pointer border-0 bg-transparent" />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Body Type</label>
              <div className="flex flex-wrap gap-2">
                {BODY_TYPES.map((bt) => (
                  <button type="button" key={bt} onClick={() => setBodyType(bt)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${bodyType === bt ? "bg-purple-600 text-white" : "bg-[#1A1030] text-gray-400 border border-purple-900/40 hover:text-white"}`}>{bt}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Attire</label>
              <div className="flex flex-wrap gap-2">
                {ATTIRE_OPTIONS.map((a) => (
                  <button type="button" key={a} onClick={() => setAttire(a)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${attire === a ? "bg-purple-600 text-white" : "bg-[#1A1030] text-gray-400 border border-purple-900/40 hover:text-white"}`}>{a}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Gender</label>
              <div className="flex gap-2">
                {GENDERS.map((g) => (
                  <button type="button" key={g} onClick={() => setGender(g)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${gender === g ? "bg-purple-600 text-white" : "bg-[#1A1030] text-gray-400 border border-purple-900/40 hover:text-white"}`}>{g}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium text-sm transition-colors">Create</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-[#1A1030] hover:bg-purple-900/20 border border-purple-900/40 rounded-lg text-gray-300 text-sm transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Characters grid */}
      {characters.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Users className="w-12 h-12 text-purple-800 mx-auto mb-3" />
          <p className="text-gray-400">No characters yet. Create your first synthetic character!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {characters.map((c) => (
            <div key={c.id} className="glass-card p-5 card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full border-2 border-purple-700/50 flex items-center justify-center font-bold text-white text-lg"
                  style={{ backgroundColor: c.hairColor + "33" }}>
                  {c.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.gender}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Body Type</span>
                  <span className="text-gray-300">{c.bodyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Attire</span>
                  <span className="text-gray-300">{c.attire}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Hair</span>
                  <div className="w-5 h-5 rounded-full border border-gray-600" style={{ backgroundColor: c.hairColor }} />
                </div>
              </div>
              <button onClick={() => deleteCharacter(c.id)}
                className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg border border-red-900/40 text-red-400 hover:bg-red-900/20 text-sm transition-colors">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
