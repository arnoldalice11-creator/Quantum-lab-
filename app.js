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

  if (sectionId === "sprint-section") resetQuiz();
  if (sectionId === "learn-section") startDailyLesson();
}

// --- PAGED DAILY LESSON SYSTEM ---
const dailyLessons = [
  {
    title: "📚 Lesson: Wave-Particle Duality",
    pages: [
      "In our everyday world, things are clear-cut. A tennis ball is a solid object, and ripples on a pond are waves. They behave completely differently.",
      "In quantum mechanics, microscopic objects like light and electrons break this rule! They act like both ripples on water AND tiny solid marbles at the exact same time.",
      "This is called Wave-Particle Duality. Scientists discovered that when you aren't looking, light spreads out like a wave, but when you detect it, it hits like a particle!"
    ]
  },
  {
    title: "📚 Lesson: Quantum Superposition",
    pages: [
      "Imagine flipping a coin. While it's spinning in the air, is it heads or tails? It’s almost like a mix of both at the same time until it lands.",
      "Quantum particles do something very similar! Before you measure a particle, it exists in multiple possible places or states at the exact same time.",
      "This state of multiple possibilities is called Superposition. The moment you measure the particle, superposition ends and it picks one single result!"
    ]
  },
  {
    title: "📚 Lesson: Quantum Tunneling",
    pages: [
      "If you throw a tennis ball at a brick wall, it bounces back 100% of the time. It doesn't have enough energy to pass through solid matter.",
      "Because quantum particles spread out like probability waves, part of that wave can actually extend past a solid barrier or wall!",
      "There is a small chance the particle instantly appears on the other side of the barrier without breaking it. This ghost-like trick is called Quantum Tunneling!"
    ]
  }
];

let currentLessonIndex = 0;
let currentLessonPage = 0;

function startDailyLesson() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  currentLessonIndex = dayOfYear % dailyLessons.length;
  currentLessonPage = 0;

  renderLessonPage();
}

function renderLessonPage() {
  const lesson = dailyLessons[currentLessonIndex];
  
  document.getElementById("lesson-title").innerText = lesson.title;
  document.getElementById("lesson-page-counter").innerText = `Page ${currentLessonPage + 1} of ${lesson.pages.length}`;
  document.getElementById("lesson-content").innerText = lesson.pages[currentLessonPage];

  const prevBtn = document.getElementById("prev-page-btn");
  const nextBtn = document.getElementById("next-page-btn");

  // Toggle Previous button
  if (currentLessonPage === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inline-block";
  }

  // Next page or Sprint recap button
  if (currentLessonPage === lesson.pages.length - 1) {
    nextBtn.innerText = "Take Today's Sprint 🧠";
    nextBtn.style.backgroundColor = "#1f6beb";
    nextBtn.onclick = () => showSection("sprint-section");
  } else {
    nextBtn.innerText = "Next Page ➡️";
    nextBtn.style.backgroundColor = "#238636";
    nextBtn.onclick = () => changeLessonPage(1);
  }
}

function changeLessonPage(direction) {
  currentLessonPage += direction;
  renderLessonPage();
}

// --- INTERACTIVE PARTICLE EXPERIMENT ---
let currentParticleType = "electron";

function setParticle(type, btn) {
  currentParticleType = type;
  document.querySelectorAll(".part-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

function placeParticle(event) {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const particle = document.createElement("div");
  particle.className = "spawned-particle";
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  if (currentParticleType === "electron") particle.innerText = "⚡";
  else if (currentParticleType === "atom") particle.innerText = "⚛️";
  else if (currentParticleType === "photon") particle.innerText = "✨";

  canvas.appendChild(particle);
}

function clearParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (canvas) canvas.innerHTML = "";
}

// Energy Wave Slider
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

// --- SPRINT QUIZ SYSTEM ---
const quizData = [
  {
    question: "What can behave as both a wave and a particle?",
    options: ["Light & Electrons", "Basketballs", "Planets"],
    correct: 0
  },
  {
    question: "What is Superposition?",
    options: ["Flying fast", "Existing in multiple states at once", "A battery"],
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
  if (feedback) feedback.innerText = "";
  if (nextBtn) nextBtn.classList.add("hidden");

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

  if (nextBtn) nextBtn.classList.remove("hidden");
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

console.log("⚛️ Quantum Lab updated!");
