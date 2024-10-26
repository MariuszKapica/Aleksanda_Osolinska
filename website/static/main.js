/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)

   toggle.addEventListener('click', () =>{
       // Add show-menu class to nav menu
       nav.classList.toggle('show-menu')

       // Add show-icon to show and hide the menu icon
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle','nav-menu')

/*=============== SHOW DROPDOWNMENU ===============*/
// Zbierz wszystkie dropdowny
const dropdownItems = document.querySelectorAll('.dropdown__item');

// Dodaj nasłuchiwanie kliknięcia dla każdej strzałki w dropdownie oraz dla napisu
dropdownItems.forEach(item => {
    const arrow = item.querySelector('.dropdown__arrow');
    const title = item.querySelector('.dropdown__title'); // Element z napisem

    // Funkcja do przełączania dropdowna
    const toggleDropdown = () => {
        item.classList.toggle('open');
    };

    // Dodaj nasłuchiwacz kliknięcia dla strzałki
    if (arrow) {
        arrow.addEventListener('click', (event) => {
            event.stopPropagation(); // Zapobiega propagacji, aby uniknąć zamykania przy kliknięciu
            toggleDropdown();
        });
    }

    // Dodaj nasłuchiwacz kliknięcia dla napisu
    if (title) {
        title.addEventListener('click', (event) => {
            event.stopPropagation(); // Zapobiega propagacji
            toggleDropdown();
        });
    }
});

/*=============== SHOW FAQ ANSWER ===============*/
const questions = document.querySelectorAll('.faq__question')

questions.forEach(function (question) {
    question.addEventListener('click', function () {
        question.classList.toggle('open')
    })
})

/*=============== OFERTA FLIP CARD ===============*/
const card = document.querySelectorAll('.card__inner')

card.forEach(function (card) {
    card.addEventListener('click', function () {
        card.classList.toggle('flipped')
    })
})

/*=============== GALERIA ZDJĘĆ ROTATOR ===============*/
const gallery = document.getElementById('gallery');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

let scrollAmount = 0;
const imageWidth = gallery.querySelector('img').clientWidth; // Szerokość jednego zdjęcia
const visibleImages = 1; // Wyświetlamy 1 zdjęcia jednocześnie
const totalImages = gallery.children.length;
const maxScroll = imageWidth * (totalImages - visibleImages); // Maksymalny scroll (nie pokazujemy więcej niż 3 obrazki)

// Zmienne do obsługi touchmove
let startX = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let isDragging = false; // Flaga do śledzenia, czy użytkownik przeciąga galerię

// Function to update the 3D effect
function updateImageEffects() {
    const images = gallery.children;

    // Resetowanie wszystkich obrazków
    for (let i = 0; i < images.length; i++) {
        images[i].classList.remove('active'); // Usunięcie klasy active ze wszystkich zdjęć
        images[i].style.opacity = '0.5'; // Ustawienie przezroczystości dla zdjęć bocznych
        images[i].style.transform = 'scale(0.85)'; // Zmniejszenie skali dla zdjęć bocznych
        images[i].style.zIndex = '1'; // Domyślny z-index dla bocznych zdjęć
    }

    const activeIndex = Math.round(scrollAmount / imageWidth); // Aktualny indeks aktywnego zdjęcia

    // Ustawienia stylów dla aktywnego zdjęcia
    if (activeIndex < totalImages) {
        images[activeIndex].classList.add('active'); // Dodanie klasy active do aktualnego zdjęcia
        images[activeIndex].style.opacity = '1'; // Ustawienie pełnej przezroczystości dla aktywnego zdjęcia
        images[activeIndex].style.transform = 'scale(1)'; // Powiększenie aktywnego zdjęcia
        images[activeIndex].style.zIndex = '2'; // Przeniesienie aktywnego zdjęcia na przód
    }
}

// Funkcja do ustawienia pozycji galerii
function setGalleryPosition() {
    gallery.style.transform = `translateX(-${scrollAmount}px)`;
}

// Obsługa touchstart
gallery.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX; // Zapisz początkową pozycję dotyku
    previousTranslate = scrollAmount; // Zapisz poprzednią wartość przesunięcia
    isDragging = true; // Ustaw flagę, że użytkownik przeciąga
    gallery.style.transition = 'none'; // Wyłącz animację podczas przesuwania ręcznego
});

