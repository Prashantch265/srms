document.addEventListener("load", loadSchedules());

function loadSchedules() {
  fetch("http://localhost:3000/examination-schedule", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;

      let i = 1;

      document.getElementById("main-content").innerHTML = "";

      for (let keys of data) {
        document.getElementById("main-content").innerHTML += `
          <div class="card-header" id="assessment">${keys.assessment}</div>`;
        for (let semesters of keys.schedules) {
          document.getElementById(
            "main-content"
          ).innerHTML += `<div class="row justify-content-center mt-4">
          <div class="col-7">
            <div class="card">
              <div class="card-header" style="background-color: rgb(184, 184, 184);">
                <div class="row">
                  <div class="col-sm-10>
                    <h3 class="card-title" id="semester">${semesters.semester}</h3>
                  </div>
                  <div class="col-sm-2 ml-auto">
                    <button type="button" class="btn btn-block" id="delete${i}" value="">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
                </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Subject</th>
                    </tr>
                  </thead>
                  <tbody id="subjects${i}">`;
          for (let subjects of semesters.subjects) {
            document.getElementById(`subjects${i}`).innerHTML += `<tr> 
                <td>${subjects.date}</td>
                <td>${subjects.time}</td>
                <td>${subjects.subject}</td>
              </tr>`;
          }
          document.getElementById("main-content").innerHTML += `</tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>`;
          i++;
        }
        document.getElementById("main-content").innerHTML += `</div>
          <!-- /.row -->`;
      }
    });
}

//-------------
//- DONUT CHART -
//-------------
// Get context with jQuery - using jQuery's .get() method.
var donutChartCanvas = $("#donutChart").get(0).getContext("2d");
var donutData = {
  labels: ["present", "absent"],
  datasets: [
    {
      data: [20, 10],
      backgroundColor: [
        "#f56954",
        "#00a65a",
        "#f39c12",
        "#00c0ef",
        "#3c8dbc",
        "#d2d6de",
      ],
    },
  ],
};
var donutOptions = {
  maintainAspectRatio: false,
  responsive: true,
};
//Create pie or douhnut chart
// You can switch between pie and douhnut using the method below.
new Chart(donutChartCanvas, {
  type: "doughnut",
  data: donutData,
  options: donutOptions,
});

//-------------
//- PIE CHART -
//-------------
// Get context with jQuery - using jQuery's .get() method.
var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
var pieData = donutData;
var pieOptions = {
  maintainAspectRatio: false,
  responsive: true,
};
//Create pie or douhnut chart
// You can switch between pie and douhnut using the method below.
new Chart(pieChartCanvas, {
  type: "pie",
  data: pieData,
  options: pieOptions,
});

//-------------
//- BAR CHART -
//-------------
var barChartCanvas = $("#barChart").get(0).getContext("2d");
var barChartData = $.extend(true, {}, areaChartData);
var temp0 = areaChartData.datasets[0];
var temp1 = areaChartData.datasets[1];
barChartData.datasets[0] = temp1;
barChartData.datasets[1] = temp0;

var barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  datasetFill: false,
};
