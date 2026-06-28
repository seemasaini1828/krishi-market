const API_URL = "https://krishi-market-ag8b.onrender.com/api/admin";

async function loadDashboard() {
  try {
    const usersRes = await fetch(`${API_URL}/users`);
    const users = await usersRes.json();

    const productsRes = await fetch(`${API_URL}/products`);
    const products = await productsRes.json();

    // Dashboard Counts
    document.getElementById("totalUsers").innerText = users.length;

    const farmers = users.filter(user => user.role === "farmer");
    document.getElementById("totalFarmers").innerText = farmers.length;

    document.getElementById("totalProducts").innerText = products.length;

    // Users List
    const usersList = document.getElementById("usersList");
    usersList.innerHTML = "";

    users.forEach(user => {
      usersList.innerHTML += `
      <div class="card" style="margin-bottom:15px;">
        <div class="card-body">
          <h3>${user.name}</h3>
          <p>${user.email}</p>
          <p>${user.role}</p>

          <button
            class="btn"
            onclick="deleteUser('${user._id}')">
            Delete
          </button>
        </div>
      </div>
      `;
    });

    // Products List
    const productsList = document.getElementById("productsList");
    productsList.innerHTML = "";

    products.forEach(product => {
      productsList.innerHTML += `
      <div class="card" style="margin-bottom:15px;">
        <div class="card-body">
          <h3>${product.productName}</h3>
          <p>${product.category}</p>
          <p>₹${product.price}</p>

          <button
            class="btn"
            onclick="deleteProduct('${product._id}')">
            Delete
          </button>
        </div>
      </div>
      `;
    });

  } catch (error) {
    console.error(error);
    alert("Failed to load admin dashboard");
  }
}

loadDashboard();
