let trainingDataSet = [];

const weatherData = [data_cologne, data_northWest, data_north, data_northEast, data_west, data_east, data_southWest, data_south, data_southEast];
const weatherDataCologne = data_cologne;
let halfDataLength = weatherData[0].hourly.time.length / 2;

const daysAkkumulative = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

function dataPrep() {
  //trainingDataSet = loadJSON('assets/training_dataset.json');
  //return;

  // did i forget any data point?
  console.assert(weatherData.length == 9);

  // check if the weather data all have the same length
  for (let i = 0; i < weatherData.length; i++) {
    console.assert(weatherData[0].hourly.time.length == weatherData[i].hourly.time.length)
  }
  
  //writeInputData1();
  writeInputData2();
 
  return;

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
  for (let i = 0; i < inputData1.length; i++) {
    if (inputData1[i].length == 0) {
      console.log("inputDataLength 0 at: ", i);
      debugger;
    }

    trainingDataSet = trainingDataSet.concat(setTrainingData(inputData1[i], outputData));

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
  for (let i = trainingDataSet.length - 1; i >= 0; i--) {
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

  //saveJSON(trainingDataSet, 'assets/training_dataset.json');
  //console.log("written to file.");
}

function writeInputData1() {
  // input data
  let inputData1 = [];

  // write input data
  for (let i = 0; i < 
    //100
    halfDataLength
    ; i++) {
    // one line of input data reffering to all data points from one timestamp
    let oneLineOfInputData = "";

    // iterate the different locations
    for (let j = 0; j < weatherData.length; j++) {
      let temperature_2m = (weatherData[j].hourly.temperature_2m[i] + 50) / 100 // °C
      let relative_humidity_2m = weatherData[j].hourly.relative_humidity_2m[i] * 0.01 // %
      let apparent_temperature = (weatherData[j].hourly.apparent_temperature[i] + 50) / 100 // °C 
      let precipitation = weatherData[j].hourly.precipitation[i] * 0.001 // mm
      let rain = weatherData[j].hourly.rain[i] * 0.001 // mm 
      let snowfall = weatherData[j].hourly.snowfall[i] * 0.001 // cm 
      let pressure_msl = weatherData[j].hourly.pressure_msl[i] / 1100 // hPa (maximum measurment 1060) 
      let surface_pressure = weatherData[j].hourly.surface_pressure[i] / 1100 // hPa 
      let cloud_cover = weatherData[j].hourly.cloud_cover[i] * 0.01 // % 
      let wind_speed_10m = weatherData[j].hourly.wind_speed_10m[i] * 0.001 // km/h 
      let wind_direction_10m = weatherData[j].hourly.wind_direction_10m[i] / 360 // degree 
      let wind_gusts_10m = weatherData[j].hourly.wind_gusts_10m[i] * 0.001 // km/h

      // add all data points from one location to the single line
      oneLineOfInputData = oneLineOfInputData.concat(temperature_2m, ",", relative_humidity_2m, ",", apparent_temperature, ",", precipitation, ",", rain, ",", snowfall, ",", pressure_msl, ",", surface_pressure, ",", cloud_cover, ",", wind_speed_10m, ",", wind_direction_10m, ",", wind_gusts_10m, ",");
    }
    
    // calculate date and time as percentages
    let dateAndTime = weatherData[0].hourly.time[i].split('T');

    let date = dateAndTime[0].split('-');
    let yearPercentage = (daysAkkumulative[Number(date[1])] + Number(date[2])) / 365;

    let time = dateAndTime[1].split(':');
    let dayPercentage = time[0] / 24;

    // add date and time as end of a line
    oneLineOfInputData = oneLineOfInputData.concat(yearPercentage, ",", dayPercentage);

    // add single line to array with all input data
    console.log("adding line nr: ", i, "of ", weatherData[0].hourly.time.length, "[", i / weatherData[0].hourly.time.length, "]");
    inputData1[i] = oneLineOfInputData;
  }

  console.log("attempting to save file");
  saveStrings(inputData1, 'inputData1.txt');
}

function writeInputData2() {
   // input data
   let inputData2 = [];

   console.log("starting iteration.")
   // write input data
   for (let i = halfDataLength;
     //100
     i < weatherData[0].hourly.time.length
     ; i++) {
     // one line of input data reffering to all data points from one timestamp
     let oneLineOfInputData = "";
 
     // iterate the different locations
     for (let j = 0; j < weatherData.length; j++) {
       let temperature_2m = (weatherData[j].hourly.temperature_2m[i] + 50) / 100 // °C
       let relative_humidity_2m = weatherData[j].hourly.relative_humidity_2m[i] * 0.01 // %
       let apparent_temperature = (weatherData[j].hourly.apparent_temperature[i] + 50) / 100 // °C 
       let precipitation = weatherData[j].hourly.precipitation[i] * 0.001 // mm
       let rain = weatherData[j].hourly.rain[i] * 0.001 // mm 
       let snowfall = weatherData[j].hourly.snowfall[i] * 0.001 // cm 
       let pressure_msl = weatherData[j].hourly.pressure_msl[i] / 1100 // hPa (maximum measurment 1060) 
       let surface_pressure = weatherData[j].hourly.surface_pressure[i] / 1100 // hPa 
       let cloud_cover = weatherData[j].hourly.cloud_cover[i] * 0.01 // % 
       let wind_speed_10m = weatherData[j].hourly.wind_speed_10m[i] * 0.001 // km/h 
       let wind_direction_10m = weatherData[j].hourly.wind_direction_10m[i] / 360 // degree 
       let wind_gusts_10m = weatherData[j].hourly.wind_gusts_10m[i] * 0.001 // km/h
 
       // add all data points from one location to the single line
       oneLineOfInputData = oneLineOfInputData.concat(temperature_2m, ",", relative_humidity_2m, ",", apparent_temperature, ",", precipitation, ",", rain, ",", snowfall, ",", pressure_msl, ",", surface_pressure, ",", cloud_cover, ",", wind_speed_10m, ",", wind_direction_10m, ",", wind_gusts_10m, ",");
     }
     
     // calculate date and time as percentages
     let dateAndTime = weatherData[0].hourly.time[i].split('T');
 
     let date = dateAndTime[0].split('-');
     let yearPercentage = (daysAkkumulative[Number(date[1])] + Number(date[2])) / 365;
 
     let time = dateAndTime[1].split(':');
     let dayPercentage = time[0] / 24;
 
     // add date and time as end of a line
     oneLineOfInputData = oneLineOfInputData.concat(yearPercentage, ",", dayPercentage);
 
     // add single line to array with all input data
     console.log(".");
     inputData2[i - halfDataLength] = oneLineOfInputData;
   }
 
   console.log("attempting to save file");
   saveStrings(inputData2, 'inputData2.txt'); 
}


function train(trainingData) {
  console.log("let's-a-go!");

  const net = new brain.NeuralNetwork({
    activation: 'sigmoid', // activation function
    hiddenLayers: [128, 128, 128, 128, 128, 128, 128, 128]
  });

  for (var i = 0; i < 2000; i++) {
    net.train(trainingData, {
      learningRate: 0.0005,
      iterations: 1,
      errorThresh: 0.005,
      log: true,
      logPeriod: 1,
    });

    console.log('iteration ' + i);
    const networkState = net.toJSON();
    saveJSON(networkState, 'assets/network_state' + i + '.json');
  }
}
