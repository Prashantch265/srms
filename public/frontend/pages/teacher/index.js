document.addEventListener("load", loadMapping());

function loadMapping(semId) {
  if (semId) {
    fetch("http://localhost:3000/manage-teacher/" + semId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        let data = resData.data;

        document.getElementById("main-content").innerHTML = "";

        let i = 1;
        for (let keys of data) {
          document.getElementById(
            "main-content"
          ).innerHTML += `<div class="card-header" id="semester">${keys.semester}</div>`;
          for (let data of keys.schedule) {
            document.getElementById(
              "main-content"
            ).innerHTML += `<div class="row justify-content-center mt-4">
                          <div class="col-7">
                            <div class="card">
                              <div class="card-header" style="background-color: rgb(184, 184, 184);">
                                <h3 class="card-title" id="section">${data.section}</h3>
                
                              </div>
                              <!-- /.card-header -->
                              <div class="card-body table-responsive p-0">
                                <table class="table table-hover text-nowrap">
                                  <thead>
                                    <tr>
                                       <th>Subject</th>
                                       <th>Teacher</th>
                                       <th>Time</th>
                                    </tr>
                                  </thead>
                                  <tbody id="subjects${i}">`;
            for (let subject of data.subjects) {
              document.getElementById(`subjects${i}`).innerHTML += `<tr> 
                              <td>${subject.subject}</td>
                              <td>${subject.teacher}</td>
                              <td>${subject.time}</td>
                              </tr>`;
            }
            document.getElementById("main-content").innerHTML += `</tbody>
                              </table>
                            </div>
                            <!-- /.card-body -->
                          </div>
                          <!-- /.card -->
                          </div>
                        </div>
                        <!-- /.row -->`;
            i++;
          }
        }
      });
  } else {
    fetch("http://localhost:3000/manage-teacher", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        let data = resData.data;

        document.getElementById("main-content").innerHTML = "";

        let i = 1;
        for (let keys of data) {
          document.getElementById(
            "main-content"
          ).innerHTML += `<div class="card-header" id="semester">${keys.semester}</div>`;
          for (let data of keys.schedule) {
            document.getElementById(
              "main-content"
            ).innerHTML += `<div class="row justify-content-center mt-4">
                        <div class="col-7">
                          <div class="card">
                            <div class="card-header" style="background-color: rgb(184, 184, 184);">
                              <h3 class="card-title" id="section">${data.section}</h3>
              
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body table-responsive p-0">
                              <table class="table table-hover text-nowrap">
                                <thead>
                                  <tr>
                                     <th>Subject</th>
                                     <th>Teacher</th>
                                     <th>Time</th>
                                  </tr>
                                </thead>
                                <tbody id="subjects${i}">`;
            for (let subject of data.subjects) {
              document.getElementById(`subjects${i}`).innerHTML += `<tr> 
                            <td>${subject.subject}</td>
                            <td>${subject.teacher}</td>
                            <td>${subject.time}</td>
                            </tr>`;
            }
            document.getElementById("main-content").innerHTML += `</tbody>
                            </table>
                          </div>
                          <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                        </div>
                      </div>
                      <!-- /.row -->`;
            i++;
          }
        }
      });
  }
}
