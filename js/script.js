/* =========================================================
   OUTDO SYSTEM — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Preloader ---- */
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hide');
  }, 1600);

  /* ---- AOS Init ---- */
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });

  /* ---- Navbar Scroll ---- */
  const nav = document.getElementById('mainNav');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    // Back to top
    const btt = document.getElementById('backToTop');
    if (btt) {
      if (window.scrollY > 400) btt.classList.add('visible');
      else btt.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---- Smooth Scroll for nav links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // Close mobile menu
      const navCollapse = document.getElementById('navbarNav');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  /* ---- Active Nav Link on Scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));

  /* ---- Counter Animation ---- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const update = () => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          return;
        }
        el.textContent = Math.floor(current);
        requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---- Testimonial Swiper ---- */
  new Swiper('.testimonialSwiper', {
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
  });

  /* ---- Portfolio Filter ---- */
  const filterBtns = document.querySelectorAll('.pf-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.animation = 'none';
          item.offsetHeight; // reflow
          item.style.animation = 'fadeInScale 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---- Contact Form Submit ---- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
      btn.style.background = 'linear-gradient(135deg,#22c55e,#15803d)';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

  /* ---- Navbar active class style ---- */
  const style = document.createElement('style');
  style.textContent = `
    .navbar-nav .nav-link.active { color: #e31e24 !important; }
    .navbar-nav .nav-link.active::after { width: calc(100% - 28px); }
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.92); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

});
