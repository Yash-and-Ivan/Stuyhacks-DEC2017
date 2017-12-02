$(document).ready(function() {
  var ctx = document.getElementById('bgChart').getContext('2d');
  var chartData = generateData(100);
  var bgChart = new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [{
        data: chartData,
        backgroundColor: "rgba(54, 189, 93, 0.5)",
        borderColor: "rgba(54, 189, 93, 0.5)"
      }]
    },
    options: {
      interactive: false,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }

  });
  window.setInterval(function() {
    moveData(bgChart);
  }, 1250);
});
var moveData = function(chartIn) {
  chartIn.data.datasets.forEach((dataset) => {
    dataset.data = slightlyModifyData(dataset.data);
  });
  chartIn.update();
}
var slightlyModifyData = function(dataIn) {
  out = [];
  for (var i = 0; i < dataIn.length; i++) {
    curData = dataIn[i];
    out.push({
      x: Math.random() * 10,
      y: Math.random() * 10,
      r: Math.random() * 20
    })
  }
  return out;
}
var generateData = function(numLables) {
  var data = [];
  for (var i = 0; i < numLables; i++) {
    data.push({
      x: Math.random() * 10,
      y: Math.random() * 10,
      r: Math.random() * 25
    });
  }
  return data;
}
