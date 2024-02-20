var mapImage;
let uvResponseData;

document.raffaellaPreload = function() {
    /*var myHeaders = new Headers();
    myHeaders.append("x-access-token", "openuv-1amtywrlrxt94pm-io");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://api.openuv.io/api/v1/uv?lat=50.93&lng=6.97&alt=100&dt=", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    uvIndexResponseData = loadJson("https://api.openuv.io/api/v1/uv?lat=:lat&lng=:lng&alt=:alt&dt=:dt");*/
    uvResponseData = loadJSON("https://api.open-meteo.com/v1/forecast?latitude=50.9333&longitude=6.95&hourly=uv_index,uv_index_clear_sky&daily=uv_index_max,uv_index_clear_sky_max&timezone=Europe%2FBerlin&forecast_days=1")
    //mapImage = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/6.9664,50.9392,11.54,0/768x540?access_token=pk.eyJ1IjoicmFmZmFlbGxhY2xiIiwiYSI6ImNsczMxdGV2NDBsb20ybHBjeTYyaWJnb2cifQ.vPiHT9ijY50sU465CngW0g')
}

document.raffaellaSetup = function() {
    /*uvRealTime = uvIndexResponseData.result.sun_info.uv;
    print(uvRealTime);*/
    //print("API data: ");
    //print(JSON.stringify(uvResponseData, undefined, 2));
}

var y1 = 270;
var speed = 1.0; // speed
var direct = 1; //direction of movement

document.raffaellaDraw = function() {

    background(0);
    strokeWeight(10);

    stroke(0,0,0, 30)

    var currentHour = new Date().getHours();
    //console.log(currentHour);
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    //console.log(timestamp);

    var time = uvResponseData.hourly.time;
    let dimensionX = 400 / time.length + 5;
    var uvIndex = uvResponseData.hourly.uv_index_clear_sky;


    for(var i = 0; i < time.length; i++){


        if (uvIndex[i] == 0){
             fill(70,168,164);
        }
        else if(uvIndex[i] < 0.3){
            fill(69,168,141);
        }
        else if(uvIndex[i] < 0.7){
            fill(69,168,122);
        }
        else if(uvIndex[i] < 1){
            fill(73,189,107);
        }
        else if(uvIndex[i] < 1.3){
            fill(80,207,85);
        }
        else if(uvIndex[i] < 1.7){
            fill(119,219,83);
        }
        else if(uvIndex[i] < 2){
            fill(183,219,83);
        }
        else if(uvIndex[i] < 2.5){
            fill(212,219,81);
        }
        else{
            fill(219,184,77);
        }
        stroke(0);

        var timeString = time[i]
        const date = new Date(timeString);
        const hour = date.getHours();

        let x = 1240 + i * dimensionX ;
        let y = 270;


        if(currentHour == i){

            y1 += speed * direct ;// velocity // y = y plus speed   *  direction
            if ((y1 > 285)  || ( y1 < 255)) {
                direct = - direct;  //change direction
            }

            circle(x + 10, y1,  dimensionX + 55, 500);
            textSize(13);
            textFont(mono_bold);
            text(hour, x - 10, y1 + 100);
        }
        else {
            circle(x + 10, y,  dimensionX + 55, 500);
            textSize(13);
            textFont(mono_bold);
            text(hour, x - 10, y + 100);
        }


        //circle(x + 10, y,  dimensionX + 55, 500);
        //textSize(13);
        //textFont(mono_bold);
        //text(hour, x - 10, y + 100);


    }
    textSize(15);
    textFont(mono_bold);
    fill(70,168,164);
    text(currentDate, 1190, 150)
    textSize(30);
    textFont(mono_bold);
    fill(70,168,164);
    text("UV-Index / Köln", 1350, 90);
    textSize(12);

    stroke(0);
    noFill();
    ellipse(15364, 270, 150);

    //image(mapImage, 1152,0);
}




