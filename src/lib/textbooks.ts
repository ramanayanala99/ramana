export interface TextbookChapter {
  number: number;
  title: string;
  topics: string[];
  exercises?: number; // number of exercise sets
}

export interface Textbook {
  id: string;
  title: string;
  publisher: string; // NCERT, State Board, etc.
  board: string;
  class: string;
  subject: string;
  chapters: TextbookChapter[];
}

export const TEXTBOOK_DB: Textbook[] = [
  // ── NCERT Class 10 Mathematics ──────────────────────────────────
  {
    id: "ncert-10-math",
    title: "Mathematics — Class X",
    publisher: "NCERT",
    board: "CBSE",
    class: "10",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Real Numbers", topics: ["Euclid's Division Lemma", "Fundamental Theorem of Arithmetic", "Irrational Numbers", "Decimal Expansions"], exercises: 4 },
      { number: 2, title: "Polynomials", topics: ["Zeros of a Polynomial", "Relationship between Zeros and Coefficients", "Division Algorithm"], exercises: 4 },
      { number: 3, title: "Pair of Linear Equations in Two Variables", topics: ["Graphical Method", "Substitution Method", "Elimination Method", "Cross-Multiplication Method"], exercises: 7 },
      { number: 4, title: "Quadratic Equations", topics: ["Standard Form", "Factorisation Method", "Completing the Square", "Quadratic Formula", "Discriminant"], exercises: 4 },
      { number: 5, title: "Arithmetic Progressions", topics: ["nth Term of AP", "Sum of n Terms", "Applications"], exercises: 4 },
      { number: 6, title: "Triangles", topics: ["Similar Triangles", "Basic Proportionality Theorem", "Criteria for Similarity", "Areas of Similar Triangles", "Pythagoras Theorem"], exercises: 6 },
      { number: 7, title: "Coordinate Geometry", topics: ["Distance Formula", "Section Formula", "Midpoint Formula", "Area of Triangle"], exercises: 4 },
      { number: 8, title: "Introduction to Trigonometry", topics: ["Trigonometric Ratios", "Trigonometric Identities", "Values of T-ratios", "Complementary Angles"], exercises: 4 },
      { number: 9, title: "Some Applications of Trigonometry", topics: ["Heights and Distances", "Angle of Elevation", "Angle of Depression"], exercises: 1 },
      { number: 10, title: "Circles", topics: ["Tangent to a Circle", "Number of Tangents", "Theorems on Tangents"], exercises: 2 },
      { number: 11, title: "Areas Related to Circles", topics: ["Perimeter and Area of Circle", "Area of Sector", "Area of Segment"], exercises: 3 },
      { number: 12, title: "Surface Areas and Volumes", topics: ["Combination of Solids", "Conversion of Solids", "Frustum of a Cone"], exercises: 5 },
      { number: 13, title: "Statistics", topics: ["Mean", "Median", "Mode", "Cumulative Frequency", "Ogive"], exercises: 4 },
      { number: 14, title: "Probability", topics: ["Classical Definition", "Simple Problems", "Complementary Events"], exercises: 2 },
    ],
  },

  // ── NCERT Class 10 Science ──────────────────────────────────────
  {
    id: "ncert-10-science",
    title: "Science — Class X",
    publisher: "NCERT",
    board: "CBSE",
    class: "10",
    subject: "Science",
    chapters: [
      { number: 1, title: "Chemical Reactions and Equations", topics: ["Chemical Equations", "Types of Reactions", "Oxidation and Reduction", "Corrosion", "Rancidity"], exercises: 1 },
      { number: 2, title: "Acids, Bases and Salts", topics: ["Properties of Acids and Bases", "pH Scale", "Salts", "Baking Soda", "Bleaching Powder"], exercises: 1 },
      { number: 3, title: "Metals and Non-metals", topics: ["Physical Properties", "Chemical Properties", "Reactivity Series", "Extraction of Metals", "Corrosion"], exercises: 1 },
      { number: 4, title: "Carbon and its Compounds", topics: ["Covalent Bonds", "Allotropes of Carbon", "Hydrocarbons", "Functional Groups", "Soaps and Detergents"], exercises: 1 },
      { number: 5, title: "Life Processes", topics: ["Nutrition", "Respiration", "Transportation", "Excretion", "Photosynthesis"], exercises: 1 },
      { number: 6, title: "Control and Coordination", topics: ["Nervous System", "Reflex Action", "Human Brain", "Hormones", "Endocrine Glands"], exercises: 1 },
      { number: 7, title: "How do Organisms Reproduce?", topics: ["Asexual Reproduction", "Sexual Reproduction", "Human Reproductive System", "Contraception"], exercises: 1 },
      { number: 8, title: "Heredity", topics: ["Mendel's Laws", "Traits and Inheritance", "Sex Determination", "Variation"], exercises: 1 },
      { number: 9, title: "Light — Reflection and Refraction", topics: ["Reflection", "Spherical Mirrors", "Refraction", "Lenses", "Mirror Formula", "Lens Formula"], exercises: 1 },
      { number: 10, title: "Human Eye and the Colourful World", topics: ["Human Eye", "Defects of Vision", "Prism and Dispersion", "Atmospheric Refraction", "Scattering"], exercises: 1 },
      { number: 11, title: "Electricity", topics: ["Electric Current", "Ohm's Law", "Resistance", "Series and Parallel Circuits", "Heating Effect", "Power"], exercises: 1 },
      { number: 12, title: "Magnetic Effects of Electric Current", topics: ["Magnetic Field", "Fleming's Rules", "Electric Motor", "Electromagnetic Induction", "Generator", "AC/DC"], exercises: 1 },
      { number: 13, title: "Our Environment", topics: ["Ecosystem", "Food Chain", "Food Web", "Ozone Layer", "Waste Management"], exercises: 1 },
    ],
  },

  // ── NCERT Class 9 Mathematics ───────────────────────────────────
  {
    id: "ncert-9-math",
    title: "Mathematics — Class IX",
    publisher: "NCERT",
    board: "CBSE",
    class: "9",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Number Systems", topics: ["Irrational Numbers", "Real Numbers", "Representing Real Numbers on Number Line", "Operations on Real Numbers", "Laws of Exponents"], exercises: 6 },
      { number: 2, title: "Polynomials", topics: ["Polynomials in One Variable", "Zeroes of a Polynomial", "Remainder Theorem", "Factor Theorem", "Algebraic Identities"], exercises: 5 },
      { number: 3, title: "Coordinate Geometry", topics: ["Cartesian System", "Plotting Points", "Quadrants", "Distance between Points"], exercises: 3 },
      { number: 4, title: "Linear Equations in Two Variables", topics: ["Equation of Line", "Solution of Linear Equation", "Graph of Linear Equation"], exercises: 4 },
      { number: 5, title: "Introduction to Euclid's Geometry", topics: ["Euclid's Definitions", "Euclid's Axioms", "Euclid's Postulates", "Equivalent Versions"], exercises: 2 },
      { number: 6, title: "Lines and Angles", topics: ["Basic Terms", "Intersecting Lines", "Parallel Lines", "Angle Sum Property"], exercises: 3 },
      { number: 7, title: "Triangles", topics: ["Congruence of Triangles", "Criteria for Congruence (SSS, SAS, ASA, RHS)", "Inequalities in a Triangle"], exercises: 5 },
      { number: 8, title: "Quadrilaterals", topics: ["Properties of Parallelogram", "Conditions for Parallelogram", "Mid-Point Theorem"], exercises: 2 },
      { number: 9, title: "Circles", topics: ["Circles and Terms", "Angle Subtended", "Perpendicular from Centre", "Cyclic Quadrilateral"], exercises: 6 },
      { number: 10, title: "Heron's Formula", topics: ["Area of Triangle", "Heron's Formula", "Application to Quadrilaterals"], exercises: 2 },
      { number: 11, title: "Surface Areas and Volumes", topics: ["Cuboid", "Cube", "Cylinder", "Cone", "Sphere", "Hemisphere"], exercises: 7 },
      { number: 12, title: "Statistics", topics: ["Collection of Data", "Presentation of Data", "Bar Graphs", "Histograms", "Frequency Polygons", "Mean", "Median", "Mode"], exercises: 4 },
    ],
  },

  // ── NCERT Class 9 Science ───────────────────────────────────────
  {
    id: "ncert-9-science",
    title: "Science — Class IX",
    publisher: "NCERT",
    board: "CBSE",
    class: "9",
    subject: "Science",
    chapters: [
      { number: 1, title: "Matter in Our Surroundings", topics: ["Physical Nature of Matter", "Characteristics of Particles", "States of Matter", "Evaporation"], exercises: 1 },
      { number: 2, title: "Is Matter Around Us Pure?", topics: ["Mixtures", "Solutions", "Separating Mixtures", "Physical and Chemical Changes", "Types of Pure Substances"], exercises: 1 },
      { number: 3, title: "Atoms and Molecules", topics: ["Laws of Chemical Combination", "Dalton's Atomic Theory", "Atomic Mass", "Molecules", "Mole Concept"], exercises: 1 },
      { number: 4, title: "Structure of the Atom", topics: ["Charged Particles", "Thomson Model", "Rutherford Model", "Bohr Model", "Valency", "Atomic Number", "Mass Number", "Isotopes"], exercises: 1 },
      { number: 5, title: "The Fundamental Unit of Life", topics: ["Cell Theory", "Cell Structure", "Prokaryote vs Eukaryote", "Cell Organelles", "Cell Membrane"], exercises: 1 },
      { number: 6, title: "Tissues", topics: ["Plant Tissues", "Animal Tissues", "Meristematic Tissue", "Permanent Tissue", "Epithelial Tissue", "Muscular Tissue", "Nervous Tissue"], exercises: 1 },
      { number: 7, title: "Motion", topics: ["Describing Motion", "Uniform and Non-uniform Motion", "Distance and Displacement", "Speed and Velocity", "Acceleration", "Equations of Motion", "Graphs"], exercises: 1 },
      { number: 8, title: "Force and Laws of Motion", topics: ["Balanced and Unbalanced Forces", "Newton's Laws of Motion", "Inertia", "Momentum", "Conservation of Momentum"], exercises: 1 },
      { number: 9, title: "Gravitation", topics: ["Universal Law of Gravitation", "Free Fall", "Mass and Weight", "Thrust and Pressure", "Archimedes' Principle", "Buoyancy"], exercises: 1 },
      { number: 10, title: "Work and Energy", topics: ["Work done by a Force", "Energy", "Kinetic Energy", "Potential Energy", "Conservation of Energy", "Power"], exercises: 1 },
      { number: 11, title: "Sound", topics: ["Sound Production", "Sound Propagation", "Reflection of Sound", "Echo", "Range of Hearing", "Applications"], exercises: 1 },
      { number: 12, title: "Improvement in Food Resources", topics: ["Improvement in Crop Yields", "Manure and Fertilizers", "Irrigation", "Animal Husbandry", "Poultry Farming", "Fish Production"], exercises: 1 },
    ],
  },

  // ── NCERT Class 8 Mathematics ───────────────────────────────────
  {
    id: "ncert-8-math",
    title: "Mathematics — Class VIII",
    publisher: "NCERT",
    board: "CBSE",
    class: "8",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Rational Numbers", topics: ["Properties of Rational Numbers", "Representation on Number Line", "Rational Numbers between two Rational Numbers"] },
      { number: 2, title: "Linear Equations in One Variable", topics: ["Equations with Linear Expressions", "Equations Reducible to Linear Form", "Applications"] },
      { number: 3, title: "Understanding Quadrilaterals", topics: ["Polygons", "Parallelograms", "Rhombus", "Rectangle", "Square", "Trapezium", "Kite"] },
      { number: 4, title: "Practical Geometry", topics: ["Constructing Quadrilaterals", "Special Cases"] },
      { number: 5, title: "Data Handling", topics: ["Organizing Data", "Grouping Data", "Circle Graphs / Pie Charts", "Chance and Probability"] },
      { number: 6, title: "Squares and Square Roots", topics: ["Properties of Square Numbers", "Finding Square Roots", "Square Roots of Decimals", "Estimating Square Root"] },
      { number: 7, title: "Cubes and Cube Roots", topics: ["Cubes", "Cube Roots", "Pattern in Cubes"] },
      { number: 8, title: "Comparing Quantities", topics: ["Ratios and Percentages", "Profit/Loss", "Simple and Compound Interest", "Sales Tax", "Discount"] },
      { number: 9, title: "Algebraic Expressions and Identities", topics: ["Terms, Factors and Coefficients", "Multiplication of Algebraic Expressions", "Standard Identities"] },
      { number: 10, title: "Mensuration", topics: ["Area of Trapezium and General Quadrilateral", "Area of Polygon", "Surface Area of Cube and Cuboid", "Volume"] },
      { number: 11, title: "Exponents and Powers", topics: ["Powers with Negative Exponents", "Laws of Exponents", "Standard Form"] },
      { number: 12, title: "Factorisation", topics: ["Common Factors", "Factorisation by Regrouping", "Factorisation using Identities", "Division of Algebraic Expressions"] },
      { number: 13, title: "Introduction to Graphs", topics: ["Bar Graphs", "Linear Graphs", "Applications of Graphs"] },
      { number: 14, title: "Playing with Numbers", topics: ["Numbers in General Form", "Divisibility Rules", "Cryptarithmetic"] },
    ],
  },

  // ── NCERT Class 12 Mathematics ──────────────────────────────────
  {
    id: "ncert-12-math",
    title: "Mathematics — Class XII (Part I & II)",
    publisher: "NCERT",
    board: "CBSE",
    class: "12",
    subject: "Mathematics",
    chapters: [
      { number: 1, title: "Relations and Functions", topics: ["Types of Relations", "Types of Functions", "Composition of Functions", "Invertible Functions", "Binary Operations"] },
      { number: 2, title: "Inverse Trigonometric Functions", topics: ["Basic Concepts", "Properties", "Graphs"] },
      { number: 3, title: "Matrices", topics: ["Types of Matrices", "Operations on Matrices", "Transpose", "Symmetric and Skew-Symmetric Matrices", "Elementary Operations", "Invertible Matrices"] },
      { number: 4, title: "Determinants", topics: ["Determinant of a Square Matrix", "Properties of Determinants", "Adjoint and Inverse", "Applications (Area, Equations)"] },
      { number: 5, title: "Continuity and Differentiability", topics: ["Continuity", "Differentiability", "Chain Rule", "Derivatives of Inverse Trig", "Implicit Differentiation", "Logarithmic Differentiation", "Mean Value Theorems"] },
      { number: 6, title: "Application of Derivatives", topics: ["Rate of Change", "Increasing/Decreasing Functions", "Tangents and Normals", "Approximations", "Maxima and Minima"] },
      { number: 7, title: "Integrals", topics: ["Integration as Inverse of Differentiation", "Methods of Integration", "Definite Integrals", "Fundamental Theorem", "Properties of Definite Integrals"] },
      { number: 8, title: "Application of Integrals", topics: ["Area under Simple Curves", "Area between Two Curves"] },
      { number: 9, title: "Differential Equations", topics: ["Basic Concepts", "General and Particular Solutions", "Formation", "Methods of Solving", "Homogeneous Equations", "Linear Differential Equations"] },
      { number: 10, title: "Vector Algebra", topics: ["Types of Vectors", "Addition", "Multiplication by Scalar", "Dot Product", "Cross Product"] },
      { number: 11, title: "Three Dimensional Geometry", topics: ["Direction Cosines", "Equation of a Line", "Angle between Lines", "Equation of a Plane", "Distance"] },
      { number: 12, title: "Linear Programming", topics: ["Introduction", "Mathematical Formulation", "Graphical Method", "Different Types of LPP"] },
      { number: 13, title: "Probability", topics: ["Conditional Probability", "Multiplication Theorem", "Independent Events", "Bayes' Theorem", "Random Variable", "Binomial Distribution"] },
    ],
  },

  // ── NCERT Class 11 Physics ──────────────────────────────────────
  {
    id: "ncert-11-physics",
    title: "Physics — Class XI",
    publisher: "NCERT",
    board: "CBSE",
    class: "11",
    subject: "Physics",
    chapters: [
      { number: 1, title: "Physical World", topics: ["Science and its Scope", "Nature of Physical Laws", "Fundamental Forces"] },
      { number: 2, title: "Units and Measurements", topics: ["International System of Units", "Significant Figures", "Dimensional Analysis", "Error Analysis"] },
      { number: 3, title: "Motion in a Straight Line", topics: ["Position, Path Length, Displacement", "Average and Instantaneous Velocity", "Acceleration", "Equations of Uniformly Accelerated Motion", "Relative Velocity"] },
      { number: 4, title: "Motion in a Plane", topics: ["Vectors", "Projectile Motion", "Uniform Circular Motion", "Relative Velocity in 2D"] },
      { number: 5, title: "Laws of Motion", topics: ["Aristotle's Fallacy", "Newton's Laws", "Inertia", "Momentum", "Impulse", "Friction", "Circular Motion Dynamics"] },
      { number: 6, title: "Work, Energy and Power", topics: ["Work done by a Constant/Variable Force", "Kinetic Energy", "Work-Energy Theorem", "Potential Energy", "Conservation of Energy", "Power", "Collisions"] },
      { number: 7, title: "Systems of Particles and Rotational Motion", topics: ["Centre of Mass", "Angular Velocity", "Torque", "Moment of Inertia", "Rolling Motion"] },
      { number: 8, title: "Gravitation", topics: ["Kepler's Laws", "Universal Law of Gravitation", "Acceleration due to Gravity", "Gravitational Potential Energy", "Escape Speed", "Satellites"] },
      { number: 9, title: "Mechanical Properties of Solids", topics: ["Elastic Behaviour", "Stress and Strain", "Hooke's Law", "Young's Modulus", "Bulk Modulus", "Shear Modulus"] },
      { number: 10, title: "Mechanical Properties of Fluids", topics: ["Pressure", "Pascal's Law", "Archimedes' Principle", "Bernoulli's Theorem", "Viscosity", "Surface Tension"] },
      { number: 11, title: "Thermal Properties of Matter", topics: ["Temperature and Heat", "Specific Heat Capacity", "Thermal Expansion", "Calorimetry", "Change of State", "Heat Transfer"] },
      { number: 12, title: "Thermodynamics", topics: ["Thermal Equilibrium", "Zeroth Law", "First Law", "Second Law", "Reversible and Irreversible Processes", "Heat Engines", "Carnot Engine"] },
      { number: 13, title: "Kinetic Theory", topics: ["Molecular Theory of Matter", "Behaviour of Gases", "Kinetic Theory of Ideal Gas", "Law of Equipartition of Energy", "Specific Heat Capacities"] },
      { number: 14, title: "Oscillations", topics: ["Periodic and Oscillatory Motion", "Simple Harmonic Motion", "Energy in SHM", "Damped Oscillations", "Resonance"] },
      { number: 15, title: "Waves", topics: ["Transverse and Longitudinal Waves", "Speed of Wave", "Superposition Principle", "Reflection of Waves", "Beats", "Doppler Effect"] },
    ],
  },
];

export function getTextbooks(board: string, cls: string, subject: string): Textbook[] {
  return TEXTBOOK_DB.filter(
    (b) =>
      (b.board === board || b.publisher === "NCERT") &&
      b.class === cls &&
      b.subject === subject
  );
}

export function getTextbookById(id: string): Textbook | null {
  return TEXTBOOK_DB.find((b) => b.id === id) || null;
}
