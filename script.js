const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Scroll progress bar
const progressEl = document.querySelector('.progress span');
const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressEl) progressEl.style.width = `${progress}%`;
};
document.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Mobile navigation toggle
const headerEl = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
if (navToggle && headerEl) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        headerEl.classList.toggle('open');
    });
}

// Intersection Observer for reveal animations (respects reduced motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
    document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));
}

// Parallax effect: apply to elements with data-parallax="speed" (skip if reduced motion)
// Exclude the sticky header to avoid breaking its position behavior
const parallaxElements = Array.from(document.querySelectorAll('[data-parallax]:not(.site-header)'));
const applyParallax = () => {
    if (prefersReducedMotion) return;
    const scrollY = window.scrollY;
    for (const el of parallaxElements) {
        const speed = Number(el.getAttribute('data-parallax')) || 0.2;
        el.style.transform = `translate3d(0, ${scrollY * speed * -0.15}px, 0)`;
    }
};
document.addEventListener('scroll', applyParallax, { passive: true });
applyParallax();

// Hover Tilt for elements with .tilt (skip if reduced motion)
const tiltElements = Array.from(document.querySelectorAll('.tilt'));
if (!prefersReducedMotion) {
    for (const el of tiltElements) {
        const bounds = () => el.getBoundingClientRect();
        const onMove = (e) => {
            const b = bounds();
            const relX = (e.clientX - b.left) / b.width; // 0..1
            const relY = (e.clientY - b.top) / b.height; // 0..1
            const rotY = clamp((relX - 0.5) * 16, -14, 14);
            const rotX = clamp((0.5 - relY) * 16, -14, 14);
            el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        };
        const onLeave = () => {
            el.style.transform = 'rotateX(0deg) rotateY(0deg)';
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
    }
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Scroll-to-top button visibility and behavior
const toTopBtn = document.querySelector('.to-top');
const toggleToTop = () => {
    if (!toTopBtn) return;
    const show = window.scrollY > 500;
    toTopBtn.classList.toggle('show', show);
};
document.addEventListener('scroll', toggleToTop, { passive: true });
toggleToTop();
if (toTopBtn) {
    toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}



