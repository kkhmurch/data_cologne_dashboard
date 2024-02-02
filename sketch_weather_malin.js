let currentWeatherDataCologne;

let currentWeatherDataNorth50;
let currentWeatherDataNorth100;
let currentWeatherDataNorth200;

let currentWeatherDataSouth50;
let currentWeatherDataSouth100;
let currentWeatherDataSouth200;

let currentWeatherDataEast50;
let currentWeatherDataEast100;
let currentWeatherDataEast200;

let currentWeatherDataWest50;
let currentWeatherDataWest100;
let currentWeatherDataWest200;

let currentData = new Map();

function weatherPreload() {
  /*const urlStart = "https://api.open-meteo.com/v1/forecast?latitude=";
  const urlConnection = "&longitude=";
  const urlEnd = "&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,showers,snowfall,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation,rain,showers,snowfall,snow_depth,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm,soil_moisture_3_to_9cm,soil_moisture_9_to_27cm,soil_moisture_27_to_81cm&timezone=Europe%2FBerlin&past_days=92&forecast_days=1";

  currentData.set("cologne", loadJSON(urlStart + "50.98608"+ urlConnection + "7.013688" + urlEnd));

  currentData.set("NW0", loadJSON(urlStart + "51.6"+ urlConnection + "6.0" + urlEnd));
  currentData.set("N0", loadJSON(urlStart + "51.6"+ urlConnection + "7.0" + urlEnd));
  currentData.set("NE0", loadJSON(urlStart + "51.6"+ urlConnection + "8.0" + urlEnd));

  currentData.set("NW1", loadJSON(urlStart + "51.3"+ urlConnection + "6.0" + urlEnd));
  currentData.set("N1", loadJSON(urlStart + "51.3"+ urlConnection + "7.0" + urlEnd));
  currentData.set("NE1", loadJSON(urlStart + "51.3"+ urlConnection + "8.0" + urlEnd));

  currentData.set("W", loadJSON(urlStart + "50.9"+ urlConnection + "6.0" + urlEnd));
  currentData.set("E", loadJSON(urlStart + "50.9"+ urlConnection + "8.0" + urlEnd));

  currentData.set("SW0", loadJSON(urlStart + "50.7"+ urlConnection + "6.0" + urlEnd));
  currentData.set("S0", loadJSON(urlStart + "50.7"+ urlConnection + "7.0" + urlEnd));
  currentData.set("SE0", loadJSON(urlStart + "50.7"+ urlConnection + "8.0" + urlEnd));

  currentData.set("SW1", loadJSON(urlStart + "50.3"+ urlConnection + "6.0" + urlEnd));
  currentData.set("S1", loadJSON(urlStart + "50.3"+ urlConnection + "7.0" + urlEnd));
  currentDa*/
}

function weatherSetup() {
 /* print("Weather data: ");
  print(JSON.stringify(currentData.get("cologne"), undefined, 2)); */
}

function weatherDraw() {
}
