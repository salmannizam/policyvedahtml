/* ==========================
   Header scroll effect
   ========================== */
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (!header) return;

  if (window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

/* ==========================
   Intersection Observer (Animations)
   ========================== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    if (entry.target.classList.contains("animate-on-scroll")) {
      const delay = Number(entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.classList.add("animated");
        animateElement(entry.target);
      }, delay * 100);
    }

    if (entry.target.classList.contains("stat-item")) {
      const h3 = entry.target.querySelector("h3");
      if (h3) animateCounter(h3);
    }

    if (
      entry.target.classList.contains("feature-card") ||
      entry.target.classList.contains("service-card")
    ) {
      animateCard(entry.target);
    }
  });
}, observerOptions);

/* ==========================
   Counter animation (FIX: no "+")
   CSS already adds + via ::after
   ========================== */
function animateCounter(element) {
  const raw = element.textContent.trim();
  const target = parseInt(raw, 10);
  if (Number.isNaN(target)) return;

  if (element.dataset.counted === "true") return;
  element.dataset.counted = "true";

  let current = 0;
  const increment = target / 50;

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      element.textContent = String(target);
      clearInterval(timer);
    } else {
      element.textContent = String(Math.floor(current));
    }
  }, 30);
}

/* ==========================
   Card hover animation
   ========================== */
function animateCard(card) {
  if (card.dataset.hoverBound === "true") return;
  card.dataset.hoverBound = "true";

  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-12px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
}

/* ==========================
   Element animation mapping
   ========================== */
function animateElement(element) {
  if (element.classList.contains("fade-in-up")) {
    element.style.animation = "fadeInUp 0.8s ease-out forwards";
  }
  if (element.classList.contains("fade-in-left")) {
    element.style.animation = "fadeInLeft 0.8s ease-out forwards";
  }
  if (element.classList.contains("fade-in-right")) {
    element.style.animation = "fadeInRight 0.8s ease-out forwards";
  }
  if (element.classList.contains("scale-in")) {
    element.style.animation = "scaleIn 0.6s ease-out forwards";
  }
}

/* ==========================
   Mobile Sidebar (Responsive)
   Requires IDs:
   #mobileMenuBtn, #sidebar, #overlay, #sidebarClose
   ========================== */
function initSidebar() {
  const body = document.body;
  const menuBtn = document.getElementById("mobileMenuBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("sidebarClose");

  if (!menuBtn || !sidebar || !overlay || !closeBtn) return;

  const openMenu = () => {
    body.classList.add("sidebar-open");
    sidebar.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    body.classList.remove("sidebar-open");
    sidebar.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    body.style.overflow = "";
  };

  menuBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("sidebar-open")) {
      closeMenu();
    }
  });

  sidebar.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });
}

/* ==========================
   Smooth scrolling for anchors
   ========================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });
    });
  });
}

/* ==========================
   Typing animation for hero title
   ========================== */
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

/* ==========================
   Active nav highlighting (works with routes)
   ========================== */
function normalizeRoute(value) {
  if (!value) return "";
  const clean = value.split("?")[0].split("#")[0];
  if (clean === "/" || clean === "") return "index";

  let last = clean.split("/").filter(Boolean).pop() || "index";
  last = last.replace(/\.html$/i, "");
  return last.toLowerCase();
}

/* ==========================
   WhatsApp Popup
   ========================== */
function initWhatsAppPopup() {
  const openBtn = document.getElementById("whatsappOpenBtn");
  const overlay = document.getElementById("waOverlay");
  const popup = document.getElementById("waPopup");
  const closeBtn = document.getElementById("waCloseBtn");
  const msg = document.getElementById("waMsg");
  const sendBtn = document.getElementById("waSendBtn");

  if (!openBtn || !overlay || !popup || !closeBtn || !msg || !sendBtn) return;

  // ✅ Replace with client's WhatsApp number (country code, no +)
  const WHATSAPP_NUMBER = "919876543210";

  const open = () => {
    document.body.classList.add("wa-open");
    popup.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    updateLink();
  };

  const close = () => {
    document.body.classList.remove("wa-open");
    popup.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const updateLink = () => {
    const text = encodeURIComponent(msg.value || "");
    sendBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);
  msg.addEventListener("input", updateLink);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("wa-open")) {
      close();
    }
  });
}

/* ==========================
   DOM Ready
   ========================== */
document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initSmoothScroll();
  initWhatsAppPopup();

  const animatedElements = document.querySelectorAll(
    ".content-block, .feature-card, .service-card, .step, .position-card"
  );

  animatedElements.forEach((el, index) => {
    el.classList.add("animate-on-scroll", "fade-in-up");
    el.dataset.delay = String(index % 5);
    animationObserver.observe(el);
  });

  const sectionHeaders = document.querySelectorAll(".section-header");
  sectionHeaders.forEach((header) => {
    header.classList.add("animate-on-scroll", "scale-in");
    animationObserver.observe(header);
  });

  const statItems = document.querySelectorAll(".stat-item");
  statItems.forEach((item) => {
    item.classList.add("animate-on-scroll");
    animationObserver.observe(item);
  });

  const currentRoute = normalizeRoute(window.location.pathname);
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const linkRoute = normalizeRoute(href);
    if (linkRoute && linkRoute === currentRoute) link.classList.add("active");
  });

  const serviceIcons = document.querySelectorAll(".service-icon");
  serviceIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
  });

  window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.05}px)`;
  });

  // typing effect only on home
  const isHome = currentRoute === "index";
  if (isHome) {
    const heroTitle = document.querySelector(".hero-left .hero-title");
    if (heroTitle) {
      const originalText = heroTitle.textContent;
      typeWriter(heroTitle, originalText, 30);
    }
  }
});
