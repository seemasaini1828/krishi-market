const token = localStorage.getItem("token");

const cartContainer = document.getElementById("cartContainer");

let cartItems = [];

// Load Cart
async function loadCart() {

  try {

    const response = await fetch("https://krishi-market-ag8b.onrender.com/api/cart", {

      headers: {
        Authorization: `Bearer ${token}`
      }

    });

    const data = await response.json();

    cartItems = data.cart;

    displayCart();

  } catch (error) {

    console.log(error);

    alert("Failed to load cart");

  }

}

// Display Cart
function displayCart() {

  cartContainer.innerHTML = "";

  let total = 0;

  if (cartItems.length === 0) {

    cartContainer.innerHTML =
      "<h3 style='text-align:center'>Your Cart is Empty</h3>";

    document.getElementById("totalPrice").innerText =
      "Total : ₹0";

    return;

  }

  cartItems.forEach(item => {

    total += item.product.price * item.quantity;

    cartContainer.innerHTML += `

      <div class="cart-item">

        <div>

          <h3>${item.product.productName}</h3>

          <p>${item.product.category}</p>

          <p>Qty : ${item.quantity}</p>

        </div>

        <div>

          <h3>₹${item.product.price}</h3>

        </div>

      </div>

    `;

  });

  document.getElementById("totalPrice").innerText =
    `Total : ₹${total}`;

}

// Checkout
async function checkout() {

  try {

    const response = await fetch("https://krishi-market-ag8b.onrender.com/api/orders", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`

      }

    });

    const data = await response.json();

    alert(data.message);

    loadCart();

  } catch (error) {

    console.log(error);

  }

}

loadCart();

