// ---------- Theme ----------
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme') || 'dark';
body.classList.toggle('light-theme', saved === 'light');

themeToggle.addEventListener('click', () => {
  const isLight = body.classList.toggle('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ---------- Mobile Nav ----------
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const spans = mobileToggle.querySelectorAll('span');
  const isOpen = navMenu.classList.contains('active');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(7px, -6px)' : '';
});

// ---------- Smooth Scroll ----------
function scrollToEl(selector) {
  document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
}

// ---------- GSAP Animations ----------
gsap.registerPlugin(ScrollTrigger);

// Hero
gsap.timeline()
  .from('.badge', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' })
  .from('.hero-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
  .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
  .from('.hero-desc', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
  .from('.hero-actions', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
  .from('.hero-visual', { x: 50, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.8');

// Skill bars
gsap.utils.toArray('.skill-bar .fill').forEach((bar) => {
  const width = bar.dataset.width;
  ScrollTrigger.create({
    trigger: bar,
    start: 'top 80%',
    onEnter: () => gsap.to(bar, { width: `${width}%`, duration: 1.5, ease: 'power2.out' })
  });
});

// Project cards
gsap.utils.toArray('.project-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: { trigger: card, start: 'top 80%' },
    y: 50, opacity: 0, duration: 0.8, ease: 'power2.out', delay: i * 0.1
  });
});

// ---------- Contact Form ----------
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const txt = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    alert('Message sent. I’ll reply within 24 hours.');
    e.target.reset();
    btn.textContent = txt;
    btn.disabled = false;
  }, 1500);
});