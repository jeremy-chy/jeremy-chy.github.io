// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Build dynamic table of contents
const tocContainer = document.getElementById('tocList');
const tocSections = Array.from(document.querySelectorAll('[data-toc-title]'));
const tocLinksMap = new Map();

const slugify = (text) => text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

if (tocContainer && tocSections.length) {
    const existingIds = new Set(tocSections.filter(section => section.id).map(section => section.id));

    tocSections.forEach((section, index) => {
        const tocTitle = section.dataset.tocTitle || section.querySelector('h2, h3')?.textContent?.trim() || `Section ${index + 1}`;
        let sectionId = section.id;

        if (!sectionId) {
            const baseId = slugify(tocTitle) || `section-${index + 1}`;
            sectionId = baseId;
            let suffix = 1;
            while (existingIds.has(sectionId)) {
                sectionId = `${baseId}-${suffix++}`;
            }
            section.id = sectionId;
            existingIds.add(sectionId);
        }

        const link = document.createElement('a');
        link.className = 'toc-link';
        link.href = `#${sectionId}`;
        link.textContent = tocTitle;
        tocContainer.appendChild(link);
        tocLinksMap.set(sectionId, link);
    });
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('.news-section, .publications-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Update active ToC link based on scroll position
let activeTocId = null;

const updateActiveTocLink = (scrollY) => {
    if (!tocSections.length) return;

    const offset = 140;
    const currentPosition = (typeof scrollY === 'number' ? scrollY : window.scrollY) + offset;
    let currentSectionId = tocSections[0].id;

    tocSections.forEach(section => {
        if (section.offsetTop <= currentPosition) {
            currentSectionId = section.id;
        }
    });

    if (currentSectionId !== activeTocId) {
        if (activeTocId && tocLinksMap.has(activeTocId)) {
            tocLinksMap.get(activeTocId).classList.remove('active');
        }
        if (tocLinksMap.has(currentSectionId)) {
            tocLinksMap.get(currentSectionId).classList.add('active');
        }
        activeTocId = currentSectionId;
    }
};

window.addEventListener('load', () => updateActiveTocLink(window.scrollY));

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to profile photo on scroll
let lastScrollY = window.scrollY;
const photoWrapper = document.querySelector('.photo-wrapper');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (photoWrapper && currentScrollY < 300) {
        const parallaxValue = currentScrollY * 0.2;
        photoWrapper.style.transform = `translateY(${parallaxValue}px)`;
    }
    updateActiveTocLink(currentScrollY);
    lastScrollY = currentScrollY;
});


// Add typing effect to name (optional - can be enabled)
function typeWriter(element, text, speed = 100) {
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

// Uncomment the following lines to enable typing effect on page load
// window.addEventListener('load', () => {
//     const nameElement = document.querySelector('.name-title');
//     const originalText = nameElement.textContent;
//     typeWriter(nameElement, originalText, 80);
// });

// Vanta.js background effect
let vantaEffect;
window.addEventListener('DOMContentLoaded', () => {
    vantaEffect = VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3498db,
        backgroundColor: 0xffffff
    });
    // Set initial Vanta theme
    updateVantaTheme();
});

// Day/night mode toggle
const themeSwitch = document.querySelector('#checkbox');

const updateVantaTheme = () => {
    if (!vantaEffect) return;
    if (document.body.classList.contains('dark-mode')) {
        vantaEffect.setOptions({
            color: 0x3498db,
            backgroundColor: 0x1c2833
        });
    } else {
        vantaEffect.setOptions({
            color: 0x3498db,
            backgroundColor: 0xffffff
        });
    }
};

themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    updateVantaTheme();
});

// Apply saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
}

