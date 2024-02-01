
let data;
let dayTime;
let innerRadius = 150;
let outerRadius = 400;
function daytimePreload() {
data  = loadTable('https://api.open-meteo.com/v1/dwd-icon?latitude=50.9333&longitude=6.95&daily=sunrise,sunset&timezone=Europe%2FBerlin&past_days=92&forecast_days=1&format=csv', 'csv', 'header');
}

function daytimeSetup() {
  // console.log(data);
  // console.log(data.getRowCount());
  // console.log(data.getColumnCount());
  calculatedTimeDifferences();
  frameRate(1);

}
function daytimeDraw() {


  translate(1536, 810);
  stroke(255);
  noFill();
  ellipse(0,0,outerRadius);
  ellipse(0,0,innerRadius);
  fill(255);

  for(let j=0; j<dayTime.length; j++) {

    let r = map(dayTime[j], 475, 1020, 75, 200);
    for (let i = 0; i < 12; i++) {
      let angle = map(i, 0, 12, 0, TWO_PI);
      let x = r * cos(angle);
      let y = r * sin(angle);
      circle(x, y, 6);
    }
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

   dayTime = [];
  for(let i=0; i< sunsetTime.length; i++){
    let value = sunsetTime[i]- sunriseTime[i];
    dayTime.push(value);
  }
  console.log(dayTime);
  }



