/* script.js — Syria Dignity Sept 2026 */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
    document.getElementById('hero-bg').classList.add('loaded');
  }, 2400);
});

/* ── PROGRESS ── */
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  const max = document.body.scrollHeight - window.innerHeight;
  document.getElementById('progress').style.transform = `scaleX(${s / max})`;
  document.getElementById('main-nav').classList.toggle('scrolled', s > 60);
});

/* ── REVEAL §2.3.4 ── */
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ── NUMBERS ANIMATE §8.4 ── */
const numObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('lit');
      numObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.num-val').forEach(el => numObs.observe(el));

/* ── LIGHTBOX §8.3ب.4 — اليمين للسابق ── */
const slides = [
  { src: 'images/slide-08.jpg', title: 'صرخة الحي الحر', desc: 'شاب سوري يصرخ بألمه في وضح النهار ويعود إلى بيته.' },
  { src: 'images/slide-01.jpg', title: 'آلاف تمشي لا تُساق', desc: 'حشد عائد إلى البيت تحت علم الثورة. لم يُعتقل أحد.' },
  { src: 'images/slide-09.jpg', title: 'علمٌ نجا', desc: 'علم الثورة على جدار، ومعه العهد.' },
  { src: 'images/slide-10.jpg', title: 'نوم الآمن', desc: 'أب نائم مع أطفاله. كان هذا حلماً. اليوم صار حقاً.' },
  { src: 'images/slide-02.jpg', title: 'الناس يريد نكرامة', desc: 'يدان مُتعبتان تمسكان لافتة مكتوبة بخط اليد.' },
];
let currentSlide = 0;

function openLb(idx) {
  currentSlide = idx;
  renderLb();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function renderLb() {
  const s = slides[currentSlide];
  document.getElementById('lb-img').src = s.src;
  document.getElementById('lb-img').alt = s.title;
  document.getElementById('lb-title').textContent = s.title;
  document.getElementById('lb-desc').textContent = s.desc;
}
/* اليمين للسابق §8.3ب.4 */
document.getElementById('lb-prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  renderLb();
});
document.getElementById('lb-next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  renderLb();
});
document.getElementById('lb-close').addEventListener('click', closeLb);
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) closeLb();
});
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowRight') { currentSlide = (currentSlide - 1 + slides.length) % slides.length; renderLb(); }
  if (e.key === 'ArrowLeft') { currentSlide = (currentSlide + 1) % slides.length; renderLb(); }
});

/* wire gallery items */
document.querySelectorAll('.m-item[data-slide]').forEach(el => {
  el.addEventListener('click', () => openLb(parseInt(el.dataset.slide)));
});

/* ── SHARE §8.6 ── */
const PAGE_URL = window.location.href;
const PAGE_TITLE = 'اختلفنا على الأسعار: انتصرنا بالكرامة | سوريا ١٤ سبتمبر ٢٠٢٦';

document.getElementById('btn-share-native')?.addEventListener('click', async () => {
  if (navigator.share) {
    try { await navigator.share({ title: PAGE_TITLE, url: PAGE_URL }); } catch (e) { /* cancelled */ }
  }
});

document.getElementById('btn-copy')?.addEventListener('click', () => {
  navigator.clipboard.writeText(PAGE_URL).then(() => {
    const c = document.getElementById('copy-confirm');
    c.classList.add('show');
    setTimeout(() => c.classList.remove('show'), 2200);
  });
});

document.getElementById('btn-whatsapp')?.addEventListener('click', () => {
  window.open(`https://wa.me/?text=${encodeURIComponent(PAGE_TITLE + '\n' + PAGE_URL)}`, '_blank', 'noopener');
});
document.getElementById('btn-telegram')?.addEventListener('click', () => {
  window.open(`https://t.me/share/url?url=${encodeURIComponent(PAGE_URL)}&text=${encodeURIComponent(PAGE_TITLE)}`, '_blank', 'noopener');
});
document.getElementById('btn-twitter')?.addEventListener('click', () => {
  window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(PAGE_TITLE)}&url=${encodeURIComponent(PAGE_URL)}`, '_blank', 'noopener');
});
