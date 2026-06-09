"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { INDIAN_BOARDS, SUBJECTS, CLASSES, EXAM_TYPES, TEMPLATES, QUESTION_TYPES, DIFFICULTY_LEVELS, Question, PaperTemplate } from "@/lib/data";
import { getSyllabus, generateQuestionsFromTopics } from "@/lib/syllabus";
import {
  BookOpen, Upload, FileText, Wand2, CheckCircle, Plus, Trash2,
  Edit, ChevronRight, Zap, Settings, AlertCircle, X, Check,
  ScanLine, PenLine, Database, Sparkles, ArrowRight
} from "lucide-react";

const STEPS = ["Basic Info", "Content Source", "Template", "AI Generate", "Review & Finalize"];

type SourceMode = "predefined" | "manual" | "upload" | "scan";

export default function CreatePaperPage() {
  const router = useRouter();
  const { user, questions: bankQuestions, addPaper, customTemplates } = useAppStore();
  const allTemplates = [...TEMPLATES, ...customTemplates];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);

  // Step 1 - Basic Info
  const [form, setForm] = useState({
    title: "", subject: "Mathematics", class: "10", board: "CBSE",
    examType: "Quarterly Exam", duration: 90, totalMarks: 50,
  });

  // Step 2 - Content Source
  const [sourceMode, setSourceMode] = useState<SourceMode>("predefined");
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [manualTopics, setManualTopics] = useState("");
  const [uploadedText, setUploadedText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [customChapters, setCustomChapters] = useState<string[]>([]);
  const [newChapter, setNewChapter] = useState("");

  // Step 3 - Template
  const [selectedTemplate, setSelectedTemplate] = useState<PaperTemplate>(TEMPLATES[1]);

  // Step 4 - AI Generation
  const [generating, setGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [genProgress, setGenProgress] = useState(0);

  // Step 5 - Review
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // ── Helpers ──────────────────────────────────────────────────
  const syllabus = getSyllabus(form.board, form.class, form.subject);

  const autoSelectChapters = () => {
    if (!syllabus) return;
    const nums = syllabus.examMapping[form.examType as keyof typeof syllabus.examMapping] || [];
    const ids = syllabus.chapters.filter(c => nums.includes(c.number)).map(c => c.id);
    setSelectedChapters(ids);
  };

  const toggleChapter = (id: string) => {
    setSelectedChapters(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const getSelectedTopics = (): string[] => {
    const topics: string[] = [];
    if (sourceMode === "predefined" && syllabus) {
      syllabus.chapters.filter(c => selectedChapters.includes(c.id)).forEach(c => topics.push(...c.topics));
    } else if (sourceMode === "manual") {
      manualTopics.split("\n").map(t => t.trim()).filter(Boolean).forEach(t => topics.push(t));
      customChapters.forEach(c => topics.push(c));
    } else if (sourceMode === "upload" || sourceMode === "scan") {
      uploadedText.split("\n").map(t => t.trim()).filter(Boolean).slice(0, 30).forEach(t => topics.push(t));
    }
    return topics.length > 0 ? topics : ["General Topics", "Core Concepts", "Applied Problems"];
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setUploadedText(text.slice(0, 2000));
    };
    reader.readAsText(file);
  };

  const runAIGeneration = async () => {
    setGenerating(true);
    setGenProgress(0);
    const topics = getSelectedTopics();

    // Simulate AI generation with progress
    const steps = ["Analysing syllabus content...", "Mapping topics to difficulty levels...", "Generating MCQs...", "Generating short answer questions...", "Generating long answer questions...", "Validating board compliance...", "Finalising paper..."];
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      setGenProgress(Math.round(((i + 1) / steps.length) * 100));
    }

    const dist = selectedTemplate.distribution.map(d => ({ type: d.type, count: d.count, marksEach: d.marksEach }));
    const raw = generateQuestionsFromTopics(topics, form.subject, form.class, form.board, dist);
    setGeneratedQuestions(raw as Question[]);
    setGenerating(false);
  };

  const removeQuestion = (idx: number) => {
    setGeneratedQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const startEdit = (idx: number) => {
    setEditingIdx(idx);
    setEditText(generatedQuestions[idx].text);
  };

  const saveEdit = () => {
    if (editingIdx === null) return;
    setGeneratedQuestions(prev => prev.map((q, i) => i === editingIdx ? { ...q, text: editText } : q));
    setEditingIdx(null);
  };

  const addBlankQuestion = () => {
    setGeneratedQuestions(prev => [...prev, {
      id: "custom_" + Date.now(), text: "New question — click Edit to modify",
      type: "Short Answer", difficulty: "Medium", marks: 2,
      topic: "Custom", subject: form.subject, board: form.board, class: form.class,
    }]);
  };

  const finalize = () => {
    const paper = {
      id: "p_" + Date.now(),
      title: form.title || `${form.board} Class ${form.class} ${form.subject} ${form.examType}`,
      subject: form.subject, class: form.class, board: form.board,
      examType: form.examType,
      totalMarks: generatedQuestions.reduce((s, q) => s + q.marks, 0),
      duration: form.duration,
      questions: generatedQuestions,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: user?.id || "u1",
      schoolName: user?.schoolName,
      status: "draft" as const,
    };
    addPaper(paper);
    router.push("/dashboard/papers");
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Question Paper</h1>
        <p className="text-gray-500 mt-1">Step {step + 1} of {STEPS.length}: <span className="font-medium text-indigo-600">{STEPS[step]}</span></p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-1 shrink-0">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${i < step ? "bg-green-100 text-green-700" : i === step ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"}`}>
              {i < step ? <Check className="w-3 h-3" /> : <span>{i + 1}</span>}
              {s}
            </div>
            {i < STEPS.length - 1 && <ChevronRight className="w-3 h-3 text-gray-300 shrink-0" />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

        {/* ── STEP 1: Basic Info ── */}
        {step === 0 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-4">Paper Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Paper Title (optional)</label>
                <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Auto-generated if left blank"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              {[
                { label: "Board", key: "board", options: INDIAN_BOARDS },
                { label: "Class", key: "class", options: CLASSES },
                { label: "Subject", key: "subject", options: SUBJECTS },
                { label: "Exam Type", key: "examType", options: EXAM_TYPES },
              ].map(({ label, key, options }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <select value={form[key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                <input type="number" value={form.duration} onChange={e => setForm({ ...form, duration: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Content Source ── */}
        {step === 1 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-2">Choose Content Source</h2>
            <p className="text-gray-500 text-sm mb-5">Tell AT Tool where to get syllabus content from. You can combine multiple sources.</p>

            {/* Source mode tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { mode: "predefined" as SourceMode, icon: BookOpen, label: "Pre-defined Syllabus", desc: "CBSE/ICSE chapter lists" },
                { mode: "manual" as SourceMode, icon: PenLine, label: "Type Topics", desc: "Enter your own syllabus" },
                { mode: "upload" as SourceMode, icon: Upload, label: "Upload PDF / Doc", desc: "Textbook or notes" },
                { mode: "scan" as SourceMode, icon: ScanLine, label: "Scan / Image", desc: "Photo of printed syllabus" },
              ].map(({ mode, icon: Icon, label, desc }) => (
                <button key={mode} onClick={() => setSourceMode(mode)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition ${sourceMode === mode ? "border-indigo-600 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sourceMode === mode ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-sm text-gray-900">{label}</div>
                  <div className="text-xs text-gray-400">{desc}</div>
                </button>
              ))}
            </div>

            {/* Pre-defined */}
            {sourceMode === "predefined" && (
              <div>
                {syllabus ? (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-semibold text-gray-700">
                        {form.board} Class {form.class} — {form.subject} ({syllabus.chapters.length} chapters)
                      </div>
                      <button onClick={autoSelectChapters}
                        className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg font-medium transition">
                        <Zap className="w-3.5 h-3.5" /> Auto-select for {form.examType}
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto">
                      {syllabus.chapters.map(ch => (
                        <button key={ch.id} onClick={() => toggleChapter(ch.id)}
                          className={`text-left p-3 rounded-xl border transition ${selectedChapters.includes(ch.id) ? "border-indigo-400 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"}`}>
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${selectedChapters.includes(ch.id) ? "bg-indigo-600" : "bg-gray-200"}`}>
                              {selectedChapters.includes(ch.id) && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-gray-500">Ch {ch.number}</div>
                              <div className="text-sm font-medium text-gray-900">{ch.name}</div>
                            </div>
                          </div>
                          <div className="mt-1.5 flex flex-wrap gap-1 ml-7">
                            {ch.topics.slice(0, 3).map(t => (
                              <span key={t} className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{t}</span>
                            ))}
                            {ch.topics.length > 3 && <span className="text-xs text-gray-400">+{ch.topics.length - 3} more</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-gray-500">
                      {selectedChapters.length} chapter{selectedChapters.length !== 1 ? "s" : ""} selected ·{" "}
                      {syllabus.chapters.filter(c => selectedChapters.includes(c.id)).flatMap(c => c.topics).length} topics
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-amber-700 font-medium text-sm mb-1">
                      <AlertCircle className="w-4 h-4" /> No pre-defined syllabus for {form.board} Class {form.class} {form.subject}
                    </div>
                    <p className="text-amber-600 text-xs">Please use "Type Topics" or "Upload PDF" instead. More boards are being added regularly.</p>
                  </div>
                )}
              </div>
            )}

            {/* Manual */}
            {sourceMode === "manual" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type chapter names or topics</label>
                  <p className="text-xs text-gray-400 mb-2">One topic per line. E.g: "Real Numbers", "Polynomials", "Linear Equations"</p>
                  <textarea value={manualTopics} onChange={e => setManualTopics(e.target.value)} rows={6}
                    placeholder={"Real Numbers\nPolynomials\nPair of Linear Equations\nQuadratic Equations\nArithmetic Progressions"}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Or add chapters one by one</label>
                  <div className="flex gap-2">
                    <input value={newChapter} onChange={e => setNewChapter(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter" && newChapter.trim()) { setCustomChapters(p => [...p, newChapter.trim()]); setNewChapter(""); }}}
                      placeholder="Type chapter name and press Enter"
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                    <button onClick={() => { if (newChapter.trim()) { setCustomChapters(p => [...p, newChapter.trim()]); setNewChapter(""); }}}
                      className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
                      Add
                    </button>
                  </div>
                  {customChapters.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {customChapters.map((c, i) => (
                        <span key={i} className="flex items-center gap-1.5 bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full">
                          {c}
                          <button onClick={() => setCustomChapters(p => p.filter((_, j) => j !== i))} className="hover:text-red-500">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Upload PDF */}
            {sourceMode === "upload" && (
              <div>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-indigo-400 rounded-2xl p-10 text-center cursor-pointer transition">
                  <Upload className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <div className="font-semibold text-gray-600">Click to upload PDF, Word doc, or text file</div>
                  <div className="text-sm text-gray-400 mt-1">Textbook chapters, notes, or any syllabus document</div>
                  <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleFileUpload} />
                </div>
                {uploadedFile && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-green-700 font-medium text-sm mb-2">
                      <CheckCircle className="w-4 h-4" /> {uploadedFile} uploaded
                    </div>
                    <p className="text-xs text-gray-500">AI will extract topics from this document to generate questions.</p>
                    {uploadedText && (
                      <div className="mt-2">
                        <div className="text-xs font-medium text-gray-500 mb-1">Extracted text preview:</div>
                        <div className="bg-white rounded-lg p-3 text-xs text-gray-600 font-mono max-h-24 overflow-y-auto border border-gray-200">{uploadedText.slice(0, 300)}...</div>
                      </div>
                    )}
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Or manually specify key topics from this document:</label>
                      <textarea value={uploadedText} onChange={e => setUploadedText(e.target.value)} rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                    </div>
                  </div>
                )}
                {!uploadedFile && (
                  <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
                    <strong>Tip:</strong> Upload your school&apos;s textbook PDF, printed notes, or any document that has the syllabus. AT Tool will read the content and generate questions from it.
                  </div>
                )}
              </div>
            )}

            {/* Scan / Image */}
            {sourceMode === "scan" && (
              <div>
                <div onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-indigo-400 rounded-2xl p-10 text-center cursor-pointer transition">
                  <ScanLine className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <div className="font-semibold text-gray-600">Upload a photo or scanned image</div>
                  <div className="text-sm text-gray-400 mt-1">JPG, PNG of printed syllabus, textbook pages, or handwritten notes</div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </div>
                {uploadedFile && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-green-700 font-medium text-sm mb-1">
                      <CheckCircle className="w-4 h-4" /> {uploadedFile} — OCR processing complete
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Text extracted from image. Verify and edit below before generating.</p>
                    <textarea value={uploadedText || "Extracted text will appear here after OCR processing..."} onChange={e => setUploadedText(e.target.value)} rows={5}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono" />
                  </div>
                )}
                {!uploadedFile && (
                  <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
                    <strong>Tip:</strong> Take a clear photo of your printed syllabus, question bank, or textbook index page. AT Tool&apos;s OCR will extract the content automatically.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── STEP 3: Template ── */}
        {step === 2 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Choose Paper Template</h2>
              <Link href="/dashboard/templates" target="_blank"
                className="flex items-center gap-1.5 text-sm text-indigo-600 hover:underline font-medium">
                <Settings className="w-4 h-4" /> Manage Templates
              </Link>
            </div>
            {customTemplates.length > 0 && (
              <>
                <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">My Custom Templates</div>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  {customTemplates.map(t => (
                    <button key={t.id} onClick={() => { setSelectedTemplate(t); setForm({ ...form, duration: t.duration, totalMarks: t.totalMarks }); }}
                      className={`text-left p-4 rounded-xl border-2 transition ${selectedTemplate.id === t.id ? "border-indigo-600 bg-indigo-50" : "border-indigo-100 bg-indigo-50/30 hover:border-indigo-400"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900 text-sm">{t.name}</span>
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">Custom</span>
                      </div>
                      {t.board && <div className="text-xs text-indigo-600 mb-1">{t.board}</div>}
                      <div className="text-xs text-gray-500">{t.duration} min · {t.totalMarks} marks</div>
                      <div className="mt-1 space-y-0.5">
                        {t.distribution.map(d => (
                          <div key={d.type} className="text-xs text-gray-400">
                            {d.count}× {d.type} {d.attempt && d.attempt < d.count ? `(attempt ${d.attempt})` : ""} · {d.marksEach}M
                          </div>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Built-in Templates</div>
              </>
            )}
            <div className="grid sm:grid-cols-2 gap-3">
              {TEMPLATES.map(t => (
                <button key={t.id} onClick={() => { setSelectedTemplate(t); setForm({ ...form, duration: t.duration, totalMarks: t.totalMarks }); }}
                  className={`text-left p-4 rounded-xl border-2 transition ${selectedTemplate.id === t.id ? "border-indigo-600 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"}`}>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{t.duration} min · {t.totalMarks} marks</div>
                  <div className="mt-1.5 space-y-0.5">
                    {t.distribution.map(d => (
                      <div key={d.type} className="text-xs text-gray-400">{d.count}× {d.type} ({d.marksEach}M each)</div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 4: AI Generate ── */}
        {step === 3 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-2">AI Question Generation</h2>

            {/* Source summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Generation Summary</div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-indigo-500" /><span className="text-gray-700"><strong>{form.board}</strong> Class {form.class} — {form.subject}</span></div>
                <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-indigo-500" /><span className="text-gray-700"><strong>{form.examType}</strong> · {form.duration} min · {selectedTemplate.totalMarks} marks</span></div>
                <div className="flex items-center gap-2"><Database className="w-4 h-4 text-indigo-500" />
                  <span className="text-gray-700">
                    {sourceMode === "predefined" && `${selectedChapters.length} chapters selected`}
                    {sourceMode === "manual" && `${getSelectedTopics().length} topics from manual input`}
                    {sourceMode === "upload" && `Content from: ${uploadedFile || "uploaded file"}`}
                    {sourceMode === "scan" && `Content from scanned image: ${uploadedFile || "uploaded"}`}
                  </span>
                </div>
                <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="text-gray-700">{selectedTemplate.distribution.reduce((s, d) => s + d.count, 0)} questions across {selectedTemplate.distribution.length} sections</span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {getSelectedTopics().slice(0, 8).map(t => (
                  <span key={t} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{t}</span>
                ))}
                {getSelectedTopics().length > 8 && <span className="text-xs text-gray-400">+{getSelectedTopics().length - 8} more topics</span>}
              </div>
            </div>

            {!generating && generatedQuestions.length === 0 && (
              <button onClick={runAIGeneration}
                className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl text-lg transition">
                <Sparkles className="w-5 h-5" />
                Generate Paper with AI
              </button>
            )}

            {generating && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Sparkles className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">Generating your paper…</div>
                <div className="text-sm text-gray-500 mb-4">AI is reading the syllabus and crafting questions</div>
                <div className="max-w-xs mx-auto bg-gray-100 rounded-full h-3 mb-2">
                  <div className="bg-indigo-600 h-3 rounded-full transition-all duration-300" style={{ width: `${genProgress}%` }} />
                </div>
                <div className="text-xs text-gray-400">{genProgress}% complete</div>
              </div>
            )}

            {!generating && generatedQuestions.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-800">{generatedQuestions.length} questions generated!</div>
                    <div className="text-xs text-green-600">Total marks: {generatedQuestions.reduce((s, q) => s + q.marks, 0)} · Review and edit in the next step</div>
                  </div>
                </div>
                <button onClick={runAIGeneration} className="text-xs text-green-700 border border-green-300 px-3 py-1.5 rounded-lg hover:bg-green-100 transition">
                  Regenerate
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 5: Review & Finalize ── */}
        {step === 4 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-gray-900">Review & Finalise</h2>
                <p className="text-sm text-gray-500">{generatedQuestions.length} questions · {generatedQuestions.reduce((s, q) => s + q.marks, 0)} marks total</p>
              </div>
              <button onClick={addBlankQuestion}
                className="flex items-center gap-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-xl font-medium transition">
                <Plus className="w-4 h-4" /> Add Question
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {generatedQuestions.map((q, i) => (
                <div key={q.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  {editingIdx === i ? (
                    <div>
                      <textarea value={editText} onChange={e => setEditText(e.target.value)} rows={3}
                        className="w-full px-3 py-2 border border-indigo-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2 resize-none bg-white" />
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="flex items-center gap-1 bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-green-700 transition">
                          <Check className="w-3 h-3" /> Save
                        </button>
                        <button onClick={() => setEditingIdx(null)} className="text-xs text-gray-500 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold text-gray-400 mt-0.5 shrink-0">Q{i + 1}.</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{q.text}</p>
                        {q.options && (
                          <div className="mt-1.5 flex flex-wrap gap-2">
                            {q.options.map((opt, j) => (
                              <span key={j} className="text-xs bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded">{String.fromCharCode(65+j)}. {opt}</span>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded">{q.type}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${q.difficulty === "Easy" ? "bg-green-100 text-green-600" : q.difficulty === "Medium" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>{q.difficulty}</span>
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">{q.marks}M</span>
                          <span className="text-xs text-gray-400">{q.topic}</span>
                        </div>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button onClick={() => startEdit(i)} className="w-7 h-7 rounded-lg bg-white border border-gray-200 hover:border-indigo-400 flex items-center justify-center transition">
                          <Edit className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                        <button onClick={() => removeQuestion(i)} className="w-7 h-7 rounded-lg bg-white border border-gray-200 hover:border-red-400 flex items-center justify-center transition">
                          <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {generatedQuestions.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                No questions yet. Go back to Step 4 and generate.
              </div>
            )}

            <div className="mt-6 flex gap-3 flex-wrap">
              <button onClick={finalize}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition">
                <CheckCircle className="w-4 h-4" /> Finalise & Save Paper
              </button>
              <button onClick={() => { finalize(); }}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition">
                <FileText className="w-4 h-4" /> Save & Preview
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-5">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
          className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl disabled:opacity-40 hover:border-gray-300 transition">
          Back
        </button>
        {step < STEPS.length - 1 && (
          <button onClick={() => {
            if (step === 3 && generatedQuestions.length === 0) { runAIGeneration(); return; }
            setStep(step + 1);
          }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition">
            {step === 3 && generatedQuestions.length === 0 ? <><Sparkles className="w-4 h-4" /> Generate & Continue</> : <>Continue <ArrowRight className="w-4 h-4" /></>}
          </button>
        )}
      </div>
    </div>
  );
}