// Obsługa touchmove
gallery.addEventListener('touchmove', (event) => {
    if (isDragging) {
        const currentX = event.touches[0].clientX;
        const moveBy = startX - currentX; // Oblicz przesunięcie palca
        scrollAmount = previousTranslate + moveBy; // Aktualizuj pozycję przesunięcia

        // Ogranicz przesuwanie do granic galerii
        if (scrollAmount < 0) {
            scrollAmount = 0;
        } else if (scrollAmount > maxScroll) {
            scrollAmount = maxScroll;
        }

        setGalleryPosition(); // Aktualizuj pozycję galerii na podstawie przesunięcia
    }
});

// Obsługa touchend
gallery.addEventListener('touchend', () => {
    isDragging = false; // Przestajemy śledzić przesuwanie palca
    gallery.style.transition = 'transform 0.3s ease-in-out'; // Włącz animację dla płynnego wyrównania

    // Automatyczne wyrównanie do najbliższego zdjęcia
    const movedBy = scrollAmount % imageWidth;
    if (movedBy > imageWidth / 4) {
        scrollAmount += imageWidth - movedBy; // Przesuń do następnego zdjęcia, jeśli więcej niż połowa została przesunięta
    } else {
        scrollAmount -= movedBy; // Wyrównaj do aktualnego zdjęcia
    }

    setGalleryPosition(); // Aktualizuj pozycję galerii
    updateImageEffects(); // Zaktualizuj efekty dla aktywnego zdjęcia
});

// Function to handle image click
function handleImageClick(index) {
    scrollAmount = index * imageWidth; // Set the scroll amount based on the clicked image index
    gallery.style.transform = `translateX(-${scrollAmount}px)`; // Update the gallery position
    updateImageEffects(); // Update effects after clicking
}

// Add click event listeners to each image
const images = gallery.querySelectorAll('img');
images.forEach((image, index) => {
    image.addEventListener('click', () => handleImageClick(index));
});

rightArrow.addEventListener('click', () => {
    if (scrollAmount < maxScroll) {
        // Check if the next photo is the last one
        if (scrollAmount + imageWidth >= maxScroll) {
            // If it's the last photo, only move to the next image (one image displayed)
            scrollAmount += imageWidth; // Move to the last photo
            gallery.style.transform = `translateX(-${scrollAmount}px)`;
        } else {
            scrollAmount += imageWidth; // Move to the next set of 3 images
            gallery.style.transform = `translateX(-${scrollAmount}px)`;
        }
    } else {
        // If at the last image, loop back to the beginning
        scrollAmount = 0;
        gallery.style.transform = `translateX(0px)`;
    }
    updateImageEffects(); // Update effects after scrolling
});

leftArrow.addEventListener('click', () => {
    if (scrollAmount > 0) {
        scrollAmount -= imageWidth; // Move to the previous set of 3 images
        gallery.style.transform = `translateX(-${scrollAmount}px)`;
    } else {
        // If at the first image, loop back to the last image
        scrollAmount = maxScroll; // Move to the last image
        gallery.style.transform = `translateX(-${scrollAmount}px)`;
    }
    updateImageEffects(); // Update effects after scrolling
});
// Inicjalizacja efektów dla pierwszego zdjęcia
updateImageEffects();



/*=============== MODAL ===============*/
// Function to open the modal
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    modal.style.display = "flex";  // Pokaż modal
    modalImage.src = imageSrc;     // Ustaw obraz w modal
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Ukryj modal
}


