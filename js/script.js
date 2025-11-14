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
if (productsContainer) {
    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            productsData = data;
            displayProducts("featured");
        });
}

function displayProducts(type) {
    const filtered = productsData.filter(p => p.type.includes(type));
    productsContainer.innerHTML = filtered.map(product => `
        <div class="product">
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="product__img">
                <button type="button" aria-label="wish icon" class="wish__btn">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
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
const cartIcon = document.querySelectorAll(".shopping");
const cartContainer = document.querySelector(".cart__container");
const closeCart = document.querySelector(".close__cart");

    cartIcon.forEach(icon => {
        icon.addEventListener("click", () => {
            cartContainer.classList.remove("hidden");
        })
    })

    // Close cart
    if (closeCart) {
        closeCart.addEventListener("click", (e) => {
            cartContainer.classList.add("hidden");
        });
    }


// Load Cart items 
function loadCartItems() {
    const cartItemsContainer = document.querySelector(".cart__items");
    const totalDisplay = document.querySelector(".cart__total");
    const emptyMsg = document.querySelector(".empty__message");
    const checkoutBtn = document.querySelector(".checkout__btn");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";
    }

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
            <div class="item__details">
                <img src="${item.image}" alt="${item.name}" class="item__image">
                <div>
                    <h4 class="item__price">${item.name}</h4>
                    <p class="item__quantity">$${item.price} x ${item.quantity}</p>
                    <p class="item__total">$${(item.price * item.quantity).toFixed(2)}</p>
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

            // Reload UI
            loadCartItems();
            updateCartCount();
            showSuccessMsg(`${item.name} was removed from your cart.`);

             const cartContainer = document.querySelector(".cart__container");

            // Handle empty cart
            if (updatedCart.length === 0) {
                emptyMsg.classList.remove("hidden");
                checkoutBtn.classList.add("hidden");

                // Hide cart container after 2 seconds
                setTimeout(() => {
                    cartContainer.classList.add("hidden");
                }, 2000);
            } else {
                emptyMsg.classList.add("hidden");
                checkoutBtn.classList.remove("hidden");
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
    msg.className = `fixed top-5 left-1/2 bg-[var(--antique-brass)] text-[var(--tamarind)] px-4 py-2 rounded shadow-md transition-opacity duration-500 opacity-100 z-50 transform -translate-x-1/2`
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
    const countEls = document.querySelectorAll(".item__count");

    const uniqueProductCount = cart.length;
    countEls.forEach(countEl => {
        if (uniqueProductCount > 0) {
            countEl.textContent = uniqueProductCount;
            countEl.classList.remove("hidden");
        } else {
            countEl.classList.add("hidden");
        }
    })
};

// wishList icon
const wishList = document.querySelectorAll(".wish__btn");

wishList.forEach(wish => {
    wish.addEventListener("click", () => {
        const icon = wish.querySelector("i");
        console.log('clicked wish, before:', wish.className, icon.className);

        // Toggle icon type
        if (icon.classList.contains("fa-regular")) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        } else {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular")
        }

        wish.classList.toggle("active");

        console.log('after:', wish.className, icon.className);
    })
});

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".cart__items")) {
        loadCartItems();
        updateCartCount();
    }
})

// Listen for update no reload needed
window.addEventListener("storage", (e) => {
    if(e.key === "cart") {
        loadCartItems();
        updateCartCount();
    }
});


    
