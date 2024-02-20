let currentWeatherData;
let aiForecast = [];
let actualForecast = [];
let currentInputData = [];
let elementWeahterTable;
let elementBackWeatherTable;
//let box;

function weatherPreload() {
  // reload after 1h?
  // coordinates muelheim 50.98608, 7.013688
  currentWeatherData = loadJSON("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,precipitation,cloud_cover&timezone=Europe%2FBerlin&forecast_days=3");
  //("https://api.open-meteo.com/v1/forecast?latitude=50.98608&longitude=7.013688&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_days=1");

}

function weatherSetup() {
  prepCurrentInputData();

    let inner1 = [11, 0, 0];
    let inner2 = [12, 0, 0];
    let inner3 = [8, 10, 1];
    let inner4 = [8, 0, 0];
    
    aiForecast[0] = inner1;
    aiForecast[1] = inner2;
    aiForecast[2] = inner3;
    aiForecast[3] = inner4;

  let currentTime = Number(currentWeatherData.current.time.split('T')[1].split(':')[0]);

  elementWeahterTable = document.getElementById('weather_table');
  elementBackWeatherTable = document.getElementById('weather_table_back');
  //box = element.getBoundingClientRect();
  
  let weatherTable = elementWeahterTable.children;
  let weatherTableBack = elementBackWeatherTable.children;
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
      temperatureElements.item(i).innerHTML = round(aiForecast[i - 1][0]) + '°C';
      temperatureElementsBack.item(i).innerHTML = round(currentWeatherData.hourly.temperature_2m[currentTime + i * 3]) + '°C';
      cloudElements.item(i).innerHTML = aiForecast[i - 1][2] + '%';
      cloudElementsBack.item(i).innerHTML = currentWeatherData.hourly.cloud_cover[currentTime + i * 3] + '%';
      precipitationElements.item(i).innerHTML = round(aiForecast[i - 1][1]) + 'mm';
      precipitationElementsBack.item(i).innerHTML = round(currentWeatherData.hourly.precipitation[currentTime + i * 3]) + 'mm';
    }
    else {
      temperatureElements.item(i).innerHTML = round(currentWeatherData.current.temperature_2m) + '°C';
      temperatureElementsBack.item(i).innerHTML = round(currentWeatherData.current.temperature_2m) + '°C';
      cloudElements.item(i).innerHTML = currentWeatherData.current.cloud_cover + '%';
      cloudElementsBack.item(i).innerHTML = currentWeatherData.current.cloud_cover + '%';
      precipitationElements.item(i).innerHTML = round(currentWeatherData.current.precipitation) + 'mm';
      precipitationElementsBack.item(i).innerHTML = round(currentWeatherData.current.precipitation) + 'mm';
    }
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
//let compiled = false;
//let alreadyCalled = false;

const animationStart = 100;
const animationLength = 80;
//const animationEnd = animationStart + animationLength;
let animationVar = 0;

let flipped = false;
let flippingBack = false;
//let stopped = false;
const animationStep = (Math.PI * 0.5) / animationLength;

function weatherDraw() {
  //if (!compiled)
  //  compiled = true;
  
  if (frameCount == animationStart) {
    flipWeatherBox();
  }

  //if (mouseY > box.y && mouseY < box.y + box.height && mouseX > box.x && mouseX < box.x + box.width) {
  //  console.log(box.width);
  //  stopped = true;
  //} else if (!(mouseY > box.y && mouseY < box.y + box.height && mouseX > box.x && mouseX < box.x + box.width) && stopped) {
  //  stopped = false;
  //  if (flipped)
  //    flipWeatherBoxBack();
  //  else
  //    flipWeatherBox();
  //}
}

function flipWeatherBox() {
  alreadyCalled = true;
  flippingBack = false;

  elementBackWeatherTable.style.opacity = 1;
  elementBackWeatherTable.style.opacity = 1;

  elementWeahterTable.style.transform = "rotateY(" + sin(animationVar) * -180 + "deg)";
  elementBackWeatherTable.style.transform = "rotateY(" + (sin(animationVar) * -180 + 180) + "deg)";

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
  
  elementWeahterTable.style.opacity = 1;
  elementBackWeatherTable.style.opacity = 1;

  elementWeahterTable.style.transform = "rotateY(" + (sin(animationVar) * 180 + 180) + "deg)";
  elementBackWeatherTable.style.transform = "rotateY(" + sin(animationVar) * 180 + "deg)";

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
