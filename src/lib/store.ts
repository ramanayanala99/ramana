"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question, QuestionPaper, PaperTemplate, SAMPLE_QUESTIONS } from "./data";

interface User {
  id: string;
  name: string;
  email: string;
  role: "teacher" | "admin" | "superadmin";
  schoolName: string;
  schoolLogo?: string;
  boards: string[];
  subjects: string[];
  plan: "free" | "starter" | "pro";
  trialEndsAt?: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  questions: Question[];
  papers: QuestionPaper[];
  customTemplates: PaperTemplate[];
  teachers: Array<{ id: string; name: string; email: string; role: string; addedAt: string }>;

  login: (user: User) => void;
  logout: () => void;
  addPaper: (paper: QuestionPaper) => void;
  updatePaper: (id: string, updates: Partial<QuestionPaper>) => void;
  deletePaper: (id: string) => void;
  addQuestion: (q: Question) => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  addTeacher: (t: { id: string; name: string; email: string; role: string; addedAt: string }) => void;
  removeTeacher: (id: string) => void;
  addCustomTemplate: (t: PaperTemplate) => void;
  updateCustomTemplate: (id: string, updates: Partial<PaperTemplate>) => void;
  deleteCustomTemplate: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      questions: SAMPLE_QUESTIONS,
      customTemplates: [],
      papers: [
        {
          id: "p1", title: "CBSE Class 10 Math Unit Test",
          subject: "Mathematics", class: "10", board: "CBSE",
          examType: "Unit Test", totalMarks: 25, duration: 45,
          questions: SAMPLE_QUESTIONS.slice(0, 5),
          createdAt: "2026-06-01", createdBy: "demo", status: "published",
          schoolName: "Delhi Public School",
        },
        {
          id: "p2", title: "CBSE Class 9 Science Quarterly",
          subject: "Science", class: "9", board: "CBSE",
          examType: "Quarterly Exam", totalMarks: 50, duration: 90,
          questions: SAMPLE_QUESTIONS.slice(5, 9),
          createdAt: "2026-06-05", createdBy: "demo", status: "draft",
          schoolName: "Delhi Public School",
        },
      ],
      teachers: [
        { id: "t1", name: "Priya Sharma", email: "priya@dps.edu", role: "teacher", addedAt: "2026-05-10" },
        { id: "t2", name: "Raj Patel", email: "raj@dps.edu", role: "teacher", addedAt: "2026-05-15" },
        { id: "t3", name: "Sunita Verma", email: "sunita@dps.edu", role: "admin", addedAt: "2026-05-20" },
      ],

      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      addPaper: (paper) => set((s) => ({ papers: [paper, ...s.papers] })),
      updatePaper: (id, updates) => set((s) => ({
        papers: s.papers.map((p) => p.id === id ? { ...p, ...updates } : p),
      })),
      deletePaper: (id) => set((s) => ({ papers: s.papers.filter((p) => p.id !== id) })),
      addQuestion: (q) => set((s) => ({ questions: [...s.questions, q] })),
      updateQuestion: (id, updates) => set((s) => ({
        questions: s.questions.map((q) => q.id === id ? { ...q, ...updates } : q),
      })),
      addTeacher: (t) => set((s) => ({ teachers: [...s.teachers, t] })),
      removeTeacher: (id) => set((s) => ({ teachers: s.teachers.filter((t) => t.id !== id) })),
      addCustomTemplate: (t) => set((s) => ({ customTemplates: [...s.customTemplates, t] })),
      updateCustomTemplate: (id, updates) => set((s) => ({
        customTemplates: s.customTemplates.map((t) => t.id === id ? { ...t, ...updates } : t),
      })),
      deleteCustomTemplate: (id) => set((s) => ({
        customTemplates: s.customTemplates.filter((t) => t.id !== id),
      })),
    }),
    { name: "at-tool-store" }
  )
);
