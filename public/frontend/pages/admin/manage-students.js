document.addEventListener("load", loadStudents());

function loadStudents() {
  fetch("http://localhost:3000/student", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
      let data = resData.data;
      createStudentTable(data);
    });
}

function createStudentTable(data) {
  let i = 1;

  document.getElementById("studentTable").innerHTML = "";

  for (let key of data) {
    document.getElementById("studentTable").innerHTML += `<tr>
          <td>${i}</td>
          <td>${key.name}</td>
          <td>${key.batch}</td>
          <td>${key.semester}</td>
          <td>${key.section}</td>
          <td>${key.userName}</td>
          <td>
              <div class="btn-group">
                <button type="button" class="btn btn-default m-1" data-toggle="modal" data-target="#modal-default" id="edit${i}" value="${key.id}">
                  <i class="fas fa-edit"></i>
                </button>
              </div>
            </td>
          </tr>`;
    document
      .getElementById(`edit${i}`)
      .addEventListener("click", () => editStudent(i));
  }
}
