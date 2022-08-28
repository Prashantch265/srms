var id;

document.addEventListener("load", loadSemester());

document.getElementById("create").addEventListener("click", () => {
  id = null;
  document.getElementById("form").reset();
});

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
      console.log(resData);
      let data = resData.data;

      let i = 1;

      document.getElementById("semesterTable").innerHTML = "";

      for (let key of data) {
        document.getElementById("semesterTable").innerHTML += `<tr>
          <td>${i}</td>
          <td>${key.name}</td>
          <td>${key.displayName}</td>
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
        document
          .getElementById(`view${i}`)
          .addEventListener("click", () => viewSemester(i).bind(null, i));
        document
          .getElementById(`edit${i}`)
          .addEventListener("click", () =>
            editSemester(i, data[i - 1].name, data[i - 1].displayName).bind(
              null,
              i
            )
          );
        document
          .getElementById(`delete${i}`)
          .addEventListener("click", () => deleteSemester(i).bind(null, i));
      }
    });
}

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

document.getElementById("createSemester").addEventListener("click", (e) => {
  e.preventDefault();
  if (id) {
    update(id);
    document.getElementById("form").reset();
  } else {
    addSemester();
    document.getElementById("form").reset();
  }
});

function addSemester() {
  const name = document.getElementById("name").value;
  const displayName = document.getElementById("displayName").value;

  if (name === "" || displayName === "") {
    return Toast.fire({
      icon: "error",
      title: "name and display name is required",
    });
  }

  fetch("http://localhost:3000/semester", {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ name, displayName }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
      document.getElementById("form").reset();
      if (resData.status === 200) {
        loadSemester();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadSemester();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function viewSemester(i) {
  let id = document.getElementById(`view${i}`).value;
  fetch("http://localhost:3000/semester/" + id, {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
      let data = resData.data;

      let i = 1;

      document.getElementById("listTable").innerHTML = "";

      document.getElementById("listTable").innerHTML += `<thead>
      <tr>
        <th style="width: 10px">#</th>
        <th>Name</th>
        <th>Batch</th>
        <th>Semester</th>
        <th>Section</th>
        <th>Username</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="semesterTable">
    </tbody>`;

      if (resData.status === 200) {
        for (let key of data) {
          document.getElementById("semesterTable").innerHTML += `<tr>
          <td>${i}</td>
          <td>${key.name}</td>
          <td>${key.batch}</td>
          <td>${key.semester}</td>
          <td>${key.section}</td>
          <td>${key.userName}</td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-block btn-default m-1" id="view${i}" value="${key.id}">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </td>
          </tr>`;

          i++;
        }
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

function editSemester(i, name, displayName) {
  document.getElementById("name").value = name;
  document.getElementById("displayName").value = displayName;
  id = document.getElementById(`edit${i}`).value;
}

function update(id) {
  const name = document.getElementById("name").value;
  const displayName = document.getElementById("displayName").value;
  console.log(name);
  fetch("http://localhost:3000/semester/" + id, {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify({ name, displayName }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
      document.getElementById("form").reset();
      if (resData.status === 200) {
        loadSemester();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadSemester();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function deleteSemester(i) {
  let id = document.getElementById(`delete${i}`).value;
  fetch("http://localhost:3000/semester/" + id, {
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
        loadSemester();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadSemester();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}
