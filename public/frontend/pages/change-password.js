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

document.getElementById("updatePassword").addEventListener("click", update());

function update() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    return Toast.fire({
      icon: "error",
      title: "Password doesn't match. Please re-enter your password",
    });
  }

  fetch("http://localhost:3000/user/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    method: "PATCH",
    body: JSON.stringify({ password }),
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.status === 200) {
        Toast.fire({
          icon: "success",
          title: resData.message,
        });
        return window.location.href("/");
      } else {
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}
