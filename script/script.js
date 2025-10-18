const sol = document.getElementById("sol");
const mensajeFinal = document.getElementById("mensajeFinal");
const texto = "Bendecido sábado niña 💕";
const duration = 5000;
const startTime = performance.now();

function getResponsiveRadius() {
  const minSide = Math.min(window.innerWidth, window.innerHeight);
  return minSide * 0.4;
}

function getCenter() {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 3
  };
}

let { x: centerX, y: centerY } = getCenter();
let radius = getResponsiveRadius();

function animateSol(currentTime) {
  const elapsed = currentTime - startTime;
  const progress = Math.min(elapsed / duration, 1);

  const angle = -Math.PI / 2 + (Math.PI / 2) * progress;
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  sol.style.left = `${x}px`;
  sol.style.top = `${y}px`;

  if (progress < 1) {
    requestAnimationFrame(animateSol);
  } else {
    sol.classList.add("ocultando");
    setTimeout(() => {
      escribirTexto(mensajeFinal, texto);
    }, 800);
  }
}

function escribirTexto(elemento, texto, velocidad = 80) {
  elemento.textContent = "";
  elemento.style.opacity = 1;
  let i = 0;
  const intervalo = setInterval(() => {
    elemento.textContent += texto.charAt(i);
    i++;
    if (i >= texto.length) {
      clearInterval(intervalo);
      elemento.style.borderRight = "none";
    }
  }, velocidad);
}

requestAnimationFrame(animateSol);

window.addEventListener("resize", () => {
  radius = getResponsiveRadius();
  ({ x: centerX, y: centerY } = getCenter());
});