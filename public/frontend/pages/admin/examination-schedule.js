const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

var mainInput = document.getElementById("nepali-datepicker");
mainInput.nepaliDatePicker();

// document.getElementById("filter").addEventListener("change", (e) => {
//   if (e.srcElement.value) {
//   }
// });

document.getElementById("selectSemester").addEventListener("change", (e) => {
  if (e.srcElement.value) {
    loadSubjectsBySemester(e.srcElement.value);
  }
});

document.addEventListener(
  "load",
  loadSchedules(),
  loadAssessment(),
  loadSemester()
);

document.getElementById("createAssessment").addEventListener("click", (e) => {
  e.preventDefault();
  add();
  document.getElementById("form").reset();
});

function loadSchedules() {
  fetch("http://localhost:3000/examination-schedule", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      let i = 1;
      for (let keys of data) {
        document.getElementById("main-content").innerHTML += `
        <div class="card-header" id="assessment">${keys.assessment}</div>`;
        for (let semesters of keys.schedules) {
          document.getElementById(
            "main-content"
          ).innerHTML += `<div class="row justify-content-center mt-4">
        <div class="col-7">
          <div class="card">
            <div class="card-header" style="background-color: rgb(184, 184, 184);">
              <h3 class="card-title" id="semester">${semesters.semester}</h3>
              </div>
            <!-- /.card-header -->
            <div class="card-body table-responsive p-0">
              <table class="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Subject</th>
                  </tr>
                </thead>
                <tbody id="subjects${i}">`;
          for (let subjects of semesters.subjects) {
            document.getElementById(`subjects${i}`).innerHTML += `<tr> 
              <td>${subjects.date}</td>
              <td>${subjects.time}</td>
              <td>${subjects.subject}</td>
            </tr>`;
          }
          document.getElementById("main-content").innerHTML += `</tbody>
          </table>
        </div>
        <!-- /.card-body -->
      </div>`;
          i++;
        }
        document.getElementById("main-content").innerHTML += `</div>
        <!-- /.row -->`;
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
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      for (let semester of data) {
        document.getElementById(
          "selectSemester"
        ).innerHTML += `<option value=${semester.id}>${semester.displayName}</option>`;
      }
    });
}

function loadAssessment() {
  fetch("http://localhost:3000/assessment", {
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

      for (let subject of data) {
        document.getElementById(
          "selectAssessment"
        ).innerHTML += `<option value=${subject.id}>${subject.name}</option>`;
      }
    });
}

function loadSubjectsBySemester(id) {
  fetch("http://localhost:3000/subject/semester/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      document.getElementById("selectSubject").innerHTML = "";
      for (let subject of data) {
        document.getElementById(
          "selectSubject"
        ).innerHTML += `<option value=${subject.id}>${subject.name}</option>`;
      }
    });
}

function add() {
  const assessmentId = document.getElementById("selectAssessment").value;
  const semesterId = document.getElementById("selectSemester").value;
  const subjectId = document.getElementById("selectSubject").value;
  const date = document.getElementById("nepali-datepicker").value;
  const time = document.getElementById("time").value;

  fetch("http://localhost:3000/examination-schedule", {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ assessmentId, semesterId, subjectId, date, time }),
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.status === 200) {
        location.reload();
        return false;
      } else {
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}
