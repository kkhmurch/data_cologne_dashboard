let luftData;
let luftColumn;
let xoff=0;
let yoff =100;

let breite = 768;
let höhe= 540;
let x;
let y;
let targetmoveA=0;
let targetmoveB=0;
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
    print(breite/(luftColumn.length-4));
    print(luftColumn.length-4);


        luftColumn.forEach(function (luftColumn) {
            print(Number(luftColumn));
    });


}


function luftDraw() {
   print(frameRate(80));
   /* strokeWeight(0);
    let x = 540;
    xrandomA= x+random(-50,50);
    xrandomB=x+random(-50,50);
    luftColumn.forEach(
        function (luftColumn) {
        fill(50,0,0,80);
       // x= learp(x, x, 0.2)
        ellipse (breite,xrandomA,luftColumn);
        xrandomA += 30;
    }
    );*/

//point a and point b:
    // a = current place
    //b = future place
    //bestehen beide aus x und y wert/ oder erstmal nur x?
    //wie verändert sich x? ah wir können ne random lerp funktion machen :)





    yoff+=0.03;
    xoff+=0.03;
    print("das ist xoff:" ,xoff);
     x = breite/(luftColumn.length-4)+(540);
     x = noise(xoff)*(höhe/4);
    print("ist hier x definiert?",x);//Ja
    print("was ist hier targetmoveA?",targetmoveA);
     x = lerp(x,targetmoveA,0.5);
     y = map(noise(yoff),0,1, 0, 768);
     y = lerp(y,targetmoveB,0.5);
    print("ist hier y definiert?",y);//Ja
    print("was ist hier targetmoveB?",targetmoveB);
    luftColumn.forEach(function (luftColumn) {
            print("das ist noise:" , x);
            fill(50,0,0,80);
            ellipse(y,x,luftColumn);
            x=x+30;
        });
    targetmoveA= x;
    targetmoveB = y;
    print("das ist targetmoveA:", targetmoveA)


//das heißt wir müssen den alten no oder y wert speichern und das in die lerp function packen
    //coding gedanken aufschreiben ist mega hilfreich, das will ich öfter machen

       /* const grayscale = map(luftColumn[i], 0, 42, 0, 255, true);
        fill(grayscale);
        rect(0, map(i, 0, (luftColumn.length-4), 540, 1080), 768, 540 / (luftColumn.length-4));
    }*/

    //colorMode(RGB, 100);
    //rect(0,0 ,300,600);
    //fill(80,10,10);
}