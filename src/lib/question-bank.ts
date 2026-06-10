// Real NCERT-aligned question bank, organized by subject → chapter/topic keyword → questions
// Each entry: { text, type, difficulty, options?, answer?, marks }

export interface BankQuestion {
  text: string;
  type: string;
  difficulty: "Easy" | "Medium" | "Hard";
  marks: number;
  options?: string[];
  answer?: string;
  topic: string;
  chapter: string;
}

const Q = (text: string, type: string, difficulty: "Easy"|"Medium"|"Hard", marks: number, topic: string, chapter: string, options?: string[], answer?: string): BankQuestion =>
  ({ text, type, difficulty, marks, topic, chapter, options, answer });

export const QUESTION_BANK: BankQuestion[] = [

  // ══════════════════════════════════════════════════════
  // CBSE Class 10 — MATHEMATICS
  // ══════════════════════════════════════════════════════

  // Ch 1: Real Numbers
  Q("State Euclid's Division Lemma.", "Short Answer", "Easy", 2, "Euclid's Division Lemma", "Real Numbers"),
  Q("Using Euclid's division algorithm, find the HCF of 135 and 225.", "Short Answer", "Medium", 3, "Euclid's Division Lemma", "Real Numbers"),
  Q("Prove that √2 is irrational.", "Long Answer", "Hard", 5, "Irrational Numbers", "Real Numbers"),
  Q("Find the HCF and LCM of 12 and 18 using prime factorisation.", "Short Answer", "Medium", 3, "Fundamental Theorem of Arithmetic", "Real Numbers"),
  Q("The decimal expansion of the rational number 14587/1250 will terminate after how many decimal places?", "MCQ", "Easy", 1, "Decimal Expansions", "Real Numbers", ["1", "2", "3", "4"], "4"),
  Q("If HCF(306, 657) = 9, find LCM(306, 657).", "Short Answer", "Easy", 2, "Fundamental Theorem of Arithmetic", "Real Numbers", undefined, "22338"),
  Q("Prove that 3 + 2√5 is irrational.", "Long Answer", "Hard", 5, "Irrational Numbers", "Real Numbers"),
  Q("Which of the following is an irrational number?", "MCQ", "Easy", 1, "Irrational Numbers", "Real Numbers", ["√4", "√9", "√7", "√16"], "√7"),
  Q("State the Fundamental Theorem of Arithmetic. Give an example.", "Short Answer", "Medium", 2, "Fundamental Theorem of Arithmetic", "Real Numbers"),
  Q("The HCF of two numbers is 9 and their LCM is 2016. If one number is 54, find the other.", "Short Answer", "Medium", 3, "Fundamental Theorem of Arithmetic", "Real Numbers", undefined, "336"),

  // Ch 2: Polynomials
  Q("Find the zeros of the polynomial x² – 3x + 2 and verify the relationship between zeros and coefficients.", "Short Answer", "Medium", 3, "Zeros of Polynomials", "Polynomials"),
  Q("If α and β are zeros of 2x² + 5x + k such that α² + β² + αβ = 21/4, find k.", "Long Answer", "Hard", 5, "Relationship between Zeros and Coefficients", "Polynomials"),
  Q("The zeros of the polynomial p(x) = x² – 2x – 8 are:", "MCQ", "Easy", 1, "Zeros of Polynomials", "Polynomials", ["(4, –2)", "(–4, 2)", "(2, 4)", "(–2, –4)"], "(4, –2)"),
  Q("Divide 3x² – x³ – 3x + 5 by x – 1 – x² and verify the division algorithm.", "Long Answer", "Hard", 5, "Division Algorithm", "Polynomials"),
  Q("If one zero of 2x² – 3x + p is 3, find the other zero and p.", "Short Answer", "Medium", 3, "Zeros of Polynomials", "Polynomials"),
  Q("Write the degree of the polynomial 4x³ + 3x² + 2x + 1.", "Short Answer", "Easy", 1, "Zeros of Polynomials", "Polynomials", undefined, "3"),

  // Ch 3: Pair of Linear Equations
  Q("Solve: 2x + 3y = 11 and 2x – 4y = –24, and hence find the value of 'm' for which y = mx + 3.", "Long Answer", "Hard", 5, "Elimination Method", "Pair of Linear Equations in Two Variables"),
  Q("Solve by substitution: x + y = 14, x – y = 4.", "Short Answer", "Medium", 3, "Substitution Method", "Pair of Linear Equations in Two Variables", undefined, "x=9, y=5"),
  Q("The difference between two numbers is 26 and one number is three times the other. Find them.", "Short Answer", "Medium", 3, "Elimination Method", "Pair of Linear Equations in Two Variables", undefined, "39 and 13"),
  Q("A pair of linear equations is consistent if their graph lines:", "MCQ", "Easy", 1, "Graphical Method", "Pair of Linear Equations in Two Variables", ["are parallel", "intersect or coincide", "are perpendicular", "never meet"], "intersect or coincide"),
  Q("For what value of k do the equations 3x – y + 8 = 0 and 6x – ky + 16 = 0 represent coincident lines?", "Short Answer", "Medium", 2, "Graphical Method", "Pair of Linear Equations in Two Variables", undefined, "k = 2"),

  // Ch 4: Quadratic Equations
  Q("Solve the quadratic equation 2x² – 7x + 3 = 0 by factorisation.", "Short Answer", "Medium", 3, "Factorisation", "Quadratic Equations", undefined, "x = 3 or x = 1/2"),
  Q("Find the nature of roots of 2x² – 4x + 3 = 0.", "Short Answer", "Easy", 2, "Discriminant", "Quadratic Equations", undefined, "No real roots (D < 0)"),
  Q("The sum and product of roots of kx² + 2x + 3k are equal. Find k.", "Short Answer", "Hard", 3, "Nature of Roots", "Quadratic Equations", undefined, "k = –2/3"),
  Q("A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less. Find the speed.", "Long Answer", "Hard", 5, "Applications", "Quadratic Equations", undefined, "40 km/h"),
  Q("The discriminant of x² – 4x + 4 = 0 is:", "MCQ", "Easy", 1, "Discriminant", "Quadratic Equations", ["0", "4", "16", "–4"], "0"),

  // Ch 5: Arithmetic Progressions
  Q("Find the 20th term of the AP: 3, 8, 13, 18, ...", "Short Answer", "Easy", 2, "nth Term", "Arithmetic Progressions", undefined, "98"),
  Q("The sum of first n terms of an AP is 3n² + 5n. Find the nth term.", "Short Answer", "Medium", 3, "Sum of n Terms", "Arithmetic Progressions", undefined, "6n + 2"),
  Q("Find the sum of first 22 terms of the AP: 8, 3, –2, ...", "Short Answer", "Medium", 3, "Sum of n Terms", "Arithmetic Progressions", undefined, "–979"),
  Q("The 4th term of an AP is 11 and the 8th term is 23. Find the AP.", "Long Answer", "Medium", 5, "nth Term", "Arithmetic Progressions"),
  Q("How many multiples of 4 lie between 10 and 250?", "Short Answer", "Medium", 2, "nth Term", "Arithmetic Progressions", undefined, "60"),

  // Ch 6: Triangles
  Q("State and prove the Basic Proportionality Theorem (Thales' Theorem).", "Long Answer", "Hard", 5, "Basic Proportionality Theorem", "Triangles"),
  Q("In a triangle, if a line is drawn parallel to one side, it divides the other two sides proportionally. Prove this.", "Long Answer", "Hard", 5, "Basic Proportionality Theorem", "Triangles"),
  Q("State the criteria for two triangles to be similar.", "Short Answer", "Easy", 2, "Criteria for Similarity", "Triangles"),
  Q("In ΔABC, DE ∥ BC, AD = 4 cm, BD = 6 cm, AE = 3 cm. Find EC.", "Short Answer", "Medium", 3, "Basic Proportionality Theorem", "Triangles", undefined, "4.5 cm"),
  Q("Two poles of heights 6 m and 11 m stand on a plane. If the distance between their feet is 12 m, find the distance between their tops.", "Short Answer", "Medium", 3, "Pythagoras Theorem", "Triangles", undefined, "13 m"),
  Q("Prove that the ratio of areas of two similar triangles is equal to the ratio of the squares of their corresponding sides.", "Long Answer", "Hard", 5, "Areas of Similar Triangles", "Triangles"),

  // Ch 7: Coordinate Geometry
  Q("Find the distance between the points A(2, 3) and B(4, 1).", "Short Answer", "Easy", 2, "Distance Formula", "Coordinate Geometry", undefined, "2√2 units"),
  Q("Find the coordinates of the point which divides the line segment joining A(1, 3) and B(4, 6) in the ratio 2:1 internally.", "Short Answer", "Medium", 3, "Section Formula", "Coordinate Geometry", undefined, "(3, 5)"),
  Q("Find the area of triangle with vertices A(2, 3), B(–1, 0), C(2, –4).", "Short Answer", "Medium", 3, "Area of Triangle", "Coordinate Geometry", undefined, "10.5 sq. units"),
  Q("Show that the points A(1, 2), B(3, –4), C(5, –6) are collinear.", "Short Answer", "Medium", 3, "Area of Triangle", "Coordinate Geometry"),
  Q("The midpoint of segment AB is M(3, 4). If A is (1, 2), find B.", "Short Answer", "Easy", 2, "Mid-point Formula", "Coordinate Geometry", undefined, "B = (5, 6)"),

  // Ch 8: Trigonometry
  Q("If tan θ = 12/5, find sin θ and cos θ.", "Short Answer", "Medium", 3, "Trigonometric Ratios", "Introduction to Trigonometry", undefined, "sin θ = 12/13, cos θ = 5/13"),
  Q("Prove that: (sin A + cosec A)² + (cos A + sec A)² = 7 + tan²A + cot²A.", "Long Answer", "Hard", 5, "Trigonometric Identities", "Introduction to Trigonometry"),
  Q("Evaluate: (sin 30° + cos 60°) – (sin 60° + cos 30°).", "Short Answer", "Easy", 2, "Trigonometric Ratios", "Introduction to Trigonometry", undefined, "0"),
  Q("If sin A = 3/4, calculate cos A and tan A.", "Short Answer", "Medium", 3, "Trigonometric Ratios", "Introduction to Trigonometry"),
  Q("The value of (sin²63° + sin²27°)/(cos²17° + cos²73°) is:", "MCQ", "Easy", 1, "Trigonometric Identities", "Introduction to Trigonometry", ["0", "1", "2", "√2"], "1"),

  // Ch 9: Applications of Trigonometry
  Q("A tower stands vertically on the ground. From a point on the ground which is 15 m away, the angle of elevation of the top is 60°. Find the height of the tower.", "Short Answer", "Medium", 3, "Angle of Elevation", "Some Applications of Trigonometry", undefined, "15√3 m"),
  Q("The angle of elevation of a ladder against a wall is 60° and the foot of the ladder is 4.6 m away from the wall. Find the length of the ladder.", "Short Answer", "Medium", 3, "Heights and Distances", "Some Applications of Trigonometry", undefined, "9.2 m"),
  Q("From the top of a 7 m high building, the angle of elevation of the top of a cable tower is 60° and the angle of depression of its foot is 45°. Find the height of the tower.", "Long Answer", "Hard", 5, "Angle of Depression", "Some Applications of Trigonometry", undefined, "7(1 + √3) m"),

  // Ch 10: Circles
  Q("Prove that the tangent at any point of a circle is perpendicular to the radius through the point of contact.", "Long Answer", "Hard", 5, "Tangent to a Circle", "Circles"),
  Q("Two tangents TP and TQ are drawn to a circle with centre O from an external point T. Prove that ∠PTQ = 2∠OPQ.", "Long Answer", "Hard", 5, "Number of Tangents from a Point", "Circles"),
  Q("From a point Q, the length of the tangent to a circle is 24 cm and the distance of Q from the centre is 25 cm. Find the radius of the circle.", "Short Answer", "Medium", 3, "Properties of Tangents", "Circles", undefined, "7 cm"),
  Q("The number of tangents that can be drawn to a circle from a point inside the circle is:", "MCQ", "Easy", 1, "Tangent to a Circle", "Circles", ["0", "1", "2", "Infinite"], "0"),

  // Ch 13: Statistics
  Q("Find the mean of the following data: Class 0–10, 10–20, 20–30, 30–40, 40–50; Frequency: 5, 10, 25, 30, 10.", "Short Answer", "Medium", 3, "Mean", "Statistics"),
  Q("Find the median of the data: 5, 7, 9, 11, 13.", "Short Answer", "Easy", 2, "Median", "Statistics", undefined, "9"),
  Q("Find the mode for: 3, 5, 7, 4, 5, 3, 5, 6, 8, 9, 5, 3, 5, 3, 6, 9, 7, 4.", "Short Answer", "Easy", 2, "Mode", "Statistics", undefined, "5"),
  Q("The relationship between mean, median and mode is:", "MCQ", "Easy", 1, "Mode", "Statistics", ["Mode = 3 Mean – 2 Median", "Mode = 3 Median – 2 Mean", "Mode = 2 Median – 3 Mean", "Mode = Mean + Median"], "Mode = 3 Median – 2 Mean"),

  // Ch 14: Probability
  Q("A bag contains 3 red and 2 blue marbles. A marble is drawn at random. Find the probability that it is red.", "Short Answer", "Easy", 2, "Classical Probability", "Probability", undefined, "3/5"),
  Q("Two dice are thrown simultaneously. What is the probability of getting a sum of 7?", "Short Answer", "Medium", 3, "Events", "Probability", undefined, "6/36 = 1/6"),
  Q("Cards numbered 1 to 20 are put in a box. A card is drawn at random. Find the probability of getting a prime number.", "Short Answer", "Medium", 3, "Classical Probability", "Probability", undefined, "2/5"),
  Q("The probability of an event that is certain to happen is:", "MCQ", "Easy", 1, "Classical Probability", "Probability", ["0", "0.5", "1", "–1"], "1"),

  // ══════════════════════════════════════════════════════
  // CBSE Class 10 — SCIENCE
  // ══════════════════════════════════════════════════════

  // Ch 1: Chemical Reactions
  Q("Define chemical equation. What are the limitations of a chemical equation?", "Short Answer", "Easy", 2, "Chemical Equations", "Chemical Reactions and Equations"),
  Q("What is a combination reaction? Give one example with a balanced chemical equation.", "Short Answer", "Easy", 2, "Types of Chemical Reactions", "Chemical Reactions and Equations"),
  Q("What is corrosion? How can it be prevented?", "Short Answer", "Medium", 3, "Corrosion", "Chemical Reactions and Equations"),
  Q("Balance the following equation: Fe + H₂O → Fe₃O₄ + H₂", "Short Answer", "Medium", 3, "Chemical Equations", "Chemical Reactions and Equations", undefined, "3Fe + 4H₂O → Fe₃O₄ + 4H₂"),
  Q("In the reaction CuO + H₂ → Cu + H₂O, which substance is being oxidised and which is being reduced?", "Short Answer", "Medium", 3, "Types of Chemical Reactions", "Chemical Reactions and Equations", undefined, "H₂ is oxidised, CuO is reduced"),
  Q("What type of reaction is: 2H₂O → 2H₂ + O₂?", "MCQ", "Easy", 1, "Types of Chemical Reactions", "Chemical Reactions and Equations", ["Combination", "Decomposition", "Displacement", "Double Displacement"], "Decomposition"),
  Q("Explain with an example each: (a) Exothermic reaction (b) Endothermic reaction.", "Long Answer", "Medium", 5, "Types of Chemical Reactions", "Chemical Reactions and Equations"),

  // Ch 2: Acids, Bases and Salts
  Q("What is the pH of a neutral solution?", "MCQ", "Easy", 1, "pH Scale", "Acids, Bases and Salts", ["0", "7", "14", "1"], "7"),
  Q("How does the pH of a solution change if it becomes more acidic?", "Short Answer", "Easy", 2, "pH Scale", "Acids, Bases and Salts", undefined, "pH decreases below 7"),
  Q("What happens when excess carbon dioxide is passed through lime water? Write the chemical equations.", "Short Answer", "Medium", 3, "Properties of Acids and Bases", "Acids, Bases and Salts"),
  Q("Name the acid present in: (a) Vinegar (b) Ant's sting (c) Tomato.", "Short Answer", "Easy", 2, "Properties of Acids and Bases", "Acids, Bases and Salts", undefined, "(a) Acetic acid (b) Formic acid (c) Oxalic acid"),
  Q("What is the chemical formula of baking soda? Write its two uses.", "Short Answer", "Easy", 2, "Salts", "Acids, Bases and Salts", undefined, "NaHCO₃"),

  // Ch 6: Life Processes
  Q("What is photosynthesis? Write the overall equation for photosynthesis.", "Short Answer", "Easy", 2, "Nutrition", "Life Processes", undefined, "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂"),
  Q("Differentiate between aerobic and anaerobic respiration.", "Short Answer", "Medium", 3, "Respiration", "Life Processes"),
  Q("Explain the process of double circulation in human beings. Why is it necessary?", "Long Answer", "Hard", 5, "Transportation", "Life Processes"),
  Q("What are the functions of the kidney in the human body?", "Short Answer", "Medium", 3, "Excretion", "Life Processes"),
  Q("What are stomata? What are their functions?", "Short Answer", "Easy", 2, "Nutrition", "Life Processes"),
  Q("The opening and closing of stomata is controlled by:", "MCQ", "Easy", 1, "Nutrition", "Life Processes", ["Epidermal cells", "Guard cells", "Mesophyll cells", "Root hair cells"], "Guard cells"),

  // Ch 7: Control and Coordination
  Q("What is a reflex action? Describe a reflex arc with a diagram.", "Long Answer", "Medium", 5, "Reflex Action", "Control and Coordination"),
  Q("What are the functions of the cerebrum?", "Short Answer", "Medium", 2, "Nervous System", "Control and Coordination"),
  Q("Name the hormones secreted by the pancreas and their functions.", "Short Answer", "Medium", 3, "Hormones", "Control and Coordination", undefined, "Insulin (lowers blood glucose) and Glucagon (raises blood glucose)"),
  Q("Why is the use of iodised salt advisable? Name the gland and hormone involved.", "Short Answer", "Easy", 2, "Endocrine System", "Control and Coordination", undefined, "To prevent goitre; Thyroid gland; Thyroxine"),
  Q("How do auxins promote the growth of a tendril around a support?", "Short Answer", "Medium", 3, "Hormones", "Control and Coordination"),

  // Ch 10: Light – Reflection and Refraction
  Q("Define the principal focus of a concave mirror.", "Short Answer", "Easy", 2, "Mirrors", "Light – Reflection and Refraction"),
  Q("An object is placed at a distance of 10 cm from a convex mirror of focal length 15 cm. Find the position and nature of the image.", "Short Answer", "Hard", 3, "Mirrors", "Light – Reflection and Refraction", undefined, "v = 6 cm (behind mirror), virtual, erect, diminished"),
  Q("State the laws of refraction of light.", "Short Answer", "Easy", 2, "Refraction", "Light – Reflection and Refraction"),
  Q("A ray of light travelling in air enters water. How does its speed, wavelength and frequency change?", "Short Answer", "Medium", 3, "Refraction", "Light – Reflection and Refraction"),
  Q("What is the power of a lens of focal length 25 cm?", "Short Answer", "Easy", 1, "Power of a Lens", "Light – Reflection and Refraction", undefined, "+4 D"),
  Q("Which mirror is used in solar furnaces?", "MCQ", "Easy", 1, "Mirrors", "Light – Reflection and Refraction", ["Plane mirror", "Convex mirror", "Concave mirror", "Both convex and concave"], "Concave mirror"),

  // Ch 12: Electricity
  Q("State Ohm's Law. Write its mathematical form.", "Short Answer", "Easy", 2, "Ohm's Law", "Electricity"),
  Q("Three resistors of 2 Ω, 3 Ω and 6 Ω are connected in parallel. Find the equivalent resistance.", "Short Answer", "Medium", 3, "Resistance", "Electricity", undefined, "1 Ω"),
  Q("An electric heater of resistance 8 Ω draws a current of 15 A for 1 minute. Calculate the heat produced.", "Short Answer", "Medium", 3, "Heating Effect", "Electricity", undefined, "108000 J"),
  Q("What is the difference between a fuse and a circuit breaker?", "Short Answer", "Medium", 3, "Circuit", "Electricity"),
  Q("If the potential difference across a 3 Ω resistor is 6 V, the current flowing through it is:", "MCQ", "Easy", 1, "Ohm's Law", "Electricity", ["2 A", "3 A", "18 A", "0.5 A"], "2 A"),
  Q("Why are resistors connected in parallel in household circuits?", "Short Answer", "Medium", 2, "Circuit", "Electricity"),

  // ══════════════════════════════════════════════════════
  // CBSE Class 9 — SCIENCE
  // ══════════════════════════════════════════════════════

  // Ch 7: Motion
  Q("Define uniform and non-uniform motion with examples.", "Short Answer", "Easy", 2, "Describing Motion", "Motion"),
  Q("A car accelerates uniformly from 18 km/h to 36 km/h in 5 s. Find the acceleration.", "Short Answer", "Medium", 3, "Equations of Motion", "Motion", undefined, "1 m/s²"),
  Q("Derive the equation v² = u² + 2as.", "Long Answer", "Hard", 5, "Equations of Motion", "Motion"),
  Q("What does the slope of a velocity–time graph represent?", "Short Answer", "Easy", 2, "Graphical Representation", "Motion", undefined, "Acceleration"),
  Q("A stone is thrown vertically upward with a velocity of 20 m/s. How high will it go? (g = 10 m/s²)", "Short Answer", "Medium", 3, "Equations of Motion", "Motion", undefined, "20 m"),
  Q("An object is moving with uniform velocity. The net force on it is:", "MCQ", "Easy", 1, "Rate of Change of Velocity", "Motion", ["Non-zero", "Zero", "Increasing", "Decreasing"], "Zero"),

  // Ch 8: Force and Laws of Motion
  Q("State Newton's Second Law of Motion. Write its mathematical form.", "Short Answer", "Easy", 2, "Second Law", "Force and Laws of Motion"),
  Q("A force of 20 N acts on a body of mass 4 kg. What is the acceleration produced?", "Short Answer", "Easy", 2, "Second Law", "Force and Laws of Motion", undefined, "5 m/s²"),
  Q("State the law of conservation of momentum. Give an example.", "Short Answer", "Medium", 3, "Conservation of Momentum", "Force and Laws of Motion"),
  Q("Explain why it is difficult to walk on a slippery floor.", "Short Answer", "Easy", 2, "First Law", "Force and Laws of Motion"),
  Q("A bullet of mass 10 g travels at 400 m/s. It hits a wooden block and comes to rest in 0.05 s. Find the force exerted.", "Short Answer", "Hard", 3, "Second Law", "Force and Laws of Motion", undefined, "80,000 N (backward on block)"),
  Q("According to Newton's Third Law, action and reaction:", "MCQ", "Easy", 1, "Third Law", "Force and Laws of Motion", ["act on the same body", "are equal in magnitude but opposite in direction on different bodies", "are unequal", "act in the same direction"], "are equal in magnitude but opposite in direction on different bodies"),

  // Ch 9: Gravitation
  Q("State Newton's Universal Law of Gravitation.", "Short Answer", "Easy", 2, "Universal Law", "Gravitation"),
  Q("What is the difference between mass and weight?", "Short Answer", "Easy", 2, "Mass", "Gravitation"),
  Q("A body weighs 630 N on Earth. What would it weigh on the Moon? (g_moon = g_earth/6)", "Short Answer", "Easy", 2, "Weight", "Gravitation", undefined, "105 N"),
  Q("State Archimedes' Principle. Give two applications.", "Short Answer", "Medium", 3, "Archimedes' Principle", "Gravitation"),
  Q("Why does an iron nail sink in water but a ship made of iron floats?", "Short Answer", "Medium", 3, "Archimedes' Principle", "Gravitation"),
  Q("The value of g is maximum at:", "MCQ", "Easy", 1, "Gravitation", "Gravitation", ["Equator", "Poles", "Tropic of Cancer", "All places equally"], "Poles"),

  // Ch 10: Work and Energy
  Q("Define work. Under what conditions is work done by a force zero?", "Short Answer", "Easy", 2, "Work", "Work and Energy"),
  Q("A body of mass 2 kg is moving with a velocity of 5 m/s. Find its kinetic energy.", "Short Answer", "Easy", 2, "Kinetic Energy", "Work and Energy", undefined, "25 J"),
  Q("State the Law of Conservation of Energy with an example.", "Short Answer", "Medium", 3, "Law of Conservation of Energy", "Work and Energy"),
  Q("A spring is compressed and then released. Explain the transformation of energy.", "Short Answer", "Medium", 2, "Potential Energy", "Work and Energy"),
  Q("A man lifts a 10 kg box to a height of 2 m in 10 seconds. Calculate the power. (g = 10 m/s²)", "Short Answer", "Medium", 3, "Power", "Work and Energy", undefined, "20 W"),

  // ══════════════════════════════════════════════════════
  // CBSE Class 9 — MATHEMATICS
  // ══════════════════════════════════════════════════════

  // Ch 1: Number Systems
  Q("Represent √5 on the number line.", "Short Answer", "Medium", 3, "Representing on Number Line", "Number Systems"),
  Q("Simplify: (3 + √3)(3 – √3).", "Short Answer", "Easy", 2, "Operations on Real Numbers", "Number Systems", undefined, "6"),
  Q("If a = 2 + √3, find a – 1/a.", "Short Answer", "Hard", 3, "Operations on Real Numbers", "Number Systems"),
  Q("Which of the following is irrational?", "MCQ", "Easy", 1, "Irrational Numbers", "Number Systems", ["√9", "√4/√16", "√5", "0.333..."], "√5"),
  Q("Rationalise the denominator of 1/(√7 – 2).", "Short Answer", "Medium", 3, "Operations on Real Numbers", "Number Systems", undefined, "(√7 + 2)/3"),

  // Ch 2: Polynomials (Class 9)
  Q("Using the Remainder Theorem, find the remainder when x³ + 3x² + 3x + 1 is divided by x + 1.", "Short Answer", "Medium", 3, "Remainder Theorem", "Polynomials"),
  Q("Factorise: x³ – 23x² + 142x – 120.", "Long Answer", "Hard", 5, "Factor Theorem", "Polynomials"),
  Q("If p(x) = x² – 4x + 3, find p(1) and p(–1).", "Short Answer", "Easy", 2, "Polynomials in One Variable", "Polynomials", undefined, "p(1)=0, p(–1)=8"),
  Q("Expand: (2x + 3y)³.", "Short Answer", "Medium", 3, "Algebraic Identities", "Polynomials", undefined, "8x³ + 36x²y + 54xy² + 27y³"),

  // Ch 7: Triangles (Class 9)
  Q("In ΔABC and ΔPQR, AB = AC, ∠A = 70° and ∠Q = 55°. Is ΔABC ≅ ΔPQR? Give reasons.", "Short Answer", "Medium", 3, "Criteria for Congruence", "Triangles"),
  Q("Prove that angles opposite to equal sides of an isosceles triangle are equal.", "Long Answer", "Medium", 5, "Properties of Isosceles Triangle", "Triangles"),
  Q("In ΔABC, AB = AC and D is the midpoint of BC. Show that AD ⊥ BC.", "Short Answer", "Medium", 3, "Congruence of Triangles", "Triangles"),
  Q("Two sides of a triangle are 8 cm and 5 cm. Which of the following can be the third side?", "MCQ", "Easy", 1, "Inequalities in Triangles", "Triangles", ["2 cm", "4 cm", "14 cm", "15 cm"], "4 cm"),

  // Ch 13: Surface Areas and Volumes (Class 9)
  Q("Find the volume of a sphere of radius 10.5 cm. (π = 22/7)", "Short Answer", "Medium", 3, "Volume", "Surface Areas and Volumes", undefined, "4851 cm³"),
  Q("A conical tent is 10 m high and the radius of its base is 24 m. Find the slant height and the cost of canvas at ₹70 per m².", "Long Answer", "Hard", 5, "Volume", "Surface Areas and Volumes"),
  Q("The curved surface area of a cone is 308 cm² and its slant height is 14 cm. Find the radius. (π = 22/7)", "Short Answer", "Medium", 3, "Volume", "Surface Areas and Volumes", undefined, "7 cm"),

];

// Search question bank by topic keywords (fuzzy match).
// Returns empty array if no relevant match found — caller should fall back to templates.
export function searchQuestions(
  topics: string[],
  type?: string,
  difficulty?: string,
  count = 10
): BankQuestion[] {
  const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "");
  const topicNorm = topics.map(normalise);

  const scored = QUESTION_BANK
    .filter(q => !type || q.type === type)
    .filter(q => !difficulty || q.difficulty === difficulty)
    .map(q => {
      const qText = normalise(q.text + " " + q.topic + " " + q.chapter);
      const score = topicNorm.reduce((s, t) => {
        if (qText.includes(t)) return s + 3;
        const words = t.split(" ");
        return s + words.filter(w => w.length > 3 && qText.includes(w)).length;
      }, 0);
      return { q, score };
    })
    .filter(({ score }) => score >= 2)   // require meaningful match
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map(({ q }) => q);
}

// For a given chapter name, get all questions
export function getQuestionsForChapter(chapter: string): BankQuestion[] {
  const norm = chapter.toLowerCase();
  return QUESTION_BANK.filter(q => q.chapter.toLowerCase().includes(norm) || norm.includes(q.chapter.toLowerCase()));
}
