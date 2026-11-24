/* ============================================================
   script.js — Yashika's Birthday Website
   ============================================================ */

/* ----------------------------------------------------------
   ⚙️  CONFIG — Edit these before deploying
   ---------------------------------------------------------- */

// 1. Flashback video path (stored directly in the repo under assets/)
//    ✅ 18 MB is well within GitHub's 100 MB per-file limit.
//    Just place your video as: assets/flashback.mp4
//    Supported formats: .mp4 (recommended), .webm, .mov
const VIDEO_SRC = "assets/flashback.mp4";

// 2. Formspree endpoint (for the silent "Explore" notification)
//    How to set up (free — no backend needed):
//    a) Go to https://formspree.io  → Sign up
//    b) Click "New Form" → name it "Birthday Explore Notify"
//    c) Set "Redirect" to OFF  (we don't want a redirect)
//    d) Copy your endpoint: https://formspree.io/f/XXXXXXX
//    e) Paste it below
const FORMSPREE_URL = "https://formspree.io/f/xkjrkqdn";

// 3. Your photos (file names inside assets/photos/)
//    Add exactly your photo filenames in the order you want them shown.
const PHOTOS = [
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg",
  "photo4.jpg",
  "photo5.jpg",
  "photo6.jpg",
  "photo7.jpg",
  "photo8.jpg",
  "photo9.jpg",
  "photo10.jpg",
  "photo11.jpg",
  "photo12.jpg",
  "photo13.jpg",
  "photo14.jpg",
];

// 4. Caption shown under every polaroid
const CAPTION = "The Beauty";

/* ----------------------------------------------------------
   INTERNAL CONSTANTS
   ---------------------------------------------------------- */
const TILT_ANGLES  = [-5, -3, 2, 4, -1.5, 3.5, -4, 1, 5, -2.5, 3, -6, 1.5, -3.5];
const LIGHT_COLORS = ["#FFB6C1","#FFD700","#FF69B4","#FFA07A","#DDA0DD","#87CEEB","#FFA500"];
const PARTICLES    = ["💕","🌸","✨","💖","🌺","⭐","💫","🌷","🎀","💝"];
const PETAL_EMOJIS = ["🌸","🌺","🌷","🌹","💮","🏵️"];

/* ----------------------------------------------------------
   FAIRY LIGHTS BAR (fixed top)
   ---------------------------------------------------------- */
function buildFairyLights() {
  const bar   = document.getElementById("fairyLightsBar");
  const wire  = document.createElement("div");
  wire.className = "f-wire";
  bar.appendChild(wire);

  const count = Math.max(12, Math.floor(window.innerWidth / 55));

  for (let i = 0; i < count; i++) {
    const wrap  = document.createElement("div");
    wrap.className = "f-bulb-wrap";

    const stem  = document.createElement("div");
    stem.className = "f-stem";

    const bulb  = document.createElement("div");
    bulb.className = "f-bulb";
    const color = LIGHT_COLORS[i % LIGHT_COLORS.length];
    bulb.style.cssText = `
      background: ${color};
      box-shadow: 0 0 7px 2px ${color};
      --dur: ${(1.2 + Math.random() * 1.8).toFixed(2)}s;
      --delay: ${(Math.random() * 2).toFixed(2)}s;
    `;

    wrap.append(stem, bulb);
    bar.appendChild(wrap);
  }
}

/* ----------------------------------------------------------
   FLOATING PARTICLES (hero)
   ---------------------------------------------------------- */
function buildParticles() {
  const container = document.getElementById("particles");
  const count = window.innerWidth < 500 ? 12 : 22;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "p-emoji";
    el.textContent = PARTICLES[Math.floor(Math.random() * PARTICLES.length)];
    el.style.cssText = `
      left: ${(Math.random() * 100).toFixed(1)}%;
      font-size: ${(0.9 + Math.random() * 1.4).toFixed(2)}rem;
      animation-duration: ${(7 + Math.random() * 11).toFixed(1)}s;
      animation-delay: ${(Math.random() * 12).toFixed(1)}s;
    `;
    container.appendChild(el);
  }
}

/* ----------------------------------------------------------
   STRING LIGHTS DIVIDER
   ---------------------------------------------------------- */
function buildStringLights() {
  const row   = document.getElementById("lightsRow");
  const count = Math.max(10, Math.floor(window.innerWidth / 50));

  for (let i = 0; i < count; i++) {
    const wrap  = document.createElement("div");
    wrap.className = "sl-wrap";

    const stem  = document.createElement("div");
    stem.className = "sl-stem";

    const dot   = document.createElement("div");
    dot.className = "sl-dot";
    const color = LIGHT_COLORS[i % LIGHT_COLORS.length];
    dot.style.cssText = `
      background: ${color};
      box-shadow: 0 0 10px 3px ${color};
      --dur: ${(1.5 + Math.random() * 2).toFixed(2)}s;
      --delay: ${(i * 0.08).toFixed(2)}s;
    `;

    wrap.append(stem, dot);
    row.appendChild(wrap);
  }
}

/* ----------------------------------------------------------
   POLAROID GALLERY (populated dynamically)
   ---------------------------------------------------------- */
