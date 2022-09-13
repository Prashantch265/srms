var id;

document.addEventListener("load", loadAssessment());

document.getElementById("create").addEventListener("click", () => {
  id = null;
  document.getElementById("form").reset();
});

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
      console.log(resData);
      let data = resData.data;

      let i = 1;

      document.getElementById("assessmentTable").innerHTML = "";

      for (let key of data) {
        document.getElementById("assessmentTable").innerHTML += `<tr>
          <td>${i}</td>
          <td>${key.name}</td>
          <td>${key.description}</td>
          <td>
            <div class="btn-group">
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
          .getElementById(`edit${i}`)
          .addEventListener("click", () =>
            editAssessment(i, data[i - 1].name, data[i - 1].description).bind(
              null,
              i
            )
          );
        document
          .getElementById(`delete${i}`)
          .addEventListener("click", () => deleteAssessment(i).bind(null, i));
      }
    });
}

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

document.getElementById("createAssessment").addEventListener("click", (e) => {
  e.preventDefault();
  if (id) {
    update(id);
    document.getElementById("form").reset();
  } else {
    addAssessment();
    document.getElementById("form").reset();
  }
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
      Authorization: `Bearer ${bearerToken}`,
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

function editAssessment(i, name, description) {
  document.getElementById("name").value = name;
  document.getElementById("description").value = description;
  id = document.getElementById(`edit${i}`).value;
}

function update(id) {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  console.log(name);
  fetch("http://localhost:3000/assessment/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
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

function deleteAssessment(i) {
  let id = document.getElementById(`delete${i}`).value;
  fetch("http://localhost:3000/assessment/" + id, {
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
