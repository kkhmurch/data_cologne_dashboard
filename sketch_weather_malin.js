let currentJsData = [];

function weatherPreload() {
  currentJsData = loadJSON("https://api.open-meteo.com/v1/forecast?latitude=50.98608&longitude=7.013688&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=Europe%2FBerlin&forecast_days=1");
}

function weatherSetup() {
  //print("Weather data: ");
  //print(JSON.stringify(currentJsData, undefined, 2));
}

// Visualize amount of cases as circles with normalized diameters
function weatherDraw() {
}
