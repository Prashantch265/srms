var userId;

var toggler = document.getElementById("toggler");

const showHidePassword = () => {
  if (document.getElementById("password").type == "password") {
    document.getElementById("password").setAttribute("type", "text");
    toggler.classList.add("fa-eye-slash");
  } else {
    toggler.classList.remove("fa-eye-slash");
    document.getElementById("password").setAttribute("type", "password");
  }
};

toggler.addEventListener("click", showHidePassword);

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

document.getElementById("update").document.addEventListener("click", () => {
  update();
});

function update(userId) {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    return Toast.fire({
      icon: "error",
      title: "Password doesn't match. Please re-enter your password",
    });
  }

  fetch("http://localhost:3000/user/" + userId, {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify({ password }),
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.status === 200) {
        loadUsers();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadUsers();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}
