document
  .getElementById("passwordVisiblity")
  .addEventListener("click", __PasswordShowHide());

function __PasswordShowHide() {
  const x = document.getElementById("password");
  const showPassword = document.getElementById("showPassword");
  const hidePassword = document.getElementById("hidePassword");
  hidePassword.classList.remove("d-none");
  if (x.type === "password") {
    x.type = "text";
    showPassword.style.display = "none";
    hidePassword.style.display = "block";
  } else {
    x.type = "password";
    showPassword.style.display = "block";
    hidePassword.style.display = "none";
  }
}
