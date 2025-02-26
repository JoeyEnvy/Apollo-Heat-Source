 //services page slider 

// Animate subtitle
let subtitleIndex = 0;
const subtitles = document.querySelectorAll('.sliding-subtitle span');

function animateSubtitle() {
    subtitles.forEach((span) => span.classList.remove('active'));
    subtitles[subtitleIndex].classList.add('active');
    subtitleIndex = (subtitleIndex + 1) % subtitles.length;
}

setInterval(animateSubtitle, 3000);

// Services slider
const servicesSlider = document.querySelector('.services-slider');
const serviceCards = document.querySelectorAll('.service-card');

// Add event listeners for navigation (optional)
// For a basic slider, you might not need this, but it's useful if you add navigation controls
// servicesSlider.addEventListener('scroll', function() {
//     // Handle scroll event
// });

// For mobile slider
const mobileSlider = document.querySelector('.services-slider-mobile');
const mobileServiceCards = document.querySelectorAll('.service-card-mobile');

// Optional: Add touch event listeners for mobile slider
mobileSlider.addEventListener('touchstart', handleTouchStart, false);
mobileSlider.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(event) {
    if (event.touches.length === 1) {
        xDown = event.touches[0].clientX;
        yDown = event.touches[0].clientY;
    }
}

function handleTouchMove(event) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = event.touches[0].clientX;
    let yUp = event.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            // Swipe left
            mobileSlider.scrollBy({
                top: 0,
                left: 150,
                behavior: 'smooth'
            });
        } else {
            // Swipe right
            mobileSlider.scrollBy({
                top: 0,
                left: -150,
                behavior: 'smooth'
            });
        }
    }

    xDown = null;
    yDown = null;
}

