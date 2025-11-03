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
                <button type="button" onclick="openProductPage('${product.id}')" class="product__btn">View Details</button>
            </div>
        </div>
        `).join("");
    setupProductDetails();
}

// Save scroll before opening a product page
function openProductPage(productId) {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    const productUrl = `product.html?id=${productId}`;
    window.open(productUrl, "_blank");
};

// Restore scroll position when user returns
window.addEventListener("load", () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if(scrollPosition) {
        window.scrollTo(0, scrollPosition);
        sessionStorage.removeItem("scrollPosition");
    }
});
    
    // Feature tab buttons
tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const type = btn.dataset.type;
        displayProducts(type);
    });
});

// Cart container 
function createCartContainer() {
    const cartContainer = document.createElement("div");
    cartContainer.className = "cart__container";

    cartContainer.innerHTML = `
        <div class="cart__header">
            <h2>Your Cart</h2>
            <button type="button" class="close__cart aria-label="close cart">
                <i class="fa-solid fa-xmark close" aria-hidden="true"></i>
            </button>
        </div>

         <div class="cart__items></div>

         <div class="class__footer">
            <button class="checkout__btn">Proceed to Checkout</button>
         </div>
    `;

    document.body.appendChild(cartContainer)
}
createCartContainer();

// Toggle cart when cart icon is clicked
const cartIcon = document.querySelector(".shopping");
const cartContainer = document.querySelector(".cart__container");

cartIcon.addEventListener("click", () => {
    cartContainer.classList.toggle("hidden");
    cartContainer.classList.toggle("translate-x-full");
});

// Close cart
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close__cart")) {
    cartContainer.classList.add("hidden");
    cartContainer.classList.add("translate-x-full");
  }
});


// Cart selection
function updateCart() {
    const quantityBox = btn.closest(".quantity__boxes");
    const productId = Number(quantityBox.dataset.id);
    const product = productsData.find(p => p.id === productId);
    const displayQnty = quantityBox.querySelector(".display__quantity");
    const detailPrice = document.querySelector(".detail__price");
    const cartBtn = document.querySelector(".cart__btn");
}

    
