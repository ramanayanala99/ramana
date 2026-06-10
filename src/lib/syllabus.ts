export interface Chapter {
  id: string;
  number: number;
  name: string;
  topics: string[];
}

export interface SubjectSyllabus {
  board: string;
  class: string;
  subject: string;
  chapters: Chapter[];
  examMapping: {
    "Unit Test": number[];        // chapter numbers
    "Quarterly Exam": number[];
    "Half-Yearly Exam": number[];
    "Annual Exam": number[];
  };
}

export const SYLLABUS_DB: SubjectSyllabus[] = [
  {
    board: "CBSE", class: "10", subject: "Mathematics",
    chapters: [
      { id:"c1", number:1, name:"Real Numbers", topics:["Euclid's Division Lemma","Fundamental Theorem of Arithmetic","Irrational Numbers","Decimal Expansions"] },
      { id:"c2", number:2, name:"Polynomials", topics:["Zeros of Polynomials","Relationship between Zeros and Coefficients","Division Algorithm"] },
      { id:"c3", number:3, name:"Pair of Linear Equations in Two Variables", topics:["Graphical Method","Substitution Method","Elimination Method","Cross-Multiplication"] },
      { id:"c4", number:4, name:"Quadratic Equations", topics:["Factorisation","Completing the Square","Quadratic Formula","Discriminant","Nature of Roots"] },
      { id:"c5", number:5, name:"Arithmetic Progressions", topics:["nth Term","Sum of n Terms","Applications"] },
      { id:"c6", number:6, name:"Triangles", topics:["Similar Triangles","Basic Proportionality Theorem","Pythagoras Theorem","Criteria for Similarity"] },
      { id:"c7", number:7, name:"Coordinate Geometry", topics:["Distance Formula","Section Formula","Area of Triangle","Mid-point Formula"] },
      { id:"c8", number:8, name:"Introduction to Trigonometry", topics:["Trigonometric Ratios","Trigonometric Identities","Complementary Angles"] },
      { id:"c9", number:9, name:"Some Applications of Trigonometry", topics:["Heights and Distances","Angle of Elevation","Angle of Depression"] },
      { id:"c10", number:10, name:"Circles", topics:["Tangent to a Circle","Number of Tangents from a Point","Properties of Tangents"] },
      { id:"c11", number:11, name:"Areas Related to Circles", topics:["Perimeter and Area of a Circle","Areas of Sector and Segment","Areas of Combinations"] },
      { id:"c12", number:12, name:"Surface Areas and Volumes", topics:["Surface Area of Combinations","Volume of Combinations","Frustum of a Cone"] },
      { id:"c13", number:13, name:"Statistics", topics:["Mean","Median","Mode","Cumulative Frequency","Ogive"] },
      { id:"c14", number:14, name:"Probability", topics:["Classical Probability","Events","Complementary Events"] },
    ],
    examMapping: {
      "Unit Test": [1, 2, 3],
      "Quarterly Exam": [1, 2, 3, 4, 5],
      "Half-Yearly Exam": [1, 2, 3, 4, 5, 6, 7, 8],
      "Annual Exam": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    }
  },
  {
    board: "CBSE", class: "10", subject: "Science",
    chapters: [
      { id:"s1", number:1, name:"Chemical Reactions and Equations", topics:["Chemical Equations","Types of Chemical Reactions","Corrosion","Rancidity"] },
      { id:"s2", number:2, name:"Acids, Bases and Salts", topics:["Properties of Acids and Bases","pH Scale","Salts","Water of Crystallisation"] },
      { id:"s3", number:3, name:"Metals and Non-metals", topics:["Physical Properties","Chemical Properties","Reactivity Series","Ionic Compounds"] },
      { id:"s4", number:4, name:"Carbon and its Compounds", topics:["Covalent Bonding","Versatile Nature of Carbon","Homologous Series","Nomenclature","Chemical Properties"] },
      { id:"s5", number:5, name:"Periodic Classification of Elements", topics:["Döbereiner's Triads","Newlands' Law of Octaves","Mendeleev's Periodic Table","Modern Periodic Table"] },
      { id:"s6", number:6, name:"Life Processes", topics:["Nutrition","Respiration","Transportation","Excretion"] },
      { id:"s7", number:7, name:"Control and Coordination", topics:["Nervous System","Reflex Action","Hormones","Endocrine System"] },
      { id:"s8", number:8, name:"How do Organisms Reproduce?", topics:["Asexual Reproduction","Sexual Reproduction","Reproductive Health"] },
      { id:"s9", number:9, name:"Heredity and Evolution", topics:["Heredity","Mendel's Laws","Sex Determination","Evolution","Speciation"] },
      { id:"s10", number:10, name:"Light – Reflection and Refraction", topics:["Reflection","Mirrors","Refraction","Lenses","Power of a Lens"] },
      { id:"s11", number:11, name:"Human Eye and the Colourful World", topics:["Human Eye","Defects of Vision","Refraction through Prism","Dispersion","Scattering"] },
      { id:"s12", number:12, name:"Electricity", topics:["Electric Current","Ohm's Law","Resistance","Circuit","Heating Effect"] },
      { id:"s13", number:13, name:"Magnetic Effects of Electric Current", topics:["Magnetic Field","Electromagnet","Electric Motor","Electromagnetic Induction","Generator"] },
      { id:"s14", number:14, name:"Sources of Energy", topics:["Conventional Sources","Non-Conventional Sources","Environmental Consequences"] },
      { id:"s15", number:15, name:"Our Environment", topics:["Ecosystem","Food Chain","Ozone Layer","Waste Management"] },
    ],
    examMapping: {
      "Unit Test": [1, 2, 3],
      "Quarterly Exam": [1, 2, 3, 4, 5],
      "Half-Yearly Exam": [1, 2, 3, 4, 5, 6, 7, 8],
      "Annual Exam": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    }
  },
  {
    board: "CBSE", class: "9", subject: "Mathematics",
    chapters: [
      { id:"9m1", number:1, name:"Number Systems", topics:["Irrational Numbers","Real Numbers","Representing on Number Line","Operations on Real Numbers","Laws of Exponents"] },
      { id:"9m2", number:2, name:"Polynomials", topics:["Polynomials in One Variable","Zeroes","Remainder Theorem","Factor Theorem","Algebraic Identities"] },
      { id:"9m3", number:3, name:"Coordinate Geometry", topics:["Cartesian System","Plotting Points","Quadrants"] },
      { id:"9m4", number:4, name:"Linear Equations in Two Variables", topics:["Linear Equations","Solution of Linear Equation","Graph of Linear Equation","Equations of Lines Parallel to Axes"] },
      { id:"9m5", number:5, name:"Introduction to Euclid's Geometry", topics:["Euclid's Definitions","Axioms and Postulates","Equivalent Versions of Euclid's Fifth Postulate"] },
      { id:"9m6", number:6, name:"Lines and Angles", topics:["Basic Terms","Intersecting Lines","Parallel Lines","Angle Sum Property of Triangle"] },
      { id:"9m7", number:7, name:"Triangles", topics:["Congruence of Triangles","Criteria for Congruence","Properties of Isosceles Triangle","Inequalities in Triangles"] },
      { id:"9m8", number:8, name:"Quadrilaterals", topics:["Properties of Parallelogram","Midpoint Theorem"] },
      { id:"9m9", number:9, name:"Areas of Parallelograms and Triangles", topics:["Figures on Same Base","Parallelogram on Same Base","Triangles on Same Base"] },
      { id:"9m10", number:10, name:"Circles", topics:["Circles and Related Terms","Angle Subtended by a Chord","Perpendicular from Centre","Cyclic Quadrilaterals"] },
      { id:"9m11", number:11, name:"Constructions", topics:["Basic Constructions","Construction of Triangles"] },
      { id:"9m12", number:12, name:"Heron's Formula", topics:["Area of Triangle by Heron's Formula","Application to Quadrilaterals"] },
      { id:"9m13", number:13, name:"Surface Areas and Volumes", topics:["Surface Area of Cuboid","Cylinder","Cone","Sphere","Volume"] },
      { id:"9m14", number:14, name:"Statistics", topics:["Data Collection","Bar Graph","Histogram","Frequency Polygon","Mean Median Mode"] },
      { id:"9m15", number:15, name:"Probability", topics:["Probability - An Experimental Approach"] },
    ],
    examMapping: {
      "Unit Test": [1, 2, 3],
      "Quarterly Exam": [1, 2, 3, 4, 5, 6],
      "Half-Yearly Exam": [1, 2, 3, 4, 5, 6, 7, 8, 9],
      "Annual Exam": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    }
  },
  {
    board: "CBSE", class: "9", subject: "Science",
    chapters: [
      { id:"9s1", number:1, name:"Matter in Our Surroundings", topics:["Physical Nature of Matter","Characteristics","States","Evaporation"] },
      { id:"9s2", number:2, name:"Is Matter Around Us Pure?", topics:["Mixtures","Solutions","Separation Techniques","Physical and Chemical Changes","Types of Pure Substances"] },
      { id:"9s3", number:3, name:"Atoms and Molecules", topics:["Laws of Chemical Combination","Dalton's Atomic Theory","Atomic Mass","Molecules","Ions","Writing Chemical Formulae","Mole Concept"] },
      { id:"9s4", number:4, name:"Structure of the Atom", topics:["Charged Particles","Thomson's Model","Rutherford's Model","Bohr's Model","Neutrons","Valency","Atomic Number","Mass Number","Isotopes","Isobars"] },
      { id:"9s5", number:5, name:"The Fundamental Unit of Life", topics:["Cell Structure","Plasma Membrane","Cell Wall","Nucleus","Cytoplasm","Cell Organelles"] },
      { id:"9s6", number:6, name:"Tissues", topics:["Plant Tissues","Animal Tissues"] },
      { id:"9s7", number:7, name:"Motion", topics:["Describing Motion","Measuring Rate of Motion","Rate of Change of Velocity","Graphical Representation","Equations of Motion","Uniform Circular Motion"] },
      { id:"9s8", number:8, name:"Force and Laws of Motion", topics:["Balanced and Unbalanced Forces","First Law","Inertia","Second Law","Third Law","Conservation of Momentum"] },
      { id:"9s9", number:9, name:"Gravitation", topics:["Gravitation","Universal Law","Free Fall","Mass","Weight","Thrust and Pressure","Archimedes' Principle","Relative Density"] },
      { id:"9s10", number:10, name:"Work and Energy", topics:["Work","Energy","Kinetic Energy","Potential Energy","Law of Conservation of Energy","Power"] },
      { id:"9s11", number:11, name:"Sound", topics:["Production of Sound","Propagation","Reflection","Echo","SONAR","Human Ear"] },
      { id:"9s12", number:12, name:"Improvement in Food Resources", topics:["Improvement in Crop Yields","Animal Husbandry"] },
    ],
    examMapping: {
      "Unit Test": [1, 2, 3],
      "Quarterly Exam": [1, 2, 3, 4, 5],
      "Half-Yearly Exam": [1, 2, 3, 4, 5, 6, 7, 8],
      "Annual Exam": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    }
  },
];

