// Show Main Menu
function showMenu() {
  document.getElementById("welcome-card").classList.add("hidden");
  showSection("menu");
}

// Show only selected section
function showSection(sectionId) {
  const sections = document.querySelectorAll("main .card");
  sections.forEach((s) => s.classList.add("hidden"));

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove("hidden");
  }
}

// Read Aloud Toggle
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

// Live Experiment Wave Updates
const slider = document.getElementById("energySlider");
if (slider) {
  slider.addEventListener("input", () => {
    const val = slider.value;
    document.getElementById("energyVal").innerText = val;
    
    const waves = [
      "〰️〰️〰️",
      "〰️∿〰️∿",
      "∿∿∿∿∿",
      "∿⚡∿⚡∿⚡",
      "⚡⚡⚡⚡⚡⚡"
    ];
    document.getElementById("waveDisplay").innerText = waves[val - 1];
  });
}

// Sprint Quiz Feedback
function checkAnswer(isCorrect) {
  const feedback = document.getElementById("quiz-feedback");
  if (isCorrect) {
    feedback.style.color = "#4caf50";
    feedback.innerText = "🎉 Correct! Light has a dual wave-particle nature!";
  } else {
    feedback.style.color = "#f44336";
    feedback.innerText = "❌ Not quite! In quantum mechanics, it can act like BOTH.";
  }
}

console.log("⚛️ Quantum Lab updated!");



