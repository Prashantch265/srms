document.addEventListener("load", getUser());

function getUser() {
  const { accessToken, role } = JSON.parse(window.localStorage.getItem("user"));

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
      const data = resData.data[0];
      document.getElementById(
        "name"
      ).innerHTML += `<a href="#" class="d-block">${data.name}</a>`;
    });
}
