/* ── NAVBAR SCROLL ───────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── SMOOTH SCROLL (data-scroll) ────────────────── */
function scrollToEl(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-scroll]');
  if (btn) { e.preventDefault(); scrollToEl(btn.dataset.scroll); closeMobileMenu(); }
});
document.getElementById('logoLink').addEventListener('click', e => {
  e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── MOBILE MENU ─────────────────────────────────── */
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon   = document.getElementById('menuIcon');
const closeIcon  = document.getElementById('closeIcon');

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  menuIcon.style.display = 'block';
  closeIcon.style.display = 'none';
}

document.getElementById('hamburger').addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuIcon.style.display  = open ? 'none'  : 'block';
  closeIcon.style.display = open ? 'block' : 'none';
});

/* ── CANVAS PARTICLES ────────────────────────────── */
const canvas = document.getElementById('heroCanvas');
const ctx    = canvas.getContext('2d');
const COLORS = ['#B8A099','#B8989F','#98AFB8'];
let particles = [];

function initCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  particles = [];
  const n = Math.floor((canvas.width * canvas.height) / 15000);
  for (let i = 0; i < n; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3,
      a: Math.random() * .4 + .1,
      c: COLORS[Math.floor(Math.random() * COLORS.length)]
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width)  p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.globalAlpha = p.a;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', initCanvas);
initCanvas();
drawParticles();

/* ── SCROLL REVEAL ───────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentNode.querySelectorAll('.reveal')];
    const i = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), i * 100);
    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── COLOR QUIZ ──────────────────────────────────── */
const QUESTIONS = [
  { q: 'What color are your eyes?', opts: [
    { l:'Warm brown or hazel',        s:'Warm' },
    { l:'Deep brown or black',         s:'Deep' },
    { l:'Blue or gray',                s:'Cool' },
    { l:'Green or light hazel',        s:'Soft' }]},
  { q: 'What is your natural hair color?', opts: [
    { l:'Golden blonde or light brown', s:'Warm' },
    { l:'Dark brown or black',          s:'Deep' },
    { l:'Ash blonde or cool brown',     s:'Cool' },
    { l:'Soft brown or auburn',         s:'Soft' }]},
  { q: 'How does your skin react to the sun?', opts: [
    { l:'Tans easily, golden undertone',s:'Warm' },
    { l:'Deep tan, rich undertone',     s:'Deep' },
    { l:'Burns easily, pink undertone', s:'Cool' },
    { l:'Tans moderately, neutral',     s:'Soft' }]},
  { q: 'Which jewelry looks best on you?', opts: [
    { l:'Gold, warm tones',             s:'Warm' },
    { l:'Both, bold pieces',            s:'Deep' },
    { l:'Silver, cool tones',           s:'Cool' },
    { l:'Rose gold, soft metals',       s:'Soft' }]},
  { q: 'Which colors do you gravitate toward?', opts: [
    { l:'Warm coral, peach, olive',     s:'Warm' },
    { l:'Rich burgundy, emerald, navy', s:'Deep' },
    { l:'Cool mint, lavender, icy blue',s:'Cool' },
    { l:'Dusty rose, sage, warm gray',  s:'Soft' }]}
];

const PALETTES = {
  Warm: { name:'Warm & Radiant',  sub:'Spring / Autumn Undertone',  badge:'badge-taupe', colors:['#E8A87C','#D4A574','#C4956A','#B8A099','#A68B5B','#D9C4A0','#E6C9A8','#C9A87C'], desc:'You glow in warm, earthy tones with golden undertones. Think coral, peach, olive, and warm browns.' },
  Deep: { name:'Deep & Rich',     sub:'Winter / Autumn Depth',      badge:'badge-mauve', colors:['#4A1C2C','#2C4A3E','#1E3A5F','#5D3A3A','#3D2B1F','#2F2F4F','#4B3A2F','#3A2F4B'], desc:'You are striking in bold, saturated colors. Think jewel tones, rich burgundy, and deep forest green.' },
  Cool: { name:'Cool & Crisp',    sub:'Winter / Summer Undertone',  badge:'badge-slate', colors:['#98AFB8','#7B9EAA','#A8C4D4','#B8C4CE','#C4D4E0','#8BA8B8','#A0B8C4','#9CA8B8'], desc:'You shine in cool, muted tones. Think silver, dusty blue, lavender, and soft gray.' },
  Soft: { name:'Soft & Muted',    sub:'Summer / Autumn Softness',   badge:'badge-mauve', colors:['#B8989F','#C4A8AD','#B0A0A8','#A898A0','#C8B0B8','#B8A8B0','#D0B8C0','#A8A0A8'], desc:'You look best in gentle, blended tones. Think dusty rose, sage, warm gray, and soft mauve.' }
};

let qStep = 0, qAnswers = [], qLocked = false;

