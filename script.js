// 1️ Typing Effect
const typingText = document.querySelector(".typing-text");
const words = ["Web Developer", "Problem Solver", "Innovation Enthusiast"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', type);

// 2️ Menu Logic
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

function toggleMenu(isOpen) {
    navLinks.classList.toggle('active', isOpen);
    const icon = hamburger.querySelector('i');
    icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    hamburger.setAttribute('aria-expanded', isOpen);
}

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navLinks.classList.contains('active');
    toggleMenu(!isActive);
});

document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => toggleMenu(false)));

document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
        toggleMenu(false);
    }
});

// 3️ Theme Logic
const themeBtn = document.getElementById('theme-btn');
const themeIcon = themeBtn.querySelector('i');
const themes = ['system', 'light', 'dark'];
let currentTheme = localStorage.getItem('theme') || 'system';

function applyTheme(t) {
    document.body.removeAttribute('data-theme');
    if (t === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-moon';
    } else if (t === 'light') {
        themeIcon.className = 'fas fa-sun';
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.setAttribute('data-theme', 'dark');
        }
        themeIcon.className = 'fas fa-desktop';
    }
    if (t === 'system') localStorage.removeItem('theme');
    else localStorage.setItem('theme', t);
    currentTheme = t;
}

applyTheme(currentTheme);

themeBtn.addEventListener('click', () => {
    const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
    applyTheme(themes[nextIndex]);
});

// 4️ Scroll Observer & Auto-Fill Skills
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('show');
            if (e.target.id === 'skills') {
                e.target.querySelectorAll('.skill-bar span').forEach(bar => {
                    const width = bar.dataset.width;
                    bar.style.width = width;
                    const label = bar.parentElement.previousElementSibling?.querySelector('span:last-child');
                    if (label && label.innerText === '') label.innerText = width;
                });
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// 5️ Scroll Top Button
const stBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    stBtn.classList.toggle('active', window.scrollY > 300);
});
stBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 6️ About Toggle
const abtBtn = document.getElementById('aboutToggle');
const abtContent = document.getElementById('aboutContent');
if (abtBtn && abtContent) {
    abtBtn.addEventListener('click', () => {
        abtContent.classList.toggle('open');
        const isOpen = abtContent.classList.contains('open');
        abtBtn.innerHTML = isOpen
            ? 'Show Less <i class="fas fa-chevron-up"></i>'
            : 'More About Me <i class="fas fa-chevron-down"></i>';
    });
}
