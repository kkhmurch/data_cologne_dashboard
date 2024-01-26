
// Called once when the program starts just before setup().
// Use this to load external data, i.e. make your API calls here.
// See https://p5js.org/reference/#/p5/preload
let data;
function daytimePreload() {
data  = loadTable('https://api.open-meteo.com/v1/dwd-icon?latitude=50.9333&longitude=6.95&daily=sunrise,sunset&timezone=Europe%2FBerlin&past_days=92&forecast_days=1&format=csv', 'csv', 'header');
}

// Called once when the program starts.
// See https://p5js.org/reference/#/p5/setup
function daytimeSetup() {
  createCanvas(1920, 1080);
  console.log(data);
}

// Called over and over to refresh your visualisation.
// See https://p5js.org/reference/#/p5/draw
function daytimeDraw() {
  background(0);

}
