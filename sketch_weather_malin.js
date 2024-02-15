//let currentData;
let forecast = [];
let currentInputData = [];
let element;
let box;

function weatherPreload() {
  // coordinates muelheim 50.98608, 7.013688
  //currentData = loadJSON("https://api.open-meteo.com/v1/forecast?latitude=50.98608&longitude=7.013688&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_days=1");
}

function weatherSetup() {
  prepCurrentInputData();

  for (let i = 0; i < 5; i++)
    forecast[i] = [data_cologne.hourly.temperature_2m[data_cologne.hourly.time.length - 48 + i], data_cologne.hourly.precipitation[data_cologne.hourly.time.length - 48 + i], data_cologne.hourly.cloud_cover[data_cologne.hourly.time.length - 48 + i]];

  let currentTime = Number(currentData.current.time.split('T')[1].split(':')[0]);

  let weatherTable = document.getElementById('weather_table').children;
  let timeElements = weatherTable.item(0).children;  
  let temperatureElements = weatherTable.item(1).children;
  let cloudElements = weatherTable.item(3).children;
  let precipitationElements = weatherTable.item(5).children;

  for (let i = 0; i < 5; i++) {
    if (i > 0) {
      timeElements.item(i).innerHTML = (currentTime + i * 3) % 24 + ':00';
      temperatureElements.item(i).innerHTML = round(forecast[i][0]) + '°C';
      cloudElements.item(i).innerHTML = forecast[i][2] + '%';
      precipitationElements.item(i).innerHTML = forecast[i][1] + 'mm';
    }
    else {
      temperatureElements.item(i).innerHTML = round(currentData.current.temperature_2m) + '°C';
      cloudElements.item(i).innerHTML = currentData.current.cloud_cover + '%';
      precipitationElements.item(i).innerHTML = currentData.current.precipitation + 'mm';
    }
  }
  element = document.getElementById('weather_table');
  //document.addEventListener("mousemove", function () {  });
  box = element.getBoundingClientRect();
}  

const _width = 768;
const _height = 540;

let start = 100;
let length = 60;
let end = start + length;
let x = 0;
let step = 180 / length;

let flipped = false;

function weatherDraw() {
  
  
  if (frameCount >= start && frameCount <= end) {
    element.style.transform = "rotateY(" + x + "deg)";
    x += step;

    if (frameCount == end) {
      flipped = true;
    }
  }
  
  if (flipped) {
    //element.style.opacity = 0;
    
    fill(255, 0, 0);
    rect(box.x, box.y, box.width, box.height, 20);
    let spacingCurrent = _height / (currentInputData.length + 1);
    
    for (let i = 0; i < currentInputData.length; i++) {
      circle(200, i * spacingCurrent + _height + spacingCurrent, currentInputData[i] * 20);
    }
  }
}

function flipWeatherBox() {

  let weatherTable = document.getElementById('weather_table');
  weatherTable.style.transform = "rotateY(" + sin(x) + "rad)";
}
