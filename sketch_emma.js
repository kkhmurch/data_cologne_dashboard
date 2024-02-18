
let rheinData,rheinPegel,font;
let r = 4;


document.emmaPreload = function () {
    //Getting the Data on the water level of the Rhein


    let url = 'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/a6ee8177-107b-47dd-bcfd-30960ccc6e9c.json?includeTimeseries=true&includeCurrentMeasurement=true';
    rheinData = loadJSON(url);

   // font = loadFont('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');
}

document.emmaSetup = function () {


//laalaalala
// Extract water level of Rhein from response data.

    rheinPegel = rheinData.timeseries[0].currentMeasurement.value;
    console.log("Water level:", rheinPegel);


}

    function emmaDraw() {

        //My pixel space
        // line(768, 0, 768, 1080);
        // line(768 + 384, 0, 768 + 384, 1080);

        stroke(20, 100, 140);
        if (rheinPegel) {
            push();
            translate(300, 200);
            let total = floor(height / (r * 2));
            noFill();
            strokeWeight(rheinPegel - 300);

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
            textFont('Courier New', 15);
            noStroke();
            text("the Rheins water level is currently " + rheinPegel + 'cm', 960, 1050);

        }
    }

      /*  function emmaMouseClicked() {
            // Adjusting mouse coordinates to match translated and scaled sine wave
            let xMouse = mouseX - 300; // Adjust for translation
            let yMouse = mouseY - 200; // Adjust for translation

            // Calculate boundaries based on rheinPegel
            let topBoundary = -rheinPegel;
            let bottomBoundary = rheinPegel;

            if (rheinPegel) {
                // Check if mouse coordinates are within the boundaries of the translated and scaled sine wave
                if (xMouse > 600 && xMouse < 660 && yMouse > topBoundary && yMouse < bottomBoundary) {
                    console.log("Mouse clicked within the sine wave.");
                }
            }
        }

*/
