
let data;
function daytimePreload() {
data  = loadTable('https://api.open-meteo.com/v1/dwd-icon?latitude=50.9333&longitude=6.95&daily=sunrise,sunset&timezone=Europe%2FBerlin&past_days=92&forecast_days=1&format=csv', 'csv', 'header');
}

function daytimeSetup() {
  // console.log(data);
  // console.log(data.getRowCount());
  // console.log(data.getColumnCount());
  calculatedTimeDifferences();
}
function daytimeDraw() {
  translate(1536, 810);
  stroke(255);
  noFill();
  ellipse(0,0,400);
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

  let dayTime = [];
  for(let i=0; i< sunsetTime.length; i++){
    let value = sunsetTime[i]- sunriseTime[i];
    dayTime.push(value);
  }
  console.log(dayTime);
  }



