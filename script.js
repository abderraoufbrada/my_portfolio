// ===============================
// SCROLL REVEAL (SMOOTH & STABLE)
// ===============================
const sections = document.querySelectorAll("section");

function revealOnScroll() {
    sections.forEach(section => {
        const position = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.85;

        if (position < screenPosition) {
            section.classList.add("show");
        }
    });
}

// Run on scroll + first load
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// ===============================
// MODAL FUNCTIONS
// ===============================
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "none";
    }
}


// ===============================
// CLOSE MODAL WHEN CLICK OUTSIDE
// ===============================
window.addEventListener("click", function(event) {
    document.querySelectorAll(".modal").forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});


// ===============================
// OPTIONAL: NAVBAR SCROLL EFFECT
// ===============================
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.background = "rgba(0,0,0,0.6)";
        header.style.backdropFilter = "blur(20px)";
    } else {
        header.style.background = "rgba(0,0,0,0.3)";
        header.style.backdropFilter = "blur(15px)";
    }
});
