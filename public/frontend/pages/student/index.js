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

const getPredictionData = () => {
  // Requires Chart.js to be available on the page
  fetch(url + `analytics/predictions/${user.userId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (!res.ok)
        throw new Error("Prediction data not found or insufficient data.");
      return res.json();
    })
    .then((res) => {
      const data = res.data;

      // Show the card
      document.getElementById("prediction-card").style.display = "block";

      // Update text
      document.getElementById("predicted-gpa").innerText =
        data.predictedGPA.toFixed(2);

      const trendEl = document.getElementById("prediction-trend");
      if (data.trend === "Improving") {
        trendEl.innerHTML =
          '<span class="text-success"><i class="fas fa-arrow-up"></i> Improving</span>';
      } else if (data.trend === "Declining") {
        trendEl.innerHTML =
          '<span class="text-danger"><i class="fas fa-arrow-down"></i> Declining</span>';
      } else {
        trendEl.innerHTML =
          '<span class="text-warning"><i class="fas fa-minus"></i> Stable</span>';
      }

      // Render Prediction Chart
      const ctx = document.getElementById("predictionChart").getContext("2d");

      const labels = data.historical.map((_, i) => `Sem ${i + 1}`);
      labels.push(`Sem ${data.historical.length + 1} (Predicted)`);

      const actualData = [...data.historical, null];
      const predictedLine = [];

      // Calculate points for the trend line (y = mx + b)
      // b = intercept (which we can reverse engineer from slope and last point if we don't have it directly)
      // For visual simplicity, we'll just draw a line from Sem 1 to the Predicted Sem
      const n = data.historical.length;
      if (n > 1) {
        const firstY = data.predictedGPA - data.slope * n; // approximate starting point based on slope
        for (let i = 0; i <= n; i++) {
          predictedLine.push(firstY + data.slope * i);
        }
      }

      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Actual GPA",
              data: actualData,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.5)",
              pointRadius: 6,
              pointBackgroundColor: "#007bff",
              fill: false,
              tension: 0.1,
            },
            {
              label: "Linear Regression Trend",
              data: predictedLine,
              borderColor: "rgba(23, 162, 184, 0.8)", // Info color
              borderDash: [5, 5], // Dashed line for prediction
              pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) =>
                i === n ? 8 : 0
              ), // Only show point on prediction
              pointBackgroundColor: "#17a2b8",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 4.0, // Assuming 4.0 scale
            },
          },
        },
      });
    })
    .catch((err) => {
      console.log("Prediction analytics not available yet:", err);
      // Silently fail if not enough data, the card just stays hidden.
    });
};

$(document).ready(function () {
  let date = new Date().toISOString().slice(0, 10);
  document.getElementById("student-name").innerText = user.name;
  $("#nepali-datepicker").val(date);
  getAttendance(date);
  getResult();
  getPredictionData(); // NEW: Trigger the analytics fetch on load
});
