// QUANTUM LAB — v0.1

// Show the main menu
function showMenu() {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.classList.remove("hidden");
    menu.scrollIntoView({ behavior: "smooth" });
  }
}

// Show a specific selected section and hide others
function showSection(sectionId) {
  const sections = document.querySelectorAll("main .card");

  sections.forEach((section) => {
    if (section.id !== "menu" && !section.querySelector("button[onclick='showMenu()']")) {
      section.classList.add("hidden");
    }
  });

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove("hidden");
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Read Aloud with Start/Stop Toggle
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
      speech.rate = 0.9;
      
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

// Interactive Experiment Wave Display
function updateExperiment() {
  const slider = document.getElementById("energySlider");
  const valSpan = document.getElementById("energyVal");
  const waveDisplay = document.getElementById("waveDisplay");

  if (slider && valSpan && waveDisplay) {
    const level = parseInt(slider.value);
    valSpan.innerText = level;

    // Visual waves based on energy level
    const waves = [
      "〰️〰️〰️",
      "〰️∿〰️∿〰️",
      "∿∿∿∿∿∿",
      "∿∿∿∿∿∿∿∿",
      "⚡∿⚡∿⚡∿⚡∿⚡"
    ];

    waveDisplay.innerText = waves[level - 1];
  }
}

// Interactive Sprint Quiz Check
function checkAnswer(isCorrect, btnElement) {
  const feedback = document.getElementById("quiz-feedback");
  if (isCorrect) {
    feedback.style.color = "#4caf50";
    feedback.innerText = "🎉 Correct! Quantum mechanics studies the tiny universe of atoms.";
  } else {
    feedback.style.color = "#f44336";
    feedback.innerText = "❌ Oops! Try again. (Hint: Quantum physics is about the smallest things!)";
  }
}

console.log("⚛️ Quantum Lab v0.1 ready!");



