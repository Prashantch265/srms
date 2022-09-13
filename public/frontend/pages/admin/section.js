var id;

document.addEventListener("load", loadSection());

document.getElementById("create").addEventListener("click", () => {
  id = null;
  document.getElementById("form").reset();
});

function loadSection() {
  fetch("http://localhost:3000/section", {
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

      document.getElementById("sectionTable").innerHTML = "";

      for (let key of data) {
        document.getElementById("sectionTable").innerHTML += `<tr>
          <td>${i}</td>
          <td>${key.name}</td>
          <td>${key.displayName}</td>
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
            editSection(i, data[i - 1].name, data[i - 1].displayName).bind(
              null,
              i
            )
          );
        document
          .getElementById(`delete${i}`)
          .addEventListener("click", () => deleteSection(i).bind(null, i));
      }
    });
}

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

document.getElementById("createSection").addEventListener("click", (e) => {
  e.preventDefault();
  if (id) {
    update(id);
    document.getElementById("form").reset();
  } else {
    addSection();
    document.getElementById("form").reset();
  }
});

function addSection() {
  const name = document.getElementById("name").value;
  const displayName = document.getElementById("displayName").value;

  if (name === "" || displayName === "") {
    return Toast.fire({
      icon: "error",
      title: "name and display name is required",
    });
  }

  fetch("http://localhost:3000/section", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
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
        loadSection();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadSection();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function editSection(i, name, displayName) {
  document.getElementById("name").value = name;
  document.getElementById("displayName").value = displayName;
  id = document.getElementById(`edit${i}`).value;
}

function update(id) {
  const name = document.getElementById("name").value;
  const displayName = document.getElementById("displayName").value;
  console.log(name);
  fetch("http://localhost:3000/section/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
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
        loadSection();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadSection();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function deleteSection(i) {
  let id = document.getElementById(`delete${i}`).value;
  fetch("http://localhost:3000/section/" + id, {
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
        loadSection();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadSection();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}
