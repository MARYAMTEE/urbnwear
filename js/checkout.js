const cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
const shippingFee = 10; // fixed for now
let subtotal = 0;

const orderSummaryContainer = document.querySelector(".checkout__order--summary");

cart.forEach(item => {
  subtotal += item.price * item.quantity;

  const div = document.createElement("div");
  div.classList.add("flex", "justify-between", "text-sm");
  div.innerHTML = `<span>${item.name} x ${item.quantity}</span><span>$${(item.price * item.quantity).toFixed(2)}</span>`;
  orderSummaryContainer.appendChild(div);
});

const total = subtotal + shippingFee;

// Update summary display
document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
document.getElementById("shipping").textContent = `$${shippingFee.toFixed(2)}`;
document.getElementById("total").textContent = `$${total.toFixed(2)}`;
