var studentId;

document.addEventListener(
  "load",
  loadStudents(),
  loadBatch(),
  loadSemester(),
  loadSection()
);

document.getElementById("filter").addEventListener("change", (e) => {
  if (e.srcElement.value !== "Batch") {
    loadStudentsByBatch(e.srcElement.value);
  } else {
    loadStudents();
  }
});

document
  .getElementById("updateSection")
  .addEventListener("click", () => updateSection());

document.getElementById("updateSemester").addEventListener("click", () => {
  updateSemester();
  document.getElementById("form").reset();
});

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

function loadStudents() {
  fetch("http://localhost:3000/manage-student", {
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
                <button type="button" class="btn btn-default m-1" data-toggle="modal" data-target="#modal-sm" id="edit${i}" value="${key.id}">
                  <i class="fas fa-edit"></i>
                </button>
              </div>
            </td>
          </tr>`;
    i++;
  }

  for (let i = 1; i <= data.length; i++) {
    document.getElementById(`edit${i}`).addEventListener(
      "click",
      function (i) {
        studentId = document.getElementById(`edit${i}`).value;
      }.bind(null, i)
    );
  }
}

function updateSection() {
  const sectionId = document.getElementById("section").value;
  console.log(studentId, sectionId);
  fetch("http://localhost:3000/student/" + studentId, {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "PATCH",
    body: JSON.stringify({ sectionId }),
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.status === 200) {
        loadStudents();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadStudents();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function loadBatch() {
  fetch("http://localhost:3000/batch/current", {
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
      let data = resData.data;

      document.getElementById("selectBatch").innerHTML += "";
      document.getElementById("filter").innerHTML += "";

      for (let key of data) {
        document.getElementById(
          "selectBatch"
        ).innerHTML += `<option value=${key.id}>${key.displayName}</option>`;
        document.getElementById(
          "filter"
        ).innerHTML += `<option id="batch${key.id}" value=${key.id}>${key.displayName}</option>`;
      }
    });
}

function loadSemester() {
  fetch("http://localhost:3000/semester", {
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
      let data = resData.data;

      document.getElementById("selectSemester").innerHTML += "";

      for (let key of data) {
        document.getElementById(
          "selectSemester"
        ).innerHTML += `<option value=${key.id}>${key.displayName}</option>`;
      }
    });
}

function loadSection() {
  fetch("http://localhost:3000/section", {
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
      let data = resData.data;

      document.getElementById("section").innerHTML += "";

      for (let key of data) {
        document.getElementById(
          "section"
        ).innerHTML += `<option value=${key.id}>${key.displayName}</option>`;
      }
    });
}

function loadStudentsByBatch(id) {
  fetch("http://localhost:3000/manage-student/" + id, {
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
      let data = resData.data;
      createStudentTable(data);
    });
}

function updateSemester() {
  const batchId = document.getElementById("selectBatch").value;
  const semesterId = document.getElementById("selectSemester").value;

  fetch("http://localhost:3000/manage-student", {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ batchId, semesterId }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      if (resData.status === 200) {
        loadStudentsByBatch(batchId);
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadStudents(batchId);
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}
