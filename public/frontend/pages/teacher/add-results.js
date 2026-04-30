const resultSet = [];

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

document.addEventListener("load", loadSemester(), loadAssessment());

document.getElementById("saveResult").addEventListener("click", (e) => {
  e.preventDefault();
  saveResultSet();
});

document.getElementById("selectSemester").addEventListener("change", (e) => {
  if (e.target.value !== "Select") {
    loadSection(e.target.value);
  }
});

document.getElementById("selectSection").addEventListener("change", (e) => {
  if (e.target.value !== "Select") {
    loadSubject(e.target.value);
    loadStudents(e.target.value);
  }
});

function loadSemester() {
  fetch("http://localhost:3000/semester-list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;
      document.getElementById("selectSemester").innerHTML =
        "<option>Select</option>";

      for (let key of data) {
        document.getElementById(
          "selectSemester"
        ).innerHTML += `<option value="${key.semesters.id}">${key.semesters.name}</option>`;
      }
    });
}

function loadSection(semId) {
  fetch("http://localhost:3000/section-list?semId=" + semId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;
      document.getElementById("selectSection").innerHTML =
        "<option>Select</option>";

      for (let key of data) {
        document.getElementById(
          "selectSection"
        ).innerHTML += `<option value="${key.sections.id}">${key.sections.name}</option>`;
      }
    });
}

function loadSubject(secId) {
  fetch("http://localhost:3000/subject-list?secId=" + secId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;
      document.getElementById("selectSubject").innerHTML =
        "<option>Select</option>";

      for (let key of data) {
        document.getElementById(
          "selectSubject"
        ).innerHTML += `<option value="${key.subjects.id}">${key.subjects.name}</option>`;
      }
    });
}

function loadStudents(secId) {
  const semId = document.getElementById("selectSemester").value;
  const section = document
    .getElementById("selectSection")
    .querySelector(`[value="${secId}"]`).textContent;

  fetch(`http://localhost:3000/student-list?semId=${semId}&secId=${secId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;
      let i = 1;

      document.getElementById("studentTable").innerHTML = "";

      for (let key of data) {
        document.getElementById("studentTable").innerHTML += `<tr>
              <td>${i}</td>
              <td>${key.name}</td>
              <td>${section}</td>
              <td>
                <div class="row">
                  <div class="form-group">
                    <input type="text" class="form-control" id="markInput${i}" placeholder="Enter mark..">
                  </div>
                </div>
              </td>
              <td>
                <div class="form-group">
                <select class="custom-select form-control-border" id="selectRemarks${i}">
                    <option>Select</option>
                    <option value="pass">Pass</option>
                    <option value="fail">Fail</option>
                    <option value="absent">Absent</option>
                </select>
                </div>
              </td>
              <td>
                <div class="row">
                    <div class="form-check m-2">
                    <input class="form-check-input" type="checkbox" name="checkbox${i}">
                    <label>
                        Checked
                    </label>
                    <input type="hidden" id="studentId${i}" value="${key.id}">
                    </div>
                </div>
              </td>
              </tr>`;
        i++;
      }

      for (let j = 1; j <= data.length; j++) {
        document
          .getElementsByName(`checkbox${j}`)[0]
          .addEventListener("change", (e) => {
            if (e.target.checked) {
              addDataToResultSet(j).bind(null, j);
            } else {
              removeDataFromResultSet(j).bind(null, j);
            }
          });
      }
    });
}

function loadAssessment() {
  fetch("http://localhost:3000/assessment", {
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
      let data = resData.data;
      document.getElementById("selectAssessment").innerHTML =
        "<option>Select</option>";

      for (let key of data) {
        document.getElementById(
          "selectAssessment"
        ).innerHTML += `<option value="${key.id}">${key.name}</option>`;
      }
    });
}

function addDataToResultSet(i) {
  let inputMark = document.getElementById(`markInput${i}`).value;
  const obtainedMarks = inputMark ? parseFloat(inputMark) : 0.0;
  const studentId = document.getElementById(`studentId${i}`).value;
  const subId = document.getElementById("selectSubject").value;
  const assessmentId = document.getElementById("selectAssessment").value;
  const remarks = document.getElementById(`selectRemarks${i}`).value;
  if (subId === "Select") {
    document.getElementsByName("checkbox1")[0].checked = false;
    return Toast.fire({
      icon: "error",
      title: "Please select your subject.",
    });
  }
  if (assessmentId === "Select") {
    document.getElementsByName("checkbox1")[0].checked = false;
    return Toast.fire({
      icon: "error",
      title: "Please select assessment.",
    });
  }
  if (remarks === "Select") {
    document.getElementsByName("checkbox1")[0].checked = false;
    return Toast.fire({
      icon: "error",
      title: "Please select remarks.",
    });
  }
  resultSet.push({ obtainedMarks, studentId, subId, assessmentId, remarks });
}

function removeDataFromResultSet(i) {
  const index = i - 1;
  resultSet.splice(index, 1);

  document.getElementById(`markInput${i}`).value = "";
  document.getElementById(`selectRemarks${i}`).value = "Select";
}

function saveResultSet() {
  fetch("http://localhost:3000/examination-result", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    method: "POST",
    body: JSON.stringify(resultSet),
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.status === 200) {
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function submitResults() {
  let resultData = [];
  const elements = document.getElementsByClassName("score");
  const remarks = document.getElementsByClassName("remarks");

  for (let index = 0; index < elements.length; index++) {
    if (elements[index].value != "") {
      let result = {
        student_id: elements[index].id,
        assessment_id: state.assessmentId,
        subject_id: state.subjectId,
        score: elements[index].value,
        remarks: remarks[index].value,
      };
      resultData.push(result);
    }
  }

  if (resultData.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "No Data",
      text: "Please enter scores for at least one student.",
    });
    return;
  }

  let payload = {
    results: resultData,
  };

  fetch(url + "results/bulk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      // ABSTRACT ALIGNMENT: Transaction Conflict Handling (HTTP 409)
      if (res.status === 409) {
        return Promise.reject(
          new Error("Database conflict due to heavy concurrent load.")
        );
      }
      if (!res.ok) {
        return res.json().then((err) => Promise.reject(err));
      }
      return res.json();
    })
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Results recorded successfully!",
      }).then(() => {
        location.reload();
      });
    })
    .catch((err) => {
      // Specifically handle the SerializationFailure / 409 Conflict
      if (err.message && err.message.includes("conflict")) {
        Swal.fire({
          icon: "warning",
          title: "System Busy",
          text: "The system is currently under heavy load from other teachers submitting grades. Please wait a moment and click submit again.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message || "An error occurred while saving the results.",
        });
      }
    });
}
