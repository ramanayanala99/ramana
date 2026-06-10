"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { INDIAN_BOARDS, SUBJECTS, CLASSES, EXAM_TYPES, TEMPLATES, QUESTION_TYPES, Question, PaperTemplate } from "@/lib/data";
import { getSyllabus, generateQuestionsFromTopics } from "@/lib/syllabus";
import { TEXTBOOK_DB } from "@/lib/textbooks";
import {
  BookOpen, Upload, FileText, Wand2, CheckCircle, Plus, Trash2,
  Edit, ChevronRight, Zap, Settings, AlertCircle, X, Check,
  ScanLine, PenLine, Database, Sparkles, ArrowRight, Library,
  Camera, Send, Bot, User as UserIcon, RefreshCw, Globe,
} from "lucide-react";
import { LANGUAGES } from "@/lib/i18n";

const STEPS = ["Basic Info", "Content Source", "Template", "AI Chat", "Review & Finalize"];

type SourceMode = "predefined" | "textbook" | "manual" | "upload" | "scan";

interface ChatMsg {
  role: "user" | "assistant";
  text: string;
  questions?: Question[];
}

// Simulated AI chat responses
function aiReply(userMsg: string, currentQs: Question[], form: { subject: string; board: string; class: string; examType: string }, topics: string[]): { text: string; questions?: Question[] } {
  const msg = userMsg.toLowerCase();

  // Add more questions
  const addMatch = msg.match(/add\s+(\d+)\s*(more)?\s*(mcq|short|long|fill|true|match)?/i);
  if (addMatch) {
    const count = parseInt(addMatch[1]) || 5;
    const typeHint = addMatch[3] || "";
    const type = typeHint.toLowerCase().includes("mcq") ? "MCQ"
      : typeHint.toLowerCase().includes("short") ? "Short Answer"
      : typeHint.toLowerCase().includes("long") ? "Long Answer"
      : typeHint.toLowerCase().includes("fill") ? "Fill in the Blanks"
      : typeHint.toLowerCase().includes("true") ? "True/False"
      : "Short Answer";
    const dist = [{ type, count, marksEach: type === "MCQ" ? 1 : type === "Long Answer" ? 5 : 2 }];
    const newQs = generateQuestionsFromTopics(topics, form.subject, form.class, form.board, dist) as Question[];
    return {
      text: `Added ${newQs.length} ${type} question${newQs.length > 1 ? "s" : ""}. Total is now ${currentQs.length + newQs.length} questions. You can keep refining!`,
      questions: [...currentQs, ...newQs],
    };
  }

  // Remove a question by number
  const removeMatch = msg.match(/remove\s+(?:q(?:uestion)?\s*)?(\d+)/i);
  if (removeMatch) {
    const idx = parseInt(removeMatch[1]) - 1;
    if (idx >= 0 && idx < currentQs.length) {
      const updated = currentQs.filter((_, i) => i !== idx);
      return { text: `Removed question ${idx + 1}. ${updated.length} questions remaining.`, questions: updated };
    }
    return { text: `Question ${removeMatch[1]} not found. There are ${currentQs.length} questions total.` };
  }

  // Make harder / easier
  if (msg.includes("hard") || msg.includes("difficult")) {
    const updated = currentQs.map(q => ({ ...q, difficulty: "Hard" as const }));
    return { text: "Set all questions to Hard difficulty. You can also ask me to make specific questions harder.", questions: updated };
  }
  if (msg.includes("easy") || msg.includes("simpl")) {
    const updated = currentQs.map(q => ({ ...q, difficulty: "Easy" as const }));
    return { text: "Set all questions to Easy difficulty. Suitable for younger classes or basic tests.", questions: updated };
  }

  // Change marks
  const marksMatch = msg.match(/(?:change|set|make)\s+(?:mcq|short|long)?\s*marks?\s+(?:to\s+)?(\d+)/i);
  if (marksMatch) {
    const marks = parseInt(marksMatch[1]);
    const typeHint = msg.includes("mcq") ? "MCQ" : msg.includes("short") ? "Short Answer" : msg.includes("long") ? "Long Answer" : null;
    const updated = currentQs.map(q => (!typeHint || q.type === typeHint) ? { ...q, marks } : q);
    return {
      text: `Updated marks to ${marks} for ${typeHint || "all"} questions. New total: ${updated.reduce((s, q) => s + q.marks, 0)} marks.`,
      questions: updated,
    };
  }

  // Regenerate all
  if (msg.includes("regenerate") || msg.includes("redo") || msg.includes("start over") || msg.includes("new set")) {
    const dist = [
      { type: "MCQ", count: 10, marksEach: 1 },
      { type: "Short Answer", count: 5, marksEach: 2 },
      { type: "Long Answer", count: 3, marksEach: 5 },
    ];
    const newQs = generateQuestionsFromTopics(topics, form.subject, form.class, form.board, dist) as Question[];
    return { text: `Regenerated a fresh set of ${newQs.length} questions. Let me know what changes you'd like!`, questions: newQs };
  }

  // Topic-specific questions
  const topicMatch = msg.match(/(?:add|generate|create|give)\s+(?:\d+\s+)?(?:questions?\s+)?(?:on|about|from)\s+(.+)/i);
  if (topicMatch) {
    const topic = topicMatch[1].trim();
    const dist = [{ type: "Short Answer", count: 3, marksEach: 2 }];
    const newQs = (generateQuestionsFromTopics([topic], form.subject, form.class, form.board, dist) as Question[]).map(q => ({ ...q, topic }));
    return {
      text: `Added 3 questions on "${topic}". Total: ${currentQs.length + newQs.length} questions.`,
      questions: [...currentQs, ...newQs],
    };
  }

  // Show count / summary
  if (msg.includes("how many") || msg.includes("summary") || msg.includes("total")) {
    const byType = currentQs.reduce((acc, q) => { acc[q.type] = (acc[q.type] || 0) + 1; return acc; }, {} as Record<string, number>);
    const summary = Object.entries(byType).map(([t, c]) => `${c} ${t}`).join(", ");
    return { text: `Current paper has ${currentQs.length} questions: ${summary}. Total marks: ${currentQs.reduce((s, q) => s + q.marks, 0)}.` };
  }

  // Default
  const suggestions = [
    "Try: \"Add 5 more MCQ questions\"",
    "Try: \"Make all questions Hard\"",
    "Try: \"Add 3 questions on Pythagoras theorem\"",
    "Try: \"Remove question 2\"",
    "Try: \"Change MCQ marks to 2\"",
    "Try: \"Regenerate all questions\"",
  ];
  return {
    text: `I can help you refine the paper! Here are some things you can ask:\n\n${suggestions.join("\n")}`,
  };
}

