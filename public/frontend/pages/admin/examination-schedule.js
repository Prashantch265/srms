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

var mainInput = document.getElementById("nepali-datepicker");
mainInput.nepaliDatePicker();

// document.getElementById("filter").addEventListener("change", (e) => {
//   if (e.srcElement.value) {
//   }
// });

$("#selectSemester").on("select2:select", (e) => {
  if (e.currentTarget.options[1].value) {
    loadSubjectsBySemester(e.currentTarget.options[1].value);
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
    .then((res) => res.json)
    .then((resData) => {
      let data = resData.data;
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
        loadAssessment();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadAssessment();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}
