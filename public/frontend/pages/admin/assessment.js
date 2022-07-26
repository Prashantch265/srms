document.addEventListener("load", loadAssessment());

document.getElementById("createAssessment").addEventListener("click", (e) => {
  e.preventDefault();
  addAssessment();
});

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
      console.log(resData);
      let data = resData.data;

      let i = 1;

      document.getElementById("assessmentTable").innerHTML = "";

      for (let key of data) {
        document.getElementById("assessmentTable").innerHTML += `<tr>
          <td>${i++}</td>
          <td>${key.name}</td>
          <td>${key.description}</td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-block btn-default m-1" id="view${i}" value="${
          key.id
        }">
                <i class="fas fa-eye"></i>
              </button>
              <button type="button" class="btn btn-default m-1" data-toggle="modal" data-target="#modal-default" id="edit${i}" value="${
          key.id
        }">
              
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="btn btn-block btn-default m-1" id="delete${i}" value="${
          key.id
        }">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </td>
        </tr>`;
        document
          .getElementById(`view${i}`)
          .addEventListener("click", () => viewBatch(i));
        document
          .getElementById(`edit${i}`)
          .addEventListener("click", () =>
            editAssessment(i, key.name, key.description)
          );
        document
          .getElementById(`delete${i}`)
          .addEventListener("click", () => deleteBatch(i));
      }
    });
}

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

function addAssessment() {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;

  if (name === "" || description === "") {
    return Toast.fire({
      icon: "error",
      title: "name and display name is required",
    });
  }

  fetch("http://localhost:3000/assessment", {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ name, description }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
      document.getElementById("form").reset();
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

function viewBatch(i) {
  let id = document.getElementById(`view${i}`).value;
  fetch("http://localhost:3000/assessment/" + id, {
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
    <tbody id="assessmentTable">
    </tbody>`;

      if (resData.status === 200) {
        for (let key of data) {
          document.getElementById("assessmentTable").innerHTML += `<tr>
          <td>${i}</td>
          <td>${key.name}</td>
          <td>${key.assessment}</td>
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

function editAssessment(i, name, description) {
  document.getElementById("name").value = name;
  document.getElementById("description").value = description;
  let id = document.getElementById(`edit${i}`).value;
  document.getElementById("createAssessment").addEventListener("click", (e) => {
    e.preventDefault();
    update(id);
  });
}

function update(id) {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  console.log(name);
  fetch("http://localhost:3000/assessment/" + id, {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify({ name, description }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
      document.getElementById("form").reset();
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

function deleteBatch(i) {
  let id = document.getElementById(`delete${i}`).value;
  fetch("http://localhost:3000/assessment/" + id, {
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
