var displayData = function(textData) {
  data = JSON.parse(textData);
  ctx = document.getElementById("positionChart").getContext('2d');

  $("#name").html(data.name)
  $("#time").html(data.timespentrelaxing)

  new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [{
        label: "position",
        data: getPositionData(data),
        backgroundColor: "rgba(165, 231, 93, 0.1)",
        borderColor: "rgba(165, 231, 93, 0.1)"
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            max: 1,
            min: -1
          }
        }],
        xAxes: [{
          ticks: {
            max: 1,
            min: -1
          }
        }]
      }

    }
  });
  ctx = document.getElementById("xAccel").getContext('2d');
  cty = document.getElementById("yAccel").getContext('2d');
  ctz = document.getElementById("zAccel").getContext('2d');
  charts = [ctx, cty, ctz];
  for (var i = 0; i < 3; i++) {
    new Chart(charts[i], {
      type: "line",
      data: {
        labels: getAccRange(data),
        datasets: [{
          radius: 0,
          fill: false,
          label: ["X Acceleration", "Y Acceleration", "Z Acceleration", ][i],
          data: getAccData(data, i, true),
          borderColor: "rgb(41, 123, 100)",
          borderWidth: 1
        }, ]
      },
      options: {
        animation: false,
        interactive: false,
        scales: {
          yAxes: [{
            ticks: {
              max: 5,
              min: -5
            }
          }],
          xAxes: [{
            display: false
          }]
        }
      }
    });
  }


  ctx = document.getElementById("gyro").getContext('2d');
  new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [{
        label: "rotation",
        data: getGyroData(data),
        backgroundColor: "rgba(54, 189, 93, 0.1)",
        borderColor: "rgba(54, 189, 93, 0.1)"
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: -400,
            max: 400
          }
        }],
        xAxes: [{
          ticks: {
            min: -400,
            max: 400
          }
        }]
      }
    }
  });
}
var getAccData = function(inData, pos, avg) {
  acc = inData.accellerometer;
  out = []
  average = 0;
  for (var i = 0; i < acc.length; i++) {
    average += acc[i][pos]
  }
  if (avg) {
    average /= acc.length
  };
  for (var i = 0; i < acc.length; i++) {
    out.push(acc[i][pos] - average);
  }
  return out;
}
var getAccRange = function(inData) {
  acc = inData.accellerometer;
  out = []
  for (var i = 0; i < acc.length; i++) {
    out.push(i);
  }
  return out;
}
var getGyroData = function(inData) {
  pos = inData.gyro;
  out = [];
  for (var i = 0; i < pos.length; i++) {
    curPos = pos[i];
    out.push({
      x: curPos[0],
      y: curPos[1],
      r: curPos[2] / 25
    })
  }
  return out
}
var getPositionData = function(inData) {
  pos = inData.positions;
  out = [];
  for (var i = 0; i < pos.length; i++) {
    curPos = pos[i];
    out.push({
      x: curPos[0],
      y: curPos[1],
      r: curPos[2] * 25
    })
  }
  return out
}
