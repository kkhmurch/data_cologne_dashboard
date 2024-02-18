//let currentData;
let aiForecast = [];
let actualForecast = [];
let currentInputData = [];
let element;
let elementBack;
let box;

function weatherPreload() {
  // coordinates muelheim 50.98608, 7.013688
  //currentData = loadJSON("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,precipitation,cloud_cover&forecast_days=3");
  //("https://api.open-meteo.com/v1/forecast?latitude=50.98608&longitude=7.013688&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_days=1");
}

function weatherSetup() {
  prepCurrentInputData();

  for (let i = 0; i < 5; i++)
    aiForecast[i] = [data_cologne.hourly.temperature_2m[data_cologne.hourly.time.length - 48 + i], data_cologne.hourly.precipitation[data_cologne.hourly.time.length - 48 + i], data_cologne.hourly.cloud_cover[data_cologne.hourly.time.length - 48 + i]];

  let currentTime = Number(currentData.current.time.split('T')[1].split(':')[0]);

  element = document.getElementById('weather_table');
  elementBack = document.getElementById('weather_table_back');
  box = element.getBoundingClientRect();
  
  let weatherTable = element.children;
  let weatherTableBack = elementBack.children;
  let timeElements = weatherTable.item(0).children;  
  let timeElementsBack = weatherTableBack.item(0).children;  
  let temperatureElements = weatherTable.item(1).children;
  let temperatureElementsBack = weatherTableBack.item(1).children;
  let cloudElements = weatherTable.item(3).children;
  let cloudElementsBack = weatherTableBack.item(3).children;
  let precipitationElements = weatherTable.item(5).children;
  let precipitationElementsBack = weatherTableBack.item(5).children;

  for (let i = 0; i < 5; i++) {
    if (i > 0) {
      timeElements.item(i).innerHTML = (currentTime + i * 3) % 24 + ':00';
      timeElementsBack.item(i).innerHTML = (currentTime + i * 3) % 24 + ':00';
      temperatureElements.item(i).innerHTML = round(aiForecast[i][0]) + '°C';
      temperatureElementsBack.item(i).innerHTML = round(forecastAndCurrent.hourly.temperature_2m[currentTime + i * 3]) + '°C';
      cloudElements.item(i).innerHTML = aiForecast[i][2] + '%';
      cloudElementsBack.item(i).innerHTML = forecastAndCurrent.hourly.cloud_cover[currentTime + i * 3] + '%';
      precipitationElements.item(i).innerHTML = round(aiForecast[i][1]) + 'mm';
      precipitationElementsBack.item(i).innerHTML = round(forecastAndCurrent.hourly.precipitation[currentTime + i * 3]) + 'mm';
    }
    else {
      temperatureElements.item(i).innerHTML = round(currentData.current.temperature_2m) + '°C';
      temperatureElementsBack.item(i).innerHTML = round(currentData.current.temperature_2m) + '°C';
      cloudElements.item(i).innerHTML = currentData.current.cloud_cover + '%';
      cloudElementsBack.item(i).innerHTML = currentData.current.cloud_cover + '%';
      precipitationElements.item(i).innerHTML = round(currentData.current.precipitation) + 'mm';
      precipitationElementsBack.item(i).innerHTML = round(currentData.current.precipitation) + 'mm';
    }
  }

  // actual forecast data
  for (let i = 0; i < 5; i++) {
    actualForecast = forecastAndCurrent.hourly.temperature_2m[currentTime + i * 3]
  }
  
}

//addEventListener('load', () => { 
//  element = document.getElementById('weather_table')
//  element.addEventListener("mousemove", () => {
//    if (compiled) {
//      if (frameCount > animationEnd) {
//        if (!alreadyCalled && !flipped && frameCount > animationEndedAt + 120) {
//          animationStartedAt = frameCount;
//          flipWeatherBox();
//        }
//      }
//    }
//  });
//});

//document.addEventListener("mousemove", () => {
//  if (compiled) {
//    if (frameCount > animationEnd) {
//      if (!alreadyCalled && !flipped && frameCount > animationEndedAt + 120) {
//        animationStartedAt = frameCount;
//        flipWeatherBox();
//      }
//    }
//  }
//});
  
  // vars for flipping animation
let compiled = false;
let alreadyCalled = false;

const animationStart = 100;
const animationLength = 80;
const animationEnd = animationStart + animationLength;
let animationVar = 0;

let flipped = false;
let flippingBack = false;

const animationStep = (Math.PI * 0.5) / animationLength;

function weatherDraw() {
  if (!compiled)
    compiled = true;

  const _width = 768;
  const _height = 540;
  
  if (frameCount == animationStart) {
    flipWeatherBox();
  }
  
//  if (flipped && !flippingBack) {
//  
//    // fake weatherbox
//    noStroke();
//    fill(14, 14, 14);
//    rect(box.x, box.y, box.width, box.height, 20);
//    
//    // make real weatherbox invisible in order to see the canvas beneath
//    element.style.opacity = 0;
//    elementBack.style.opacity = 0;
//    
//  const boxWidth = box.width;
//  const boxHeight = box.height;
//  const boxXoffset = box.x;
//  const boxYoffset = box.y;
//
//  noStroke();
//  fill(14, 14, 14);
//  rect(box.x, box.y, box.width, box.height, 20);
//
//  fill(255);
//  textAlign(CENTER);
//  textSize(25);
//  text('Forecast vs Falsecast', boxWidth * 0.5 + boxXoffset, boxHeight - 40 + boxYoffset);
//
//  stroke(255);
//  line(boxXoffset + 10, 140 + boxYoffset, boxWidth * 0.5 + boxXoffset - 10, 140 + boxYoffset);
//  line(boxWidth * 0.5 + boxXoffset + 10, 140 + boxYoffset, boxWidth + boxXoffset - 10, 140 + boxYoffset);
//  line(boxXoffset + 10, 300 + boxYoffset, boxWidth * 0.5 + boxXoffset - 10, 300 + boxYoffset);
//  line(boxWidth * 0.5 + boxXoffset + 10, 300 + boxYoffset, boxWidth + boxXoffset - 10, 300 + boxYoffset);
//    
//  } 
}

function flipWeatherBox() {
  alreadyCalled = true;
  flippingBack = false;

  elementBack.style.opacity = 1;
  elementBack.style.opacity = 1;

  element.style.transform = "rotateY(" + sin(animationVar) * -180 + "deg)";
  elementBack.style.transform = "rotateY(" + (sin(animationVar) * -180 + 180) + "deg)";

  if (animationVar >= Math.PI * 0.5) {
    flipped = true;
    animationVar = 0;
    setTimeout(flipWeatherBoxBack, 10000);
    return;
  }

  if (animationVar < Math.PI * 0.5) {
    animationVar += animationStep;
    setTimeout(flipWeatherBox, 1000 / 60);
  }
}

function flipWeatherBoxBack() {
  flippingBack = true;
  
  element.style.opacity = 1;
  elementBack.style.opacity = 1;

  element.style.transform = "rotateY(" + (sin(animationVar) * 180 + 180) + "deg)";
  elementBack.style.transform = "rotateY(" + sin(animationVar) * 180 + "deg)";

  if (animationVar >= Math.PI * 0.5) {
    flipped = false;
    animationVar = 0;
    alreadyCalled = false;
    animationEndedAt = frameCount;
    setTimeout(flipWeatherBox, 10000)
    return;
  }

  if (animationVar < Math.PI * 0.5) {
    animationVar += animationStep;
    setTimeout(flipWeatherBoxBack, 1000 / 60);
  }
}
