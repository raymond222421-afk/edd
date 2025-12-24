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

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar')) {
    navMenu.classList.remove('active');
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  }
});

// ---------- Smooth Scroll ----------
function scrollToEl(selector) {
  document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
}

// ---------- GSAP Animations ----------
gsap.registerPlugin(ScrollTrigger);

// Custom cursor effect for interactive elements
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-bar');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// Hero animations
const heroTl = gsap.timeline({
  defaults: { duration: 1, ease: 'expo.out' }
});

heroTl
  .from('.navbar', { y: -100, opacity: 0 })
  .from('.badge', { y: 40, opacity: 0 }, '-=0.6')
  .from('.hero-title', { y: 40, opacity: 0, duration: 1.2 }, '-=0.4')
  .from('.hero-subtitle', { y: 40, opacity: 0 }, '-=0.8')
  .from('.hero-desc', { y: 40, opacity: 0 }, '-=0.6')
  .from('.hero-actions', { y: 40, opacity: 0 }, '-=0.4')
  .from('.hero-visual', {
    x: 60,
    opacity: 0,
    rotate: 6,
    duration: 1.2,
  }, '-=0.8')
  .from('.code-card', {
    x: 100,
    opacity: 0,
    rotate: -12,
    duration: 1.2
  }, '-=0.8');

// About section counters
const stats = gsap.utils.toArray('.stat');
stats.forEach(statContainer => {
  const stat = statContainer.querySelector('h4');
  const suffix = statContainer.dataset.suffix || '';
  const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
  let value = { val: 0 };
  
  gsap.set(stat, { textContent: '0' + suffix });
  
  ScrollTrigger.create({
    trigger: statContainer,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(value, {
        val: target,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          stat.textContent = Math.round(value.val).toLocaleString() + suffix;
        }
      });
    },
    once: true
  });
});

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