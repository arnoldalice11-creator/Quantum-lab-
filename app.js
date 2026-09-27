// QUANTUM LAB — v0.1

// Show the main menu
function showMenu() {
  const menu = document.getElementById("menu");

  if (menu) {
    menu.classList.remove("hidden");
    menu.scrollIntoView({
      behavior: "smooth"
    });
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

// Energy-level experiment
const energySlider = document.querySelector(
  'input[type="range"]'
);

if (energySlider) {
  energySlider.addEventListener("input", () => {
    const level = energySlider.value;

    console.log(
      "Quantum energy level:",
      level
    );
  });
}

// Welcome message
console.log("⚛️ Quantum Lab v0.1 loaded!");