export function getSyllabus(board: string, cls: string, subject: string): SubjectSyllabus | null {
  return SYLLABUS_DB.find(s => s.board === board && s.class === cls && s.subject === subject) || null;
}

// AI question generation — pulls from real NCERT question bank, falls back to templates
import { searchQuestions } from "./question-bank";

const FALLBACK_TEMPLATES: Record<string, Array<(topic: string) => object>> = {
  "MCQ": [
    (t) => ({ text: `Which of the following is correct about ${t}?`, options: [`${t} always holds`, `${t} never holds`, `${t} holds under conditions`, `None of these`], answer: `${t} holds under conditions` }),
    (t) => ({ text: `The key property of ${t} is:`, options: ["Commutativity", "Associativity", "Distributivity", "All of these"], answer: "All of these" }),
  ],
  "Short Answer": [
    (t) => ({ text: `What is ${t}? Explain with an example.` }),
    (t) => ({ text: `State the main result related to ${t}.` }),
  ],
  "Long Answer": [
    (t) => ({ text: `Explain ${t} in detail with proof or derivation, and give two applications.` }),
  ],
  "Fill in the Blanks": [
    (t) => ({ text: `The result obtained using ${t} is ______.`, answer: `[value]` }),
  ],
  "True/False": [
    (t) => ({ text: `Every problem involving ${t} has a unique solution. (True/False)`, answer: "False" }),
  ],
  "Match the Following": [
    (t) => ({ text: `Match the following terms related to ${t}:\nColumn A: Term 1, Term 2, Term 3\nColumn B: Definition 1, Definition 2, Definition 3` }),
  ],
};

