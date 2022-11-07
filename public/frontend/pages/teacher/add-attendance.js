let today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();

const bs = NepaliFunctions.AD2BS({ year: yyyy, month: mm, day: dd });

today = `${bs.year}-${bs.month}-${bs.day}`;
console.log(today);

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

document.addEventListener("load", loadSemester());

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
            <td>${today}</td>
            <td>${key.name}</td>
            <td>${section}</td>
            <td>
              <div class="row">
                <div class="form-check m-2">
                  <input class="form-check-input" type="checkbox" name="checkbox${i}">
                  <label>
                    Present
                  </label>
                  <input type="hidden" id="studentId${i}" value="${key.id}">
                </div>
                <div class="form-check m-2">
                  <input class="form-check-input" type="checkbox" name="uncheckbox${i}">
                  <label>
                    Absent
                  </label>
                  <input type="hidden" id="studentId${i}" value="${key.id}">
                </div>
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
              makeAttendance(j, "present").bind(null, j);
            }
          });
        document
          .getElementsByName(`uncheckbox${j}`)[0]
          .addEventListener("change", (e) => {
            if (e.target.checked) {
              makeAttendance(j, "absent").bind(null, j);
            }
          });
      }
    });
}

function makeAttendance(i, status) {
  const studentId = document.getElementById(`studentId${i}`).value;
  const subjectId = document.getElementById("selectSubject").value;
  if (subjectId === "Select") {
    return Toast.fire({
      icon: "error",
      title: "Please select your subject.",
    });
  }
  const date = today;
  fetch("http://localhost:3000/attendance", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    method: "POST",
    body: JSON.stringify({ studentId, subjectId, date, status }),
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
