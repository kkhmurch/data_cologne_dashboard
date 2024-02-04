let luftData;
let luftColumn;
let xoff=0;
let yoff =100;

let a = 100;
let b = 100;
let c= 600;
let d= 600;
let breite = 768;
let höhe= 540;
let x;
let y;
let targetmoveA=0;
let targetmoveB=0;

let partsA = [];
let partsB = [];
let partsC=[];
let partsD=[];

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
            print(Number(luftColumn))});

    for (let i=0; i<25; i++){
        partsA.push(new Luftparts(a,b,20, (random(0,50)), (random(100,150))));
        b+=30;
    }
    for (let i=0; i<25; i++){
        partsB.push(new Luftparts(c,d,20, (random(50,100)), (random(150,200))));
        d+=30;
    }
    for (let i=0; i<25; i++){
        partsC.push(new Luftparts(a,b,20, (random(0,50)), (random(100,150))));
        b+=30;
    }
    for (let i=0; i<25; i++){
        partsD.push(new Luftparts(c,d,20, (random(50,100)), (random(150,200))));
        d+=30;
    }




}


function luftDraw() {
    frameRate(60);
    colorMode(HSB);
    noStroke();

fill(199,26,86,80);
   for(let i=0;i<partsA.length; i++) {
       partsA[i].zeichneParts();
   }
fill(252,21,86,80);
    for(let i=0;i<partsB.length; i++) {
        partsB[i].zeichneParts();
    }

fill(342,31,86,30);
for(let i=0;i<partsC.length; i++) {
    partsC[i].zeichneParts();
}
fill(54,36,86,80);
for(let i=0;i<partsD.length; i++) {
    partsD[i].zeichneParts();
}


    /*luftColumn.forEach(function(luftColumn){print("dasist luftc.",luftColumn)});

    fill(50,0,0,80);
    //x=x+30;
    yoff+=0.01;
    xoff+=0.01;
    y = map(noise(yoff),0,1, 0, 768);
    x= map(noise(xoff),0,1, 0, 540);

    for (i=3; i<9; i++) {
        if ( isNaN(luftColumn[i])) {
            luftColumn[i] = 5;
        }
        ellipse(y,x,luftColumn[i]);
        x=lerp(x,targetmoveA,0.7);
        y=lerp(y,targetmoveB,0.7);

    }
    targetmoveA= x;
    targetmoveB = y;
*/


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
    this.x= map(noise(this.xOff),0,1, 0, 540);
    this.y = map(noise(this.yOff),0,1, 0, 768);
    this.xOff+=0.001;
    this.yOff+=0.001;

    }

connectTableColumns(){


}

}