
// Called once when the program starts just before setup().
// Use this to load external data, i.e. make your API calls here.
// See https://p5js.org/reference/#/p5/preload
function preload() {
  //covidPreload();
  //peanutsPreload();
 // daytimePreload();
 // luftPreload();
  emmaPreload();
  //weatherPreload();
  //raffaellaPreload();
}

// Called once when the program starts.
// See https://p5js.org/reference/#/p5/setup
function setup() {

  createCanvas(1920, 1080);
  //covidSetup();
  //peanutsSetup();
 // daytimeSetup();
 // luftSetup();
  emmaSetup();
  //weatherSetup();
 // raffaellaSetup();
}

// Called over and over to refresh your visualisation.
// See https://p5js.org/reference/#/p5/draw
function draw() {  

  background(0,0,0,10);
  //peanutsDraw();
  //covidDraw();
  daytimeDraw();
  luftDraw();
  emmaDraw();
  weatherDraw();
  raffaellaDraw();
}

//function mouseClicked (){

  //emmaMouseClicked();
//}