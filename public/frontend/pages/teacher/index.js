document.addEventListener("load", loadDataForDashboard());

function loadDataForDashboard() {
  fetch("http://localhost:3000/manage-teacher/teacher", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      console.log(data);
    });
}
