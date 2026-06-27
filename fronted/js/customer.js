const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!token || !user) {
  window.location.href = "login.html";
}

document.getElementById("welcomeUser").innerText =
  "Welcome " + user.name;

document.getElementById("userName").innerText =
  "Name : " + user.name;

document.getElementById("userEmail").innerText =
  "Email : " + user.email;

// Load Orders
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

    document.querySelector(".stat-card p").innerText =
      data.orders.length;

  } catch (error) {

    console.log(error);

    alert("Unable to load orders");

  }

}

// Load Cart
async function loadCart() {

  try {

    const response = await fetch(
      "https://krishi-market-ag8b.onrender.com/api/cart",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    document.getElementById("cartCount").innerText =
      data.cart.length;

  } catch (error) {

    console.log(error);

  }

}

function logout() {

  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");

  window.location.href = "login.html";

}

loadOrders();
loadCart();

