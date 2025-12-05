 // product page
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    // Price function
    function getFinalPrice(product) {
        if (product.discount && product.discount > 0) {
            return product.price - (product.price * product.discount);
        }
        return product.price;
    }


    // Load the product data
    fetch("data.json")
    .then(res => res.json())
    .then(productsData => {
        const product = productsData.find(p => p.id == productId);
        

        if(product) {
            const finalPrice = getFinalPrice(product).toFixed(2);
            const hasDiscount = product.discount && product.discount > 0;

            document.querySelector(".detail__img").src = product.image;
            document.querySelector(".detail__name").textContent = product.name;
            document.querySelector(".detail__description").textContent = product.description;
            
            document.querySelector(".detail__price").textContent = `$${finalPrice}`;
            
            const oldPriceEl = document.querySelector(".discount__price");

            if(hasDiscount) {
                oldPriceEl.textContent = `$${product.price.toFixed(2)}`;
                oldPriceEl.classList.remove("hidden");
            } else {
                oldPriceEl.classList.add("hidden");
            }

            
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
            document.querySelector(".product__details").innerHTML = `<p>Product not found</p>`;
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
                const product = window.productsData.find(p => p.id === productId);
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

                // Choose correct unit price
                const unitPrice = getFinalPrice(product);

                // Disable button when quantity is 0 
                if (quantity === 0) {
                    detailPrice.textContent = `$0.00`;
                    cartBtn.disabled = true;
                    cartBtn.classList.add("opacity-50", "cursor-not-allowed");
                } else {
                    const totalPrice = unitPrice * quantity;

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
        const unitPrice = getFinalPrice(product);

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
             cart.push({
                id: product.id,
                name: product.name,
                price: unitPrice,
                image: product.image,
                quantity: quantity
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to your cart!`);
    }