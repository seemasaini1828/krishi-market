const users =
JSON.parse(
localStorage.getItem("users")
) || [];

const products =
JSON.parse(
localStorage.getItem("farmerProducts")
) || [];

document.getElementById(
"totalUsers"
).innerText = users.length;

const farmers =
users.filter(
user => user.role === "farmer"
);

document.getElementById(
"totalFarmers"
).innerText =
farmers.length;

document.getElementById(
"totalProducts"
).innerText =
products.length;

/* Users */

const usersList =
document.getElementById(
"usersList"
);

users.forEach((user,index)=>{

usersList.innerHTML += `

<div class="card" style="margin-bottom:15px;">

<div class="card-body">

<h3>${user.name}</h3>

<p>${user.email}</p>

<p>${user.role}</p>

<button
class="btn"
onclick="deleteUser(${index})">

Delete

</button>

</div>

</div>

`;

});

/* Products */

const productsList =
document.getElementById(
"productsList"
);

products.forEach((product,index)=>{

productsList.innerHTML += `

<div class="card" style="margin-bottom:15px;">

<div class="card-body">

<h3>${product.name}</h3>

<p>${product.category}</p>

<p>₹${product.price}</p>

<button
class="btn"
onclick="deleteProduct(${index})">

Delete

</button>

</div>

</div>

`;

});

function deleteUser(index){

users.splice(index,1);

localStorage.setItem(
"users",
JSON.stringify(users)
);

location.reload();

}

function deleteProduct(index){

products.splice(index,1);

localStorage.setItem(
"farmerProducts",
JSON.stringify(products)
);

location.reload();

}

function logout(){

localStorage.removeItem(
"currentUser"
);

window.location.href =
"login.html";

}
