
let rheinData,rheinPegel;

function emmaPreload() {
    //Getting the Data on the water level of the Rhein


    let url = 'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/a6ee8177-107b-47dd-bcfd-30960ccc6e9c.json?includeTimeseries=true&includeCurrentMeasurement=true';
    rheinData = loadJSON(url);
}

function emmaSetup() {


// Extract water level of Rhein from response data.

    rheinPegel = rheinData.timeseries[0].currentMeasurement.value;
    console.log("Water level:", rheinPegel);
}

    function emmaDraw() {

        //My pixel space
        // line(768, 0, 768, 1080);
        // line(768 + 384, 0, 768 + 384, 1080);

        stroke(210,0,0);
        if(rheinPegel) {
            strokeWeight(rheinPegel / 4);
            line(768 + 192, 0, 768 + 192, 1080);
        }
    }

