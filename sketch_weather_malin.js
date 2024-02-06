let currentData;
let forecast = [];

function weatherPreload() {
  // coordinates muelheim 50.98608, 7.013688
  //currentData = loadJSON("https://api.open-meteo.com/v1/forecast?latitude=50.98608&longitude=7.013688&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&forecast_days=1");

}

function weatherSetup() {
  for (let i = 0; i < 5; i++)
    forecast[i] = [data_cologne.hourly.temperature_2m[data_cologne.hourly.time.length - 48 + i], data_cologne.hourly.precipitation[data_cologne.hourly.time.length - 48 + i], data_cologne.hourly.cloud_cover[data_cologne.hourly.time.length - 48 + i]];
}  

function weatherDraw() {
  // (0,0) - (768,0)
  // (0,540) - (768, 540)

  for (let i = 1; i <= 5; i++) {
    fill(56, 56, 56);
    noStroke();
    textAlign(CENTER)
    textSize(20);
    text('now', (768 - 5 * 2) / 5 * i, 80);
  }
}
