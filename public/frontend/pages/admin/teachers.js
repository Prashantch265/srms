var id;
var url = "http://localhost:3000";

document.addEventListener("load", loadTeachers());

//Money Euro
$("[data-mask]").inputmask();

document.getElementById("create").addEventListener("click", () => {
  id = null;
  document.getElementById("form").reset();
});

function loadTeachers() {
  fetch(`${url}/teacher`, {
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
      createTeacherTable(data);
    });
}

function createTeacherTable(data) {
  let i = 1;

  document.getElementById("teacherTable").innerHTML = "";

  for (let key of data) {
    document.getElementById("teacherTable").innerHTML += `<tr>
        <td>${i}</td>
        <td>${key.name}</td>
        <td>${key.userName}</td>
        <td>${key.contactNo}</td>
        <td>
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

    i++;
  }

  for (let i = 1; i <= data.length; i++) {
    // document.getElementById(`view${i}`).addEventListener("click", () => )
    document
      .getElementById(`edit${i}`)
      .addEventListener("click", () => editTeacher(i).bind(null, i));
    document
      .getElementById(`delete${i}`)
      .addEventListener("click", () => deleteTeacher(i).bind(null, i));
  }
}

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

document.getElementById("createTeacher").addEventListener("click", (e) => {
  e.preventDefault();
  if (id) {
    update(id);
  } else {
    addTeacher();
  }
});

function addTeacher() {
  const name = document.getElementById("name").value;
  let gender;
  const radioBtn = document.getElementsByClassName("form-check-input");
  for (let i = 0; i < radioBtn.length; i++) {
    if (radioBtn[i].checked) gender = radioBtn[i].value;
  }
  const email = document.getElementById("email").value;
  const contactNo = document.getElementById("contactNo").value;
  const address = document.getElementById("address").value;
  const type = document.getElementById("type").value;

  if (
    name === "" ||
    gender === "" ||
    email === "" ||
    contactNo === "" ||
    address === "" ||
    type === ""
  ) {
    return Toast.fire({
      icon: "error",
      title: "please fill all * fields.",
    });
  }

  fetch(`${url}/teacher`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    method: "POST",
    body: JSON.stringify({ name, email, gender, contactNo, address, type }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      document.getElementById("form").reset();
      if (resData.status === 200) {
        loadTeachers();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadTeachers();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function editTeacher(i) {
  id = document.getElementById(`edit${i}`).value;

  fetch(`${url}/teacher/${id}`, {
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
      const { name, gender, email, contactNo, address, employmentType } =
        resData.data[0];

      document.getElementById("name").value = name;
      document.getElementById(`${gender}`).checked = true;
      document.getElementById("email").value = email;
      document.getElementById("contactNo").value = contactNo;
      document.getElementById("address").value = address;
      document.getElementById("type").value = employmentType;
    });
}

function update(id) {
  const name = document.getElementById("name").value;
  let gender;
  const radioBtn = document.getElementsByClassName("form-check-input");
  for (let i = 0; i < radioBtn.length; i++) {
    if (radioBtn[i].checked) gender = radioBtn[i].value;
  }
  const email = document.getElementById("email").value;
  const contactNo = document.getElementById("contactNo").value;
  const address = document.getElementById("address").value;
  const type = document.getElementById("type").value;

  fetch(`${url}/teacher/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    method: "PUT",
    body: JSON.stringify({ name, email, gender, contactNo, address, type }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      document.getElementById("form").reset();
      if (resData.status === 200) {
        loadTeachers();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadTeachers();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function deleteTeacher(i) {
  let id = document.getElementById(`delete${i}`).value;
  fetch(`${url}/teacher/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    method: "DELETE",
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
      if (resData.status === 200) {
        loadTeachers();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadTeachers();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}
