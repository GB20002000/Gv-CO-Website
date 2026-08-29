/**
 * G.V & CO - DUAL-TONE THEME SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyHeader();
  initGalleryViewMore();
  initPortfolioFilter();
  initLightbox();
  initCounters();
  initBackToTop();
  initContactForm();
});

/* ==========================================================================
   1. MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileDrawer) return;

  function toggleMenu() {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      mobileDrawer.classList.add('open');
      toggleBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   2. STICKY HEADER EFFECT
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. GALLERY "VIEW MORE PHOTOS" EXPANSION
   ========================================================================== */
function initGalleryViewMore() {
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const hiddenCards = document.querySelectorAll('.portfolio-card.gallery-hidden');

  if (!viewMoreBtn) return;

  let isExpanded = false;

  viewMoreBtn.addEventListener('click', () => {
    if (!isExpanded) {
      hiddenCards.forEach(card => {
        card.classList.remove('gallery-hidden');
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 30);
      });
      viewMoreBtn.innerHTML = '<span>Show Less Photos</span> <span>▲</span>';
      isExpanded = true;
    } else {
      hiddenCards.forEach(card => {
        card.classList.add('gallery-hidden');
        card.style.display = 'none';
      });
      viewMoreBtn.innerHTML = '<span>View More Photos (' + hiddenCards.length + ' More)</span> <span>▼</span>';
      isExpanded = false;

      // Scroll smoothly back to top of gallery
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ==========================================================================
   4. PORTFOLIO CATEGORY FILTER
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const viewMoreBtn = document.getElementById('viewMoreBtn');

  if (!filterBtns.length || !portfolioCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // If user filters by specific category, unhide all cards so they can see all category images
      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all') {
          // If reset to 'all', respect initial view count if viewMoreBtn exists
          if (card.hasAttribute('data-initial-hidden') && (!viewMoreBtn || viewMoreBtn.innerText.includes('View More'))) {
            card.style.display = 'none';
            card.classList.add('gallery-hidden');
          } else {
            card.classList.remove('gallery-hidden');
            card.style.display = 'block';
            card.style.opacity = '1';
          }
        } else if (category === filterValue) {
          card.classList.remove('gallery-hidden');
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. LIGHTBOX MODAL
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (!modal || !modalImg || !closeBtn) return;

  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img) {
        modalImg.src = img.src;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. SCROLL ANIMATED COUNTERS
   ========================================================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('.stat-number');
  if (!counterElements.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1500;
          const increment = Math.ceil(target / (duration / 30));

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              counter.textContent = target + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = count + suffix;
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('statsSection');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   7. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('backToTop');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   8. CONTACT FORM SUBMISSION (EMAIL TO gokulbharatham2000@gmail.com + WHATSAPP)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const service = document.getElementById('contactService').value;
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !phone) {
      e.preventDefault();
      alert('Please enter your Name and Phone Number.');
      return;
    }

    // Open WhatsApp link in a new window simultaneously
    const whatsappMessage = encodeURIComponent(
      `Hello G.V & Co,\n\n` +
      `New Website Inquiry:\n` +
      `• Name: ${name}\n` +
      `• Phone: ${phone}\n` +
      `• Service Required: ${service}\n` +
      `• Details: ${message || 'Need project consultation.'}`
    );

    window.open(`https://wa.me/917598658161?text=${whatsappMessage}`, '_blank');
  });
}
