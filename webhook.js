console.log("Webhook JS Loaded");

async function placeOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all details!");
    return;
  }

  const order = "ORD" + Date.now();
  const items = cart.map((item) => item.name).join(", ");
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const options = {
    key: "rzp_live_RsFAMXjzBQh5V7",
    amount: total * 100,
    currency: "INR",
    name: "Arhaan Tech Innovations",
    description: "Order " + order,
    prefill: {
      name: name,
      contact: phone,
    },
    theme: { color: "#042C53" },

    handler: async function (response) {
      const params = new URLSearchParams({
        order,
        name,
        phone,
        address,
        items,
        total,
        payment_id: response.razorpay_payment_id,
      });

      const url =
        "https://script.google.com/macros/s/AKfycbyv6F7ONyKZ9mih0eEup1Hr5Mrz639-4nmeW0KxbQjeYnXCz4qQvZISWnx4r0R5BkVixw/exec?" +
        params.toString();

      await fetch(url);

      localStorage.removeItem("cart");
      window.location.href = "success.html?order=" + order;
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
}