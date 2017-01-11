var mainframe_api_url = 'http://localhost:81/nightwatch.py';

function init() {
  initCx('USD');
  initCx('EUR');
  initCx('GBP');
  initCx('AUD');
}

var seriesOptions = [
//{ strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.1)', lineWidth: 3 },
//{ strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.1)', lineWidth: 3 },
  { strokeStyle: 'rgba(0, 0, 255, 1)', fillStyle: 'rgba(0, 0, 255, 0.1)', lineWidth: 3 },
//{ strokeStyle: 'rgba(255, 255, 0, 1)', fillStyle: 'rgba(255, 255, 0, 0.1)', lineWidth: 3 }
];

function initCx(currency) {

  // Initialize an empty TimeSeries for each CPU.
  var dataSets = [new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries()];

  var now = new Date().getTime();
  for (var t = now - 1000 * 50; t <= now; t += 1000) {
    addRandomValueToDataSets(t, dataSets);
  }
  // Every second, simulate a new set of readings being taken from each CPU.
  setInterval(function() {
    addRandomValueToDataSets(new Date().getTime(), dataSets);
  }, 1000);

  // Build the timeline
  var timeline = new SmoothieChart({ minValue: 0, maxValue: 1, millisPerPixel: 20, grid: { strokeStyle: '#555555', lineWidth: 1, millisPerLine: 1000, verticalSections: 4 }});
  for (var i = 0; i < dataSets.length; i++) {
    timeline.addTimeSeries(dataSets[i], seriesOptions[i]);
  }
  timeline.streamTo(document.getElementById(currency), 1000);
}

function addRandomValueToDataSets(time, dataSets) {
  var request = new XMLHttpRequest();
  request.open('GET', mainframe_api_url, true);
  request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var resp = request.responseText;
    console.log('response: ' + resp);
    // stream value into chart
    for (var i = 0; i < dataSets.length; i++) {
      dataSets[i].append(time, resp);
    }
  } else {
      console.error('Error contacting backend');
    }
  };
  request.onerror = function(e) {
    console.error(e);
  };
  request.send();
}
