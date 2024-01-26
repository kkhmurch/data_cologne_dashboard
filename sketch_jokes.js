let covidResponseData;
let covidCases = [];
let covidCasesMin;
let covidCasesMax;

let jokeResponseData;

function preload() {
  let url = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist,explicit';
  jokesResponseData = loadJSON(url);
}

function setup() {
  // Log fetched data
  print("API data: ");
  print(JSON.stringify(jokeResponseData,undefined,2));

  // Extract case numbers from JSON response data into an array.
  delivery = new Array(jokeResponseData.data.length);
  for(let i=0; i < jokeResponseData.data.length; i++) {
    delivery[i] = jokeResponseData.data[i].delivery;
  }
  console.log(delivery);
}

// Visualize
function draw() {
  strokeWeight(1);
}