function buildGallery() {
  const grid = document.getElementById("polaroidGrid");

  PHOTOS.forEach((filename, idx) => {
    const card = document.createElement("div");
    card.className = "polaroid";
    card.style.cssText = `
      --tilt: ${TILT_ANGLES[idx % TILT_ANGLES.length]}deg;
      transition-delay: ${((idx % 4) * 0.08).toFixed(2)}s;
    `;

    // Image — graceful fallback to placeholder emoji
    const img = document.createElement("img");
    img.className  = "pol-img";
    img.src        = `assets/photos/${filename}`;
    img.alt        = CAPTION;
    img.loading    = "lazy";
    img.onerror    = function () {
      this.style.display = "none";
      const ph = document.createElement("div");
      ph.className  = "pol-placeholder";
      ph.textContent = PARTICLES[idx % PARTICLES.length];
      card.insertBefore(ph, this);
    };

    // Caption
    const caption = document.createElement("div");
    caption.className   = "pol-caption";
    caption.textContent = CAPTION;

    card.append(img, caption);
    grid.appendChild(card);
  });
}

/* ----------------------------------------------------------
   SCROLL-REVEAL (IntersectionObserver)
   ---------------------------------------------------------- */
function setupScrollReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".polaroid").forEach((el) => io.observe(el));

  const msgCard = document.getElementById("messageCard");
  if (msgCard) io.observe(msgCard);
}

/* ----------------------------------------------------------
   CONFETTI BURST (canvas-based, runs on load)
   ---------------------------------------------------------- */
function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx    = canvas.getContext("2d");

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const COLORS = ["#FFB6C1","#FFD700","#FF69B4","#FFA07A","#DDA0DD","#E8738A","#D4AF37","#FF6B9D"];
  const SHAPES = ["circle","square","heart"];

  const pieces = Array.from({ length: 160 }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * -canvas.height,
    sz: 5 + Math.random() * 9,
    color:    COLORS[Math.floor(Math.random() * COLORS.length)],
    shape:    SHAPES[Math.floor(Math.random() * SHAPES.length)],
    vx:       -2.5 + Math.random() * 5,
    vy:       2 + Math.random() * 4.5,
    rot:      Math.random() * 360,
    rotSpeed: -4 + Math.random() * 8,
    life:     1,
  }));

  let frame = 0;
  const TOTAL = 320;

  (function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const alpha = Math.max(0, 1 - frame / TOTAL);

    pieces.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = p.life * alpha;
      ctx.translate(p.x + p.sz / 2, p.y + p.sz / 2);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.sz / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === "square") {
        ctx.fillRect(-p.sz / 2, -p.sz / 2, p.sz, p.sz);
      } else {
        // mini heart
        const s = p.sz * 0.55;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.35);
        ctx.bezierCurveTo(0, 0, -s, 0, -s, s * 0.45);
        ctx.bezierCurveTo(-s, s * 0.85, 0, s * 1.15, 0, s * 1.35);
        ctx.bezierCurveTo(0, s * 1.15,  s, s * 0.85,  s, s * 0.45);
        ctx.bezierCurveTo(s, 0, 0, 0, 0, s * 0.35);
        ctx.fill();
      }
      ctx.restore();

      p.x   += p.vx;
      p.y   += p.vy;
      p.rot += p.rotSpeed;
    });

    frame++;
    if (frame < TOTAL + 40) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  })();
}

/* ----------------------------------------------------------
   FALLING PETALS (message section)
   ---------------------------------------------------------- */
function buildPetals() {
  const container = document.getElementById("petalsContainer");
  const count = window.innerWidth < 500 ? 10 : 18;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className   = "petal";
    el.textContent = PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)];
    el.style.cssText = `
      left: ${(Math.random() * 100).toFixed(1)}%;
      font-size: ${(0.9 + Math.random() * 1.1).toFixed(2)}rem;
      animation-duration: ${(6 + Math.random() * 9).toFixed(1)}s;
      animation-delay: ${(Math.random() * 14).toFixed(1)}s;
    `;
    container.appendChild(el);
  }
}

/* ----------------------------------------------------------
   VIDEO MODAL
   ---------------------------------------------------------- */
function openVideo() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("videoPlayer");
  video.src   = VIDEO_SRC;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  // Auto-play once metadata is ready
  video.addEventListener("loadedmetadata", () => video.play(), { once: true });
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("videoPlayer");
  modal.classList.remove("open");
  video.pause();
  video.src = "";                       // stops buffering & playback
  document.body.style.overflow = "";
}

function closeVideoOnOverlay(e) {
  if (e.target === document.getElementById("videoModal")) closeVideo();
}

/* ----------------------------------------------------------
   SILENT NOTIFICATION — fires when Yashika clicks "Download Your Card"
   (uses Formspree — she only sees the download, D1 gets an email)
   ---------------------------------------------------------- */
function handleCardDownload() {
  // 1. Silently notify D1 — fire-and-forget, no UI change for Yashika
  fetch(FORMSPREE_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body:    JSON.stringify({
      _subject:  "\uD83D\uDC8C Yashika just opened her Birthday Card!",
      message:   "Yashika clicked 'Download Your Card' on her birthday website! She's reading it right now \uD83C\uDF82\uD83D\uDC95",
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    }),
  }).catch(() => {/* silent */});

  // 2. Trigger the actual PDF download — seamless from her side
  const link    = document.createElement("a");
  link.href     = "assets/card.pdf";
  link.download = "Happy_Birthday_Yashika.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ----------------------------------------------------------
   EXPLORE BUTTON — just scrolls to the gallery, nothing else
   ---------------------------------------------------------- */
function scrollToGallery() {
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
}

/* ----------------------------------------------------------
   KEYBOARD ESC → close modal
   ---------------------------------------------------------- */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeVideo();
});

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  buildFairyLights();
  buildParticles();
  buildStringLights();
  buildGallery();
  buildPetals();
  setupScrollReveal();

  // Slight delay so the page renders before confetti rains
  setTimeout(launchConfetti, 600);
});
