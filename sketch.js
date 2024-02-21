let mono_light;
let mono_bold;
let nn;

// Called once when the program starts just before setup().
// Use this to load external data, i.e. make your API calls here.
// See https://p5js.org/reference/#/p5/preload
function preload() {
  //dataPrep();
  //document.daytimePreload();
  //document.luftPreload();
  //document.emmaPreload();
  weatherPreload();
  //document.raffaellaPreload();
  test();
  
  trainedNet = loadJSON("/assets/modelS2_fix.json");

  //mono_light = loadFont("assets/IBM_Plex_Mono/IBMPlexMono-Light.ttf");
  //mono_bold = loadFont("assets/IBM_Plex_Mono/IBMPlexMono-Bold.ttf");
  //mono_light = loadFont("https://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlBFgg.woff2");
}

// Called once when the program starts.
// See https://p5js.org/reference/#/p5/setup
function setup() {

  createCanvas(1920, 1080);
  frameRate(60);
  //textFont(mono_light);
  
  //document.daytimeSetup();
  //document.luftSetup();
  //document.emmaSetup();
  weatherSetup();
  assembleNet();
  //document.raffaellaSetup();
}

// Called over and over to refresh your visualisation.
// See https://p5js.org/reference/#/p5/draw
function draw() {
  colorMode(RGB);
  background(0);

  //peanutsDraw();
  //covidDraw();
  //document.raffaellaDraw();
  //document.daytimeDraw();
  //document.luftDraw();
  noFill();
  colorMode(RGB);
  //document.emmaDraw();
  weatherDraw();
}

//function mouseClicked (){

  //emmaMouseClicked();
//}