let products = [];

const container = document.getElementById("productsContainer");

// Load Products from Backend
async function loadProducts() {

  try {

    const response = await fetch("http://localhost:5000/api/products");

    const data = await response.json();

    products = data.products;

    displayProducts(products);

  } catch (error) {

    console.log(error);

    alert("Failed to load products");

  }

}

// Display Products
function displayProducts(items) {

  container.innerHTML = "";

  items.forEach(product => {

    container.innerHTML += `

    <div class="card">

      <div class="card-body">

        <h3>${product.productName}</h3>

        <p>${product.category}</p>

        <p>₹${product.price}</p>

        <button class="btn" onclick="addToCart('${product._id}')">
          Add To Cart
        </button>

      </div>

    </div>

    `;

  });

}

// Search & Filter
document.getElementById("searchInput")
.addEventListener("keyup", filterProducts);

document.getElementById("categoryFilter")
.addEventListener("change", filterProducts);

function filterProducts() {

  const search = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  const category =
    document.getElementById("categoryFilter").value;

  const filtered = products.filter(product => {

    const matchSearch =
      product.productName.toLowerCase().includes(search);

    const matchCategory =
      category === "all" ||
      product.category === category;

    return matchSearch && matchCategory;

  });

  displayProducts(filtered);

}

// Add To Cart
async function addToCart(productId) {

  const token = localStorage.getItem("token");

  if (!token) {

    alert("Please login first");

    window.location.href = "login.html";

    return;

  }

  try {

    const response = await fetch("http://localhost:5000/api/cart", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`

      },

      body: JSON.stringify({

        product: productId,

        quantity: 1

      })

    });

    const data = await response.json();

    alert(data.message);

  } catch (error) {

    console.log(error);

  }

}

// Load products automatically
loadProducts();

