function dataPrep() {
  const weatherData = [data_cologne, data_northWest, data_north, data_northEast, data_west, data_east, data_southWest, data_south, data_southEast];

  const weatherDataCologne = data_cologne;

  // input data
  let inputData = []
  for (let i = 0; i < weatherData.length; i++) {
    inputData[i] = getInputData(weatherData[i]);
  }

  // output data
  let outputData = [];
  for (let i = 0; i < weatherDataCologne.hourly.time.length; i++) {
    let innerArray = [
      weatherDataCologne.hourly.temperature_2m[i],
      weatherDataCologne.hourly.rain[i],
      weatherDataCologne.hourly.cloud_cover[i]
    ];

    outputData[i] = innerArray;
  }

  // create training dataset
  let trainingDataSet = [];
  let offset = 0;

  for (let i = 0; i < inputData.length; i++) {
    getTrainingData(trainingDataSet, inputData[i], outputData, offset);
  }

  // removing entries that include values that are null
  let i = trainingDataSet.length - 1;
  for (; i >= 0; i--) {
    let foundNull = false;
    if (trainingDataSet[i] === undefined)
      console.log(i);

    for (let j = 0; j < trainingDataSet[i].input.length; j++) {
      if (trainingDataSet[i].input[j] === null) {
        trainingDataSet.splice(i, 1);
        foundNull = true;
        break;
      }
    }

    if (foundNull)
      continue;

    for (let k = 0; k < trainingDataSet[i].output.length; k++) {
      for (let item of trainingDataSet[i].output[k]) {
        if (item === null) {
          trainingDataSet.splice(i, 1)
          foundNull = true;
          break;
        }
      }
      if (foundNull)
        break;
    }
  }
}

function getInputData(data) {
  let inputData = [];
  const daysAkkumulative = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

  for (let i = 0; i < data.hourly.time.length; i++) {
    let dateAndTime = data.hourly.time[i].split('T');

    let date = dateAndTime[0].split('-');
    let yearPercentage = (daysAkkumulative[Number(date[1])] + Number(date[2])) / 365;

    let time = dateAndTime[1].split(':');
    let dayPercentage = time[0] / 24;

    let innerArray = [
      yearPercentage,
      dayPercentage,
      data.hourly.temperature_2m[i],
      data.hourly.relative_humidity_2m[i],
      data.hourly.apparent_temperature[i],
      data.hourly.precipitation[i],
      data.hourly.rain[i],
      data.hourly.snowfall[i],
      data.hourly.weather_code[i],
      data.hourly.pressure_msl[i],
      data.hourly.surface_pressure[i],
      data.hourly.cloud_cover[i],
      data.hourly.wind_speed_10m[i],
      data.hourly.wind_direction_10m[i],
      data.hourly.wind_gusts_10m[i]
    ];

    inputData[i] = innerArray;
  }

  return inputData;
}

function getTrainingData(trainingData, inputData, outputData, offset) {
  let data = [];
  for (let i = inputData.length - 1 - 48; i >= 0; i--) {
    let outputArray = [];

    for (let j = 0; j < 48; j++) {
      outputArray[j] = outputData[i + j];
    }

    data[i + offset] = {
      input: inputData[i],
      output: outputArray };

    if (data[i + offset] === undefined) {
      console.log(i);
      debugger;
    }
  }

  offset += inputData.length;
  trainingData = trainingData.concat(data);
}
