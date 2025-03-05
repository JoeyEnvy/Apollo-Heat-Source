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

//gallery Index page 


document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('gallery-grid');
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');

    const images = [10, 11, 12, 13, 14, 15, 21, 22, 17, 18, 19, 20].map(i => `images/${i}.webp`);
    let currentSlide = 0;

    // Create gallery items
    images.forEach((src, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${src}" alt="Gallery image ${index + 1}">
            <div class="overlay">
                <a href="services.html" class="view-more-btn">View More</a>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });

    // Slider functionality
    function updateSlider() {
        sliderContainer.innerHTML = `
            <div class="slider-item">
                <img src="${images[currentSlide]}" alt="Gallery image ${currentSlide + 1}">
                <div class="overlay">
                    <a href="services.html" class="view-more-btn">View More</a>
                </div>
            </div>
        `;
    }

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        updateSlider();
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % images.length;
        updateSlider();
    });

    // Initialize slider
    updateSlider();

    // Responsive behavior
    function handleResponsive() {
        if (window.innerWidth <= 480) {
            galleryGrid.style.display = 'none';
            document.querySelector('.gallery-slider').style.display = 'block';
        } else {
            galleryGrid.style.display = 'grid';
            document.querySelector('.gallery-slider').style.display = 'none';
        }
    }

    // Initial call and event listener for resize
    handleResponsive();
    window.addEventListener('resize', handleResponsive);

    // Touch swipe functionality for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            currentSlide = (currentSlide + 1) % images.length;
        } else if (touchEndX - touchStartX > 50) {
            // Swipe right
            currentSlide = (currentSlide - 1 + images.length) % images.length;
        }
        updateSlider();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Select all necessary DOM elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const menu = document.getElementById('menu');
    const navbarContent = document.getElementById('navbar-content');
    const topBar = document.querySelector('.top-bar');

    // Function to toggle the mobile menu
    function toggleMenu() {
        // Toggle 'show' class on menu to display/hide it
        menu.classList.toggle('show');
        // Toggle 'active' class on hamburger for visual feedback
        hamburger.classList.toggle('active');
    }

    // Add click event listener to hamburger menu
    hamburger.addEventListener('click', toggleMenu);

    // Function to handle scroll effects
    function handleScroll() {
        // Check if page has been scrolled more than 30% of viewport height
        if (window.scrollY > 30 * window.innerHeight / 100) {
            // Add 'scrolled' class to navbar for styling
            navbar.classList.add('scrolled');
            
            // Match top bar style with navbar content on scroll
            topBar.style.backgroundColor = getComputedStyle(navbarContent).backgroundColor;
            topBar.style.opacity = getComputedStyle(navbarContent).opacity;
            topBar.style.color = getComputedStyle(navbarContent).color;
        } else {
            // Remove 'scrolled' class when scrolled back to top
            navbar.classList.remove('scrolled');
            
            // Reset top bar styles to default
            topBar.style.backgroundColor = '';
            topBar.style.opacity = '';
            topBar.style.color = '';
        }
    }

    // Add scroll event listener to window
    window.addEventListener('scroll', handleScroll);

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        // Check if click is inside menu or hamburger
        const isClickInside = menu.contains(event.target) || hamburger.contains(event.target);
        // If click is outside and menu is open, close it
        if (!isClickInside && menu.classList.contains('show')) {
            toggleMenu();
        }
    });

    // Implement smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Scroll to the target element smoothly
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Back to top button functionality
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Reviews page slider
document.addEventListener('DOMContentLoaded', function() {
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });
});
