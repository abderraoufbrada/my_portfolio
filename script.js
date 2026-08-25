// ===== NAVIGATION & SCROLL EFFECTS =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

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

// Active nav link on scroll
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

// ===== SCROLL REVEAL =====
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

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== TYPEWRITER =====
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

// ===== COUNTERS =====
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

// ===== SKILL BARS =====
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

// ===== CONTACT FORM =====
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
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
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

// ===== INTERNSHIP MODAL =====
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
        container.innerHTML = `
            <div style="padding: 3rem; text-align: center; color: #fff;">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: #ff6b6b;"></i>
                <h3>تعذر تحميل التفاصيل</h3>
                <p>حاول مرة أخرى لاحقاً.</p>
            </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
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

// ===== VISIT MODAL =====
function loadVisitModal(url) {
    const modal = document.getElementById('visit-modal');
    const content = document.getElementById('visit-modal-content');
    
    if (!modal || !content) return;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(html => {
            content.innerHTML = html;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        })
        .catch(error => {
            console.error('Error loading visit details:', error);
            content.innerHTML = `
                <div style="padding: 3rem; text-align: center; color: #fff;">
                    <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: #ff6b6b; margin-bottom: 1rem;"></i>
                    <h3>المحتوى قيد التحميل...</h3>
                    <p>تفاصيل هذه الزيارة ستكون متاحة قريباً.</p>
                </div>
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
}

function closeVisitModal() {
    const modal = document.getElementById('visit-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== ACCORDION =====
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

// Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeInternshipModal();
        closeVisitModal();
    }
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');

const animateTimeline = () => {
    timelineItems.forEach((item) => {
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
    item.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
});

window.addEventListener('scroll', animateTimeline);
window.addEventListener('load', () => {
    revealOnScroll();
    animateTimeline();
});

console.log('%c🌊 Abderraouf Brada Portfolio Loaded', 'color: #0ea5e9; font-size: 20px; font-weight: bold;');
