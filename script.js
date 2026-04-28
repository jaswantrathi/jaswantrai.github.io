// ============================================
// IMAGE SOURCES BY SERVICE TYPE
// ============================================

const serviceImages = {
    mri: {
        main: 'https://images.unsplash.com/photo-1631217314830-4df56b58db64?w=1000&h=600&fit=crop',
        alt: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&h=600&fit=crop',
              'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&h=600&fit=crop']
    },
    ct: {
        main: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&h=600&fit=crop',
        alt: ['https://images.unsplash.com/photo-1631217314830-4df56b58db64?w=1000&h=600&fit=crop',
              'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&h=600&fit=crop']
    },
    ultrasound: {
        main: 'https://images.unsplash.com/photo-1579154204601-01d82b27ebcc?w=1000&h=600&fit=crop',
        alt: ['https://images.unsplash.com/photo-1576091160568-112d19c91846?w=1000&h=600&fit=crop']
    },
    dental: {
        main: 'https://images.unsplash.com/photo-1609840917726-08ab4a0e489b?w=1000&h=600&fit=crop',
        alt: ['https://images.unsplash.com/photo-1585772724684-38269d6639fd?w=1000&h=600&fit=crop']
    },
    ventilator: {
        main: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&h=600&fit=crop',
        alt: ['https://images.unsplash.com/photo-1576091160568-112d19c91846?w=1000&h=600&fit=crop']
    },
    maintenance: {
        main: 'https://images.unsplash.com/photo-1576091160568-112d19c91846?w=1000&h=600&fit=crop',
        alt: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&h=600&fit=crop']
    },
    engineer: {
        main: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&h=600&fit=crop',
        alt: ['https://images.unsplash.com/photo-1576091160568-112d19c91846?w=1000&h=600&fit=crop']
    }
};

// ============================================
// ENHANCED ICON GLOW EFFECTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Add glow effect to all icons on page load
    const icons = document.querySelectorAll('[class*="icon"], [class*="ic"]');
    
    icons.forEach((icon, index) => {
        // Stagger animation for visual appeal
        setTimeout(() => {
            icon.style.animation = 'iconPulse 3s ease-in-out infinite';
        }, index * 100);
    });

    // Add glow on card hover
    const cards = document.querySelectorAll('.card, .sc');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('[class*="icon"], [class*="ic"]');
            if (icon) {
                icon.style.animation = 'none';
                icon.style.filter = 'drop-shadow(0 0 30px rgba(0, 232, 212, 0.9)) drop-shadow(0 0 50px rgba(0, 232, 212, 0.5))';
                icon.style.transform = 'scale(1.25) rotate(8deg)';
            }

            // Image enhancement
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
                img.style.filter = 'brightness(1.1) saturate(1.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('[class*="icon"], [class*="ic"]');
            if (icon) {
                icon.style.animation = 'iconPulse 3s ease-in-out infinite';
                icon.style.filter = 'drop-shadow(0 0 8px rgba(0, 232, 212, 0.3))';
                icon.style.transform = 'scale(1) rotate(0deg)';
            }

            // Image reset
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(1) saturate(1)';
            }
        });
    });
});
