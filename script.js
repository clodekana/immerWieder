// Hintergrund-Slider
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function autoSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(autoSlide, 5000);

// Event Slider Buttons
const container = document.getElementById('eventContainer');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: 350, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -350, behavior: 'smooth' });
});

// Event Vergrößerung beim Klicken
function toggleExpand(card) {
    // Alle anderen Karten zurücksetzen
    document.querySelectorAll('.event-card').forEach(c => {
        if (c !== card) c.classList.remove('expanded');
    });
    // Aktuelle Karte umschalten
    card.classList.toggle('expanded');
}