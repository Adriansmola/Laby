const slider = document.querySelector('#slider');
const slides = document.querySelector('.slides');
const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');
const dots = document.querySelectorAll('#dots .dot'); // Updated selector
const slideWidth = 600; // Szerokość pojedynczego slajdu
let currentSlide = 0;

// Funkcja przewijania slajdów
function goToSlide(slideIndex) {
    slides.style.transition = 'transform 0.4s ease-in-out'; // Dodaj animację przewijania
    slides.style.transform = `translateX(-${slideIndex * slideWidth}px`;
    currentSlide = slideIndex;
    updateDots();
}
// Funkcja aktualizacji kropek
function updateDots() {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
}
// Obsługa kliknięcia przycisku "Następny"
nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % 6; // 6 to liczba slajdów
    goToSlide(currentSlide);
});

// Obsługa kliknięcia przycisku "Poprzedni"
prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + 6) % 6; // 6 to liczba slajdów
    goToSlide(currentSlide);
});

// Obsługa kliknięcia kropki
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Funkcja przewijania slajdów w pętli
function autoSlide() {
    currentSlide = (currentSlide + 1) % 6; // 6 to liczba slajdów
    goToSlide(currentSlide);
    setTimeout(autoSlide, 5000);
}
// Przewiń na pierwszy slajd po załadowaniu strony
goToSlide(0);
// Rozpocznij automatyczne przewijanie
autoSlide();
