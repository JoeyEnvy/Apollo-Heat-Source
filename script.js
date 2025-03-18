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
                <a href="gallery.html" class="view-more-btn">View More</a>
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
                    <a href="gallery.html" class="view-more-btn">View More</a>
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
        if (window.innerWidth <= 768) { // Changed from 480 to 768
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


//navbar scroll and hamburger effects





document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const menu = document.getElementById('menu');
    const navbarContent = document.getElementById('navbar-content');
    const topBar = document.querySelector('.top-bar');
    const menuLinks = menu.querySelectorAll('a');

    function toggleMenu() {
        menu.classList.toggle('show');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    hamburger.addEventListener('click', toggleMenu);

    function handleScroll() {
        const scrollThreshold = 30 * window.innerHeight / 100;
        const isScrolled = window.scrollY > scrollThreshold;
        
        document.body.classList.toggle('is-scrolled', isScrolled);

        if (isScrolled) {
            menu.style.top = `${navbar.offsetHeight}px`;
        } else {
            menu.style.top = '';
        }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Call once on page load

    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !hamburger.contains(event.target) && menu.classList.contains('show')) {
            toggleMenu();
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (menu.classList.contains('show')) toggleMenu();
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


//FAQ index page clickables 

document.querySelectorAll('.faq-item h3').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');

        // Close all other answers
        document.querySelectorAll('.faq-item h3').forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.style.maxHeight = null;
        });

        // Toggle the clicked question
        if (!isActive) {
            question.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});


//NAVBAR ANCHORS SMOOTH SCROLLING 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


//script for hero top sections reviews page slider underneath intro bar 

        document.addEventListener('DOMContentLoaded', function() {
            const reviewsSlider = document.querySelector('.reviews-hero-top-slider__wrapper');
            const reviewsItems = document.querySelectorAll('.reviews-hero-top-slider__item');
            const reviewsPrevBtn = document.querySelector('.reviews-hero-top-slider__prev');
            const reviewsNextBtn = document.querySelector('.reviews-hero-top-slider__next');
            let reviewsCurrentIndex = 0;

            function showReviewsSlide(index) {
                if (index < 0) {
                    reviewsCurrentIndex = reviewsItems.length - 1;
                } else if (index >= reviewsItems.length) {
                    reviewsCurrentIndex = 0;
                } else {
                    reviewsCurrentIndex = index;
                }
                const offset = -reviewsCurrentIndex * 100;
                reviewsSlider.style.transform = `translateX(${offset}%)`;
            }

            function showNextReviewsSlide() {
                showReviewsSlide(reviewsCurrentIndex + 1);
            }

            function showPrevReviewsSlide() {
                showReviewsSlide(reviewsCurrentIndex - 1);
            }

            reviewsNextBtn.addEventListener('click', showNextReviewsSlide);
            reviewsPrevBtn.addEventListener('click', showPrevReviewsSlide);

            // Auto-slide every 5 seconds
            setInterval(showNextReviewsSlide, 5000);
        });

//reviews page call to action and testimonials 

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? 1 : 0;
            slide.style.transform = i === index ? 'scale(1.05)' : 'scale(1)'; /* Small zoom */
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 5000);
});




//gallery page filtering shadowing and lightbox 

// Gallery filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Lightbox functionality
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

galleryItems.forEach(item => {
  item.addEventListener('click', e => {
    lightbox.classList.add('active');
    const img = document.createElement('img');
    img.src = e.currentTarget.querySelector('img').src;
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }
    lightbox.appendChild(img);
  });
});

lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return;
  lightbox.classList.remove('active');
});


//gallerypage testimonials autoscroll slider 

