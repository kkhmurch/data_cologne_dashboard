//let currentData;
let forecast = [];
let currentInputData = [];
let element;
let elementBack;
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
  elementBack = document.getElementById('weather_table_back');
  box = element.getBoundingClientRect();
}

let alreadyCalled = false;
let compiled = false;

document.addEventListener("mousemove", function () {
  if (compiled) {
    if (!alreadyCalled && !flipped) {
      animationEnd = frameCount + length;
      flipWeatherBox();
    }
  }
});

const _width = 768;
const _height = 540;

const start = 100;
const length = 60;
const end = start + length;
let sinVar = 0;

let flipped = false;

let animationEnd;

const step = (Math.PI * 0.5) / length;
let startMs;

function weatherDraw() {
  if (frameCount != 0)
    compiled = true;
  //if (frameCount == start) {
  //  animationEnd = frameCount + length;
  //  flipWeatherBox();
  //}
//  
//  
//  if (frameCount >= start && frameCount <= end) {
//    element.style.transform = "rotateY(" + sin(x) * 180 + "deg)";
//    elementBack.style.transform = "rotateY(" + (sin(x) * 180 + 180) + "deg)";
//    x += step;
//
//    if (frameCount == end) {
//      flipped = true;
//    }
//  }
//  
//  if (flipped) {
  
//    noStroke();
//    fill(14, 14, 14);
//    rect(box.x, box.y, box.width, box.height, 20);
//    
//    element.style.opacity = 0;
//    elementBack.style.opacity = 0;
//    
//    fill(255, 246, 72);
//    let spacingCurrent = box.height / (currentInputData.length + 1);
//    for (let i = 0; i < currentInputData.length; i++) {
//      circle(200, i * spacingCurrent + spacingCurrent + box.y, currentInputData[i] * 20 + 2);
//    }
//
//    const spacing64 = box.width / (64 + 2);
//    for (let i = 0; i <= 64; i++) {
//      circle(i * spacing64 + spacing64 + box.x, 100, 2);
//    }
//  }
}

function flipWeatherBox() {
  alreadyCalled = true;
  // think
  // where goes the condition? where goes the callback?
  // condition needs to be in function that get's called back, otherwise would never change
  // what is my condition?

  element.style.transform = "rotateY(" + sin(sinVar) * -180 + "deg)";
  elementBack.style.transform = "rotateY(" + (sin(sinVar) * -180 + 180) + "deg)";

  if (frameCount > animationEnd) {
    flipped = true;
    return;
  }

  if (frameCount <= animationEnd) {
    sinVar += step;
    setTimeout(flipWeatherBox, 1000 / 60);
  }
}
