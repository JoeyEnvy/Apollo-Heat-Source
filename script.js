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












//gallery top underhero slider 

// Immediately Invoked Function Expression (IIFE) to create a unique namespace
(function() {
  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Use a very specific selector for the gallery slider
    const gallerySlider = document.querySelector('section.gallery > .gallery-slider');
    
    if (gallerySlider) {
      const sliderContent = gallerySlider.innerHTML;

      // Double the content for seamless looping
      gallerySlider.innerHTML = sliderContent + sliderContent;

      let isHovered = false;
      let animationPaused = false;

      // Use more specific event listeners
      gallerySlider.addEventListener('mouseenter', function() {
        isHovered = true;
        if (!animationPaused) {
          gallerySlider.style.animationPlayState = 'paused';
          animationPaused = true;
        }
      });

      gallerySlider.addEventListener('mouseleave', function() {
        isHovered = false;
        if (animationPaused) {
          gallerySlider.style.animationPlayState = 'running';
          animationPaused = false;
        }
      });

      // Reset animation when it completes
      gallerySlider.addEventListener('animationiteration', function() {
        if (!isHovered) {
          gallerySlider.style.animation = 'none';
          gallerySlider.offsetHeight; // Trigger reflow
          gallerySlider.style.animation = null;
        }
      });
    }
  });
})();


document.addEventListener('DOMContentLoaded', function() {
  const filtersContainer = document.querySelector('.gallery-filters');
  
  filtersContainer.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
  });

  filtersContainer.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
  });
});



//hetas gallery page slider large 

document.addEventListener('DOMContentLoaded', function() {
  const gallerySlider = document.querySelector('.hetas-1-gallery-slider');

  // Create 25 gallery items
  for (let i = 1; i <= 25; i++) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'hetas-1-gallery-item';
    galleryItem.dataset.category = 'gallery';

    galleryItem.innerHTML = `
      <img src="images/${i}.webp" alt="Hetas Gallery Image ${i}">
      <div class="hetas-1-gallery-item-overlay">
        <a href="reviews.html" class="hetas-1-review-button">Customer Reviews</a>
      </div>
    `;

    gallerySlider.appendChild(galleryItem);
  }

  // Full screen functionality
  const modal = document.createElement('div');
  modal.className = 'hetas-1-fullscreen-modal';
  document.body.appendChild(modal);

  gallerySlider.addEventListener('click', function(e) {
    const item = e.target.closest('.hetas-1-gallery-item');
    if (item && !e.target.closest('.hetas-1-review-button')) {
      const img = item.querySelector('img');
      const fullImg = document.createElement('img');
      fullImg.src = img.src;
      fullImg.className = 'hetas-1-fullscreen-image';
      
      const closeBtn = document.createElement('span');
      closeBtn.innerHTML = '&times;';
      closeBtn.className = 'hetas-1-fullscreen-close';
      
      modal.innerHTML = '';
      modal.appendChild(fullImg);
      modal.appendChild(closeBtn);
      modal.style.display = 'flex';
      
      closeBtn.onclick = function() {
        modal.style.display = 'none';
      }
    }
  });

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
});


//walll image gallery part for galler.html

document.addEventListener('DOMContentLoaded', () => {
  const wallGrid = document.querySelector('.wall-grid');

  function openFullscreen(img) {
    const fullscreenModal = document.createElement('div');
    fullscreenModal.className = 'fullscreen-modal';
    
    const fullscreenImage = document.createElement('img');
    fullscreenImage.src = img.src;
    fullscreenImage.alt = img.alt;
    
    const closeButton = document.createElement('span');
    closeButton.className = 'fullscreen-close';
    closeButton.innerHTML = '&times;';
    
    fullscreenModal.appendChild(fullscreenImage);
    fullscreenModal.appendChild(closeButton);
    document.body.appendChild(fullscreenModal);
    
    closeButton.onclick = function() {
      document.body.removeChild(fullscreenModal);
    }

    // Close on click outside the image
    fullscreenModal.onclick = function(e) {
      if (e.target === fullscreenModal) {
        document.body.removeChild(fullscreenModal);
      }
    }

    // Close on 'Escape' key press
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        document.body.removeChild(fullscreenModal);
      }
    });
  }

  // Add images dynamically
  for (let i = 20; i <= 39; i++) {
    const gridItem = document.createElement('div');
    gridItem.className = 'wall-grid-item';

    const img = document.createElement('img');
    img.src = `images/${i}.webp`;
    img.alt = `Apollo Heat Source Installation ${i}`;

    gridItem.appendChild(img);
    wallGrid.appendChild(gridItem);

    // Fullscreen functionality
    gridItem.addEventListener('click', () => {
      openFullscreen(img);
    });
  }
});


//testimonialsreviewsforgallerys page 

document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('scrolling-testimonial-container');
  const slides = document.querySelectorAll('individual-review-card');
  const prevButton = document.querySelector('previous-review-button');
  const nextButton = document.querySelector('next-review-button');
  let currentIndex = 0;

  function slideToIndex(index) {
    const targetSlide = slides[index];
    if (window.innerWidth <= 768) {
      container.scrollTo({
        top: targetSlide.offsetTop,
        behavior: 'smooth'
      });
    } else {
      container.scrollTo({
        left: targetSlide.offsetLeft,
        behavior: 'smooth'
      });
    }
    currentIndex = index;
  }

  function slideNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    slideToIndex(currentIndex);
  }

  function slidePrev() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slideToIndex(currentIndex);
  }

  nextButton.addEventListener('click', slideNext);
  prevButton.addEventListener('click', slidePrev);

  // Auto-slide every 5 seconds
  let autoSlideInterval = setInterval(slideNext, 5000);

  // Pause auto-slide on hover
  container.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  container.addEventListener('mouseleave', () => autoSlideInterval = setInterval(slideNext, 5000));

  // Adjust for window resize
  function adjustLayout() {
    slideToIndex(currentIndex);
  }

  window.addEventListener('resize', adjustLayout);

  // Initial layout adjustment
  adjustLayout();
});


//contactform formsubmit


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const spinner = document.getElementById('loading-spinner');
    const thankYouMessage = document.getElementById('thank-you-message');
    const submitButton = form.querySelector('.submit-button');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Show spinner, hide submit button
        spinner.classList.remove('hidden');
        submitButton.classList.add('hidden');
        console.log('Spinner shown, button hidden');

        const formData = new FormData(form);

        // Add multiple recipients
        const recipients = ["joemortnvs@gmail.com", "apollo-heatsource@hotmail.com"];
        const promises = recipients.map(email => {
            return fetch(`https://formsubmit.co/ajax/${email}`, {
                method: "POST",
                body: formData,
            });
        });

        // Handle all submissions
        Promise.all(promises)
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(results => {
                console.log('Form submission results:', results);
                const allSuccessful = results.every(result => result.success);
                if (allSuccessful) {
                    console.log('All submissions successful');
                    // Hide spinner, show thank you message
                    spinner.classList.add('hidden');
                    thankYouMessage.classList.remove('hidden');
                    console.log('Thank you message shown');

                    // Reset form
                    form.reset();

                    // Hide thank you message after 5 seconds
                    setTimeout(function() {
                        thankYouMessage.classList.add('hidden');
                        submitButton.classList.remove('hidden');
                        console.log('Thank you message hidden, button shown');
                    }, 5000);
                } else {
                    throw new Error("One or more submissions failed");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
                spinner.classList.add('hidden');
                submitButton.classList.remove('hidden');
            });
    });
});

