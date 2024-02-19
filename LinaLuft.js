let luftData;
let luftColumnA;
let luftColumnB;
let luftColumnC;
let luftColumnD;

let xoff=0;
let yoff =100;

let a = 100;
let b = 100;
let c= 600;
let d= 600;
let breite = 768;
let höhe= 540;
//let x;
//let y;
let targetmoveA=0;
let targetmoveB=0;

let partsA = [];
let partsB = [];
let partsC=[];
let partsD=[];

document.luftPreload = function() {
    luftData = loadTable('https://www.opengeodata.nrw.de/produkte/umwelt_klima/luftqualitaet/luqs/aktuelle_luftqualitaet/OpenKontiLUQS_aktuelle-messwerte-24h.csv', 'ssv', 'header')
    console.log(luftData);
}

// Extract price time series of luft from response data.
document.luftSetup = function() {
    luftColumnA = luftData.getColumn(40);
    luftColumnB = luftData.getColumn(41);
    luftColumnC = luftData.getColumn(42);
    luftColumnD = luftData.getColumn(44);
    //console.log("hier, das sind die Luftpreise " + luftColumnA);
    //print("Column Data:", luftData.getColumn(40));
    //print("Colum numbers:", Number[(luftColumnA)]);
    //print(breite/(luftColumnA.length-4));
    //print(luftColumnA.length-4);


        luftColumnA.forEach(function (luftColumn) {
            print(Number(luftColumn))});

    for (let i=3; i<luftColumnA.length; i++){
        let volumenA = map(luftColumnA[i], luftColumnA[3], luftColumnA[24], 0,100);
        partsA.push(new Luftparts(a,b, volumenA, (random(0,50)), (random(100,150))));
        b+=30;
        //print("das ist A",luftColumnA[i]);
    }
    for (let i=3; i<luftColumnB.length; i++){
        let volumenB = map(luftColumnB[i], luftColumnB[3], luftColumnB[24], 0,10);
        //print("das ist volumenb",volumenB);
        partsB.push(new Luftparts(c,d,volumenB, (random(50,100)), (random(150,200))));
        d+=30;
        //print("das ist B",luftColumnB[i]);
    }
    for (let i=3; i<luftColumnC.length; i++){
        let volumenC = map(luftColumnC[i], luftColumnC[3], luftColumnC[24], 0,30);
        partsC.push(new Luftparts(a,b,volumenC, (random(0,50)), (random(100,150))));
        b+=30;
        //print("das ist c",luftColumnC[i]);
    }
    for (let i=3; i<luftColumnD.length; i++){
        let volumenD = map(luftColumnD[i], luftColumnD[3], luftColumnD[24], 0,100);
        //print("das ist volumen d",volumenD);
        partsD.push(new Luftparts(c,d,volumenD, (random(50,100)), (random(150,200))));
        d+=30;
        //print("das ist d",luftColumnD[i]);
    }




}


document.luftDraw = function() {
    push();
    colorMode(HSB);
    noStroke();



for(let i=0;i<partsA.length; i++) {
   fill(199, 26, 86,(map(i, 0, partsA.length, 0, 100)));
   partsA[i].zeichneParts();
}

for(let i=0;i<partsB.length; i++) {
    fill(252,21,86,(map(i,3, partsB.length, 0,100)));
    partsB[i].zeichneParts();
}

for(let i=0;i<partsC.length; i++) {
    fill(342,31,86,(map(i,3, partsC.length, 0,100)));
    partsC[i].zeichneParts();
}

for(let i=0;i<partsD.length; i++) {
    fill(54,36,86,(map(i,3, partsD.length, 0,100)));
    partsD[i].zeichneParts();
}

fill(0, 50, 86);
noStroke();
//textFont('Courier New');
textSize(16);
text("Luftqualität in Köln", 50,600);
fill(0, 50, 86);
text("gemessen in den letzten 30 Minuten:", 50,630);
fill(199, 26, 86);
text ("Stickstoffmonoxid (NO): " + luftColumnA  [3]+ " µg/m³", 50, 660);
fill(252,21,86);
text ("Stickstoffdioxid (NO2): " + luftColumnB [3]+ " µg/m³", 50, 690);
fill(342,31,86);
text ("Ozon(O3): "+ luftColumnB[3]+ " µg/m³", 50, 720);
fill(0,50,86);
text("gemessen in den letzten 24 Stunden:", 50,750);
fill(54,36,86);
text ("Schwebstaub (PM10F): "+ luftColumnD[3]+ " µg/m³", 50, 780);

//text("Ozon:"+ LuftColumn)

    /*luftColumnA.forEach(function(luftColumnA){print("dasist luftc.",luftColumnA)});

    fill(50,0,0,80);
    //x=x+30;
    yoff+=0.01;
    xoff+=0.01;
    y = map(noise(yoff),0,1, 0, 768);
    x= map(noise(xoff),0,1, 0, 540);

    for (i=3; i<9; i++) {
        if ( isNaN(luftColumnA[i])) {
            luftColumnA[i] = 5;
        }
        ellipse(y,x,luftColumnA[i]);
        x=lerp(x,targetmoveA,0.7);
        y=lerp(y,targetmoveB,0.7);

    }
    targetmoveA= x;
    targetmoveB = y;
*/

    pop();
}

class Luftparts {

    constructor(x,y,volume, xOff, yOff) {
        this.x = x;
        this.y = y;
        this.volume= volume;
       // this.noisSpeedx= noisSpeedx;
      //  this.noisSpeedy= noisSpeedy;
        this.xOff = xOff;
        this.yOff = yOff;
    }

zeichneParts (){
    ellipse (this.x, this.y, this.volume)
        if (isNaN(this.volume)) {
            this.volume = 5;
        }
    this.x= 284 + map(noise(this.xOff),0,1, 0, 540);
    this.y = 410 + map(noise(this.yOff),0,1, 0, 768);
    this.xOff+=0.003;
    this.yOff+=0.003;
    }



}