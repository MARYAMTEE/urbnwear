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


// Load Cart items 
function loadCartItems() {
    const cartItemsContainer = document.querySelector(".cart__items");
    const totalDisplay = document.querySelector(".cart__total");
    const emptyMsg = document.querySelector(".empty__message");
    const checkoutBtn = document.querySelector(".checkout__btn");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cartItemsContainer.innerHTML = "";

    if(cart.length === 0) {
        emptyMsg.classList.remove("hidden");
        totalDisplay.textContent = "";
        checkoutBtn.classList.add("hidden");
        return;
    } else {
        emptyMsg.classList.add("hidden");
        checkoutBtn.classList.remove("hidden");
    }
    
    cart.forEach((item, index) => {
        const itemEl = document.createElement("div");
        itemEl.className = "cart__item";

        itemEl.innerHTML = `
            <div>
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                <div>
                    <p>${item.name}</p>
                    <p>$${item.price} x ${item.quantity}</p>
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
            <button type="button" class="delete__btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        // Delete event
        const deleBtn = itemEl.querySelector(".delete__btn");
        deleBtn.addEventListener("click", () => {
            // remove item from cart
            const updatedCart = cart.filter(p => p.id !== item.id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));

            loadCartItems();
            updateCartCount();
            showSuccessMsg(`${item.name} was removed from your cart.`);

            if (updateCartCount.length === 0) {
                emptyMsg.classList.remove("hidden");
                totalDisplay.textContent = "";
                checkoutBtn.classList.add("hidden");
            }
        });

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(itemEl);
    });

    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
};

// Success message when product is added to the cart
function showSuccessMsg(message) {
    const msg = document.createElement("div");
    msg.textContent = message;
    msg.className = `fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-md transition-opacity duration-500 opacity-100 z-50`
    document.body.appendChild(msg);

    setTimeout(() => {
        msg.style.opacity = "0";
        setTimeout(() => msg.remove(), 500);
    }, 2000);
};

// Update cart
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.length;
    const countEl = document.getElementById("product__count");

    const uniqueProductCount = cart.length;
    
    if (uniqueProductCount > 0) {
        countEl.textContent = uniqueProductCount;
        countEl.classList.remove("hidden");
    } else {
        countEl.classList.add("hidden");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
    updateCartCount();
})

// Listen for update no reload needed
window.addEventListener("storage", (e) => {
    if(e.key === "cart") {
        loadCartItems();
        updateCartCount();
    }
});


    
