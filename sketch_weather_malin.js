

function weatherPreload() {
  // Call RKI Covid-19 API
  covidResponseData = loadJSON('https://api.corona-zahlen.org/germany/history/cases/9');
}

function covidSetup() {
  // Log fetched data
  print("API data: ");
  print(JSON.stringify(covidResponseData, undefined, 2));

  // Extract case numbers from JSON response data into an array.
  covidCases = new Array(covidResponseData.data.length);
  for(let i=0; i < covidResponseData.data.length; i++) {
    covidCases[i] = covidResponseData.data[i].cases;
  }
  print(covidCases);

  // Analyse min and max in data
  covidCasesMin = min(covidCases);
  covidCasesMax = max(covidCases);
}

// Visualize amount of cases as circles with normalized diameters
function covidDraw() {
  strokeWeight(1);
  for(let i=0; i < covidCases.length; i++){
    const diameter = map(covidCases[i], covidCasesMin, covidCasesMax, 20, 200);
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
