let luftData;
let luftColumn;

let breite = 768;
let höhe= 540;

function luftPreload() {
    luftData = loadTable('https://www.opengeodata.nrw.de/produkte/umwelt_klima/luftqualitaet/luqs/aktuelle_luftqualitaet/OpenKontiLUQS_aktuelle-messwerte-24h.csv', 'ssv', 'header')
    console.log(luftData);
}

// Extract price time series of luft from response data.
function luftSetup() {
    luftColumn = luftData.getColumn(40);
    console.log("hier, das sind die Luftpreise " + luftColumn);
    print("Column Data:", luftData.getColumn(40));
    print("Colum numbers:", Number[(luftColumn)]);
    print("Colum numbers:", parseInt(luftColumn));
    luftColumn.forEach(function (luftColumn) {
        print(luftColumn);
    });


}

// Visualize the price of luft as gray-scale stripes with normalised lightness.
function luftDraw() {
    strokeWeight(0);
    for (let i = 4; i < (luftColumn.length); i++) {
        let x = breite/(luftColumn.length-4);
        ellipse(x,10,luftColumn)

        const grayscale = map(luftColumn[i], 0, 42, 0, 255, true);
        fill(grayscale);
        rect(0, map(i, 0, (luftColumn.length-4), 540, 1080), 768, 540 / (luftColumn.length-4));
    }

    //colorMode(RGB, 100);
    //rect(0,0 ,300,600);
    //fill(80,10,10);
}