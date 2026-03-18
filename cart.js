// Update cart bubble on load
window.onload = function() { updateCartBubble(); }

// Add item to cart
window.addToCart = function(productName, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: productName,
    price: price,
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(productName + " added to cart!");
  updateCartBubble();
}

// Load cart items into sidebar
window.loadCart = function() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");
  let total = 0;

  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;
    cartContainer.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - ₹${item.price}</span>
        <button class="remove-btn" onclick="removeItem(${index})">X</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
  updateCartBubble();
}

// Remove item from cart
window.removeItem = function(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Toggle cart sidebar
window.toggleCart = function() {
  document.getElementById("cart-sidebar").classList.toggle("active");
  updateCartBubble();
  loadCart();
}

// Update cart count bubble
window.updateCartBubble = function() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const bubble = document.getElementById("cart-count");
  if (bubble) {
    bubble.textContent = cart.length;
  }
}