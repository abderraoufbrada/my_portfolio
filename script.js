// =======================
// ScrollReveal Animation
// =======================
ScrollReveal().reveal('.project-icon', {
    duration: 1000,
    distance: '60px',
    origin: 'bottom',
    interval: 150,
    easing: 'ease-in-out',
    reset: false
});


// =======================
// Smooth Scroll Animation
// =======================
const elements = document.querySelectorAll("section");

function revealOnScroll() {
    elements.forEach(el => {
        let position = el.getBoundingClientRect().top;
        let screenPosition = window.innerHeight / 1.2;

        if (position < screenPosition) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", revealOnScroll);


// =======================
// Initial State
// =======================
elements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "all 1s ease";
});


// =======================
// Modal Functions
// =======================
function openModal(id) {
    document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}


// =======================
// Close modal when clicking outside
// =======================
window.onclick = function(event) {
    const modals = document.querySelectorAll(".modal");

    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
