// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

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

