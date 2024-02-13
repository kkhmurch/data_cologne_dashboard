
let rheinData,rheinPegel;

function emmaPreload() {
    //Getting the Data on the water level of the Rhein
  //  rheinData = loadJSON('');
   /// console.log(rheinData);
    //httpDo('https://www.stadt-koeln.de/interne-dienste/hochwasser/pegel_ws.php')

    let url = 'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/a6ee8177-107b-47dd-bcfd-30960ccc6e9c.json?includeTimeseries=true&includeCurrentMeasurement=true';

    rheinData = loadJSON(url);
}

function emmaSetup() {



// Extract water level of Rhein from response data.
  //  rheinPegel = rheinData.getChild('Pegel');
   // console.log(rheinPegel);


    // Get the content of the 'Pegel' element
  //  let pegelContent = rheinPegel.getContent();
   // console.log(pegelContent);
}

function emmaDraw() {

    //My pixel space
    // line(768, 0, 768, 1080);
    // line(768 + 384, 0, 768 + 384, 1080);
    fill(255);
    circle(50,50,100);
    noFill();






}
