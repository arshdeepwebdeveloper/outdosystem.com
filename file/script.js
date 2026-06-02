// ============================================
// OUTDO SYSTEM - PREMIUM AGENCY JAVASCRIPT
// ============================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });
});

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar with blur effect on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// ============================================
// SMOOTH SCROLLING
// ============================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// COUNTER ANIMATIONS
// ============================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when trust bar is visible
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('trust-bar')) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const trustBar = document.querySelector('.trust-bar');
if (trustBar) {
    observer.observe(trustBar);
}

// ============================================
// SWIPER INITIALIZATION - BLOG CAROUSEL
// ============================================

const blogSwiper = new Swiper('.blogSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.blog-next',
        prevEl: '.blog-prev'
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

// ============================================
// SWIPER INITIALIZATION - TESTIMONIALS CAROUSEL
// ============================================

const testimonialSwiper = new Swiper('.testimonialSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: '.testimonial-next',
        prevEl: '.testimonial-prev'
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 30
        }
    }
});

// ============================================
// FAQ ACCORDION FUNCTIONALITY
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question) {
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    }
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            subject: contactForm.querySelectorAll('input[type="text"]')[1].value,
            message: contactForm.querySelector('textarea').value
        };
        
        // Validate form
        if (data.name && data.email && data.subject && data.message) {
            // Show success message
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Message Sent! ✓';
            btn.style.background = '#4CAF50';
            
            // Reset form
            contactForm.reset();
            
            // Restore button after 3 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        } else {
            alert('Please fill in all fields');
        }
    });
}

// ============================================
// NEWSLETTER FORM
// ============================================

const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        
        if (email) {
            const btn = form.querySelector('button');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#4CAF50';
            
            form.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 3000);
        }
    });
});

// ============================================
// GSAP ANIMATIONS
// ============================================

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animate service cards on scroll
gsap.utils.toArray('.service-card').forEach((card, index) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top center+=100',
            markers: false
        },
        duration: 0.6,
        y: 0,
        opacity: 1
    });
});

// Animate case study cards
gsap.utils.toArray('.case-study-card').forEach((card) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top center+=100',
            markers: false
        },
        duration: 0.6,
        y: 0,
        opacity: 1
    });
});

// ============================================
// PARALLAX EFFECT
// ============================================

document.addEventListener('mousemove', (e) => {
    const floatingShapes = document.querySelectorAll('.floating-shape');
    
    floatingShapes.forEach(shape => {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ============================================
// SERVICE CARD HOVER EFFECTS
// ============================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.3,
            y: -10,
            boxShadow: '0 20px 40px rgba(227, 30, 36, 0.2)'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            y: 0,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
        });
    });
});

// ============================================
// PORTFOLIO CARD HOVER EFFECTS
// ============================================

const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.3,
            y: -8,
            boxShadow: '0 20px 50px rgba(227, 30, 36, 0.15)'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            y: 0,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
        });
    });
});

// ============================================
// BLOG CARD HOVER EFFECTS
// ============================================

const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.3,
            y: -5,
            boxShadow: '0 15px 40px rgba(227, 30, 36, 0.15)'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            y: 0,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
        });
    });
});

// ============================================
// TEAM CARD HOVER EFFECTS
// ============================================

const teamCards = document.querySelectorAll('.team-card');

teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.3,
            y: -8,
            boxShadow: '0 20px 50px rgba(227, 30, 36, 0.15)'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            y: 0,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
        });
    });
});

// ============================================
// BUTTON HOVER EFFECTS
// ============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            duration: 0.3,
            y: -2,
            boxShadow: '0 10px 30px rgba(227, 30, 36, 0.3)'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            duration: 0.3,
            y: 0,
            boxShadow: 'none'
        });
    });
});

// ============================================
// SCROLL TO TOP FUNCTIONALITY
// ============================================

let scrollToTopBtn = document.querySelector('.scroll-to-top');

if (!scrollToTopBtn) {
    // Create scroll to top button if it doesn't exist
    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #E31E24 0%, #B00020 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(227, 30, 36, 0.4);
    `;
    document.body.appendChild(scrollToTopBtn);
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// ACTIVE LINK HIGHLIGHTING
// ============================================

function highlightActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

highlightActiveLink();

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    }
});

// ============================================
// FORM INPUT VALIDATION
// ============================================

const formControls = document.querySelectorAll('.form-control');

formControls.forEach(control => {
    control.addEventListener('focus', () => {
        control.parentElement.classList.add('focused');
    });
    
    control.addEventListener('blur', () => {
        control.parentElement.classList.remove('focused');
    });
    
    control.addEventListener('input', () => {
        if (control.value.trim() !== '') {
            control.parentElement.classList.add('filled');
        } else {
            control.parentElement.classList.remove('filled');
        }
    });
});

// ============================================
// PRELOAD CRITICAL IMAGES
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// DARK MODE TOGGLE (OPTIONAL)
// ============================================

function initDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || prefersDark;
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    }
}

initDarkMode();

// ============================================
// SERVICE CARD CLICK ANIMATION
// ============================================

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        gsap.timeline()
            .to(card, {
                duration: 0.15,
                scale: 0.98
            }, 0)
            .to(card, {
                duration: 0.15,
                scale: 1
            });
    });
});

// ============================================
// ANIMATED COUNTERS WITH GSAP
// ============================================

function animateCountersWithGSAP() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        gsap.to(counter, {
            textContent: target,
            duration: 2,
            snap: { textContent: 1 },
            ease: 'power2.out'
        });
    });
}

// Trigger with intersection observer
const trustBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCountersWithGSAP();
            entry.target.classList.add('animated');
            trustBarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (trustBar) {
    trustBarObserver.observe(trustBar);
}

// ============================================
// SMOOTH PAGE TRANSITIONS
// ============================================

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.style.opacity = '1';
    }
});

window.addEventListener('pagehide', (event) => {
    document.body.style.opacity = '0.5';
});

// ============================================
// MOBILE OPTIMIZATION
// ============================================

if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    
    // Disable some heavy animations
    const heavyAnimElements = document.querySelectorAll('.floating-shape');
    heavyAnimElements.forEach(el => {
        el.style.animation = 'none';
    });
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================

let resizeTimer;
window.addEventListener('resize', debounce(() => {
    // Reinitialize swiper on resize if needed
    if (window.innerWidth > 768 && blogSwiper) {
        blogSwiper.update();
    }
}, 250));

// ============================================
// INITIALIZATION
// ============================================

console.log('Outdo System website loaded successfully! ✓');
console.log('Premium agency website - Built with GSAP, AOS, and Swiper');

// Ready for production!
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Content Loaded - All systems ready!');
    });
} else {
    console.log('DOM Content Already Loaded - All systems ready!');
}