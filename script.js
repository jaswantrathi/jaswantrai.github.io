// script.js - Enhanced with all missing functions

// ======================
// 1. INTERSECTION OBSERVER (FADE-IN)
// ======================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// ======================
// 2. SMOOTH SCROLLING
// ======================
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ======================
// 3. TAB SWITCHING (SERVICES)
// ======================
function switchTab(tabId) {
  const allTabs = document.querySelectorAll('.tab-content');
  allTabs.forEach(tab => tab.style.display = 'none');
  
  const allBtns = document.querySelectorAll('.tab-btn');
  allBtns.forEach(btn => btn.classList.remove('active'));
  
  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.style.display = 'block';
  }
  
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// ======================
// 4. GALLERY FILTER
// ======================
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (filterBtns.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-f');
      
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-c');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'block';
          item.classList.add('fade-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

if (document.querySelector('.gallery-grid')) {
  initGalleryFilter();
}

// ======================
// 5. GALLERY CAROUSEL
// ======================
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-grid img');

function showNextImage() {
  if (galleryImages.length > 0) {
    galleryImages.forEach(img => img.style.opacity = '0.5');
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    galleryImages[currentImageIndex].style.opacity = '1';
  }
}

if (galleryImages.length > 0) {
  galleryImages[0].style.opacity = '1';
  galleryImages.forEach((img, idx) => {
    if (idx > 0) img.style.opacity = '0.5';
  });
  setInterval(showNextImage, 3000);
}

// ======================
// 6. STAT COUNTER ANIMATION
// ======================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  if (counters.length === 0) return;
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-t')) || 0;
    const suffix = counter.getAttribute('data-s') || '';
    let current = 0;
    const increment = Math.ceil(target / 30);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current + suffix;
    }, 50);
  });
}

window.addEventListener('load', animateCounters);

// ======================
// 7. PARTICLE EFFECT
// ======================
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    hero.appendChild(particle);
  }
}

if (document.querySelector('.hero')) {
  createParticles();
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    animation: floatParticle 20s infinite linear;
    pointer-events: none;
  }

  @keyframes floatParticle {
    0% { transform: translateY(100vh) rotate(0deg); }
    100% { transform: translateY(-100px) rotate(360deg); }
  }
`;
document.head.appendChild(particleStyle);

// ======================
// 8. CONTACT FORM
// ======================
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      alert('Thank you for your message! We\'ll get back to you soon.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      this.reset();
    }, 2000);
  });
}

// ======================
// 9. MOBILE MENU
// ======================
function createMobileMenu() {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');
  
  if (!nav || !navLinks) return;

  const menuToggle = document.createElement('button');
  menuToggle.textContent = '☰';
  menuToggle.className = 'menu-toggle';
  menuToggle.style.display = 'none';
  menuToggle.style.background = 'none';
  menuToggle.style.border = 'none';
  menuToggle.style.fontSize = '1.5rem';
  menuToggle.style.cursor = 'pointer';

  nav.appendChild(menuToggle);

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  if (window.innerWidth <= 768) {
    menuToggle.style.display = 'block';
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      menuToggle.style.display = 'block';
    } else {
      menuToggle.style.display = 'none';
      navLinks.classList.remove('active');
    }
  });
}

createMobileMenu();

const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
  .menu-toggle {
    order: 2;
  }

  .nav-links.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
  }

  @media (min-width: 769px) {
    .nav-links.active {
      display: flex;
      flex-direction: row;
      position: static;
      background: none;
      padding: 0;
      box-shadow: none;
    }
  }
`;
document.head.appendChild(mobileStyle);