export default function CreatePaperPage() {
  const router = useRouter();
  const { user, addPaper, customTemplates, language, setLanguage } = useAppStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);

  // Step 1
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [customChapters, setCustomChapters] = useState<string[]>([]);
  const [newChapter, setNewChapter] = useState("");
  // Textbook mode
  const [selectedTextbookId, setSelectedTextbookId] = useState<string | null>(null);
  const [tbChapters, setTbChapters] = useState<string[]>([]);
  const [teacherNotes, setTeacherNotes] = useState("");

  // Step 3 - Template
  const [selectedTemplate, setSelectedTemplate] = useState<PaperTemplate>(TEMPLATES[1]);

  // Step 4 - AI Chat
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);

  // Step 5 - Review
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // ── Helpers ──────────────────────────────────────────────────
  const syllabus = getSyllabus(form.board, form.class, form.subject);

  // Textbooks: show all NCERT books for this class+subject regardless of board
  const textbooks = TEXTBOOK_DB.filter(b => b.class === form.class && b.subject === form.subject);
  const selectedTextbook = textbooks.find(b => b.id === selectedTextbookId) || textbooks[0] || null;

  const autoSelectChapters = () => {
    if (!syllabus) return;
    const nums = syllabus.examMapping[form.examType as keyof typeof syllabus.examMapping] || [];
    const ids = syllabus.chapters.filter(c => nums.includes(c.number)).map(c => c.id);
    setSelectedChapters(ids);
  };

  const getSelectedTopics = (): string[] => {
    const topics: string[] = [];
    if (sourceMode === "predefined" && syllabus) {
      syllabus.chapters.filter(c => selectedChapters.includes(c.id)).forEach(c => topics.push(...c.topics));
    } else if (sourceMode === "textbook" && selectedTextbook) {
      selectedTextbook.chapters.filter(c => tbChapters.includes(String(c.number))).forEach(c => topics.push(...c.topics));
      teacherNotes.split("\n").map(t => t.trim()).filter(Boolean).forEach(t => topics.push(t));
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
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      // Simulate OCR extraction
      setTimeout(() => {
        setUploadedText(`Chapter 1: Real Numbers\nEuclid's Division Lemma\nFundamental Theorem of Arithmetic\n\nChapter 2: Polynomials\nZeros of Polynomials\nDivision Algorithm\n\nChapter 3: Linear Equations\nSubstitution Method\nElimination Method`);
      }, 800);
    } else {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedText((ev.target?.result as string || "").slice(0, 3000));
      reader.readAsText(file);
    }
  };

  // Initial AI paper generation when entering Step 4
  const initChat = async () => {
    if (chatMsgs.length > 0) return;
    setChatLoading(true);
    const dist = selectedTemplate.distribution.map(d => ({ type: d.type, count: d.attempt ?? d.count, marksEach: d.marksEach }));
    const topics = getSelectedTopics();
    await new Promise(r => setTimeout(r, 800));
    const qs = generateQuestionsFromTopics(topics, form.subject, form.class, form.board, dist) as Question[];
    setGeneratedQuestions(qs);
    const summary = selectedTemplate.distribution.map(d => `${d.count} ${d.type}`).join(", ");
    setChatMsgs([{
      role: "assistant",
      text: `I've generated **${qs.length} questions** for ${form.board} Class ${form.class} ${form.subject} (${form.examType}).\n\nDistribution: ${summary}\nTotal marks: ${qs.reduce((s, q) => s + q.marks, 0)}\n\nYou can now ask me to:\n• "Add 5 more MCQ questions"\n• "Add questions on [specific topic]"\n• "Make all questions Hard"\n• "Remove question 3"\n• "Change Long Answer marks to 6"\n• "Regenerate all questions"`,
      questions: qs,
    }]);
    setChatLoading(false);
  };

  useEffect(() => {
    if (step === 3) initChat();
  }, [step]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMsgs]);

  const sendChat = async () => {
    const msg = chatInput.trim();
    if (!msg || chatLoading) return;
    setChatInput("");
    setChatMsgs(prev => [...prev, { role: "user", text: msg }]);
    setChatLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const topics = getSelectedTopics();
    const reply = aiReply(msg, generatedQuestions, form, topics);
    if (reply.questions) setGeneratedQuestions(reply.questions);
    setChatMsgs(prev => [...prev, { role: "assistant", text: reply.text, questions: reply.questions }]);
    setChatLoading(false);
  };

  const removeQuestion = (idx: number) => setGeneratedQuestions(prev => prev.filter((_, i) => i !== idx));
  const startEdit = (idx: number) => { setEditingIdx(idx); setEditText(generatedQuestions[idx].text); };
  const saveEdit = () => {
    if (editingIdx === null) return;
    setGeneratedQuestions(prev => prev.map((q, i) => i === editingIdx ? { ...q, text: editText } : q));
    setEditingIdx(null);
  };
  const addBlankQuestion = () => setGeneratedQuestions(prev => [...prev, {
    id: "custom_" + Date.now(), text: "New question — click Edit to modify",
    type: "Short Answer", difficulty: "Medium", marks: 2,
    topic: "Custom", subject: form.subject, board: form.board, class: form.class,
  }]);

  const finalize = (publish = false) => {
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
      status: publish ? "published" as const : "draft" as const,
    };
    addPaper(paper);
    router.push("/dashboard/papers");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header with language switcher */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Question Paper</h1>
          <p className="text-gray-500 mt-0.5 text-sm">Step {step + 1} of {STEPS.length}: <span className="font-medium text-indigo-600">{STEPS[step]}</span></p>
        </div>
        {/* Prominent language switcher */}
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2">
          <Globe className="w-4 h-4 text-indigo-600 shrink-0" />
          <select value={language} onChange={e => setLanguage(e.target.value as Parameters<typeof setLanguage>[0])}
            className="text-sm font-medium text-indigo-700 bg-transparent border-none outline-none cursor-pointer pr-1">
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.native} ({l.name})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-1">
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
            <h2 className="font-bold text-gray-900 mb-1">Choose Content Source</h2>
            <p className="text-gray-500 text-sm mb-4">Select where to get syllabus content from for AI question generation.</p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
              {[
                { mode: "predefined" as SourceMode, icon: BookOpen, label: "Pre-defined Syllabus", desc: "CBSE/ICSE chapters" },
                { mode: "textbook" as SourceMode, icon: Library, label: "Textbook Database", desc: "NCERT & state books" },
                { mode: "manual" as SourceMode, icon: PenLine, label: "Type Topics", desc: "Enter your own" },
                { mode: "upload" as SourceMode, icon: Upload, label: "Upload PDF / Doc", desc: "Notes or textbook" },
                { mode: "scan" as SourceMode, icon: Camera, label: "Scan / Take Photo", desc: "Camera or image" },
              ].map(({ mode, icon: Icon, label, desc }) => (
                <button key={mode} onClick={() => setSourceMode(mode)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-center transition ${sourceMode === mode ? "border-indigo-600 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${sourceMode === mode ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="font-semibold text-xs text-gray-900 leading-tight">{label}</div>
                  <div className="text-xs text-gray-400 leading-tight">{desc}</div>
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
                        <Zap className="w-3 h-3" /> Auto-select for {form.examType}
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto">
                      {syllabus.chapters.map(ch => (
                        <button key={ch.id} onClick={() => setSelectedChapters(prev => prev.includes(ch.id) ? prev.filter(x => x !== ch.id) : [...prev, ch.id])}
                          className={`text-left p-3 rounded-xl border transition ${selectedChapters.includes(ch.id) ? "border-indigo-400 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"}`}>
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${selectedChapters.includes(ch.id) ? "bg-indigo-600" : "bg-gray-200"}`}>
                              {selectedChapters.includes(ch.id) && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-gray-400">Ch {ch.number}</div>
                              <div className="text-sm font-medium text-gray-900">{ch.name}</div>
                            </div>
                          </div>
                          <div className="mt-1.5 flex flex-wrap gap-1 ml-7">
                            {ch.topics.slice(0, 3).map(t => (
                              <span key={t} className="text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">{t}</span>
                            ))}
                            {ch.topics.length > 3 && <span className="text-xs text-gray-400">+{ch.topics.length - 3}</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{selectedChapters.length} chapter{selectedChapters.length !== 1 ? "s" : ""} selected · {syllabus.chapters.filter(c => selectedChapters.includes(c.id)).flatMap(c => c.topics).length} topics</p>
                  </div>
                ) : (
                  <div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                      <div className="flex items-center gap-2 text-amber-700 font-medium text-sm mb-1">
                        <AlertCircle className="w-4 h-4" /> No pre-defined syllabus for {form.board} Class {form.class} {form.subject}
                      </div>
                      <p className="text-amber-600 text-xs">Upload your syllabus below, or switch to Textbook Database / Type Topics.</p>
                    </div>
                    {/* Fallback: upload syllabus for unsupported boards */}
                    <div className="border-2 border-dashed border-gray-200 hover:border-indigo-300 rounded-xl p-6 text-center cursor-pointer transition"
                      onClick={() => fileInputRef.current?.click()}>
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <div className="text-sm font-medium text-gray-600">Upload your syllabus PDF / Word / Text file</div>
                      <div className="text-xs text-gray-400 mt-1">We'll extract chapters and topics automatically</div>
                      <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleFileUpload} />
                    </div>
                    {uploadedFile && (
                      <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> {uploadedFile} uploaded — topics extracted
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Textbook Database */}
            {sourceMode === "textbook" && (
              <div className="space-y-4">
                {textbooks.length === 0 ? (
                  <div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-sm text-amber-700">
                      <AlertCircle className="w-4 h-4 inline mr-1.5" />
                      No NCERT textbook found for Class {form.class} {form.subject} yet. Upload your own textbook below.
                    </div>
                    <div className="border-2 border-dashed border-gray-200 hover:border-indigo-300 rounded-xl p-6 text-center cursor-pointer transition"
                      onClick={() => fileInputRef.current?.click()}>
                      <Library className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <div className="text-sm font-medium text-gray-600">Upload Textbook PDF / Document</div>
                      <div className="text-xs text-gray-400 mt-1">We'll extract chapters and topics for AI generation</div>
                      <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleFileUpload} />
                    </div>
                    {uploadedFile && (
                      <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> {uploadedFile} uploaded
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-2">Step 1 — Select Textbook</div>
                      <div className="space-y-2">
                        {textbooks.map(book => (
                          <button key={book.id} onClick={() => { setSelectedTextbookId(book.id); setTbChapters([]); }}
                            className={`w-full text-left p-3 rounded-xl border-2 transition ${(selectedTextbookId === book.id || (!selectedTextbookId && book === textbooks[0])) ? "border-indigo-400 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"}`}>
                            <div className="font-semibold text-gray-900 text-sm">{book.title}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{book.publisher} · {book.chapters.length} chapters</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    {selectedTextbook && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs font-bold text-indigo-700 uppercase tracking-wide">Step 2 — Select Chapters</div>
                          <div className="flex gap-2 text-xs">
                            <button onClick={() => setTbChapters(selectedTextbook.chapters.map(c => String(c.number)))} className="text-indigo-600 hover:underline">All</button>
                            <span className="text-gray-300">|</span>
                            <button onClick={() => setTbChapters([])} className="text-gray-400 hover:underline">Clear</button>
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                          {selectedTextbook.chapters.map(ch => (
                            <button key={ch.number} onClick={() => setTbChapters(prev => prev.includes(String(ch.number)) ? prev.filter(x => x !== String(ch.number)) : [...prev, String(ch.number)])}
                              className={`text-left p-3 rounded-xl border transition ${tbChapters.includes(String(ch.number)) ? "border-indigo-400 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"}`}>
                              <div className="flex items-center gap-2">
                                <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${tbChapters.includes(String(ch.number)) ? "bg-indigo-600" : "bg-gray-200"}`}>
                                  {tbChapters.includes(String(ch.number)) && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-gray-400">Ch {ch.number}</div>
                                  <div className="text-sm font-medium text-gray-900">{ch.title}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">{tbChapters.length} chapter{tbChapters.length !== 1 ? "s" : ""} selected</p>
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-bold text-indigo-700 uppercase tracking-wide mb-1">Step 3 — Your Notes / Extra Topics (Optional)</div>
                      <textarea value={teacherNotes} onChange={e => setTeacherNotes(e.target.value)} rows={3}
                        placeholder={"Add extra topics or your own questions here, one per line.\nE.g: Include word problems on LCM/HCF"}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none" />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Manual */}
            {sourceMode === "manual" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type chapter names or topics</label>
                  <p className="text-xs text-gray-400 mb-2">One per line. E.g: "Real Numbers", "Polynomials"</p>
                  <textarea value={manualTopics} onChange={e => setManualTopics(e.target.value)} rows={6}
                    placeholder={"Real Numbers\nPolynomials\nPair of Linear Equations\nQuadratic Equations\nArithmetic Progressions"}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Or add chapters as chips</label>
                  <div className="flex gap-2">
                    <input value={newChapter} onChange={e => setNewChapter(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter" && newChapter.trim()) { setCustomChapters(p => [...p, newChapter.trim()]); setNewChapter(""); }}}
                      placeholder="Type chapter name and press Enter"
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                    <button onClick={() => { if (newChapter.trim()) { setCustomChapters(p => [...p, newChapter.trim()]); setNewChapter(""); }}}
                      className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition">Add</button>
                  </div>
                  {customChapters.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {customChapters.map((c, i) => (
                        <span key={i} className="flex items-center gap-1.5 bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full">
                          {c}
                          <button onClick={() => setCustomChapters(p => p.filter((_, j) => j !== i))}><X className="w-3 h-3 hover:text-red-500" /></button>
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
                <div onClick={() => fileInputRef.current?.click()}
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
                    <div className="text-xs font-medium text-gray-500 mb-1">Extracted content — edit if needed:</div>
                    <textarea value={uploadedText} onChange={e => setUploadedText(e.target.value)} rows={5}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono" />
                  </div>
                )}
                {!uploadedFile && (
                  <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
                    <strong>Tip:</strong> Upload your school textbook PDF, printed notes, or any document with the syllabus.
                  </div>
                )}
              </div>
            )}

            {/* Scan / Camera */}
            {sourceMode === "scan" && (
              <div>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  {/* Take Photo button — opens camera directly on mobile */}
                  <button onClick={() => cameraInputRef.current?.click()}
                    className="flex flex-col items-center gap-3 p-6 border-2 border-indigo-300 bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition cursor-pointer">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center">
                      <Camera className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Take a Photo</div>
                      <div className="text-xs text-gray-500 mt-0.5">Opens camera on mobile</div>
                    </div>
                    <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} />
                  </button>

                  {/* Upload from gallery */}
                  <button onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 hover:border-indigo-300 rounded-2xl transition cursor-pointer">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <Upload className="w-7 h-7 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">Upload Image</div>
                      <div className="text-xs text-gray-500 mt-0.5">JPG, PNG from gallery</div>
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </button>
                </div>

                {imagePreview && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-gray-200">
                    <img src={imagePreview} alt="Uploaded" className="w-full max-h-48 object-cover" />
                  </div>
                )}

                {uploadedFile && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-green-700 font-medium text-sm mb-2">
                      <CheckCircle className="w-4 h-4" /> {uploadedFile} — OCR processing complete
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Text extracted from image. Edit below if needed:</p>
                    <textarea value={uploadedText} onChange={e => setUploadedText(e.target.value)} rows={5}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono" />
                  </div>
                )}

                {!uploadedFile && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
                    <strong>Tip:</strong> Take a clear photo of your printed syllabus, textbook index, or handwritten notes. AT Tool OCR will extract the content.
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

        {/* ── STEP 4: AI Chat ── */}
        {step === 3 && (
          <div className="flex flex-col h-[520px]">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-sm">AI Paper Assistant</h2>
                <p className="text-xs text-gray-400">Chat to refine your question paper — add questions, change marks, adjust difficulty</p>
              </div>
              <div className="ml-auto text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">
                {generatedQuestions.length} questions · {generatedQuestions.reduce((s, q) => s + q.marks, 0)}M
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3">
              {chatLoading && chatMsgs.length === 0 && (
                <div className="flex items-center gap-2 text-indigo-600 text-sm animate-pulse p-3">
                  <Sparkles className="w-4 h-4" /> Generating your paper…
                </div>
              )}
              {chatMsgs.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-indigo-100" : "bg-gray-200"}`}>
                    {msg.role === "assistant" ? <Bot className="w-4 h-4 text-indigo-600" /> : <UserIcon className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === "assistant" ? "bg-indigo-50 text-gray-800" : "bg-gray-900 text-white"}`}>
                    {msg.text.split("\n").map((line, j) => (
                      <p key={j} className={j > 0 ? "mt-1" : ""}>{line.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
                    ))}
                    {msg.questions && (
                      <div className="mt-2 text-xs text-indigo-600 font-medium">
                        ✓ {msg.questions.length} questions · {msg.questions.reduce((s, q) => s + q.marks, 0)} marks
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {chatLoading && chatMsgs.length > 0 && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="bg-indigo-50 rounded-2xl px-4 py-2.5">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggestion chips */}
            <div className="flex gap-2 flex-wrap mb-2">
              {["Add 5 MCQ", "Make questions harder", "Add questions on last chapter", "Show summary", "Regenerate all"].map(s => (
                <button key={s} onClick={() => { setChatInput(s); }}
                  className="text-xs bg-gray-100 hover:bg-indigo-100 hover:text-indigo-700 text-gray-600 px-3 py-1.5 rounded-full transition">
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat()}
                placeholder='Ask AI: "Add 5 MCQ on Chapter 3" or "Make all questions Medium difficulty"…'
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              <button onClick={sendChat} disabled={chatLoading || !chatInput.trim()}
                className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </div>
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
                        <button onClick={() => setEditingIdx(null)} className="text-xs text-gray-500 px-3 py-1.5 border border-gray-200 rounded-lg">Cancel</button>
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
                No questions yet. Go back to Step 4 and chat with AI.
              </div>
            )}

            <div className="mt-5 flex gap-3 flex-wrap">
              <button onClick={() => finalize(false)}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold px-5 py-2.5 rounded-xl transition">
                <FileText className="w-4 h-4" /> Save as Draft
              </button>
              <button onClick={() => finalize(true)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2.5 rounded-xl transition">
                <CheckCircle className="w-4 h-4" /> Publish Paper
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
          className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl disabled:opacity-40 hover:border-gray-300 transition">
          Back
        </button>
        {step < STEPS.length - 1 && (
          <button onClick={() => setStep(step + 1)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
