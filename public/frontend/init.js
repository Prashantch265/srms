var bearerToken, roleName;

document.addEventListener("load", getUser());

function getUser() {
  if (window.localStorage.getItem("user")) {
    const { accessToken, role } = JSON.parse(
      window.localStorage.getItem("user")
    );

    bearerToken = accessToken;
    roleName = role;

    fetch("http://localhost:3000/auth/init", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        if (resData && resData.status === 200) {
          const data = resData.data[0];
          document.getElementById(
            "user_name"
          ).innerHTML += `<a href="./profile.html" class="d-block">${data.name}</a>`;
        } else {
          window.location.href = "/";
        }
      });
  } else {
    window.location.href = "/";
  }
}

document.getElementById("logout").addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});

function logout() {
  if (window.localStorage.getItem("user")) {
    window.localStorage.clear();
    bearerToken = null;
    window.location.href = "/";
  }
}
