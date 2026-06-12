// ===== Hintergrund-Slider =====
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let sliderTimer = null;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function autoSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

function startSlider() {
    if (sliderTimer || slides.length < 2 || prefersReducedMotion) return;
    sliderTimer = setInterval(autoSlide, 6000);
}

function stopSlider() {
    clearInterval(sliderTimer);
    sliderTimer = null;
}

startSlider();

// Akku & Performance: pausieren, wenn der Tab nicht sichtbar ist
document.addEventListener('visibilitychange', () => {
    document.hidden ? stopSlider() : startSlider();
});

// ===== Abfahrtstafel: Zeilen aufklappen =====
const boardRows = document.querySelectorAll('button.board-row');

boardRows.forEach((row) => {
    row.addEventListener('click', () => {
        const detail = document.getElementById(row.getAttribute('aria-controls'));
        const isOpen = row.getAttribute('aria-expanded') === 'true';

        // Andere offene Zeilen schließen
        boardRows.forEach((other) => {
            if (other !== row) {
                other.setAttribute('aria-expanded', 'false');
                const d = document.getElementById(other.getAttribute('aria-controls'));
                if (d) d.hidden = true;
            }
        });

        row.setAttribute('aria-expanded', String(!isOpen));
        if (detail) detail.hidden = isOpen;
    });
});

// ===== DSGVO-freundliches Video: YouTube erst nach Klick laden =====
const facade = document.getElementById('videoFacade');

if (facade) {
    facade.querySelector('.play-btn').addEventListener('click', () => {
        const videoId = facade.dataset.videoId;
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
        iframe.title = 'Immer Wieder Lara – Live-Video';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        facade.innerHTML = '';
        facade.appendChild(iframe);
    });
}

// ===== Scroll-Reveal =====
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add('visible'));
}