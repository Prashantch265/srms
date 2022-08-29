var userId;

var toggler = document.getElementById("toggler");

const showHidePassword = () => {
  if (document.getElementById("password").type == "password") {
    document.getElementById("password").setAttribute("type", "text");
    toggler.classList.add("fa-eye-slash");
  } else {
    toggler.classList.remove("fa-eye-slash");
    document.getElementById("password").setAttribute("type", "password");
  }
};

toggler.addEventListener("click", showHidePassword);

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

document.addEventListener("load", loadUsers(), laodRoles());

document.getElementById("create").addEventListener("click", () => {
  userId = password = null;
  document.getElementById("form").reset();
});

document.getElementById("createUser").addEventListener("click", (e) => {
  e.preventDefault();
  if (userId) {
    update(userId);
    document.getElementById("form").reset();
  } else {
    addUser();
  }
});

document.getElementById("filter").addEventListener("change", (e) => {
  if (e.srcElement.value !== "Role") {
    loadUsersByRole(e.srcElement.value);
  } else {
    loadUsers();
  }
});

function loadUsers() {
  fetch("http://localhost:3000/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      createUsertable(data);
    });
}

function laodRoles() {
  fetch("http://localhost:3000/role", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      for (let role of data) {
        document.getElementById(
          "filter"
        ).innerHTML += `<option value=${role.id}>${role.name}</option>`;
      }
    });
}

function loadUsersByRole(id) {
  fetch("http://localhost:3000/user/role/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      createUsertable(data);
    });
}

function createUsertable(data) {
  let i = 1;

  document.getElementById("userTable").innerHTML = "";

  for (let key of data) {
    document.getElementById("userTable").innerHTML += `<tr>
        <td>${i}</td>
        <td>
        <div class="img">
        <img src="http://localhost:3000/${key.profilePic}" class="img-circle elevation-2" alt="profile picture"/>
        </div>
        </td>
        <td>${key.userName}</td>
        <td>${key.role}</td>
        <td>
            <div class="btn-group">
              <button type="button" class="btn btn-default m-1" data-toggle="modal" data-target="#modal-default" id="edit${i}" value="${key.userId}">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="btn btn-block btn-default m-1" id="delete${i}" value="${key.userId}">
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
        editUser(i, data[i - 1].userName).bind(null, i)
      );
    document
      .getElementById(`delete${i}`)
      .addEventListener("click", () => deleteUser(i).bind(null, i));
  }
}

function addUser() {
  const userName = document.getElementById("userName").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (userName === "" || password === "" || confirmPassword === "") {
    return Toast.fire({
      icon: "error",
      title: "please fill all fields.",
    });
  }

  if (password !== confirmPassword) {
    return Toast.fire({
      icon: "error",
      title: "Password doesn't match. Please re-enter your password",
    });
  }

  fetch("http://localhost:3000/user", {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ userName, password }),
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.status === 200) {
        document.getElementById("form").reset();
        loadUsers();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        document.getElementById("form").reset();
        loadUsers();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function editUser(i, userName) {
  document.getElementById("password").value = "";
  document.getElementById("userName").value = userName;
  userId = document.getElementById(`edit${i}`).value;
}

function deleteUser(i) {
  const userId = document.getElementById(`edit${i}`).value;
  fetch("http://localhost:3000/user/" + userId, {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  })
    .then((res) => res.json)
    .then((resData) => {
      if (resData.status === 200) {
        loadUsers();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadUsers();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}

function update(userId) {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    return Toast.fire({
      icon: "error",
      title: "Password doesn't match. Please re-enter your password",
    });
  }

  fetch("http://localhost:3000/user/" + userId, {
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify({ password }),
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.status === 200) {
        loadUsers();
        return Toast.fire({
          icon: "success",
          title: resData.message,
        });
      } else {
        loadUsers();
        return Toast.fire({
          icon: "error",
          title: resData.message,
        });
      }
    });
}
