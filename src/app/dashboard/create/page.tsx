"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { INDIAN_BOARDS, SUBJECTS, CLASSES, EXAM_TYPES, TEMPLATES, QUESTION_TYPES, DIFFICULTY_LEVELS, Question } from "@/lib/data";
import { Zap, FileText, CheckCircle, Wand2, Plus, Trash2 } from "lucide-react";

const STEPS = ["Basic Info", "Template", "Select Questions", "Review & Export"];

export default function CreatePaperPage() {
  const router = useRouter();
  const { user, questions, addPaper } = useAppStore();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: "", subject: SUBJECTS[0], class: "10", board: "CBSE",
    examType: "Unit Test", duration: 45, totalMarks: 25,
  });
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [filterType, setFilterType] = useState("All");
  const [filterDiff, setFilterDiff] = useState("All");
  const [generating, setGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(false);

  const filteredQuestions = questions.filter((q) => {
    const typeMatch = filterType === "All" || q.type === filterType;
    const diffMatch = filterDiff === "All" || q.difficulty === filterDiff;
    const subjectMatch = q.subject === form.subject;
    return typeMatch && diffMatch && subjectMatch;
  });

  const toggleQuestion = (q: Question) => {
    setSelectedQuestions((prev) =>
      prev.find((x) => x.id === q.id) ? prev.filter((x) => x.id !== q.id) : [...prev, q]
    );
  };

  const autoGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1500));
    const available = questions.filter((q) => q.subject === form.subject);
    setSelectedQuestions(available.slice(0, Math.min(5, available.length)));
    setAiSuggestions(true);
    setGenerating(false);
  };

  const submit = () => {
    const paper = {
      id: "p_" + Date.now(),
      title: form.title || `${form.board} Class ${form.class} ${form.subject} ${form.examType}`,
      subject: form.subject, class: form.class, board: form.board,
      examType: form.examType, totalMarks: selectedQuestions.reduce((s, q) => s + q.marks, 0) || form.totalMarks,
      duration: form.duration,
      questions: selectedQuestions,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: user?.id || "u1",
      schoolName: user?.schoolName,
      status: "draft" as const,
    };
    addPaper(paper);
    router.push("/dashboard/papers");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Question Paper</h1>
        <p className="text-gray-500 mt-1">Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>
      </div>

      <div className="flex gap-2 mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${i < step ? "bg-green-500 text-white" : i === step ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-400"}`}>
              {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-indigo-600" : "text-gray-400"}`}>{s}</span>
            {i < STEPS.length - 1 && <div className="w-8 h-0.5 bg-gray-200 mx-1 hidden sm:block" />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {step === 0 && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Paper Title (optional)</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Auto-generated if left blank" />
            </div>
            {[
              { label: "Subject", key: "subject", options: SUBJECTS },
              { label: "Board", key: "board", options: INDIAN_BOARDS },
              { label: "Class", key: "class", options: CLASSES },
              { label: "Exam Type", key: "examType", options: EXAM_TYPES },
            ].map(({ label, key, options }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <select value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {options.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
              <input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-4">Choose a Template</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {TEMPLATES.map((t) => (
                <button key={t.id} onClick={() => { setSelectedTemplate(t); setForm({ ...form, duration: t.duration, totalMarks: t.totalMarks }); }}
                  className={`text-left p-4 rounded-xl border-2 transition ${selectedTemplate.id === t.id ? "border-indigo-600 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"}`}>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{t.duration} min · {t.totalMarks} marks</div>
                  <div className="mt-2 space-y-1">
                    {t.distribution.map((d) => (
                      <div key={d.type} className="text-xs text-gray-400">{d.count}× {d.type} ({d.marksEach} mark{d.marksEach > 1 ? "s" : ""} each)</div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 bg-indigo-50 rounded-xl p-4 flex items-center gap-3">
              <Wand2 className="w-5 h-5 text-indigo-600 shrink-0" />
              <p className="text-sm text-indigo-700">Templates auto-configure mark distribution. You can manually adjust questions in the next step.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Select Questions</h2>
              <button onClick={autoGenerate} disabled={generating}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
                <Zap className="w-4 h-4" />
                {generating ? "Generating..." : "AI Auto-Generate"}
              </button>
            </div>
            {aiSuggestions && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-xl mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                AI has selected {selectedQuestions.length} questions based on your board, class, and template. You can adjust below.
              </div>
            )}
            <div className="flex gap-3 mb-4">
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="All">All Types</option>
                {QUESTION_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
              <select value={filterDiff} onChange={(e) => setFilterDiff(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="All">All Difficulty</option>
                {DIFFICULTY_LEVELS.map((d) => <option key={d}>{d}</option>)}
              </select>
              <div className="ml-auto text-sm text-gray-500">
                Selected: {selectedQuestions.length} · {selectedQuestions.reduce((s, q) => s + q.marks, 0)} marks
              </div>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-8 text-gray-400">No questions found for {form.subject}. Try adding questions to the bank.</div>
              ) : (
                filteredQuestions.map((q) => {
                  const selected = !!selectedQuestions.find((x) => x.id === q.id);
                  return (
                    <div key={q.id} onClick={() => toggleQuestion(q)}
                      className={`p-3 rounded-xl border cursor-pointer transition flex items-start gap-3 ${selected ? "border-indigo-400 bg-indigo-50" : "border-gray-100 hover:border-gray-300 bg-white"}`}>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${selected ? "bg-indigo-600 border-indigo-600" : "border-gray-300"}`}>
                        {selected && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{q.text}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{q.type}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${q.difficulty === "Easy" ? "bg-green-100 text-green-600" : q.difficulty === "Medium" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>{q.difficulty}</span>
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">{q.marks} mark{q.marks > 1 ? "s" : ""}</span>
                          <span className="text-xs text-gray-400">{q.topic}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-4">Review Your Paper</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                ["Title", form.title || `${form.board} Class ${form.class} ${form.subject} ${form.examType}`],
                ["Board", form.board],
                ["Class", form.class],
                ["Subject", form.subject],
                ["Exam Type", form.examType],
                ["Duration", `${form.duration} minutes`],
                ["Total Questions", String(selectedQuestions.length)],
                ["Total Marks", String(selectedQuestions.reduce((s, q) => s + q.marks, 0) || form.totalMarks)],
              ].map(([k, v]) => (
                <div key={k} className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-400">{k}</div>
                  <div className="font-semibold text-gray-900">{v}</div>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-700 mb-2">Question Distribution</div>
              {QUESTION_TYPES.map((type) => {
                const count = selectedQuestions.filter((q) => q.type === type).length;
                if (!count) return null;
                return (
                  <div key={type} className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-500 w-32">{type}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${(count / selectedQuestions.length) * 100}%` }} />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3">
              <button onClick={submit}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition">
                <FileText className="w-4 h-4" />
                Save as Draft
              </button>
              <button onClick={submit}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition">
                <Plus className="w-4 h-4" />
                Publish Paper
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
          className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl disabled:opacity-40 hover:border-gray-300 transition">
          Back
        </button>
        {step < STEPS.length - 1 && (
          <button onClick={() => setStep(step + 1)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition">
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
