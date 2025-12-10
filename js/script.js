const openMenu = document.querySelectorAll(".open__menu");
const closeMenu = document.querySelector(".close__menu");
const navMenu = document.querySelector(".nav__menu");
const navList = document.querySelectorAll(".nav__item");
const navLink = document.querySelectorAll(".nav__link");
const logoText = document.querySelector(".logo__container");
const overlay = document.querySelector(".overlay");

openMenu.forEach(menu => {
    menu.addEventListener("click", () => {
        navMenu.classList.toggle("toggle");
        logoText.classList.add("hidden");
        overlay.classList.add("active");
    });
})

closeMenu.addEventListener("click", () => {
    navMenu.classList.remove("toggle");
    logoText.classList.remove("hidden");
    overlay.classList.remove("active");
});

navList.forEach((list, index) => {
    list.addEventListener("click", () => {
        navLink[index].click();
        
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
            displayWishList(productsData);

            displayDiscountProducts();
            displayTrendies("all");
        });
}

function displayProducts(type) {
    const filtered = productsData.filter(p => p.type.includes(type) && (!p.discount || p.discount === 0)
);
    productsContainer.innerHTML = filtered.map(product => `
        <div class="product">
            <div class="relative">
                <img decoding="async" loading="lazy" src="${product.image}" alt="${product.name}" class="product__img">
            </div>
            <div class="product__text">
                <h4 class="product__title">${product.name}</h4>
                <p class="product__price">$${product.price}</p>
                <button type="button" onclick="openProductPage('${product.id}')" class="product__btn">View Details</button>
            </div>

            <button type="button" aria-label="wish icon" class="wish__btn" data-id="${product.id}">
                    <i class="fa-regular fa-heart text-[var(--black)]"></i>
                </button>
        </div>
        `).join("");

    // Toggle wishlist button
    const wishBtn = document.querySelectorAll(".wish__btn");
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishBtn.forEach(wBtn => {
        const productId = wBtn.dataset.id;
        const icon = wBtn.querySelector("i");
        // Set initial icon state
        if(wishlist.includes(productId)) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        } else {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
        }

        // Toggle on click
        wBtn.addEventListener("click", () => {
            updateWishlist(productId);

            icon.classList.toggle("fa-regular");
            icon.classList.toggle("fa-solid");
            
            displayWishList(productsData);
        })
    });
}

function updateWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
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
const cartIcon = document.querySelectorAll(".cart__icon-container");
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
                <img loading="lazy" decoding="async" src="${item.image}" alt="${item.name}" class="item__image">
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

const checkoutBtn = document.querySelector(".checkout__btn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    // Get the current cart
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Save cart (optional, already in localStorage)
    localStorage.setItem("checkoutCart", JSON.stringify(cart));

    // Redirect to checkout page
    window.location.href = "checkout.html";
  });
}


// Success message when product is added to the cart
function showSuccessMsg(message) {
    const msg = document.createElement("div");
    msg.textContent = message;
    msg.className = `fixed top-5 left-1/2 bg-[var(--copper)] text-[var(--tamarind)] px-4 py-2 rounded shadow-md transition-opacity duration-500 opacity-100 z-50 transform -translate-x-1/2`
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

// Wish List
function displayWishList(productsData) {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    const container = document.querySelector(".wishlist__items");

    if(!container) return;
    
    const wished = productsData.filter(p => list.includes(String(p.id)));

    if(wished.length === 0) {
        container.innerHTML = "<p class='text-center text-sm py-8 italic'>No items in wishlist</p>";
        return;
    }

    container.innerHTML = wished.map(product => `
        <div class="wishlist__mini">
            <img loading="lazy" decoding="async" src="${product.image}" class="wish__img" alt="${product.name}">
            <div>
                <p class="wishProduct__name">${product.name}</p>
            </div>

            <button type="button" class="remove__wish" data-id="${product.id}" aria-label="Wish item close button">
                <i class="fa-solid fa-xmark remove__icon" aria-hidden="true"></i>
            </button>
        </div>
        `).join("");

    const removeBtns = container.querySelectorAll(".remove__wish");

    removeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            removeWish(btn.dataset.id);
        });
    });
}

