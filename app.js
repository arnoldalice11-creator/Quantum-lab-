// --- NAVIGATION ---
function showMenu() {
  const welcomeCard = document.getElementById("welcome-card");
  if (welcomeCard) welcomeCard.classList.add("hidden");
  showSection("menu");
}

function showSection(sectionId) {
  const sections = document.querySelectorAll("main .card");
  sections.forEach((s) => s.classList.add("hidden"));

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove("hidden");
  }

  // Reload quiz or daily lesson if opened
  if (sectionId === "sprint-section") resetQuiz();
  if (sectionId === "learn-section") loadDailyLesson();
}

// --- DAILY LESSON SYSTEM ---
const dailyLessons = [
  {
    title: "📚 Lesson: Wave-Particle Duality",
    content: "Light and electrons act like ripples on water (waves) AND tiny solid marbles (particles) at the exact same time!"
  },
  {
    title: "📚 Lesson: Quantum Superposition",
    content: "A quantum particle can exist in multiple possibilities at once until someone measures or observes it!"
  },
  {
    title: "📚 Lesson: Quantum Tunneling",
    content: "Particles can sometimes pass right through solid barriers like ghosts because their probability wave spreads past the wall!"
  },
  {
    title: "📚 Lesson: Quantum Entanglement",
    content: "Two particles can become linked. Spanning across light-years, changing one instantly changes the other!"
  }
];

function loadDailyLesson() {
  // Uses day of the year to cycle lessons daily
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const lessonIndex = dayOfYear % dailyLessons.length;
  
  const lesson = dailyLessons[lessonIndex];
  document.getElementById("lesson-title").innerText = lesson.title;
  document.getElementById("lesson-content").innerText = lesson.content;
}

// --- SPRINT QUIZ SYSTEM ---
const quizData = [
  {
    question: "What can behave as both a wave and a particle?",
    options: ["Light & Electrons", "Basketballs", "Planets"],
    correct: 0
  },
  {
    question: "What is Superposition?",
    options: ["Flying fast", "Existing in multiple states at once", "A type of battery"],
    correct: 1
  },
  {
    question: "When particles teleport through walls, it is called...",
    options: ["Super speed", "Quantum Tunneling", "Gravity"],
    correct: 1
  }
];

let currentQ = 0;
let score = 0;

function resetQuiz() {
  currentQ = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const feedback = document.getElementById("quiz-feedback");
  const nextBtn = document.getElementById("next-btn");
  feedback.innerText = "";
  nextBtn.classList.add("hidden");

  if (currentQ >= quizData.length) {
    document.getElementById("quiz-question").innerText = `🎉 Quiz Complete! You scored ${score} out of ${quizData.length}!`;
    document.getElementById("quiz-options").innerHTML = "";
    return;
  }

  const q = quizData[currentQ];
  document.getElementById("quiz-question").innerText = `Question ${currentQ + 1}: ${q.question}`;

  const optionsDiv = document.getElementById("quiz-options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.style.display = "block";
    btn.style.margin = "8px 0";
    btn.onclick = () => checkAnswer(idx, q.correct);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  const feedback = document.getElementById("quiz-feedback");
  const nextBtn = document.getElementById("next-btn");

  if (selected === correct) {
    feedback.style.color = "#4caf50";
    feedback.innerText = "🎉 Correct!";
    score++;
  } else {
    feedback.style.color = "#f44336";
    feedback.innerText = "❌ Oops, that wasn't right!";
  }

  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQ++;
  loadQuestion();
}

// --- READ ALOUD TOGGLE ---
const readButton = document.getElementById("readButton");
let isSpeaking = false;

if (readButton) {
  readButton.addEventListener("click", () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      isSpeaking = false;
      readButton.innerText = "🔊 Read Aloud";
    } else {
      const text = document.body.innerText;
      speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      speech.onend = () => {
        isSpeaking = false;
        readButton.innerText = "🔊 Read Aloud";
      };
      speechSynthesis.speak(speech);
      isSpeaking = true;
      readButton.innerText = "⏹️ Stop Reading";
    }
  });
}

// --- EXPERIMENT WAVE SLIDER ---
document.addEventListener("input", (e) => {
  if (e.target && e.target.id === "energySlider") {
    const val = e.target.value;
    const valSpan = document.getElementById("energyVal");
    const waveDisplay = document.getElementById("waveDisplay");

    if (valSpan) valSpan.innerText = val;

    const waves = [
      "〰️〰️〰️",
      "〰️∿〰️∿",
      "∿∿∿∿∿",
      "∿⚡∿⚡∿⚡",
      "⚡⚡⚡⚡⚡⚡"
    ];

    if (waveDisplay) waveDisplay.innerText = waves[val - 1];
  }
});

console.log("⚛️ Quantum Lab v0.1 ready!");

