let mono_light;
let mono_bold;

// Called once when the program starts just before setup().
// Use this to load external data, i.e. make your API calls here.
// See https://p5js.org/reference/#/p5/preload
function preload() {
  //dataPrep();
  //covidPreload();
  //peanutsPreload();
  document.daytimePreload();
  //luftPreload();
  //emmaPreload();
  //weatherPreload();
  //raffaellaPreload();
  //test();

  mono_light = loadFont("assets/IBM_Plex_Mono/IBMPlexMono-Light.ttf");
  mono_bold = loadFont("assets/IBM_Plex_Mono/IBMPlexMono-Bold.ttf");
}

// Called once when the program starts.
// See https://p5js.org/reference/#/p5/setup
function setup() {

  createCanvas(1920, 1080);

  //covidSetup();
  //peanutsSetup();
  document.daytimeSetup();
 // luftSetup();
  //emmaSetup();
  //weatherSetup();
 // raffaellaSetup();
}

// Called over and over to refresh your visualisation.
// See https://p5js.org/reference/#/p5/draw
function draw() {
  textFont (mono_bold);
  background(0);

  //peanutsDraw();
  //covidDraw();
  document.daytimeDraw();
  //luftDraw();
  //emmaDraw();
  //weatherDraw();
  //raffaellaDraw();
}

//function mouseClicked (){

  //emmaMouseClicked();
//}