 // product page
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    // Load the product data
    fetch("data.json")
    .then(res => res.json())
    .then(productsData => {
        const product = productsData.find(p => p.id == productId);

        if(product) {
            document.querySelector(".detail__img").src = product.image;
            document.querySelector(".detail__name").textContent = product.name;
            document.querySelector(".detail__price").textContent = `$${product.price}`;
            document.querySelector(".quantity__boxes").dataset.id = product.id;
            const cartBtn = document.querySelector(".cart__btn") ;

            window.productsData = productsData;
            setupQuantityButtons();

            cartBtn.addEventListener("click", () => {
                const quantityEl = document.querySelector(".display__quantity");
                const quantity = Number(quantityEl?.textContent || 1);
                addToCart(product, quantity);
                window.close();
            });
        } else {
            document.querySelector(".product__detail").innerHTML = `<p>Product not found</p>`;
        }
    })
    .catch(err => console.error("Error loading data.json:", err));

    // addition and subtraction of quantity
    function setupQuantityButtons() {
        const buttons = document.querySelectorAll(".plus__btn, .minus__btn");

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const quantityBox = btn.closest(".quantity__boxes");
                const productId = Number(quantityBox.dataset.id);
                const product = productsData.find(p => p.id === productId);
                const displayQnty = quantityBox.querySelector(".display__quantity");
                const detailPrice = document.querySelector(".detail__price");
                const cartBtn = document.querySelector(".cart__btn");
                
                let quantity = Number(displayQnty.textContent);

                if (btn.classList.contains("plus__btn")) {
                    quantity++;
                } else if (btn.classList.contains("minus__btn") && quantity > 0) {
                    quantity--;
                }

                displayQnty.textContent = quantity;

                // Disable button when quantity is 0 
                if (quantity === 0) {
                    detailPrice.textContent = `$0.00`;
                    cartBtn.disabled = true;
                    cartBtn.classList.add("opacity-50", "cursor-not-allowed");
                } else {
                    const totalPrice = product.price * quantity;

                    detailPrice.textContent = `$${totalPrice.toFixed(2)}`;
                    cartBtn.disabled = false;
                    cartBtn.classList.remove("opacity-50", "cursor-not-allowed");
                }
                
            })
        })
    };

    // Add to cart from product page
    function addToCart(product, quantity = 1) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const id = product.id;

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
             cart.push({
                id: product.id,
                name: product.name,
                price: Number(product.price),
                image: product.image,
                quantity: quantity
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to your cart!`);
    }

    