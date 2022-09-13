//Initialize Select2 Elements
$(".select2").select2();

//Initialize Select2 Elements
$(".select2bs4").select2({
  theme: "bootstrap4",
});

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

document.addEventListener(
  "load",
  loadTeachers(),
  loadSemester(),
  loadSection(),
  loadMapping()
);

document.getElementById("filter").addEventListener("change", (e) => {
  if (e.srcElement.value !== "Semester") {
    loadMapping(e.srcElement.value);
  } else {
    loadMapping();
  }
});

$("#selectSemester").on("select2:select", (e) => {
  if (e.currentTarget.selectedIndex) {
    loadSubjectsBySemester(e.currentTarget.selectedIndex);
  }
});

document.getElementById("createMapping").addEventListener("click", () => {
  addMapping();
  //   document.getElementById("form").reset();
});

function loadTeachers() {
  fetch("http://localhost:3000/teacher", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      for (let teacher of data) {
        document.getElementById(
          "selectTeacher"
        ).innerHTML += `<option value=${teacher.id}>${teacher.name}</option>`;
      }
    });
}

function loadSemester() {
  fetch("http://localhost:3000/semester", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      for (let semester of data) {
        document.getElementById(
          "selectSemester"
        ).innerHTML += `<option value=${semester.id}>${semester.displayName}</option>`;

        document.getElementById(
          "filter"
        ).innerHTML += `<option value=${semester.id}>${semester.displayName}</option>`;
      }
    });
}

function loadSection() {
  fetch("http://localhost:3000/section", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      for (let section of data) {
        document.getElementById(
          "selectSection"
        ).innerHTML += `<option value=${section.id}>${section.displayName}</option>`;
      }
    });
}

function loadSubjectsBySemester(id) {
  fetch("http://localhost:3000/subject/semester/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      for (let subject of data) {
        document.getElementById(
          "selectSubject"
        ).innerHTML += `<option value=${subject.id}>${subject.name}</option>`;
      }
    });
}

function loadMapping(semId) {
  if (semId) {
    fetch("http://localhost:3000/manage-teacher/" + semId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        let data = resData.data;

        document.getElementById("main-content").innerHTML = "";

        let i = 1;
        for (let keys of data) {
          document.getElementById(
            "main-content"
          ).innerHTML += `<div class="card-header" id="semester">${keys.semester}</div>`;
          for (let data of keys.schedule) {
            document.getElementById(
              "main-content"
            ).innerHTML += `<div class="row justify-content-center mt-4">
                          <div class="col-7">
                            <div class="card">
                              <div class="card-header" style="background-color: rgb(184, 184, 184);">
                                <h3 class="card-title" id="section">${data.section}</h3>
                
                              </div>
                              <!-- /.card-header -->
                              <div class="card-body table-responsive p-0">
                                <table class="table table-hover text-nowrap">
                                  <thead>
                                    <tr>
                                       <th>Subject</th>
                                       <th>Teacher</th>
                                       <th>Time</th>
                                    </tr>
                                  </thead>
                                  <tbody id="subjects${i}">`;
            for (let subject of data.subjects) {
              document.getElementById(`subjects${i}`).innerHTML += `<tr> 
                              <td>${subject.subject}</td>
                              <td>${subject.teacher}</td>
                              <td>${subject.time}</td>
                              </tr>`;
            }
            document.getElementById("main-content").innerHTML += `</tbody>
                              </table>
                            </div>
                            <!-- /.card-body -->
                          </div>
                          <!-- /.card -->
                          </div>
                        </div>
                        <!-- /.row -->`;
            i++;
          }
        }
      });
  } else {
    fetch("http://localhost:3000/manage-teacher", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        let data = resData.data;

        document.getElementById("main-content").innerHTML = "";

        let i = 1;
        for (let keys of data) {
          document.getElementById(
            "main-content"
          ).innerHTML += `<div class="card-header" id="semester">${keys.semester}</div>`;
          for (let data of keys.schedule) {
            document.getElementById(
              "main-content"
            ).innerHTML += `<div class="row justify-content-center mt-4">
                        <div class="col-7">
                          <div class="card">
                            <div class="card-header" style="background-color: rgb(184, 184, 184);">
                              <h3 class="card-title" id="section">${data.section}</h3>
              
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body table-responsive p-0">
                              <table class="table table-hover text-nowrap">
                                <thead>
                                  <tr>
                                     <th>Subject</th>
                                     <th>Teacher</th>
                                     <th>Time</th>
                                  </tr>
                                </thead>
                                <tbody id="subjects${i}">`;
            for (let subject of data.subjects) {
              document.getElementById(`subjects${i}`).innerHTML += `<tr> 
                            <td>${subject.subject}</td>
                            <td>${subject.teacher}</td>
                            <td>${subject.time}</td>
                            </tr>`;
            }
            document.getElementById("main-content").innerHTML += `</tbody>
                            </table>
                          </div>
                          <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                        </div>
                      </div>
                      <!-- /.row -->`;
            i++;
          }
        }
      });
  }
}

function addMapping() {
  const teacherId = document.getElementById("selectTeacher").value;
  const semId = document.getElementById("selectSemester").value;
  const subId = document.getElementById("selectSubject").value;
  const sections = $("#selectSection").val();
  const time = document.getElementById("time").value;

  if (
    teacherId === "" ||
    semId === "" ||
    subId === "" ||
    sections.length === 0 ||
    time === ""
  ) {
    return Toast.fire({
      icon: "error",
      title: "Please fill up all the fields",
    });
  }

  fetch("http://localhost:3000/manage-teacher", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    method: "POST",
    body: JSON.stringify({ teacherId, semId, subId, sections, time }),
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
