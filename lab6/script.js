const canvas = document.getElementById("canvas");
// pobranie kontekstu 2d z canvasa (domyślnie jest 3d)
const ctx = canvas.getContext("2d");
const balls = [];
const ballRadius = 10;
// minimalna odległość między piłkami aby narysować linię
const minDistanceToDrawLine = 100;
let lastTimestamp;
let fpsCounter = 0;

function init() {
  // pobranie szerokości i wysokości okna przeglądarki
  canvas.width = window.innerWidth;
  // odejmuje 100px od wysokości okna przeglądarki, żeby nie było scrolla i było widać przyciski
  canvas.height = window.innerHeight - 100;

  // ustawienie 250 piłek na ekranie
  for (let i = 0; i < 250; i++) {
    // dodanie piłki do tablicy piłek
    balls.push({
      // losowe położenie piłki na bazie szerokości i wysokości 
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    });
  }
}
function draw(timestamp) {
  // jeśli nie ma timestampu to ustawiamy go na aktualny czas który jest przyjmowany przez funkcję draw która działa cały czas
  if (!lastTimestamp) lastTimestamp = timestamp;
  // obliczanie czasu od ostatniego wywołania funkcji draw
  let elapsed = timestamp - lastTimestamp;

  // jeśli minęła sekunda to wyświetlamy fps
  if (elapsed > 1000) {
    document.getElementById("fps").innerText = `FPS: ${Math.round(
      // fpsCounter / (elapsed / 1000) - fpsCounter to ilość klatek w ciągu sekundy
      fpsCounter / (elapsed / 1000)
    )}`;
    fpsCounter = 0;
    // ustawienie timestampu na aktualny
    lastTimestamp = timestamp;
  }

  // Czyszczenie canvasa
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let drawnBalls = 0;

  // Rysowanie piłek 
  for (let i = 0; i < balls.length; i++) {
    const ballA = balls[i];

    ballA.x += ballA.dx;
    ballA.y += ballA.dy;

    if (ballA.x - ballRadius < 0 || ballA.x + ballRadius > canvas.width) {
      ballA.dx *= -1;
    }
    if (ballA.y - ballRadius < 0 || ballA.y + ballRadius > canvas.height) {
      ballA.dy *= -1;
    }

    ctx.beginPath();
    ctx.arc(ballA.x, ballA.y, ballRadius, 0, 2 * Math.PI);
    ctx.fill();

    for (let j = i + 1; j < balls.length; j++) {
      const ballB = balls[j];
      const distance = Math.hypot(ballA.x - ballB.x, ballA.y - ballB.y);

      if (distance < minDistanceToDrawLine) {
        ctx.beginPath();
        ctx.moveTo(ballA.x, ballA.y);
        ctx.lineTo(ballB.x, ballB.y);
        ctx.stroke();
      }
    }
    drawnBalls++;
  }

  document.getElementById("ballCount").innerText = `Drawn Balls: ${drawnBalls}`;
  fpsCounter++;
  // wywołanie funkcji draw przez przeglądarkę przez co cały czas jest ona wywoływana
  requestAnimationFrame(draw);
}

function startSimulation() {
  init();
  draw();
}

function resetSimulation() {
  balls.length = 0;
  init();
}

window.addEventListener("resize", () => {
  // pobranie szerokości i wysokości okna przeglądarki i ustawienie ich na canvasie po zmianie rozmiaru okna przeglądarki
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
