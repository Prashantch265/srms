var totalStudentsBySemester,
  maleStudentsBySemester,
  femaleStudentsBySemester,
  nonBinaryStudentsBySemester,
  totalMaleTeacher,
  totalFemaleTeacher,
  totalNonBinaryTeacher;

document.addEventListener("load", loadDataForDashboard());

function loadDataForDashboard() {
  fetch("http://localhost:3000/get-all-count-data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //    Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((resData) => {
      let data = resData.data;
      document.getElementById("totalAdminCount").innerHTML =
        data.totalAdmin[0].count;
      document.getElementById("totalTeacherCount").innerHTML =
        data.totalTeacher[0].count;
      document.getElementById("totalStudentCount").innerHTML =
        data.totalStudent[0].count;

      totalStudentsBySemester = data.totalStudentsBySemester;
      maleStudentsBySemester = data.maleStudentsBySemester;
      femaleStudentsBySemester = data.femaleStudentsBySemester;
      nonBinaryStudentsBySemester = data.nonBinaryStudentsSemester;

      totalMaleTeacher = data.totalMaleTeacher;
      totalFemaleTeacher = data.totalFemaleTeacher;
      totalNonBinaryTeacher = data.totalNonBinaryTeacher;

      displayStudentPopulationDonut();
      displayStudentGenderRatioBySemester();
      displayTeacherGenderRatioBySemester();
      displayStudentAttendanceBySemester();
    });
}

function displayStudentPopulationDonut() {
  //-------------
  //- DONUT CHART -
  //-------------
  // Get context with jQuery - using jQuery's .get() method.
  var donutChartCanvas = $("#donutChart").get(0).getContext("2d");

  const labels = [];
  const data = [];

  for (let key of totalStudentsBySemester) {
    labels.push(key.display_name);
    data.push(key.count);
  }

  const donutData = {
    labels: labels,
    datasets: [
      {
        data: data,
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

  const donutOptions = {
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
}

function displayStudentGenderRatioBySemester() {
  //---------------------
  //- STACKED BAR CHART -
  //---------------------
  const labels = [];
  const maleStudents = [];
  const femaleStudents = [];
  const nonBinaryStudents = [];

  for (let key of maleStudentsBySemester) {
    labels.push(key.display_name);
    maleStudents.push(key.count);
  }

  for (let key of femaleStudentsBySemester) {
    femaleStudents.push(key.count);
  }

  for (let key of nonBinaryStudentsBySemester) {
    nonBinaryStudents.push(key.count);
  }

  const stackedBarChartData = {
    labels: labels,
    datasets: [
      {
        label: "Male",
        backgroundColor: "rgba(60,141,188,0.9)",
        borderColor: "rgba(60,141,188,0.8)",
        pointRadius: false,
        pointColor: "#3b8bba",
        pointStrokeColor: "rgba(60,141,188,1)",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(60,141,188,1)",
        data: maleStudents,
      },
      {
        label: "Female",
        backgroundColor: "rgba(210, 214, 222, 1)",
        borderColor: "rgba(210, 214, 222, 1)",
        pointRadius: false,
        pointColor: "rgba(210, 214, 222, 1)",
        pointStrokeColor: "#c1c7d1",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: femaleStudents,
      },
      {
        label: "Non Binary",
        backgroundColor: "rgb(200, 222, 105)",
        borderColor: "rgb(88, 124, 195)",
        pointRadius: false,
        pointColor: "rgb(233, 132, 112)",
        pointStrokeColor: "#54c075",
        pointHighlightFill: "rgb(212, 69, 69)",
        pointHighlightStroke: "rgb(179, 172, 172)",
        data: nonBinaryStudents,
      },
    ],
  };
  var stackedBarChartCanvas = $("#stackedBarChartStudent")
    .get(0)
    .getContext("2d");

  const stackedBarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  new Chart(stackedBarChartCanvas, {
    type: "bar",
    data: stackedBarChartData,
    options: stackedBarChartOptions,
  });
}

function displayTeacherGenderRatioBySemester() {
  //---------------------
  //- STACKED BAR CHART -
  //---------------------
  const labels = [];
  const maleTeachers = [];
  const femaleTeachers = [];
  const nonBinaryTeachers = [];

  for (let key of totalMaleTeacher) {
    labels.push(key.display_name);
    maleTeachers.push(key.count);
  }

  for (let key of totalFemaleTeacher) {
    femaleTeachers.push(key.count);
  }

  for (let key of totalNonBinaryTeacher) {
    nonBinaryTeachers.push(key.count);
  }

  const stackedBarChartData = {
    labels: labels,
    datasets: [
      {
        label: "Male",
        backgroundColor: "rgba(60,141,188,0.9)",
        borderColor: "rgba(60,141,188,0.8)",
        pointRadius: false,
        pointColor: "#3b8bba",
        pointStrokeColor: "rgba(60,141,188,1)",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(60,141,188,1)",
        data: maleTeachers,
      },
      {
        label: "Female",
        backgroundColor: "rgba(210, 214, 222, 1)",
        borderColor: "rgba(210, 214, 222, 1)",
        pointRadius: false,
        pointColor: "rgba(210, 214, 222, 1)",
        pointStrokeColor: "#c1c7d1",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: femaleTeachers,
      },
      {
        label: "Non Binary",
        backgroundColor: "rgb(200, 222, 105)",
        borderColor: "rgb(88, 124, 195)",
        pointRadius: false,
        pointColor: "rgb(233, 132, 112)",
        pointStrokeColor: "#54c075",
        pointHighlightFill: "rgb(212, 69, 69)",
        pointHighlightStroke: "rgb(179, 172, 172)",
        data: nonBinaryTeachers,
      },
    ],
  };
  var stackedBarChartCanvas = $("#stackedBarChartTeacher")
    .get(0)
    .getContext("2d");

  const stackedBarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  new Chart(stackedBarChartCanvas, {
    type: "bar",
    data: stackedBarChartData,
    options: stackedBarChartOptions,
  });
}

function displayStudentAttendanceBySemester() {
  //-------------
  //- DONUT CHART -
  //-------------
  // Get context with jQuery - using jQuery's .get() method.
  var donutChartCanvas = $("#pieChart").get(0).getContext("2d");

  const labels = [];
  const data = [];

  for (let key of totalStudentsBySemester) {
    labels.push(key.display_name);
    data.push(key.count);
  }

  const donutData = {
    labels: labels,
    datasets: [
      {
        data: data,
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

  const donutOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  new Chart(donutChartCanvas, {
    type: "pie",
    data: donutData,
    options: donutOptions,
  });
}
