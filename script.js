// ============================================
// NAVIGATION TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hambBtn');
  const mobileNav = document.getElementById('mn');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
  }

  // Close mobile menu when a link is clicked
  const navLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });
});

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    
    if (!question || !answer) return;
    
    question.addEventListener('click', function() {
      const isOpen = item.classList.contains('open');
      
      // Close all other FAQs
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('open');
        const otherAnswer = otherItem.querySelector('.faq-a');
        if (otherAnswer) otherAnswer.classList.remove('open');
      });
      
      // Toggle current FAQ
      if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initFAQ);

// ============================================
// FORM HANDLING
// ============================================
function handleFormSubmit(e) {
  if (e.target.id === 'cForm') {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send form via Formspree
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        const successMsg = form.querySelector('.form-ok');
        if (successMsg) {
          successMsg.style.display = 'block';
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 4000);
        }
      }
    })
    .catch(error => console.error('Form error:', error))
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  }
}

document.addEventListener('submit', handleFormSubmit);

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const target = parseInt(entry.target.dataset.t);
        const suffix = entry.target.dataset.s || '';
        let current = 0;
        const increment = Math.ceil(target / 50);
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          entry.target.textContent = current + suffix;
        }, 30);
      }
    });
  });
  
  counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.rv, .rv-l, .rv-r, .reveal');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollReveal);

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
