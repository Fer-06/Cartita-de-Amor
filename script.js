const hints = [
  "Pista 1: Es una fecha que cambió nuestras vidas 💗",
  "Pista 2: Fue un día muy especial para los dos ✨",
  "Última Pista: Fue en una fiesta de Halloween❣️"
];

let hintIndex = 0;
const correctPassword = "31-10-2025"; // NO HAGAS TRAMPA, NO VEAS LA CONTRASEÑA 

document.getElementById("passwordBtn").addEventListener("click", () => {
  const input = document.getElementById("passwordInput").value;

  if (input === correctPassword) {
    document.getElementById("passwordScreen").style.display = "none";
  } else {

    if (hintIndex < hints.length) {
      document.getElementById("errorMsg").innerHTML =
        "Contraseña incorrecta 💔<br>" + hints[hintIndex];
      hintIndex++;
    } else {
      document.getElementById("errorMsg").innerHTML =
        "Contraseña incorrecta 💔<br>Ya no tengo más pistas 😳";
    }

  }
});


const envelope = document.getElementById("envelope");
const toggleEnvelope = document.getElementById("toggleEnvelope");
const nextNote = document.getElementById("nextNote");
const messageEl = document.getElementById("message");

const gameArea = document.getElementById("gameArea");
const gameStatus = document.getElementById("gameStatus");
const finalMessageEl = document.querySelector(".final-message");
const timelineSection = document.querySelector(".timeline-section");
const minigameSection = document.querySelector(".minigame-section");

const notes = [
  "Cada vez que te veo sonreír, siento que todo vale la pena. ❤️",
  "Tu mirada es mi lugar favorito en el mundo. 💫",
  "Contigo, los días normales se vuelven mágicos y especiales. ✨",
  "Eres mi casualidad más bonita y mi destino favorito. 💖",
  "Gracias por existir y hacer mi vida más bonita.💕",
  "Tu amor es mi lenguaje favorito. 💘",
  "Entre todos los algoritmos, el más bonito fue el que me llevó a conocerte. 💫",
  "Eres mi mejor commit, porque marcaste un antes y un después en mi historia.💖",
  "Desde que te conocí, mi corazón dejó de ser null.🥰",
  "Si mi vida fuera un programa, tú serías la línea de código que lo vuelve perfecto.❤️💻",
  "Esta carta corre solo en el navegador de tu corazón ❤️",
  "Te amo mi solecito<3",
  "Y ahora una de nuestras fotitos más lindas💖... (ES MI FAVORITA)",
  `
    <div style="text-align:center;">
      <img src="D+J.jpg" 
        style="
          width:170px;
          border-radius:15px;
          box-shadow:0 0 10px rgba(0,0,0,0.3);
          margin-top:-20px;
        ">
    </div>
  `
];

let index = 0;

function toggleOpen() {
  envelope.classList.toggle("open");
}
function nextMessage() {
  index = (index + 1) % notes.length;
  messageEl.innerHTML = notes[index];
}

if (envelope) envelope.addEventListener("click", toggleOpen);
if (toggleEnvelope) toggleEnvelope.addEventListener("click", toggleOpen);
if (nextNote) nextNote.addEventListener("click", (ev) => {
  ev.stopPropagation(); 
  nextMessage();
});

function setupMinigame(count = 5) {
  if (!gameArea || !gameStatus) return;
  gameArea.innerHTML = "";
  gameStatus.textContent = `Corazones encontrados: 0 / ${count}`;
  let found = 0;

  const rect = gameArea.getBoundingClientRect();
  const areaW = Math.max(100, rect.width);
  const areaH = Math.max(100, rect.height);

  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "hidden-heart";     
    h.textContent = "❤️";
    h.style.position = "absolute";
    const size = 30;
    const x = Math.random() * (areaW - size);
    const y = Math.random() * (areaH - size);
    h.style.left = `${x}px`;
    h.style.top = `${y}px`;
    h.style.fontSize = "26px";
    h.style.cursor = "pointer";
    h.style.userSelect = "none";
    h.style.opacity = "0";
    h.style.transition = "opacity 300ms ease, transform 200ms ease";
    h.addEventListener("click", (ev) => {
      ev.stopPropagation();
      if (h.dataset.clicked) return;
      h.dataset.clicked = "1";
      h.style.transform = "scale(0.3) rotate(-30deg)";
      h.style.opacity = "0";
      setTimeout(() => {
        if (h.parentNode) h.parentNode.removeChild(h);
      }, 300);
      found++;
      gameStatus.textContent = `Corazones encontrados: ${found} / ${count}`;
      if (found >= count) {
        onGameWin();
      }
    });

    gameArea.appendChild(h);
    requestAnimationFrame(() => { h.style.opacity = "1"; });
  }
}

function onGameWin() {
  if (gameStatus) gameStatus.textContent = "¡Encontraste todos los corazones mi amor! 💖";
  if (finalMessageEl) {
    finalMessageEl.scrollIntoView({ behavior: "smooth", block: "center" });
    finalMessageEl.classList.add("highlight-final");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupMinigame(5);

  if (toggleEnvelope) toggleEnvelope.addEventListener("click", toggleOpen);

  const sections = document.querySelectorAll(".timeline-section, .minigame-section, .final-message");
  const ioOptions = { root: null, rootMargin: "0px", threshold: 0.12 };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible-section"); 
      }
    });
  }, ioOptions);

  sections.forEach(s => {
    s.classList.add("section-hidden");
    io.observe(s);
  });
});

if (gameArea) {
  gameArea.addEventListener("dblclick", () => {
    setupMinigame(5);
    if (gameStatus) gameStatus.textContent = "Minijuego reiniciado.";
  });
}
