document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS first
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            delay: 100,
            disable: function() {
                return window.innerWidth < 768;
            }
        });
        
        // Refresh AOS on window resize
        window.addEventListener('resize', function() {
            AOS.refresh();
        });
        
        // Force refresh after page load
        setTimeout(function() {
            AOS.refresh();
        }, 100);
    }

    // Navigation Elements
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navActions = document.getElementById('navActions');
    const header = document.getElementById('header');
    
    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            if (navActions) {
                navActions.classList.toggle('active');
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navActions) {
                navActions.classList.remove('active');
            }
        });
    });

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Hero Background Slider
    const heroBackgrounds = document.querySelectorAll('.hero-bg-slide');
    if (heroBackgrounds.length > 0) {
        const images = [
            'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
        ];

        let currentSlide = 0;

        // Set initial backgrounds
        heroBackgrounds.forEach((bg, index) => {
            if (images[index]) {
                bg.style.backgroundImage = `url(${images[index]})`;
            }
        });

        // Activate first slide
        if (heroBackgrounds[0]) {
            heroBackgrounds[0].classList.add('active');
        }

        // Slide function
        function nextSlide() {
            if (heroBackgrounds[currentSlide]) {
                heroBackgrounds[currentSlide].classList.remove('active');
                heroBackgrounds[currentSlide].classList.add('out');
            }
            
            currentSlide = (currentSlide + 1) % heroBackgrounds.length;
            
            if (heroBackgrounds[currentSlide]) {
                heroBackgrounds[currentSlide].classList.remove('out');
                heroBackgrounds[currentSlide].classList.add('active');
            }
        }

        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll down arrow in hero
    const scrollDown = document.getElementById('scrollDown');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Modal functionality
    const contactModalBtn = document.getElementById('contactModalBtn');
    const contactModal = document.getElementById('contactModal');
    const closeBtns = document.querySelectorAll('.close-btn');

    if (contactModalBtn && contactModal) {
        contactModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal functionality
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit to Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert('Thank you! Your message has been sent successfully.');
                    this.reset();
                    contactModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                } else {
                    throw new Error('Network response was not ok');
                }
            }).catch(error => {
                alert('Oops! There was a problem sending your message. Please try again.');
            }).finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.classList.add('loaded');
        });
    }

    // Testimonial functionality (if testimonials exist)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');

    if (testimonialSlider && testimonialDots.length > 0) {
        let currentTestimonial = 0;
        const totalTestimonials = testimonialDots.length;

        function showTestimonial(index) {
            testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
            
            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        // Dot navigation
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });

        // Previous/Next buttons
        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
                showTestimonial(currentTestimonial);
            });
        }

        if (testimonialNext) {
            testimonialNext.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
                showTestimonial(currentTestimonial);
            });
        }

        // Auto-play testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            showTestimonial(currentTestimonial);
        }, 6000);
    }

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNavigation() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Throttled scroll event for performance
    let ticking = false;
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                highlightNavigation();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateOnScroll);

    // Initialize on load
    highlightNavigation();

    console.log('K Yankee Enterprise website loaded successfully!');
});

// Handle browser back/forward
window.addEventListener('popstate', function() {
    // Close any open modals
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = 'auto';
});