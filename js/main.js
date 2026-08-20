/* ==========================================================================
   3P's Produções - Main JavaScript & Framer-Style Scroll Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Sticky Navbar Blur Effect on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      navbar.style.background = 'rgba(9, 10, 15, 0.95)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.background = 'rgba(18, 21, 30, 0.85)';
    }
  });

  // Video Modal Player (Youtube White-Label)
  const videoModal = document.getElementById('videoModal');
  const modalIframe = document.getElementById('modalIframe');
  const modalClose = document.getElementById('modalClose');

  window.openVideoModal = function(videoId) {
    if (!videoModal || !modalIframe) return;
    modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeVideoModal() {
    if (!videoModal || !modalIframe) return;
    videoModal.classList.remove('active');
    modalIframe.src = '';
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  // Framer-Style Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-card, .package-card, .service-card, .pillar-card');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
