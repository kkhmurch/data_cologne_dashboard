let currentData;
let forecast = [];

function weatherPreload() {
  // coordinates muelheim 50.98608, 7.013688
  //currentData = loadJSON("https://api.open-meteo.com/v1/forecast?latitude=50.98608&longitude=7.013688&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_days=1");
}

function weatherSetup() {
  for (let i = 0; i < 5; i++)
    forecast[i] = [data_cologne.hourly.temperature_2m[data_cologne.hourly.time.length - 48 + i], data_cologne.hourly.precipitation[data_cologne.hourly.time.length - 48 + i], data_cologne.hourly.cloud_cover[data_cologne.hourly.time.length - 48 + i]];

  let currentTime = 10;

  let weatherTable = document.getElementById('weather_table').children;
  console.log(weatherTable);
  let timeElements = weatherTable.item(0).children;
  for (let i = 1; i < 5; i++) {
  }
  
  let temperatureElements = weatherTable.item(1).children;
  let cloudElements = weatherTable.item(3).children;
  let precipitationElements = weatherTable.item(5).children;

  for (let i = 0; i < 5; i++) {
    temperatureElements.item(i).innerHTML = round(forecast[i][0]) + '°C';
    cloudElements.item(i).innerHTML = forecast[i][2] + '%';
    precipitationElements.item(i).innerHTML = forecast[i][1] + 'mm';

    if (i > 0)
      timeElements.item(i).innerHTML = currentTime + i * 3 + ':00';
  }
}  

function weatherDraw() {
  
}
