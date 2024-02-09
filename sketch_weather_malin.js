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
  const _width = 768;
  const _height = 540;
  let time = 10;

  noStroke();
  fill(14)
  const offset = 25;
  rect(offset, offset, _width - offset * 2, _height - offset * 2, 20);

  //textFont(mono_italic);
  textAlign(CENTER);

  const textCount = 5;
  const padding = 100;
  const spacing = (_width - padding * 2) / (textCount - 1);
  const textOffset = 40;

  for (let i = 0; i < textCount; i++) {
    if (i == 0) {
      fill(56);
      textFont(mono_bold);
      textSize(25);
      text('now', i * spacing + padding, 90);

      textSize(35);      
      fill(255, 236, 95);
      //text(currentData.hourly.temperature_2m + '°C', i * spacing + padding * 2, 200);
      text('13°C', i * spacing + padding, 200);
    }
    else {
      fill(56);
      textFont(mono_light);
      textSize(25);
      text(time + i * 3 + ':00', i * spacing + padding, 90);
      textSize(35);
      text(forecast[i - 1][0] + '°C', i * spacing + padding, 200);
    }
  }

  fill(56);
  textSize(25);
  textFont(mono_bold);
  text('temperature', 125, 230)
}
