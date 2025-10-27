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
        setupQuantityButtons();
    });

    function displayProducts(type) {
        const filtered = productsData.filter(p => p.type.includes(type));
        productsContainer.innerHTML = filtered.map(product => `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <div class="product__text">
                    <h4 class="product__title">${product.name}</h4>
                    <p class="product__price">$${product.price}</p>
                    <button type="button" data-id="${product.id}" class="product__btn">Add to cart</button>
                </div>
            </div>
            `).join("");

        setupProductDetails();
    }

    // Feature tab buttons
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const type = btn.dataset.type;
            displayProducts(type);
        });
    });

    // Add to cart
    function setupProductDetails() {
        const cartBtns = document.querySelectorAll(".product__btn");
        const detailOverlay = document.querySelector(".clothing__overlay");
        const detailImg = document.querySelector(".detail__img");
        const detailTitle = document.querySelector(".detail__name");
        const detailPrice = document.querySelector(".detail__price");
        const detailBtn = document.querySelector(".detail_close-btn");
        const quantityBox = document.querySelector(".quantity__boxes");

        cartBtns.forEach(btn => {
            btn.addEventListener("click", e => {
                const productId = Number(btn.dataset.id);
                const product = productsData.find(p => p.id === productId);

                detailImg.src = product.image;
                detailTitle.textContent = product.name;
                // detailDesc.textContent = product.description;
                detailPrice.textContent = `$${product.price}`;

                quantityBox.dataset.id = product.id;

                // show overlay
                detailOverlay.classList.add("active");
            });
        });
        
        // close modal
        detailBtn.addEventListener("click", () => {
            detailOverlay.classList.remove("active");
        })
    
        detailOverlay.addEventListener("click", e => {
        if (e.target === detailOverlay) detailOverlay.classList.remove("active");
      });
    }

    function setupQuantityButtons() {
        // const plusBtns = document.querySelectorAll(".plus__btn");
        // const minusBtns = document.querySelectorAll(".minus__btn");
        const buttons = document.querySelectorAll(".plus__btn, .minus__btn");

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const quantityBox = btn.closest(".quantity__boxes");
                const productId = Number(quantityBox.dataset.id);
                const product = productsData.find(p => p.id === productId);
                const displayQnty = quantityBox.querySelector(".display__quantity");
                const detailPrice = document.querySelector(".detail__price");
                

                let quantity = Number(displayQnty.textContent);

                if (btn.classList.contains("plus__btn")) {
                    quantity++;
                } else if (btn.classList.contains("minus__btn") && quantity > 0) {
                    quantity--;
                }

                displayQnty.textContent = quantity;

                const totalPrice = product.price * quantity;
                detailPrice.textContent = `$${totalPrice.toFixed(2)}`;
            })
        })
    }

    // const displayQnty = document.querySelector(".display__quantity");
    // const cartBtn = document.querySelector(".cart__btn");
    // const emptyMsg = document.querySelector(".empty-message");
    // const deleteBtn = document.querySelector(".delete__icon")

    
