let requestedData;
let peanutsData;

let dataArray = [];
let dataMin;
let dataMax;
let peanutsPrice;

// Called once when the program starts just before setup().
// Use this to load external data, i.e. make your API calls here.
// See https://p5js.org/reference/#/p5/preload
function preload() {
  // Call RKI Covid-19 API
  requestedData = loadJSON('https://api.corona-zahlen.org/germany/history/cases/9');
  peanutsData = loadTable('https://docs.google.com/spreadsheets/d/e/2PACX-1vQv4HF1VsJRln3h1I8fpkfoTdrprJY2etWfHVhcwFcRJyfcFRLf-YENkxs6XMPFDVzhi11YuQizNbi1/pub?gid=0&single=true&output=csv', 'csv', 'header')
}

// Called once when the program starts.
// See https://p5js.org/reference/#/p5/setup
function setup() {
  createCanvas(800, 800);

  // Log fetched data
  print("API data: ");
  print(JSON.stringify(requestedData, undefined, 2));

  // Extract JSON data into Array
  dataArray = new Array(requestedData.data.length);
  for(let i=0; i < requestedData.data.length; i++){
    dataArray[i] = requestedData.data[i].cases;
  }
  print(dataArray);

  // Analyse min and max in data
  dataMin = min(dataArray);
  dataMax = max(dataArray);

  peanutsPrice = peanutsData.rows.map(r => Number(r.obj.Preis))
}

// Called over and over to refresh your visualisation.
// See https://p5js.org/reference/#/p5/draw
function draw() {
  // Visualize amount of cases as circles with normalized diameters
  background(0);
  strokeWeight(0);
  for (let i = 0; i < peanutsPrice.length; i++) {
    const grayscale = map(peanutsPrice[i], 0, 2000, 0, 255, true);
    fill(grayscale);
    rect(0, map(i, 0, peanutsPrice.length, 0, height), width, height / peanutsPrice.length);
  }
  strokeWeight(1);
  for(let i=0; i < dataArray.length; i++){
    const diameter = map(dataArray[i], dataMin, dataMax, 20, 200);
    const x = 100*i;
    fill(255);
    if (dist(mouseX, mouseY, x, 400) <= diameter/2) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    circle(x, 400, diameter);
  }
}