function renderQuestion() {
  const data = QUESTIONS[qStep];
  document.getElementById('quizCounter').textContent = `Question ${qStep + 1} of ${QUESTIONS.length}`;
  document.getElementById('quizProgress').style.width = `${(qStep / QUESTIONS.length) * 100}%`;
  document.getElementById('quizQuestion').textContent = data.q;

  const wrap = document.getElementById('quizOptions');
  wrap.innerHTML = '';
  data.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.innerHTML = `<span>${opt.l}</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    btn.addEventListener('click', () => {
      if (qLocked) return;
      qLocked = true;
      btn.classList.add('selected');
      qAnswers.push(opt.s);
      setTimeout(() => {
        if (qStep < QUESTIONS.length - 1) { qStep++; qLocked = false; renderQuestion(); }
        else showResult();
      }, 380);
    });
    wrap.appendChild(btn);
  });
}

function calcResult() {
  const c = {};
  qAnswers.forEach(a => c[a] = (c[a]||0) + 1);
  return PALETTES[Object.entries(c).sort((a,b)=>b[1]-a[1])[0][0]];
}

function showResult() {
  const r = calcResult();
  document.getElementById('quizQuestions').style.display = 'none';
  const el = document.getElementById('quizResult');
  el.style.display = 'block';
  el.innerHTML = `
    <div class="quiz-result-inner">
      <div class="result-badge ${r.badge}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
        Your Color Direction
      </div>
      <h3 class="result-name">${r.name}</h3>
      <p class="result-sub">${r.sub}</p>
      <p class="result-desc">${r.desc}</p>
      <div class="color-swatches">
        ${r.colors.map(c=>`<div class="swatch" style="background:${c}"><div class="swatch-tip"><span>${c}</span></div></div>`).join('')}
      </div>
      <div class="result-actions">
        <button class="btn-retake" id="retakeBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 .49-3.54"></path></svg>
          Retake Quiz
        </button>
        <button class="btn-book-analysis" id="bookAnalysis">
          Book a Full Analysis
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    </div>`;
  document.getElementById('retakeBtn').addEventListener('click', () => {
    qStep = 0; qAnswers = []; qLocked = false;
    el.style.display = 'none';
    document.getElementById('quizQuestions').style.display = 'block';
    renderQuestion();
  });
  document.getElementById('bookAnalysis').addEventListener('click', () => scrollToEl('#contact'));
}

renderQuestion();

/* ── TESTIMONIALS ────────────────────────────────── */
const TESTIMONIALS = [
  { name:'Elena M.',   role:'Marketing Director', season:'Warm & Radiant', bg:'#B8A099', text:"I used to buy clothes in every color and hope for the best. After my session with Chroma, I finally understand why certain shades make me look tired and others make me glow. It's been life-changing." },
  { name:'Sarah K.',   role:'Interior Designer',  season:'Deep & Rich',    bg:'#B8989F', text:"The color quiz was so accurate I had to book the full analysis. My wardrobe feels intentional now. I get compliments almost every time I leave the house." },
  { name:'Jessica T.', role:'Entrepreneur',       season:'Cool & Crisp',   bg:'#98AFB8', text:"I was skeptical at first, but the science behind it is real. The digital palette lives on my phone and I reference it every time I shop. Best investment I've made in myself." },
  { name:'Amanda R.',  role:'Photographer',       season:'Soft & Muted',   bg:'#B8989F', text:"Not only did I learn my colors, but the styling consultation helped me put outfits together in ways I never considered. The shopping trip was incredibly efficient." }
];

let tIdx = 0;

function buildTestimonials() {
  const slides = document.getElementById('testimonialSlides');
  const dots   = document.getElementById('testimonialDots');
  TESTIMONIALS.forEach((t, i) => {
    const stars = Array(t.rating||5).fill(0).map(()=>`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`).join('');
    const slide = document.createElement('div');
    slide.className = 'testimonial-slide';
    slide.innerHTML = `
      <div class="stars">${stars}</div>
      <p class="t-quote">"${t.text}"</p>
      <div class="t-author">
        <div class="t-avatar" style="background:${t.bg}">${t.name[0]}</div>
        <div><div class="t-name">${t.name}</div><div class="t-role">${t.role} — ${t.season}</div></div>
      </div>`;
    slides.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goSlide(i));
    dots.appendChild(dot);
  });
}

function goSlide(i) {
  tIdx = i;
  document.getElementById('testimonialSlides').style.transform = `translateX(-${i * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('active', j === i));
}

document.getElementById('prevBtn').addEventListener('click', () => goSlide((tIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length));
document.getElementById('nextBtn').addEventListener('click', () => goSlide((tIdx + 1) % TESTIMONIALS.length));

let touchX = null;
const slider = document.getElementById('testimonialSlider');
slider.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; });
slider.addEventListener('touchend',   e => {
  if (touchX === null) return;
  const d = touchX - e.changedTouches[0].clientX;
  if (Math.abs(d) > 50) goSlide(d > 0 ? (tIdx+1)%TESTIMONIALS.length : (tIdx-1+TESTIMONIALS.length)%TESTIMONIALS.length);
  touchX = null;
});

buildTestimonials();

/* ── CONTACT FORM ────────────────────────────────── */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> Send Message`;
    const ok = document.getElementById('formSuccess');
    ok.style.display = 'flex';
    e.target.reset();
    setTimeout(() => { ok.style.display = 'none'; }, 5000);
  }, 800);
});

/* ── FOOTER YEAR ─────────────────────────────────── */
document.getElementById('footerYear').textContent = new Date().getFullYear();
