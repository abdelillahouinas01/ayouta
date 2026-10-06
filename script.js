const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
const heart = document.getElementById("heart");
const stage = document.getElementById("heartStage");
const cursorGlow = document.getElementById("cursorGlow");
const toast = document.getElementById("toast");
const quoteEl = document.getElementById("quote");
const revealBtn = document.getElementById("revealBtn");
const secret = document.getElementById("secret");

const quotes = [
  "If I could keep one beautiful thought close to me, it would be the thought of you.",
  "Your name has a quiet way of making an ordinary moment feel special.",
  "Some feelings do not need a perfect explanation. They just need to be honest.",
  "I hope life gives you countless reasons to smile, because your smile deserves them.",
  "Among a thousand little moments, somehow my favorite ones keep reminding me of you."
];

let quoteIndex = 0;
let particles = [];
let mouse = { x: innerWidth / 2, y: innerHeight / 2 };

function resizeCanvas() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  particles = Array.from({ length: Math.min(120, Math.floor(innerWidth / 10)) }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.5 + .2,
    speed: Math.random() * .25 + .05,
    alpha: Math.random() * .65 + .15
  }));
}
function drawStars() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (const p of particles) {
    p.y -= p.speed;
    if (p.y < -5) { p.y = innerHeight + 5; p.x = Math.random() * innerWidth; }
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawStars);
}
resizeCanvas(); drawStars();
addEventListener("resize", resizeCanvas);

addEventListener("pointermove", e => {
  mouse.x = e.clientX; mouse.y = e.clientY;
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";

  const rect = stage.getBoundingClientRect();
  const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
  const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
  heart.style.transform = `translate(${dx * 14}px, ${dy * 14}px) rotateX(${dy * -5}deg) rotateY(${dx * 7}deg) scale(1.02)`;
});

stage.addEventListener("pointerleave", () => heart.style.transform = "");

document.getElementById("nextQuote").addEventListener("click", () => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteEl.animate(
    [{opacity:0, transform:"translateY(8px)"},{opacity:1, transform:"translateY(0)"}],
    {duration:420, easing:"ease-out"}
  );
  quoteEl.textContent = quotes[quoteIndex];
});

revealBtn.addEventListener("click", () => {
  secret.classList.toggle("show");
  revealBtn.innerHTML = secret.classList.contains("show")
    ? "Hide the final message <span>↑</span>"
    : "Reveal the final message <span>✦</span>";
  showToast(secret.classList.contains("show") ? "A message from the heart ✦" : "Until next time ♡");
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.getElementById("soundBtn").addEventListener("click", e => {
  const label = e.currentTarget.querySelector("span");
  label.textContent = label.textContent === "OFF" ? "ON" : "OFF";
  showToast(label.textContent === "ON"
    ? "Ambient sound is ready — add your own audio in script.js."
    : "Sound turned off.");
});

document.querySelectorAll(".message-card").forEach(card => {
  card.addEventListener("pointermove", e => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - .5) * -5;
    const ry = ((e.clientX - r.left) / r.width - .5) * 5;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  });
  card.addEventListener("pointerleave", () => card.style.transform = "");
});

let clicks = 0;
heart.addEventListener("click", () => {
  clicks++;
  heart.animate(
    [{transform:"scale(1)"},{transform:"scale(1.22)"},{transform:"scale(1)"}],
    {duration:420, easing:"cubic-bezier(.2,.8,.2,1)"}
  );
  showToast(clicks % 3 === 0 ? "The heart noticed you ♥" : "A little heartbeat for JUI ♥");
});
