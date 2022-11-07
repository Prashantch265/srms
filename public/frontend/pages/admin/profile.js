document.getElementById(
  "profilePicture"
).innerHTML = `<img class="profile-user-img img-fluid img-circle" src="${
  profilePic ? profilePic : "../../dist/img/user1-128x128.jpg"
}" alt="User profile picture">`;

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

document.getElementById("uploadImage").addEventListener("click", (e) => {
  document.getElementById("fileInput").click();
});

document.getElementById("update").addEventListener("click", () => {
  update();
});

function update() {
  const formData = new FormData();
  const file = document.getElementById("fileInput").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    return Toast.fire({
      icon: "error",
      title: "Password doesn't match. Please re-enter your password",
    });
  }

  let obj = {
    file: file ? file : null,
    password: password,
  };

  for (let key in obj) {
    formData.append(key, obj[key]);
  }

  fetch("http://localhost:3000/user", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    method: "PATCH",
    body: { password },
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.status === 200) {
        Toast.fire({
          icon: "success",
          title: resData.message,
        });
        window.location.reload();
      } else {
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

document.getElementById("name").innerHTML = usersname;
document.getElementById("role").innerHTML = roleName;
