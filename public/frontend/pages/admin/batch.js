document.addEventListener("load", loadBatch());

document.getElementById("createBatch").addEventListener("click", (e) => {
  e.preventDefault();
  addBatch();
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
          <td>${i++}</td>
          <td>${key.name}</td>
          <td>${key.displayName}</td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-block btn-default m-1" id="view" onclick="" value="${
                key.id
              }">
                <i class="fas fa-eye"></i>
              </button>
              <button type="button" class="btn btn-block btn-default m-1" id="edit" onclick="" value="${
                key.id
              }">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="btn btn-block btn-default m-1" id="delete" onclick="deletBatch(${key.id})" value="${
                key.id
              }">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </td>
        </tr>`;
      }
    });
}

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
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

function deleteBatch(id) {

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
