document.addEventListener("load", checkToken());

function checkToken() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (user) {
    const { role } = user;
    if (role === "admin") window.location.replace("./pages/admin/");
    else if (role === "student") window.location.replace("./pages/student/");
    else if (role === "teacher") window.location.replace("./pages/teacher/");
  }
}

document.getElementById("signin").addEventListener("click", (e) => {
  e.preventDefault();
  validateLogin();
});

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
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
      body: JSON.stringify({ userName: email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        const data = resData.data;
        document.getElementById("form").reset();
        if (resData.status === 200) {
          window.localStorage.setItem("user", JSON.stringify(data));
          const { role } = data;
          if (role === "admin")
            return window.location.replace("./pages/admin/");
          else if (role === "student")
            return window.location.replace("./pages/student/");
          else if (role === "teacher")
            return window.location.replace("./pages/teacher/");
        } else {
          return Toast.fire({
            icon: "error",
            title: resData.message,
          });
        }
      });
  }
}
