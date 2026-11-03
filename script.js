
// ==============================
// PAGE LOADER
// ==============================

window.addEventListener("load", () => {
    const loader = document.getElementById("pageLoader");

    setTimeout(() => {
        loader?.classList.add("hide");
    }, 500);
});


// ==============================
// CURRENT YEAR
// ==============================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ==============================
// TYPING ANIMATION
// ==============================

const typingText = document.getElementById("typingText");

const words = [
    "Aspiring Software Engineer",
    "Web Developer",
    "Problem Solver",
    "C++ Programmer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (!deleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1400);
            return;
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();


// ==============================
// MOBILE NAVIGATION
// ==============================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");

    const isOpen = navLinks?.classList.contains("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach(link => {
    link.addEventListener("click", () => {
        navLinks?.classList.remove("open");

        if (menuToggle) {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
});


// ==============================
// DARK / LIGHT THEME
// ==============================

const themeToggle = document.getElementById("themeToggle");

function updateThemeIcon() {
    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    if (themeToggle) {
        themeToggle.textContent =
            currentTheme === "light" ? "☾" : "☀";
    }
}

updateThemeIcon();

themeToggle?.addEventListener("click", () => {
    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const newTheme =
        currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);

    try {
        localStorage.setItem("portfolio-theme", newTheme);
    } catch (error) {
        console.warn("Theme preference could not be saved.");
    }

    updateThemeIcon();
});


// ==============================
// SCROLL REVEAL ANIMATION
// ==============================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}


// ==============================
// STAGGERED CARD ANIMATION
// ==============================

document.querySelectorAll(
    ".skills-grid, .projects-grid, .education-grid, .achievement-grid"
).forEach(grid => {

    const cards = grid.querySelectorAll(".reveal");

    cards.forEach((card, index) => {
        card.style.transitionDelay = `${(index % 3) * 100}ms`;
    });

});


// ==============================
// ACTIVE NAVBAR ON SCROLL
// ==============================

const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
    let currentSection = "home";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
}


// ==============================
// BACK TO TOP
// ==============================

const backToTop = document.getElementById("backToTop");

function handleScroll() {
    updateActiveLink();

    if (window.scrollY > 400) {
        backToTop?.classList.add("show");
    } else {
        backToTop?.classList.remove("show");
    }
}

window.addEventListener("scroll", handleScroll, {
    passive: true
});

backToTop?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ==============================
// CONTACT FORM
// ==============================

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!submitBtn || !formStatus) return;

    const originalButtonText = "Send Message ↗";

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    formStatus.textContent = "";
    formStatus.style.color = "var(--muted)";

    try {
        const response = await fetch(
            "https://formsubmit.co/ajax/amitkumar141623@gmail.com",
            {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        const result = await response.json();

        const isSuccessful =
            result.success === true || result.success === "true";

        if (!response.ok || !isSuccessful) {
            throw new Error(
                result.message || "Unable to send your message."
            );
        }

        formStatus.textContent =
            "✓ Your message has been sent successfully!";

        formStatus.style.color = "#39db91";

        contactForm.reset();

    } catch (error) {
        console.error("Contact form error:", error);

        formStatus.textContent =
            "Message could not be sent. Please try again or email me directly.";

        formStatus.style.color = "#ff7777";

    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalButtonText;
    }
});


// ==============================
// BUTTON HOVER EFFECT
// ==============================

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mousemove", event => {
        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        button.style.setProperty("--mouse-x", `${x}px`);
        button.style.setProperty("--mouse-y", `${y}px`);
    });

});


// ==============================
// INITIAL SCROLL CHECK
// ==============================

handleScroll();
