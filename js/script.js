const openMenu = document.querySelector(".open__menu");
const closeMenu = document.querySelector(".close__menu");
const navMenu = document.querySelector(".nav__menu");
const navLink = document.querySelectorAll(".nav__item");

openMenu.addEventListener("click", () => {
    navMenu.classList.toggle("toggle");
});

closeMenu.addEventListener("click", () => {
    navMenu.classList.remove("toggle");
});

