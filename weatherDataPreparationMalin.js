function dataPrep() {
  const weatherData = [data_cologne, data_northWest, data_north, data_northEast, data_west, data_east, data_southWest, data_south, data_southEast];

  const weatherDataCologne = data_cologne;

  // input data
  let inputData = []
  for (let i = 0; i < weatherData.length; i++) {
    if (weatherData[i] == null) {
      console.log("weatherData null at: ", i);
      debugger;
    }

    inputData[i] = setInputData(weatherData[i]);

    if (inputData[i].length == 0) {
      console.log("inputDataLength 0 at: ", i);
      debugger;
    }

    if (inputData[i] == null) {
      console.log("inputData null at: ", i);
      debugger;
    }
  }

  // output data
  let outputData = [];
  for (let i = 0; i < weatherDataCologne.hourly.time.length; i++) {
    let innerArray = [
      (weatherDataCologne.hourly.temperature_2m[i] + 50) / 100, // value between 0 and (less than) 1, shift negative values +50, divide by max temp of 50 
      weatherDataCologne.hourly.precipitation[i] * 0.001, // mm to m 
      weatherDataCologne.hourly.cloud_cover[i] * 0.01 // percent to value  between 0 and 1 
    ];

    outputData[i] = innerArray;
  }

  // create training dataset
  let trainingDataSet = [];

  for (let i = 0; i < inputData.length; i++) {
    if (inputData[i].length == 0) {
      console.log("inputDataLength 0 at: ", i);
      debugger;
    }

    trainingDataSet = trainingDataSet.concat(setTrainingData(inputData[i], outputData));

    if (trainingDataSet[i] == undefined || trainingDataSet[i] == null) {
      console.log("trainingDataSet undefined or null at: ", i)
      debugger;
    }
    if (trainingDataSet[i].input == undefined) {
      console.log("trainingDataSet.input undefined at: ", i)
      debugger;
    }
    if (trainingDataSet[i].output == undefined) {
      console.log("trainingDataSet.output undefined at: ", i)
      debugger;
    }
  }

  if (trainingDataSet.length < 80 * 365 * 24) {
    console.log("trainigDataSet too small: length: ", trainingDataSet.length, " should be at least: ", 80 * 365 * 24);
    debugger;
  }

  // removing entries that include values that are null
  let i = trainingDataSet.length - 1;
  for (; i >= 0; i--) {
    let foundNull = false;

    if (trainingDataSet[i] == undefined)
      console.log("trainingsDataSet undefined at: ", i);
    
    if (trainingDataSet[i] == null) {
      console.log("trainingsDataSet null at: ", i);
      debugger;
    }

    for (let j = 0; j < trainingDataSet[i].input.length; j++) {
      if (trainingDataSet[i].input[j] == null) {
        trainingDataSet.splice(i, 1);
        foundNull = true;
        break;
      }
    }

    if (foundNull)
      continue;

    for (let k = 0; k < trainingDataSet[i].output.length; k++) {
      for (let item of trainingDataSet[i].output[k]) {
        if (item == null) {
          trainingDataSet.splice(i, 1)
          foundNull = true;
          break;
        }
      }
      if (foundNull)
        break;
    }
  }
  console.log("data prep process finished")
}

function setInputData(data) {
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
      (data.hourly.temperature_2m[i] + 50) / 100, // °C
      data.hourly.relative_humidity_2m[i] * 0.01, // %
      (data.hourly.apparent_temperature[i] + 50) / 100, // °C 
      data.hourly.precipitation[i] * 0.001, // mm
      data.hourly.rain[i] * 0.001, // mm 
      data.hourly.snowfall[i] * 0.001, // cm 
      data.hourly.weather_code[i] * 0.001, // number up to 804? 
      data.hourly.pressure_msl[i] / 1100, // hPa (maximum measurment 1060) 
      data.hourly.surface_pressure[i] / 1100, // hPa 
      data.hourly.cloud_cover[i] * 0.01, // % 
      data.hourly.wind_speed_10m[i] * 0.001, // km/h 
      data.hourly.wind_direction_10m[i] / 360, // degree 
      data.hourly.wind_gusts_10m[i] * 0.001 // km/h 
    ];

    for (let j = 0; j < innerArray.length; j++) {
      if (innerArray[j] > 1) {
        console.log("value above 1: ", innerArray[j], " at index: ", j);
        debugger;
      }
      if (innerArray[j] < 0) {
        console.log("value lower than 0: ", innerArray[j], " at index: ", j);
        debugger;
      }
    }

    inputData[i] = innerArray;
  }
  return inputData;
}

function setTrainingData(innerInputData, outputData) {
  if (innerInputData.length != outputData.length) {
    console.log("inputDataLength: ", innerInputData.length, " != outputDataLength: ", outputData.length)
    debugger;
  }

  let data = [];
  for (let i = innerInputData.length - 1 - 48; i >= 0; i--) {

    let outputArray = [];

    for (let j = 0; j < 48; j++) {
      outputArray[j] = outputData[i + j];
    }

    data[i] = {
      input: innerInputData[i],
      output: outputArray };

    if (data[i] == undefined || data[i].input == null) {
      console.log(i);
      debugger;
    }
    
    if (data[i].input == undefined || data[i].input == null) {
      console.log("trainigData.input undefined at: ", i);
      debugger;
    }
    
    if (data[i].output == undefined || data[i].input == null) {
      console.log("trainigData.input undefined at: ", i);
      debugger;
    }
  }

  //offset += inputData.length;
  return data;
}

function train(trainingData) {
 // 8 hidden layers 128 gross
 // sigmoid
}
