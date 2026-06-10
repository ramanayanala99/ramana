export const INDIAN_BOARDS = [
  "CBSE", "ICSE", "ISC",
  "Andhra Pradesh Board", "Arunachal Pradesh Board", "Assam Board",
  "Bihar Board", "Chhattisgarh Board", "Goa Board", "Gujarat Board",
  "Haryana Board", "Himachal Pradesh Board", "Jharkhand Board",
  "Karnataka Board", "Kerala Board", "Madhya Pradesh Board",
  "Maharashtra Board", "Manipur Board", "Meghalaya Board",
  "Mizoram Board", "Nagaland Board", "Odisha Board",
  "Punjab Board", "Rajasthan Board", "Sikkim Board",
  "Tamil Nadu Board", "Telangana Board", "Tripura Board",
  "Uttar Pradesh Board", "Uttarakhand Board", "West Bengal Board",
];

export const SUBJECTS = [
  "Mathematics", "Science", "Social Science", "English", "Hindi",
  "Physics", "Chemistry", "Biology", "History", "Geography",
  "Political Science", "Economics", "Accountancy", "Business Studies",
  "Computer Science", "Sanskrit", "Physical Education", "Art & Craft",
];

export const CLASSES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export const EXAM_TYPES = ["Unit Test", "Quarterly Exam", "Half-Yearly Exam", "Annual Exam", "Practice Test"];

export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];

export const QUESTION_TYPES = ["MCQ", "Short Answer", "Long Answer", "Fill in the Blanks", "True/False", "Match the Following"];

export interface Question {
  id: string;
  text: string;
  type: string;
  difficulty: string;
  marks: number;
  topic: string;
  subject: string;
  board: string;
  class: string;
  options?: string[];
  answer?: string;
}

export interface QuestionPaper {
  id: string;
  title: string;
  subject: string;
  class: string;
  board: string;
  examType: string;
  totalMarks: number;
  duration: number;
  questions: Question[];
  createdAt: string;
  createdBy: string;
  schoolName?: string;
  schoolLogo?: string;
  status: "draft" | "published";
}

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "q1", text: "What is the value of π (pi) correct to two decimal places?",
    type: "MCQ", difficulty: "Easy", marks: 1, topic: "Number System",
    subject: "Mathematics", board: "CBSE", class: "10",
    options: ["3.14", "3.41", "3.12", "3.16"], answer: "3.14"
  },
  {
    id: "q2", text: "State the Pythagoras theorem.",
    type: "Short Answer", difficulty: "Easy", marks: 2, topic: "Triangles",
    subject: "Mathematics", board: "CBSE", class: "10", answer: "In a right-angled triangle, the square of the hypotenuse equals the sum of squares of the other two sides."
  },
  {
    id: "q3", text: "Prove that √2 is irrational.",
    type: "Long Answer", difficulty: "Hard", marks: 5, topic: "Real Numbers",
    subject: "Mathematics", board: "CBSE", class: "10"
  },
  {
    id: "q4", text: "Find the HCF and LCM of 12 and 18 using prime factorisation.",
    type: "Short Answer", difficulty: "Medium", marks: 3, topic: "Real Numbers",
    subject: "Mathematics", board: "CBSE", class: "10"
  },
  {
    id: "q5", text: "Which of the following is a quadratic equation?",
    type: "MCQ", difficulty: "Easy", marks: 1, topic: "Quadratic Equations",
    subject: "Mathematics", board: "CBSE", class: "10",
    options: ["x³ + 2x = 0", "x² + 2x + 1 = 0", "x + 1 = 0", "2x = 5"], answer: "x² + 2x + 1 = 0"
  },
  {
    id: "q6", text: "Define acceleration. State its SI unit.",
    type: "Short Answer", difficulty: "Easy", marks: 2, topic: "Motion",
    subject: "Science", board: "CBSE", class: "9"
  },
  {
    id: "q7", text: "What is Newton's second law of motion?",
    type: "Short Answer", difficulty: "Medium", marks: 3, topic: "Force and Laws of Motion",
    subject: "Science", board: "CBSE", class: "9"
  },
  {
    id: "q8", text: "The SI unit of force is ______.",
    type: "Fill in the Blanks", difficulty: "Easy", marks: 1, topic: "Force and Laws of Motion",
    subject: "Science", board: "CBSE", class: "9", answer: "Newton"
  },
  {
    id: "q9", text: "Explain the process of photosynthesis.",
    type: "Long Answer", difficulty: "Medium", marks: 5, topic: "Life Processes",
    subject: "Science", board: "CBSE", class: "10"
  },
  {
    id: "q10", text: "What are the main causes of the French Revolution?",
    type: "Long Answer", difficulty: "Hard", marks: 6, topic: "French Revolution",
    subject: "Social Science", board: "CBSE", class: "9"
  },
];

export interface TemplateRow {
  type: string;
  count: number;       // total questions given (printed on paper)
  attempt?: number;    // how many students must attempt (if different from count)
  marksEach: number;
}

export interface PaperTemplate {
  id: string;
  name: string;
  duration: number;
  totalMarks: number;
  distribution: TemplateRow[];
  isCustom?: boolean;
  board?: string;
  createdBy?: string;
}

export const TEMPLATES: PaperTemplate[] = [
  {
    id: "unit-test", name: "Unit Test", duration: 45, totalMarks: 25,
    distribution: [
      { type: "MCQ", count: 5, marksEach: 1 },
      { type: "Short Answer", count: 5, marksEach: 2 },
      { type: "Long Answer", count: 2, marksEach: 5 },
    ]
  },
  {
    id: "quarterly", name: "Quarterly Exam", duration: 90, totalMarks: 50,
    distribution: [
      { type: "MCQ", count: 10, marksEach: 1 },
      { type: "Short Answer", count: 8, marksEach: 2 },
      { type: "Long Answer", count: 4, marksEach: 5 },
    ]
  },
  {
    id: "half-yearly", name: "Half-Yearly Exam", duration: 150, totalMarks: 80,
    distribution: [
      { type: "MCQ", count: 20, marksEach: 1 },
      { type: "Short Answer", count: 10, marksEach: 2 },
      { type: "Long Answer", count: 5, marksEach: 5 },
      { type: "Fill in the Blanks", count: 5, marksEach: 1 },
    ]
  },
  {
    id: "annual", name: "Annual Exam", duration: 180, totalMarks: 100,
    distribution: [
      { type: "MCQ", count: 20, marksEach: 1 },
      { type: "Fill in the Blanks", count: 10, marksEach: 1 },
      { type: "Short Answer", count: 10, marksEach: 2 },
      { type: "Long Answer", count: 5, marksEach: 6 },
    ]
  },
];

// App version — updated to track releases
export const APP_VERSION = "1.1.0";
