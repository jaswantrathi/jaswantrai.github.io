// script.js - Adding Technical Interest with Animations and Interactivity

// Fade-in animation on scroll
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

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Simple image gallery carousel (for gallery page)
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-grid img');

function showNextImage() {
  if (galleryImages.length > 0) {
    galleryImages[currentImageIndex].style.opacity = '0.5';
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    galleryImages[currentImageIndex].style.opacity = '1';
  }
}

// Auto-rotate gallery images every 3 seconds
if (galleryImages.length > 0) {
  setInterval(showNextImage, 3000);
}

// Particle background effect for hero (simple)
function createParticles() {
  const hero = document.querySelector('.hero');
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

// Add CSS for particles
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

// Contact form enhancement
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // Add loading state
    const submitBtn = this.querySelector('button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate send (in real app, this would be handled by Formspree)
    setTimeout(() => {
      alert('Thank you for your message! We\'ll get back to you soon.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      this.reset();
    }, 2000);
  });
}

// Mobile menu toggle (if needed)
function createMobileMenu() {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');

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

  // Show toggle on mobile
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

// Add mobile menu styles
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