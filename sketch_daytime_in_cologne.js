
let data;
let dayTime =[];
let innerRadius = 150;
let outerRadius = 1000;
let currentCircleIndex = 48;
let previousCircle = [];
let r;
let radius;
let x;
let y;
let radiusOfTheOuterCircle;

class Circle{
  constructor(x,y,r) {
    this.x =x;
    this.y=y;
    this.r=r;
  }
  draw(){
    circle(this.x, this.y, this.r);
  }
}


function daytimePreload() {
  data  = loadTable('https://api.open-meteo.com/v1/dwd-icon?latitude=50.9333&longitude=6.95&daily=sunrise,sunset&timezone=Europe%2FBerlin&past_days=92&forecast_days=1&format=csv', 'csv', 'header');
}

function daytimeSetup() {
  frameRate(2);
  calculatedTimeDifferences();

}
function daytimeDraw() {
  translate(1536, 810);
  stroke(255);
  noFill();
  ellipse(0, 0, outerRadius);
  ellipse(0, 0, innerRadius);
  fill(255);


  for (let i = 0; i < dayTime.length; i++) {
    r = map(dayTime[i][0], 475, 1020, innerRadius/2,outerRadius/2);
    noFill();
    colorMode(HSB);
    let h = map(r, innerRadius / 2, outerRadius / 2, 46, -170);
    let s = 74;
    let b = 86;
    strokeWeight(1);
    stroke(h, s, b, 5);
    radius = 2*r;
    x =0;
    y=0;
    radiusOfTheOuterCircle = map(dayTime[dayTime.length-1][0],475, 1020, 75,500);
    let newCircle = new Circle(x,y,radius);
    newCircle.draw();
    //previousCircle.push(newCircle);
    i++;
    //console.log(previousCircle);

  }
  textFont('Courier New');
  textSize(15);
  let textInnerRadX = x; // Define the x-coordinate for the text
  let textInnerRadY = radiusOfTheOuterCircle; // Define the y-coordinate for the text
  textAlign(CENTER, CENTER);
  noStroke();
  fill(255);


  text("duration of the sunlight today is : "+dayTime[dayTime.length-1][0] + "min", textInnerRadX, - textInnerRadY -20);
  text ("days till the longest day in the year", textInnerRadX, -outerRadius/2 - 20);
   //while(true) {
    if (currentCircleIndex < dayTime.length - 4) {
      r1 = map(dayTime[currentCircleIndex][0], 475, 1020, 75, 500);
      noFill();
      colorMode(HSB);
      let h1 = 255;
      let s1 = 0;
      let b1 = 255;
      strokeWeight(5);
      stroke(h1, s1, b1);
      let newCircle = new Circle(0, 0, 2 * r1);
      newCircle.draw();
      currentCircleIndex = currentCircleIndex + 1;

      let textX = 0; // Define the x-coordinate for the text
      let textY = 0; // Define the y-coordinate for the text
      textAlign(CENTER, CENTER);
      textSize(20);
      noStroke();
      fill(255);
      text( dayTime[currentCircleIndex - 1][1], 0, -10);
      text( dayTime[currentCircleIndex - 1][0] + "min", 0, 10);

      if(currentCircleIndex==93 || currentCircleIndex ==92 || currentCircleIndex ==91 || currentCircleIndex ==90 || currentCircleIndex == 89){
        currentCircleIndex=48;
      }
     }
  //}
  translate(-1536, -810);
}

function calculatedTimeDifferences() {
  let sunriseTime = [];
  for (let i = 2; i < data.getRowCount(); i++) {
    // Get the value from the second column (index 1)
    let value = data.getString(i, 1);
    let time = new Date(value);
    let minutes = time.getHours() * 60 + time.getMinutes();
    sunriseTime.push(minutes);
  }
  //console.log(sunriseTime);

  let sunsetTime = [];
  for (let i = 2; i < data.getRowCount(); i++) {
    let unformattedValue = data.getString(i, 2);
    let time = new Date(unformattedValue);
    let minutes = time.getHours() * 60 + time.getMinutes();
    sunsetTime.push(minutes);
  }
  //console.log(sunsetTime);

  let dayArray = [];
  for (let i = 2; i < data.getRowCount(); i++) {
    let unformattedDate = data.getString(i, 2);
    let date = new Date(unformattedDate); // Parse the date string

    // Extract day and month information
    let day = date.getDate();
    let monthIndex = date.getMonth();

    // Define an array of month names
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Format the date string as "day. Month"
    let formattedDate = day + ". " + monthNames[monthIndex];

    dayArray.push(formattedDate);

  }


  for (let i = 0; i < sunsetTime.length; i++) {
    let a = sunsetTime[i] - sunriseTime[i];
    let b = dayArray[i];
    let pair = [a, b];
    dayTime.push(pair);
  }
  console.log(dayTime);
}

