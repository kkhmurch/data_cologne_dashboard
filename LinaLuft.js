let luftData;
let luftColumn;

function luftPreload() {
    luftData = loadTable('https://www.opengeodata.nrw.de/produkte/umwelt_klima/luftqualitaet/luqs/aktuelle_luftqualitaet/OpenKontiLUQS_aktuelle-messwerte-24h.csv', 'ssv', 'header')
    console.log(luftData);
}

// Extract price timee series of luft from response data.
function luftSetup() {
    luftColumn = luftData.rows.map(r => Number(r.obj.Preis))
    console.log("hier, das sind die Luftpreise " + luftColumn);
    print("Comuln Data:" + luftData.getColumn('CHOR PM10F 24H gleitender Mittelwert [µg/m³]'));
}

// Visualize the price of luft as gray-scale stripes with normalised lightness.
function luftDraw() {
    strokeWeight(0);
    for (let i = 0; i < luftColumn.length; i++) {
        const grayscale = map(luftColumn[i], 0, 2000, 0, 255, true);
        fill(grayscale);
        rect(0, map(i, 0, luftColumn.length, 0, height), width, height / luftColumn.length);
    }
}