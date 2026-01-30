// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add staggered animations based on element type
            if (entry.target.classList.contains('animate-on-scroll')) {
                const delay = entry.target.dataset.delay || '0';
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    animateElement(entry.target);
                }, delay * 100);
            }
            
            // Special animations for different elements
            if (entry.target.classList.contains('feature-card') || 
                entry.target.classList.contains('service-card')) {
                animateCard(entry.target);
            }
            
            if (entry.target.classList.contains('step')) {
                animateStep(entry.target);
            }
        }
    });
}, observerOptions);

// Animate cards on hover
function animateCard(card) {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        const icon = card.querySelector('.feature-icon, .service-icon');
        if (icon) icon.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.getBoundingClientRect().top > 0) {
            card.style.transform = 'translateY(0)';
            const icon = card.querySelector('.feature-icon, .service-icon');
            if (icon) icon.style.transform = 'scale(1)';
        }
    });
}

// Animate steps
function animateStep(step) {
    step.addEventListener('mouseenter', () => {
        const number = step.querySelector('.step-number');
        if (number) number.style.transform = 'scale(1.1)';
    });
    
    step.addEventListener('mouseleave', () => {
        const number = step.querySelector('.step-number');
        if (number) number.style.transform = 'scale(1)';
    });
}

// Element specific animations
function animateElement(element) {
    if (element.classList.contains('fade-in-up')) {
        element.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }
    
    if (element.classList.contains('fade-in-left')) {
        element.style.animation = 'fadeInLeft 0.8s ease-out forwards';
    }
    
    if (element.classList.contains('fade-in-right')) {
        element.style.animation = 'fadeInRight 0.8s ease-out forwards';
    }
    
    if (element.classList.contains('scale-in')) {
        element.style.animation = 'scaleIn 0.6s ease-out forwards';
    }
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.content-block, .feature-card, .service-card, .step, .position-card');
    animatedElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll', 'fade-in-up');
        el.dataset.delay = index % 5; // Stagger delay
        observer.observe(el);
    });
    
    // Add animations to section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('animate-on-scroll', 'scale-in');
        observer.observe(header);
    });
    
    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add floating animation to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add parallax effect to hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero, .page-hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#') && href !== '#') {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'var(--white)';
            navLinks.style.padding = '2rem';
            navLinks.style.boxShadow = 'var(--shadow-lg)';
            navLinks.style.gap = '1rem';
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        }
    });
}