// Function to remove wishlist
function removeWish(id) {
    let list = JSON.parse(localStorage.getItem("wishlist")) || [];
    list = list.filter(item => item !== id);

    localStorage.setItem("wishlist", JSON.stringify(list));
    displayWishList(productsData);
    displayProducts("featured");
}

// Discount section
function displayDiscountProducts() {
    const discountContainer = document.querySelector(".discount__products");

    if (!discountContainer) return;

    // pick only items that have discount
    const discountedItems = productsData.filter(p => p.discount);

    discountContainer.innerHTML = discountedItems.map(product => {

        const oldPrice = product.price;
        const newPrice = (product.price - (product.price * product.discount)).toFixed(2);

        return `
        <div class="product border-1 border-[var(--copper)]">
            <div class="relative">
                <img loading="lazy" decoding="async" src="${product.image}" alt="${product.name}" class="product__img">
            </div>

            <span class="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded">
                -${product.discount * 100}%
            </span>

            <div class="product__text">
                <h4 class="product__title">${product.name}</h4>
                <p class="line-through text-gray-400">$${oldPrice}</p>
                <p class="text-red-600 font-bold">$${newPrice}</p>
                <button type="button" onclick="openProductPage('${product.id}')" class="product__btn">View Details</button>
            </div>

        </div>
        `;
    }).join("");
}

// Trendy Section
const trendyContainer = document.querySelector(".trending__products");
const viewMoreBtn = document.querySelector(".viewMore__btn");
let visibleCount = 4;
let isExpanded = false;

// Display Products
function displayTrendies(type = "all") {
    let filtered;

    if (type === "all") {
        filtered = productsData.filter(p => p.type.includes("all"));
    } else {
        filtered = productsData.filter(p => p.type.includes(type));
    }
    

    trendyContainer.innerHTML = filtered.map((product, index) => `
        <div class="trendy__set border border-gray-300 rounded-md text-center ${index >= visibleCount ? 'hidden-set' : ''}">
            <img loading="lazy" decoding="async" class="trendy__img" src="${product.image}" alt="${product.name}">

            <div class="product__text py-8">
                <h3 class="product__title text-lg">${product.name}</h3>
                <p class="product__price text-lg font-semibold mt-2 mb-4">$${product.price}</p>
                <button type="button" onclick="openProductPage('${product.id}')" class="product__btn">View Details</button>
            </div>
        </div>
    `).join('');

    // add animation
    setTimeout(() => {
    document.querySelectorAll(".trendy__set").forEach(item => {
        item.classList.add("show");
    });
    }, 10);


    if (filtered.length <= 4) {
    viewMoreBtn.style.display = "none";
}

}
if (viewMoreBtn) {
    viewMoreBtn.addEventListener("click", () => {
        const currentFilter = trendyFilter.value;

        if (!isExpanded) {
            // Expand (View More)
            visibleCount = Infinity;
            viewMoreBtn.textContent = "View Less";
            isExpanded = true;
        } else {
            // Collapse (View Less)
            visibleCount = 4;
            viewMoreBtn.textContent = "View More";
            isExpanded = false;
        }

        displayTrendies(currentFilter);
    });
}


const trendyFilter = document.getElementById("trendy__filter");
trendyFilter.addEventListener("change", () => {
    visibleCount = 4;
    isExpanded = false;
    viewMoreBtn.textContent = "View More";

    const currentFilter = trendyFilter.value;
    displayTrendies(currentFilter);
});

// Scrool animation
function smoothScroll(target, duration = 1200) {
  const start = window.pageYOffset;
  const end = target.offsetTop;
  const distance = end - start;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    window.scrollTo(0, start + distance * progress);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const href = this.getAttribute("href");

    // Skip links that are just "#" (invalid)
    if (href === "#" || href.trim() === "") return;

    const target = document.querySelector(href);

    // If the section does not exist, stop
    if (!target) return;

    // Smooth scroll
    smoothScroll(target, 1200);
  });
});

