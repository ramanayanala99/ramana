"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { INDIAN_BOARDS, SUBJECTS } from "@/lib/data";
import { BookOpen, ArrowRight, Check } from "lucide-react";

const STEPS = ["School Info", "Board Preferences", "Subjects Taught", "Ready!"];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, login } = useAppStore();
  const [step, setStep] = useState(0);
  const [schoolName, setSchoolName] = useState(user?.schoolName || "");
  const [selectedBoards, setSelectedBoards] = useState<string[]>(["CBSE"]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["Mathematics"]);

  const toggleItem = (arr: string[], item: string, setArr: (a: string[]) => void) => {
    setArr(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };

  const finish = () => {
    if (user) {
      login({ ...user, schoolName, boards: selectedBoards, subjects: selectedSubjects });
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-bold text-xl text-indigo-700 mb-4">
            <div className="bg-indigo-600 text-white rounded-lg p-1.5"><BookOpen className="w-5 h-5" /></div>
            AT Tool
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome! Let&apos;s set up your account.</h1>
          <p className="text-gray-500 mt-2">Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>
        </div>

        <div className="flex gap-2 mb-6 justify-center">
          {STEPS.map((s, i) => (
            <div key={s} className={`h-2 rounded-full transition-all ${i <= step ? "bg-indigo-600 w-16" : "bg-gray-200 w-8"}`} />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {step === 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Tell us about your school</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School / Institute Name *</label>
                  <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Delhi Public School, Sector 45" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City / District</label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. New Delhi" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Select state...</option>
                    {["Delhi","Maharashtra","Tamil Nadu","Karnataka","Kerala","Gujarat","Rajasthan","Uttar Pradesh","West Bengal","Punjab"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Which boards do you teach?</h2>
              <p className="text-gray-500 text-sm mb-4">Select all that apply. You can change this later.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                {INDIAN_BOARDS.map((b) => (
                  <button key={b} onClick={() => toggleItem(selectedBoards, b, setSelectedBoards)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition text-left ${selectedBoards.includes(b) ? "bg-indigo-100 border-indigo-400 text-indigo-700" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
                    {selectedBoards.includes(b) && <Check className="w-3 h-3 shrink-0" />}
                    {b}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">{selectedBoards.length} board(s) selected</p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">What subjects do you teach?</h2>
              <p className="text-gray-500 text-sm mb-4">Select your primary subjects.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUBJECTS.map((s) => (
                  <button key={s} onClick={() => toggleItem(selectedSubjects, s, setSelectedSubjects)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition text-left ${selectedSubjects.includes(s) ? "bg-indigo-100 border-indigo-400 text-indigo-700" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
                    {selectedSubjects.includes(s) && <Check className="w-3 h-3 shrink-0" />}
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re all set!</h2>
              <p className="text-gray-500 mb-2">Your account is configured for:</p>
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                {selectedBoards.slice(0, 5).map((b) => <span key={b} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">{b}</span>)}
                {selectedSubjects.slice(0, 5).map((s) => <span key={s} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{s}</span>)}
              </div>
              <p className="text-sm text-gray-400 mt-4">Your 14-day free trial starts today. No payment needed.</p>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
              className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl disabled:opacity-40 hover:border-gray-300 transition">
              Back
            </button>
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(step + 1)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={finish}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-xl transition">
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
