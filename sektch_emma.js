
let rheinData,rheinPegel;

function emmaPreload() {
    //Getting the Data on the water level of the Rhein
    rheinData = loadXML('https://www.stadt-koeln.de/interne-dienste/hochwasser/pegel_ws.php');
    console.log(rheinData);
    //httpDo('https://www.stadt-koeln.de/interne-dienste/hochwasser/pegel_ws.php')

}

function emmaSetup() {
// Extract water level of Rhein from response data.
    rheinPegel = rheinData.getChild('Pegel');
    console.log(rheinPegel);
    print(rheinPegel);
}

function emmaDraw() {
}
