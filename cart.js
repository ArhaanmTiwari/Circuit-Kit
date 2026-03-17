window.onload = updateCartBubble()
// Add item to cart
function addToCart(productName, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: productName,
    price: price,
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(productName + " added to cart!");
  document.getElementById("cart-count").innerText = cart.length;
}

// Load cart items
function loadCart() {
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

  // Update red bubble count
  document.getElementById("cart-count").innerText = cart.length;
}

// Remove item
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  document.getElementById("cart-count").innerText = cart.length;
}

function toggleCart() {
  document.getElementById("cart-sidebar").classList.toggle("active");
  updateCartBubble();
  loadCart();
}

function updateCartBubble() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.length;

  const bubble = document.getElementById("cart-count");
  if (bubble) {
    bubble.textContent = count;
  }
}
