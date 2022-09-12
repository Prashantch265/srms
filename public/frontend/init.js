document.addEventListener("load", getUser());

function getUser() {
  if (window.localStorage.getItem("user")) {
    const { accessToken, role } = JSON.parse(
      window.localStorage.getItem("user")
    );

    fetch("http://localhost:3000/auth/init", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
            "name"
          ).innerHTML += `<a href="./profile.html" class="d-block">${data.name}</a>`;
          document.getElementById("role").innerHTML = role;
        } else {
          window.location.href = "/";
        }
      });
  } else {
    window.location.href = "/";
  }
}
