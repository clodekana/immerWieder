// 1. BACKGROUND SLIDER LOGIK
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Intervall für den Hintergrundwechsel (5 Sekunden)
setInterval(nextSlide, 5000);

// 2. EVENT SCROLLER LOGIK (BUTTONS)
function scrollG(distance) {
    const container = document.getElementById('event-scroller');
    container.scrollBy({
        left: distance,
        behavior: 'smooth'
    });
}

// 3. EVENT VERGRÖSSERUNG (KLICK-EFFEKT)
function toggleExpand(card) {
    // Falls eine Karte bereits groß ist, verkleinere sie
    const allCards = document.querySelectorAll('.event-card');
    
    allCards.forEach(c => {
        if (c !== card) {
            c.classList.remove('expanded');
        }
    });

    // Aktuelle Karte umschalten
    card.classList.toggle('expanded');
}

// 4. NAVBAR SCROLL EFFEKT (Optional: wird dunkler beim Scrollen)
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.05)';
    }
});