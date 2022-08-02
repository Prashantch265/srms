//Datemask yyyy/mm/dd
$("#datemask").inputmask("yyyy/mm/dd", { placeholder: "yyyy/mm/dd" });
//Money Euro
$("[data-mask]").inputmask();

document.addEventListener("load", loadStudents());

document.getElementById("createStudent").addEventListener("click", (e) => {
  e.preventDefault();
  addStudent();
});

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
            <div class="btn-group">
              <button type="button" class="btn btn-block btn-default m-1" id="view${i}" value="${key.id}">
                <i class="fas fa-eye"></i>
              </button>
              <button type="button" class="btn btn-default m-1" data-toggle="modal" data-target="#modal-default" id="edit${i}" value="${key.id}">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="btn btn-block btn-default m-1" id="delete${i}" value="${key.id}">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </td>
        </tr>`;
        document
          .getElementById(`edit${i}`)
          .addEventListener("click", () => editStudent(i));
        document
          .getElementById(`delete${i}`)
          .addEventListener("click", () => deleteStudent(i));
      }
    });

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
      console.log(resData);
      let data = resData.data;

      for (let key of data) {
        document.getElementById(
          "semester"
        ).innerHTML += `<option value=${key.id}>${key.displayName}</option>`;
      }
    });
}

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

function addStudent() {
  const name = document.getElementById("name").value;
  let gender;
  const radioBtn = document.getElementsByClassName("form-check-input");
  for (let i = 0; i < radioBtn.length; i++) {
    if (radioBtn[i].checked) gender = radioBtn[i].value;
  }

  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const contactNo = document.getElementById("contactNo").value;
  const batchId = document.getElementById("batch").value;
  const fathersName = document.getElementById("fathersName").value;
  const mothersName = document.getElementById("mothersName").value;
  const guardiansName = document.getElementById("guardiansName").value;
  const permanentAddress = document.getElementById("permanentAddress").value;
  const currentAddress = document.getElementById("currentAddress").value;
  const fathersContactNo = document.getElementById("fathersContactNo").value;
  const mothersContactNo = document.getElementById("mothersContactNo").value;
  const guardiansContactNo =
    document.getElementById("guardiansContactNo").value;
  const parentsEmail = document.getElementById("parentsEmail").value;

  if (
    name === "" ||
    dob === "" ||
    email === "" ||
    contactNo === "" ||
    fathersName === "" ||
    mothersName === "" ||
    permanentAddress === "" ||
    currentAddress === "" ||
    fathersContactNo === "" ||
    mothersContactNo === "" ||
    parentsEmail === ""
  ) {
    return Toast.fire({
      icon: "error",
      title: "please fill all * fields.",
    });
  }

  fetch("http://localhost:3000/student", {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({
      name,
      dob,
      gender,
      email,
      contactNo,
      batchId,
      fathersName,
      mothersName,
      guardiansName,
      permanentAddress,
      currentAddress,
      fathersContactNo,
      mothersContactNo,
      guardiansContactNo,
      parentsEmail,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
      document.getElementById("form").reset();
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

function editStudent(i) {
  let id = document.getElementById(`edit${i}`).value;

  fetch("http://localhost:3000/student" + id, {
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
      const {
        name,
        dob,
        email,
        contactNo,
        batch,
        fathersName,
        mothersName,
        guardiansName,
        permanentAddress,
        currentAddress,
        fathersContactNo,
        mothersContactNo,
        guardiansContactNo,
        parentsEmail,
      } = resData.data;

      document.getElementById("name").value = name;
      document.getElementById("dob").value = dob;
      document.getElementById("email").value = email;
      document.getElementById("contactNo").value = contactNo;
      document.getElementById("batch").value = batch;
      document.getElementById("fathersName").value = fathersName;
      document.getElementById("mothersName").value = mothersName;
      document.getElementById("guardiansName").value = guardiansName;
      document.getElementById("permanentAddress").value = permanentAddress;
      document.getElementById("currentAddress").value = currentAddress;
      document.getElementById("fathersContactNo").value = fathersContactNo;
      document.getElementById("mothersContactNo").value = mothersContactNo;
      document.getElementById("guardiansContactNo").value = guardiansContactNo;
      document.getElementById("parentsEmail").value = parentsEmail;
    });

  document.getElementById("createStudent").addEventListener("click", (e) => {
    e.preventDefault();
    update(id);
  });
}

function update(id) {
  const name = document.getElementById("name").value;
  let gender;
  const radioBtn = document.getElementsByClassName("form-check-input");
  for (let i = 0; i < radioBtn.length; i++) {
    if (radioBtn[i].checked) gender = radioBtn[i].value;
  }

  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const contactNo = document.getElementById("contactNo").value;
  const batchId = document.getElementById("batch").value;
  const fathersName = document.getElementById("fathersName").value;
  const mothersName = document.getElementById("mothersName").value;
  const guardiansName = document.getElementById("guardiansName").value;
  const permanentAddress = document.getElementById("permanentAddress").value;
  const currentAddress = document.getElementById("currentAddress").value;
  const fathersContactNo = document.getElementById("fathersContactNo").value;
  const mothersContactNo = document.getElementById("mothersContactNo").value;
  const guardiansContactNo =
    document.getElementById("guardiansContactNo").value;
  const parentsEmail = document.getElementById("parentsEmail").value;

  console.log(name);
  fetch("http://localhost:3000/student/" + id, {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify({
      name,
      dob,
      email,
      gender,
      contactNo,
      batchId,
      fathersName,
      mothersName,
      guardiansName,
      permanentAddress,
      currentAddress,
      fathersContactNo,
      mothersContactNo,
      guardiansContactNo,
      parentsEmail,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
      document.getElementById("form").reset();
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

function deleteStudent(i) {
  let id = document.getElementById(`delete${i}`).value;
  fetch("http://localhost:3000/student/" + id, {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
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
