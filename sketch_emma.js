
let rheinData,rheinPegel,font;
let r = 4;


function emmaPreload() {
    //Getting the Data on the water level of the Rhein


    let url = 'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/a6ee8177-107b-47dd-bcfd-30960ccc6e9c.json?includeTimeseries=true&includeCurrentMeasurement=true';
    rheinData = loadJSON(url);

    font = loadFont('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');
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

        stroke(20,100,140);
        if(rheinPegel) {
            push();
            translate(300, 200);
            let total = floor(height / (r * 2));
            noFill();
            strokeWeight(rheinPegel -400);

            beginShape();
            for (let i = 0; i < total + 1; i++) {
                let angle = map(i, 100, total, 0, TWO_PI);
                let x = map(sin(angle), -1, 1, 600, 660);
                let y = map(i, 0, total + 1, -300, 1080);
                vertex(x, y);
            }
            endShape();

            pop();

            fill(255);
            textFont(font);
            textSize(100);
            noStroke();
            text(rheinPegel + ' hello world', 1500, 1000);

        }
    }

