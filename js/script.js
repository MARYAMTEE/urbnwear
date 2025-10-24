const openMenu = document.querySelector(".open__menu");
const closeMenu = document.querySelector(".close__menu");
const navMenu = document.querySelector(".nav__menu");
const navList = document.querySelectorAll(".nav__item");
const navLink = document.querySelectorAll(".nav__link");
const logoText = document.querySelector(".logo__container");
const overlay = document.querySelector(".overlay");

openMenu.addEventListener("click", () => {
    navMenu.classList.toggle("toggle");

    logoText.classList.add("hidden");
    overlay.classList.add("active");
});

closeMenu.addEventListener("click", () => {
    navMenu.classList.remove("toggle");

    logoText.classList.remove("hidden");
    overlay.classList.remove("active");
});

navList.forEach((list, index) => {
    list.addEventListener("click", () => {
        navList.forEach(l => l.classList.remove("active"));
        list.classList.add("active");

        navLink.forEach(link => link.classList.remove("active"));
        navLink[index].classList.add("active");

        logoText.classList.remove("hidden");

        navMenu.classList.remove("toggle");
        overlay.classList.remove("active");
    });
});

const productsContainer = document.querySelector(".clothing__items");
const tabButtons = document.querySelectorAll(".tab__btn");
let productsData = [];

// Fetch data
fetch("data.json")
    .then(res => res.json())
    .then(data => {
        productsData = data;
        displayProducts("featured");
    });

    function displayProducts(type) {
        const filtered = productsData.filter(p => p.type.includes(type));
        productsContainer.innerHTML = filtered.map(product => `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <div class="product__text">
                    <h4 class="product__title">${product.name}</h4>
                    <p class="product__price">$${product.price}</p>
                    <button type="button" class="product__btn">Add to cart</button>
                </div>
            </div>
            `).join("");
    }

    // button tab
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const type = btn.dataset.type;
            displayProducts(type);
        });
    });

