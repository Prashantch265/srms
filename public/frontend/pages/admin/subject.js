var id;

document.addEventListener("load", loadSubject());

document.getElementById("create").addEventListener("click", () => {
  id = null;
  document.getElementById("form").reset();
});

function loadSubject() {
  fetch("http://localhost:3000/subject", {
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

      document.getElementById("subjectTable").innerHTML = "";

      for (let key of data) {
        document.getElementById("subjectTable").innerHTML += `<tr>
          <td>${i}</td>
          <td>${key.name}</td>
          <td>${key.displayName}</td>
          <td>${key.code}</td>
          <td>${key.semester}</td>
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

      for (let i = 1; i <= data.lengt; i++) {
        document
          .getElementById(`edit${i}`)
          .addEventListener("click", () =>
            editSubject(
              i,
              data[i - 1].name,
              data[i - 1].displayName,
              data[i - 1].code,
              data[i - 1].semId
            ).bind(null, i)
          );
        document
          .getElementById(`delete${i}`)
          .addEventListener("click", () => deleteSubject(i).bind(null, i));
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

document.getElementById("createSubject").addEventListener("click", (e) => {
  e.preventDefault();
  if (id) {
    update(id);
  } else {
    addSubject();
    document.getElementById("form").reset();
  }
});

function addSubject() {
  const name = document.getElementById("name").value;
  const displayName = document.getElementById("displayName").value;
  const code = document.getElementById("code").value;
  const semId = document.getElementById("semester").value;

  if (name === "" || displayName === "" || code === "") {
    return Toast.fire({
      icon: "error",
      title: "please fill all fields.",
    });
  }

  fetch("http://localhost:3000/subject", {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ name, displayName, code, semId }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
      document.getElementById("form").reset();
      if (resData.status === 200) {
        loadSubject();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadSubject();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function editSubject(i, name, displayName, code, semId) {
  document.getElementById("name").value = name;
  document.getElementById("displayName").value = displayName;
  document.getElementById("code").value = code;
  document.getElementById("semester").value = semId;

  id = document.getElementById(`edit${i}`).value;
}

function update(id) {
  const name = document.getElementById("name").value;
  const displayName = document.getElementById("displayName").value;
  const code = document.getElementById("code").value;
  const semId = document.getElementById("semester").value;

  console.log(name);
  fetch("http://localhost:3000/subject/" + id, {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify({ name, displayName, code, semId }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData);
      document.getElementById("form").reset();
      if (resData.status === 200) {
        loadSubject();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadSubject();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function deleteSubject(i) {
  let id = document.getElementById(`delete${i}`).value;
  fetch("http://localhost:3000/subject/" + id, {
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
        loadSubject();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadSubject();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}
