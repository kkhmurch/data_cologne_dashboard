function dataPrep() {
  const weatherDataCologne = loadJSON("assets/weather_cologne.json");
  const weatherDataNorthWestFar = loadJSON("assets/weather_northWest_far.json");
  const weatherDataNorthFar = loadJSON("assets/weather_north_far.json");

  let cologneInputData = [];
  let northWestFarInputData = [];
  let northFarInputData = [];

  let outputData = [];

  const daysAkkumulative = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

  console.log(weatherDataCologne);

  for (let i = 0; i < weatherDataCologne.hourly.time.length; i++) {
    // input data

    // cologne
    let dateAndTime = weatherDataCologne.hourly.time[i].split('T');

    let date = dateAndTime[0].split('-');
    let yearPercentage = (daysAkkumulative[Number(date[1])] + Number(date[2])) / 365;

    let time = dateAndTime.split(':');
    let dayPercentage = time[0] / 24;

    let innerArray = [
      yearPercentage,
      dayPercentage,
      weatherDataCologne.hourly.temperature_2m[i],
      weatherDataCologne.hourly.relative_humidity_2m[i],
      weatherDataCologne.hourly.apparent_temperature[i],
      weatherDataCologne.hourly.precipitation[i],
      weatherDataCologne.hourly.rain[i],
      weatherDataCologne.hourly.snowfall[i],
      weatherDataCologne.hourly.weather_code[i],
      weatherDataCologne.hourly.pressure_msl[i],
      weatherDataCologne.hourly.surface_pressure[i],
      weatherDataCologne.hourly.cloud_cover[i],
      weatherDataCologne.hourly.wind_speed_10m[i],
      weatherDataCologne.hourly.wind_direction_10m[i],
      weatherDataCologne.hourly.wind_gusts_10m[i]
    ];

    cologneInputData[i] = innerArray;

    // north west far
    dateAndTime = weatherDataNorthWestFar.hourly.time[i].split('T');

    date = dateAndTime[0].split('-');
    yearPercentage = (daysAkkumulative[Number(date[1])] + Number(date[2])) / 365;

    time = dateAndTime.split(':');
    dayPercentage = time[0] / 24;

    innerArray = [
      yearPercentage,
      dayPercentage,
      weatherDataNorthWestFar.hourly.temperature_2m[i],
      weatherDataNorthWestFar.hourly.relative_humidity_2m[i],
      weatherDataNorthWestFar.hourly.apparent_temperature[i],
      weatherDataNorthWestFar.hourly.precipitation[i],
      weatherDataNorthWestFar.hourly.rain[i],
      weatherDataNorthWestFar.hourly.snowfall[i],
      weatherDataNorthWestFar.hourly.weather_code[i],
      weatherDataNorthWestFar.hourly.pressure_msl[i],
      weatherDataNorthWestFar.hourly.surface_pressure[i],
      weatherDataNorthWestFar.hourly.cloud_cover[i],
      weatherDataNorthWestFar.hourly.wind_speed_10m[i],
      weatherDataNorthWestFar.hourly.wind_direction_10m[i],
      weatherDataNorthWestFar.hourly.wind_gusts_10m[i]
    ];

    northWestFarInputData[i] = innerArray;

    // north far
    dateAndTime = northFarInputData.hourly.time[i].split('T');

    date = dateAndTime[0].split('-');
    yearPercentage = (daysAkkumulative[Number(date[1])] + Number(date[2])) / 365;

    time = dateAndTime.split(':');
    dayPercentage = time[0] / 24;

    innerArray = [
      yearPercentage,
      dayPercentage,
      northFarInputData.hourly.temperature_2m[i],
      northFarInputData.hourly.relative_humidity_2m[i],
      northFarInputData.hourly.apparent_temperature[i],
      northFarInputData.hourly.precipitation[i],
      northFarInputData.hourly.rain[i],
      northFarInputData.hourly.snowfall[i],
      northFarInputData.hourly.weather_code[i],
      northFarInputData.hourly.pressure_msl[i],
      northFarInputData.hourly.surface_pressure[i],
      northFarInputData.hourly.cloud_cover[i],
      northFarInputData.hourly.wind_speed_10m[i],
      northFarInputData.hourly.wind_direction_10m[i],
      northFarInputData.hourly.wind_gusts_10m[i]
    ];

    northFarInputData[i] = innerArray;

    // output data    
    innerArray = [
      weatherDataCologne.hourly.temperature_2m[i],
      weatherDataCologne.hourly.rain[i],
      weatherDataCologne.hourly.cloud_cover[i]
    ];

    outputData[i] = innerArray;
  }

  let trainDataSet = [];
  let offset = 0;

  // cologne
  for (let i = cologneInputData.length - 48; i >= 0; i--) {
    trainDataSet[i] = { 
      input: cologneInputData[i], 
      output: [outputData[i + 1], outputData[i + 4], outputData[i + 7], outputData[i + 10], outputData[i + 13], outputData[i + 16], outputData[i + 19], outputData[i + 22], outputData[i + 25], outputData[i + 28], outputData[i + 31], outputData[i + 34], outputData[i + 37], outputData[i + 40], outputData[i + 43], outputData[i + 46]] };

    offset++;
  }

  // north west far
  for (let i = northWestFarInputData.length - 48; i >= 0; i--) {
    trainDataSet[i + offset] = { 
      input: northWestFarInputData[i], 
      output: [outputData[i + 1], outputData[i + 4], outputData[i + 7], outputData[i + 10], outputData[i + 13], outputData[i + 16], outputData[i + 19], outputData[i + 22], outputData[i + 25], outputData[i + 28], outputData[i + 31], outputData[i + 34], outputData[i + 37], outputData[i + 40], outputData[i + 43], outputData[i + 46]] };
    
    offset++;
  }

  // north far
  for (let i = northFarInputData.length - 48; i >= 0; i--) {
    trainDataSet[i + offset] = { 
      input: northFarInputData[i], 
      output: [outputData[i + 1], outputData[i + 4], outputData[i + 7], outputData[i + 10], outputData[i + 13], outputData[i + 16], outputData[i + 19], outputData[i + 22], outputData[i + 25], outputData[i + 28], outputData[i + 31], outputData[i + 34], outputData[i + 37], outputData[i + 40], outputData[i + 43], outputData[i + 46]] };
  }
}