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
            if (entry.target.classList.contains('stat-item')) {
                animateCounter(entry.target.querySelector('h3'));
            }
            
            if (entry.target.classList.contains('feature-card') || 
                entry.target.classList.contains('service-card')) {
                animateCard(entry.target);
            }
        }
    });
}, observerOptions);

// Counter animation for stats
function animateCounter(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

// Card hover effect animation
function animateCard(card) {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
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
    
    // Add animations to stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.classList.add('animate-on-scroll');
        observer.observe(item);
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
    
    // Add floating animation to service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add parallax effect to hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
    
    // Initialize counters if on home page
    if (currentPage === 'index.html' || currentPage === '') {
        const counters = document.querySelectorAll('.stat-item h3');
        counters.forEach(counter => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(counter);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter.parentElement);
        });
    }
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

// Text typing animation for hero
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation if on home page
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', () => {
        const heroTitle = document.querySelector('.hero-text h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 30);
        }
    });
}