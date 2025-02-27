document.addEventListener('DOMContentLoaded', function() {
    // Services page slider
    const subtitles = document.querySelectorAll('.sliding-subtitle span');
    let currentIndex = 0;

    function showNextSubtitle() {
        subtitles.forEach(span => span.classList.remove('exit'));
        subtitles[currentIndex].classList.add('exit');
        subtitles[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % subtitles.length;
        subtitles[currentIndex].classList.add('active');
    }

    if (subtitles.length > 0) {
        subtitles[0].classList.add('active');
        setInterval(showNextSubtitle, 3000);
    }

    // Mobile slider touch events
    const mobileSlider = document.querySelector('.services-slider-mobile');
    if (mobileSlider) {
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
            if (!xDown || !yDown) return;

            let xUp = event.touches[0].clientX;
            let yUp = event.touches[0].clientY;
            let xDiff = xDown - xUp;
            let yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    // Swipe left
                    mobileSlider.scrollBy({ top: 0, left: 150, behavior: 'smooth' });
                } else {
                    // Swipe right
                    mobileSlider.scrollBy({ top: 0, left: -150, behavior: 'smooth' });
                }
            }

            xDown = null;
            yDown = null;
        }
    }

    // Scroll bar change small all pages
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Reviews slider index page
    new Swiper('.reviews-slider', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 5000,
        allowTouchMove: false,
    });

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Sticky header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('sticky', window.scrollY > 0);
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navUl = document.querySelector('nav ul');
    if (mobileMenuToggle && navUl) {
        mobileMenuToggle.addEventListener('click', function() {
            navUl.classList.toggle('show');
        });
    }
});


//hamburger menu toggle

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');

    hamburger.addEventListener('click', function() {
        menu.classList.toggle('show');
    });
});

