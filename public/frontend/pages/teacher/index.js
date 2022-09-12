document.addEventListener("load", loadDataForDashboard());

function loadDataForDashboard() {
  fetch("", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      console.log(data);
    });
}
