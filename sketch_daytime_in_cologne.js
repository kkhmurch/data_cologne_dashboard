
let data;
let dayTime;
let innerRadius = 150;
let outerRadius = 400;
let linesToDraw = 0;
let circleDisplayTime = 10000; // Time to display each circle except the last one (in milliseconds)
let lastCircleDisplayTime = 50000; // Time to display the last circle (in milliseconds)

let currentCircleIndex = 0;
let lastCircleDisplayed = false;
let lastCircleDisplayStartTime = 0;

function daytimePreload() {
  data  = loadTable('https://api.open-meteo.com/v1/dwd-icon?latitude=50.9333&longitude=6.95&daily=sunrise,sunset&timezone=Europe%2FBerlin&past_days=92&forecast_days=1&format=csv', 'csv', 'header');
}

function daytimeSetup() {

  calculatedTimeDifferences();

}
function daytimeDraw() {
  translate(1536, 810);
  stroke(255);
  noFill();
  ellipse(0,0,outerRadius);
  ellipse(0,0,innerRadius);
  fill(255);


  let currentTime = millis();

  //for(let j=0; j< min(linesToDraw, dayTime.length); j++) {
  if (currentCircleIndex < dayTime.length) {
    let r = map(dayTime[currentCircleIndex][0], 475, 1020, innerRadius/2, outerRadius/2);
    //let r = map(dayTime[j], 475, 1020, innerRadius/2, outerRadius/2);
    beginShape();
    noFill();
    colorMode(HSB);
    let h = map(r, innerRadius/2, outerRadius/2, 53,16);
    let s =90;
    let b =96;
    stroke(h,s,b, 5);
    for (let i = 0; i < 12; i++) {
      let angle = map(i, 0, 12, 0, TWO_PI);
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);

    let textX = 0; // Define the x-coordinate for the text
    let textY = r + 20; // Define the y-coordinate for the text
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(255);
    text(dayTime[currentCircleIndex][1], textX, textY);


    if (currentCircleIndex === dayTime.length - 1 && !lastCircleDisplayed) {
      // If this is the last circle and it hasn't been displayed yet, mark the start time
      lastCircleDisplayStartTime = currentTime;
    }

    if (currentCircleIndex === dayTime.length - 1 &&
        (currentTime - lastCircleDisplayStartTime >= lastCircleDisplayTime ||
            currentTime - lastCircleDisplayStartTime < circleDisplayTime)) {
      // Last circle displayed for the required time or index reached end of array
      lastCircleDisplayed = true;
      currentCircleIndex = 0; // Reset to display from the beginning
    } else if (currentTime - lastCircleDisplayStartTime >= circleDisplayTime) {
      // Move to the next circle
      currentCircleIndex++;

    }
  }else {
    // Reset the index to loop through the array again
    currentCircleIndex = 0;
    lastCircleDisplayed = false;
  }
  translate(-1536, -810);
}
function calculatedTimeDifferences(){
  let sunriseTime = [];
  for (let i = 2; i < data.getRowCount(); i++) {
    // Get the value from the second column (index 1)
    let value = data.getString(i, 1);
    let time = new Date(value);
    let minutes = time.getHours()*60 + time.getMinutes();
    sunriseTime.push(minutes);
  }
  //console.log(sunriseTime);

  let sunsetTime = [];
  for(let i =2; i< data.getRowCount(); i++){
    let unformattedValue = data.getString(i,2);
    let time = new Date(unformattedValue);
    let minutes = time.getHours()*60 + time.getMinutes();
    sunsetTime.push(minutes);
  }
  //console.log(sunsetTime);

  let dayArray =[];
  for (let i =2; i< data.getRowCount(); i++){
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

  dayTime = [];
  for(let i=0; i< sunsetTime.length; i++){
    let a = sunsetTime[i]- sunriseTime[i];
    let b = dayArray[i];
    let pair = [a,b];
    dayTime.push(pair);
  }
  console.log(dayTime);
}