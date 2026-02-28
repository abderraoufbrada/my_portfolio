
// Fade in animation on scroll

const elements = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

elements.forEach(el => {

let position = el.getBoundingClientRect().top;
let screenPosition = window.innerHeight / 1.2;

if(position < screenPosition){
el.style.opacity = "1";
el.style.transform = "translateY(0)";
}

});

});


// Initial state

elements.forEach(el => {

el.style.opacity = "0";
el.style.transform = "translateY(50px)";
el.style.transition = "1s";


});
function openModal(id){

document.getElementById(id).style.display = "block";

}

function closeModal(id){

document.getElementById(id).style.display = "none";

}
