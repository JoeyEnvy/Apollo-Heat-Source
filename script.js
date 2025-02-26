 //services page slider 

document.addEventListener('DOMContentLoaded', function() {
    const subtitles = document.querySelectorAll('.sliding-subtitle span');
    let currentIndex = 0;

    function showNextSubtitle() {
        // Remove 'exit' class from all spans
        subtitles.forEach(span => span.classList.remove('exit'));

        // Add 'exit' class to current subtitle and remove 'active'
        subtitles[currentIndex].classList.add('exit');
        subtitles[currentIndex].classList.remove('active');

        // Move to next subtitle
        currentIndex = (currentIndex + 1) % subtitles.length;

        // Add 'active' class to new current subtitle
        subtitles[currentIndex].classList.add('active');
    }

    // Show the first subtitle
    subtitles[0].classList.add('active');

    // Change subtitle every 3 seconds
    setInterval(showNextSubtitle, 3000);
});


    // Mobile slider touch events
    const mobileSlider = document.querySelector('.services-slider-mobile');
    let xDown = null;
    let yDown = null;

    mobileSlider.addEventListener('touchstart', handleTouchStart, false);
    mobileSlider.addEventListener('touchmove', handleTouchMove, false);

    function handleTouchStart(event) {
        const firstTouch = event.touches[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
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
});
