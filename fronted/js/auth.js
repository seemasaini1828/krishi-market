const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {

      const response = await fetch("https://krishi-market-ag8b.onrender.com/api/auth/register", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          password,
          role
        })

      });

      const data = await response.json();

      if (response.ok) {

        alert("Registration Successful");

        window.location.href = "login.html";

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  });

}


const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {

      const response = await fetch("https://krishi-market-ag8b.onrender.com/api/auth/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })

      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // JWT Token Save
      localStorage.setItem("token", data.token);

      // User Save
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      alert("Login Successful");

      // Redirect According to Role
      if (data.user.role === "farmer") {

        window.location.href = "farmer-dashboard.html";

      } else if (data.user.role === "admin") {

        window.location.href = "admin-dashboard.html";

      } else {

        window.location.href = "customer-dashboard.html";

      }

    } catch (error) {

      console.error(error);
      alert("Server Error");

    }

  });

}

