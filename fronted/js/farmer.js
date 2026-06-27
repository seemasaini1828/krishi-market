const token = localStorage.getItem("token");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!token || !currentUser) {
  window.location.href = "login.html";
}

document.getElementById("farmerName").innerText =
  "Welcome " + currentUser.name;

const productList = document.getElementById("productList");

async function loadProducts() {

  try {

    const response = await fetch(
      "https://krishi-market-ag8b.onrender.com/api/products/myproducts",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    document.getElementById("totalProducts").innerText =
      data.count;

    productList.innerHTML = "";

    data.products.forEach(product => {

      productList.innerHTML += `

      <div class="card">

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

    console.log(error);

    alert("Unable to load products");

  }

}

// Add Product
document.getElementById("addProductForm")
.addEventListener("submit", async function (e) {

  e.preventDefault();

  const productName =
    document.getElementById("productName").value;

  const category =
    document.getElementById("productCategory").value;

  const price =
    document.getElementById("productPrice").value;

  const response = await fetch(
    "https://krishi-market-ag8b.onrender.com/api/products",
    {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify({
        productName,
        category,
        description: "Fresh Product",
        price,
        quantity: 1,
        unit: "kg",
        image: "",
        farmingMethod: "Organic"
      })

    }
  );

  const data = await response.json();

  alert(data.message);

  this.reset();

  loadProducts();

});

// Delete Product
async function deleteProduct(id) {

  if (!confirm("Delete this product?")) return;

  const response = await fetch(
    `https://krishi-market-ag8b.onrender.com/api/products/${id}`,
    {

      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`
      }

    }
  );

  const data = await response.json();

  alert(data.message);

  loadProducts();

}

function logout() {

  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");

  window.location.href = "login.html";

}

loadProducts();

