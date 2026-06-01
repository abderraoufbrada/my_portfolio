// ===== NAVIGATION & SCROLL EFFECTS =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Navbar scroll effect with glassmorphism intensify
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(2, 6, 23, 0.95)';
        navbar.style.boxShadow = '0 10px 40px rgba(14, 165, 233, 0.1)';
        navbar.style.padding = '0.8rem 5%';
    } else {
        navbar.style.background = 'rgba(2, 6, 23, 0.7)';
        navbar.style.boxShadow = 'none';
        navbar.style.padding = '1.2rem 5%';
    }
});

// Mobile menu toggle with animation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active nav link on scroll with smooth transition
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = '#38bdf8';
        } else {
            link.style.color = '';
        }
    });
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        }, 50);
    });

    // Cursor grow on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .mini-card, .skill-category, .tech-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'rgba(6, 182, 212, 0.8)';
            cursor.style.background = 'rgba(6, 182, 212, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'rgba(14, 165, 233, 0.5)';
            cursor.style.background = 'transparent';
        });
    });
} else {
    if (cursor) cursor.style.display = 'none';
    if (cursorDot) cursorDot.style.display = 'none';
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal, .project-card, .mini-card, .skill-category, .timeline-item, .publication-card, .tech-item');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((reveal, index) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
            reveal.style.transitionDelay = `${index * 0.05}s`;
        }
    });
};

// Initialize reveal elements
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== PROFESSIONAL TYPEWRITER EFFECT =====
const typewriterElement = document.querySelector('.typewriter');

if (typewriterElement) {
    const words = ["Abderraouf Brada", "Nano Technology Engineer", "Digital Twin Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; 
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    };

    setTimeout(type, 1000);
}

// ===== COUNTER ANIMATION WITH EASING =====
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(animateCounters, 20);
        } else {
            counter.innerText = target;
            counter.style.textShadow = '0 0 20px rgba(56, 189, 248, 0.5)';
        }
    });
};

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(aboutSection);
}

// ===== SKILL BARS ANIMATION WITH GLOW =====
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            bar.style.boxShadow = '0 0 20px rgba(14, 165, 233, 0.4)';
        }, index * 100);
    });
};

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    skillsObserver.observe(skillsSection);
}

// ===== 3D TILT EFFECT ENHANCED =====
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        card.style.transition = 'transform 0.1s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    });
});

// ===== CONTACT FORM WITH BLUE-MARINE THEME =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.8';
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)';
            submitBtn.style.boxShadow = '0 10px 30px rgba(20, 184, 166, 0.3)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.style.boxShadow = '';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                contactForm.reset();
            }, 2500);
        }, 1500);
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARTICLE BACKGROUND EFFECT =====
const createParticles = () => {
    const canvas = document.createElement('canvas');
    canvas.className = 'particles';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 25 : 50;
    
    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(14, 165, 233, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    const init = () => {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    };
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        particles.forEach((a, index) => {
            particles.slice(index + 1).forEach(b => {
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(14, 165, 233, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    };
    
    init();
    animate();
};

if (window.innerWidth > 768) {
    createParticles();
}

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => { 
            loader.style.display = 'none';
        }, 500);
    }
    revealOnScroll();
});

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg img');
    const heroText = document.querySelector('.hero-content');
    
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
    }
    
    if (heroText && scrolled < window.innerHeight) {
        heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroText.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===== TIMELINE ANIMATION =====
const timelineItems = document.querySelectorAll('.timeline-item');

const animateTimeline = () => {
    timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }
    });
};

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`;
    if (index % 2 === 0) {
        item.style.transform = 'translateX(-30px)';
    } else {
        item.style.transform = 'translateX(30px)';
    }
});

// ===== TEXT SCRAMBLE EFFECT FOR SECTION TITLES =====
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

document.querySelectorAll('.section-title').forEach(title => {
    const fx = new TextScramble(title);
    const originalText = title.innerText;
    
    title.parentElement.addEventListener('mouseenter', () => {
        fx.setText(originalText);
    });
});

// ===== MARINE GLOW EFFECT ON SCROLL =====
const addMarineGlow = () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const hue = 190 + (scrollPercent * 20);
    document.documentElement.style.setProperty('--primary-color', `hsl(${hue}, 90%, 50%)`);
};

window.addEventListener('scroll', addMarineGlow);

// ===== PERFORMANCE: DEBOUNCE SCROLL EVENTS =====
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

window.addEventListener('scroll', debounce(() => {
    revealOnScroll();
    animateTimeline();
}, 10));

console.log('%c🌊 Abderraouf Brada Portfolio Loaded', 'color: #0ea5e9; font-size: 20px; font-weight: bold;');

// ============================================
// INTERNSHIP MODAL FUNCTIONS
// ============================================

async function loadInternshipModal(filePath) {
    const modal = document.getElementById('internship-modal');
    const container = document.getElementById('modal-content');
    
    if (!modal || !container) {
        console.error('Modal structures missing.');
        return;
    }
    
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        const html = await response.text();
        container.innerHTML = html;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error loading internship:', error);
        alert('Failed to load internship details.');
    }
}

function closeInternshipModal() {
    const modal = document.getElementById('internship-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            const container = document.getElementById('modal-content');
            if (container) container.innerHTML = '';
        }, 300);
    }
}

function changeGalleryImage(thumb) {
    document.querySelectorAll('.gallery-thumbs img').forEach(img => {
        img.classList.remove('active');
    });
    
    thumb.classList.add('active');
    const mainImg = document.getElementById('gallery-main-img');
    if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = thumb.src;
            mainImg.alt = thumb.alt;
            mainImg.style.opacity = '1';
        }, 200);
    }
}

// Prevent container clicks from closing internship modal
const modalContentContainer = document.getElementById('modal-content');
if (modalContentContainer) {
    modalContentContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// ============================================
// VISIT MODAL FUNCTIONS
// ============================================

function loadVisitModal(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById('visit-modal-content').innerHTML = html;
            document.getElementById('visit-modal').classList.add('active');
            document.body.style.overflow = 'hidden';
        })
        .catch(error => {
            console.error('Error loading visit details:', error);
            document.getElementById('visit-modal-content').innerHTML = `
                <div style="padding: 3rem; text-align: center;">
                    <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: #ff6b6b; margin-bottom: 1rem;"></i>
                    <h3>Content Loading...</h3>
                    <p>Details for this visit will be available soon.</p>
                </div>
            `;
            document.getElementById('visit-modal').classList.add('active');
        });
}

function closeVisitModal() {
    document.getElementById('visit-modal').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== ACCORDION TOGGLE FUNCTION =====
function toggleAccordion(trigger) {
    const item = trigger.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.accordion-item').forEach(acc => {
        acc.classList.remove('active');
    });

    if (!isActive) {
        item.classList.add('active');
    }
}

// Close accordion when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.accordion-item')) {
        document.querySelectorAll('.accordion-item').forEach(acc => {
            acc.classList.remove('active');
        });
    }
});

// Universal Escape Key for both Modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeInternshipModal();
        closeVisitModal();
    }
});
