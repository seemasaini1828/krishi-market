const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

async function loadOrders() {

  try {

    const response = await fetch(
      "https://krishi-market-ag8b.onrender.com/api/orders",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    const container = document.getElementById("ordersContainer");

    container.innerHTML = "";

    if (!data.success || data.orders.length === 0) {

      container.innerHTML = `
      <h3 style="text-align:center;">
      No Orders Found
      </h3>
      `;

      return;
    }

    data.orders.forEach(order => {

      container.innerHTML += `

      <div class="card" style="margin-bottom:20px;">

      <div class="card-body">

      <h3>Order ID</h3>

      <p>${order._id}</p>

      <p><b>Total :</b> ₹${order.totalAmount}</p>

      <p><b>Items :</b> ${order.products.length}</p>

      <p><b>Status :</b> ${order.status || "Placed"}</p>

      </div>

      </div>

      `;

    });

  } catch (error) {

    console.error(error);

    alert("Failed to load orders");

  }

}

loadOrders();
