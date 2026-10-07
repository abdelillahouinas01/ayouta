// ==========================================
// 1. مصفوفة الاعترافات باللغة الإنجليزية
// ==========================================
const confessions = [
  "In a world full of temporary things, you are my perpetual constant.",
  "Every single detail about you feels like pure magic to my soul.",
  "Loving you is not just a choice; it's as natural as breathing.",
  "You brought colors into my world that I never even knew existed.",
  "No matter where life leads us, my heart will always belong to JUI."
];

let currentIndex = 0;
const quoteTextEl = document.getElementById("confessionText");
const dotsContainer = document.getElementById("dotsContainer");
const interactiveBtn = document.getElementById("interactiveBtn");

// ==========================================
// 2. إنشاء مؤشرات النقاط (Progress Dots)
// ==========================================
confessions.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateConfession() {
  // إخفاء النص الحالي
  quoteTextEl.classList.remove("visible");

  setTimeout(() => {
    // تحديث النص
    quoteTextEl.textContent = confessions[currentIndex];
    quoteTextEl.classList.add("visible");

    // تحديث النقاط النشطة
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });

    // الانتقال للجملة التالية
    currentIndex = (currentIndex + 1) % confessions.length;
  }, 600); // إعطاء وقت للانتقال التدريجي
}

// البدء التلقائي وتبديل الجملة كل 4.5 ثوانٍ
updateConfession();
let autoCycle = setInterval(updateConfession, 4500);

// تفاعل زر الضغط manual trigger
interactiveBtn.addEventListener("click", (e) => {
  clearInterval(autoCycle);
  updateConfession();
  createHeartBurst(e.clientX, e.clientY);
  autoCycle = setInterval(updateConfession, 4500);
});

// ==========================================
// 3. تأثير انبعاث القلوب التفاعلي عند النقر
// ==========================================
function createHeartBurst(x, y) {
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${Math.random() * 20 + 15}px`;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "100";
    
    const destinationX = (Math.random() - 0.5) * 200;
    const destinationY = (Math.random() - 0.5) * 200;

    heart.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`, opacity: 0 }
    ], {
      duration: 1000 + Math.random() * 500,
      easing: 'cubic-bezier(0, .9, .57, 1)'
    }).onfinish = () => heart.remove();

    document.body.appendChild(heart);
  }
}

// ==========================================
// 4. خلفية الجسيمات المضيئة (Particle Canvas)
// ==========================================
const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
    this.alpha = Math.random() * 0.6 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.fillStyle = `rgba(255, 117, 140, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 60; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();