export function generateQuestionsFromTopics(
  topics: string[],
  subject: string,
  cls: string,
  board: string,
  distribution: Array<{ type: string; count: number; marksEach: number }>
) {
  const results: object[] = [];

  for (const { type, count, marksEach } of distribution) {
    const difficulty = marksEach <= 1 ? "Easy" : marksEach <= 3 ? "Medium" : "Hard";

    // Try real question bank first
    const bankQs = searchQuestions(topics, type, difficulty, count * 3);
    let bankIdx = 0;

    for (let i = 0; i < count; i++) {
      if (bankIdx < bankQs.length) {
        const bq = bankQs[bankIdx++];
        results.push({
          id: `gen_${Date.now()}_${Math.random().toString(36).slice(2)}`,
          type: bq.type,
          difficulty: bq.difficulty,
          marks: marksEach,
          topic: bq.topic,
          subject,
          board,
          class: cls,
          text: bq.text,
          ...(bq.options ? { options: bq.options } : {}),
          ...(bq.answer ? { answer: bq.answer } : {}),
        });
      } else {
        // Fallback: use template-based for topics not in bank
        const topic = topics[i % topics.length];
        const fns = FALLBACK_TEMPLATES[type] || FALLBACK_TEMPLATES["Short Answer"];
        const base = fns[i % fns.length](topic);
        results.push({
          id: `gen_${Date.now()}_${Math.random().toString(36).slice(2)}`,
          type,
          difficulty,
          marks: marksEach,
          topic,
          subject,
          board,
          class: cls,
          ...base,
        });
      }
    }
  }
  return results;
}
