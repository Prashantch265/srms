document.getElementById("signin").addEventListener("click", (e) => {
  e.preventDefault();
  validateLogin();
});

function validateLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "") {
    document.getElementById("email*").hidden = false;
    setTimeout(() => {
      document.getElementById("email*").hidden = true;
    }, 5000);
  }
  if (password === "") {
    document.getElementById("pwd*").hidden = false;
    setTimeout(() => {
      document.getElementById("pwd*").hidden = true;
    }, 5000);
  }

  if (email !== "" && password !== "") {
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((data) => {
      console.log(data);
    });
  }
}
