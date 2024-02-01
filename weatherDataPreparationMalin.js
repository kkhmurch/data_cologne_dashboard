function dataPrep() {
  const weatherDataCologne = data_cologne;
  const weatherDataNorthWest = data_northWest;
  const weatherDataNorth = data_north;
  const weatherDataNorthEast = data_northEast;
  const weatherDataSouthWest = data_southWest;
  const weatherDataSouth = data_south;
  const weatherDataSouthEast = data_southEast;

  let cologneInputData = [];
  let northWestInputData = [];
  let northInputData = [];

  let outputData = [];

  const daysAkkumulative = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

  // nulls
  // are arrays subdivided?
  // weatherDataCologne.hourly not defined :( can't access any of the datapoints...

  for (let i = 0; i < weatherDataCologne.hourly.time.length; i++) {
    // input data

    // cologne
    let dateAndTime = weatherDataCologne.hourly.time[i].split('T');

    let date = dateAndTime[0].split('-');
    let yearPercentage = (daysAkkumulative[Number(date[1])] + Number(date[2])) / 365;

    let time = dateAndTime[1].split(':');
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
    dateAndTime = weatherDataNorthWest.hourly.time[i].split('T');

    date = dateAndTime[0].split('-');
    yearPercentage = (daysAkkumulative[Number(date[1])] + Number(date[2])) / 365;

    time = dateAndTime[1].split(':');
    dayPercentage = time[0] / 24;

    innerArray = [
      yearPercentage,
      dayPercentage,
      weatherDataNorthWest.hourly.temperature_2m[i],
      weatherDataNorthWest.hourly.relative_humidity_2m[i],
      weatherDataNorthWest.hourly.apparent_temperature[i],
      weatherDataNorthWest.hourly.precipitation[i],
      weatherDataNorthWest.hourly.rain[i],
      weatherDataNorthWest.hourly.snowfall[i],
      weatherDataNorthWest.hourly.weather_code[i],
      weatherDataNorthWest.hourly.pressure_msl[i],
      weatherDataNorthWest.hourly.surface_pressure[i],
      weatherDataNorthWest.hourly.cloud_cover[i],
      weatherDataNorthWest.hourly.wind_speed_10m[i],
      weatherDataNorthWest.hourly.wind_direction_10m[i],
      weatherDataNorthWest.hourly.wind_gusts_10m[i]
    ];

    northWestInputData[i] = innerArray;

    // north far
    dateAndTime = weatherDataNorth.hourly.time[i].split('T');

    date = dateAndTime[0].split('-');
    yearPercentage = (daysAkkumulative[Number(date[1])] + Number(date[2])) / 365;

    time = dateAndTime[1].split(':');
    dayPercentage = time[0] / 24;

    innerArray = [
      yearPercentage,
      dayPercentage,
      weatherDataNorth.hourly.temperature_2m[i],
      weatherDataNorth.hourly.relative_humidity_2m[i],
      weatherDataNorth.hourly.apparent_temperature[i],
      weatherDataNorth.hourly.precipitation[i],
      weatherDataNorth.hourly.rain[i],
      weatherDataNorth.hourly.snowfall[i],
      weatherDataNorth.hourly.weather_code[i],
      weatherDataNorth.hourly.pressure_msl[i],
      weatherDataNorth.hourly.surface_pressure[i],
      weatherDataNorth.hourly.cloud_cover[i],
      weatherDataNorth.hourly.wind_speed_10m[i],
      weatherDataNorth.hourly.wind_direction_10m[i],
      weatherDataNorth.hourly.wind_gusts_10m[i]
    ];

    northInputData[i] = innerArray;

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
  for (let i = northWestInputData.length - 48; i >= 0; i--) {
    trainDataSet[i + offset] = { 
      input: northWestInputData[i], 
      output: [outputData[i + 1], outputData[i + 4], outputData[i + 7], outputData[i + 10], outputData[i + 13], outputData[i + 16], outputData[i + 19], outputData[i + 22], outputData[i + 25], outputData[i + 28], outputData[i + 31], outputData[i + 34], outputData[i + 37], outputData[i + 40], outputData[i + 43], outputData[i + 46]] };
    
    offset++;
  }

  // north far
  for (let i = northInputData.length - 48; i >= 0; i--) {
    trainDataSet[i + offset] = { 
      input: northInputData[i], 
      output: [outputData[i + 1], outputData[i + 4], outputData[i + 7], outputData[i + 10], outputData[i + 13], outputData[i + 16], outputData[i + 19], outputData[i + 22], outputData[i + 25], outputData[i + 28], outputData[i + 31], outputData[i + 34], outputData[i + 37], outputData[i + 40], outputData[i + 43], outputData[i + 46]] };
  }
}