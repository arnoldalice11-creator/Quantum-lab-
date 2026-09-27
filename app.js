// QUANTUM LAB — v0.1

// Show the main menu
function showMenu() {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.classList.remove("hidden");
    menu.scrollIntoView({ behavior: "smooth" });
  }
}

// Show a specific selected section and hide all other section cards
function showSection(sectionId) {
  const sections = document.querySelectorAll("main .card");

  sections.forEach((section) => {
    // Keep the Welcome card and Main Menu open, hide the lesson cards
    if (section.id !== "menu" && !section.querySelector("button[onclick='showMenu()']")) {
      section.classList.add("hidden");
    }
  });

  // Reveal the selected card
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove("hidden");
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Read text aloud
const readButton = document.getElementById("readButton");
if (readButton) {
  readButton.addEventListener("click", () => {
    const text = document.body.innerText;
    speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;
    speechSynthesis.speak(speech);
  });
}

// Energy-level experiment slider logging
const energySlider = document.querySelector('input[type="range"]');
if (energySlider) {
  energySlider.addEventListener("input", () => {
    const level = energySlider.value;
    console.log("Quantum energy level:", level);
  });
}

console.log("⚛️ Quantum Lab v0.1 loaded!");


