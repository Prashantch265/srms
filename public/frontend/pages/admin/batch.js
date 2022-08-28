var id;

document.addEventListener("load", loadBatch());

document.getElementById("create").addEventListener("click", () => {
  id = null;
  document.getElementById("form").reset();
});

function loadBatch() {
  fetch("http://localhost:3000/batch", {
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

      document.getElementById("batchTable").innerHTML = "";

      for (let key of data) {
        document.getElementById("batchTable").innerHTML += `<tr>
          <td>${i}</td>
          <td>${key.name}</td>
          <td>${key.displayName}</td>
          <td>${key.passedOut}</td>
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
          .addEventListener("click", () => viewBatch(i).bind(null, i));
        document
          .getElementById(`edit${i}`)
          .addEventListener("click", () =>
            editBatch(
              i,
              data[i - 1].name,
              data[i - 1].displayName,
              data[i - 1].passedOut
            ).bind(null, i)
          );
        document
          .getElementById(`delete${i}`)
          .addEventListener("click", () => deleteBatch(i).bind(null, i));
      }
    });
}

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

document.getElementById("createBatch").addEventListener("click", (e) => {
  e.preventDefault();
  if (id) {
    update(id);
    document.getElementById("form").reset();
  } else {
    addBatch();
    document.getElementById("form").reset();
  }
});

function addBatch() {
  const name = document.getElementById("name").value;
  const displayName = document.getElementById("displayName").value;

  if (name === "" || displayName === "") {
    return Toast.fire({
      icon: "error",
      title: "name and display name is required",
    });
  }

  fetch("http://localhost:3000/batch", {
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
        loadBatch();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadBatch();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function viewBatch(i) {
  let id = document.getElementById(`view${i}`).value;
  fetch("http://localhost:3000/batch/" + id, {
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
    <tbody id="batchTable">
    </tbody>`;

      if (resData.status === 200) {
        for (let key of data) {
          document.getElementById("batchTable").innerHTML += `<tr>
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

function editBatch(i, name, displayName, passedOut) {
  document.getElementById("name").value = name;
  document.getElementById("displayName").value = displayName;
  const checkBoxes = document.getElementsByClassName("form-check-input");
  checkBoxes[0].checked = passedOut;

  document.getElementById("passedOut").hidden = false;

  id = document.getElementById(`edit${i}`).value;
}

function update(id) {
  const name = document.getElementById("name").value;
  const displayName = document.getElementById("displayName").value;
  let passedOut = false;
  const checkBoxes = document.getElementsByClassName("form-check-input");
  if (checkBoxes[0].checked) passedOut = true;
  console.log(name);
  fetch("http://localhost:3000/batch/" + id, {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify({ name, displayName, passedOut }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
      document.getElementById("form").reset();
      if (resData.status === 200) {
        loadBatch();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadBatch();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function deleteBatch(i) {
  let id = document.getElementById(`delete${i}`).value;
  fetch("http://localhost:3000/batch/" + id, {
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
        loadBatch();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadBatch();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}
