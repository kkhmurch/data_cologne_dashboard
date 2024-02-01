var mapImage;
function raffaellaPreload() {
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
    mapImage = loadImage('https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/6.9982,50.9533,8.83,0/300x200?access_token=pk.eyJ1IjoicmFmZmFlbGxhY2xiIiwiYSI6ImNsczMxdGV2NDBsb20ybHBjeTYyaWJnb2cifQ.vPiHT9ijY50sU465CngW0g')
}

function raffaellaSetup() {
    /*uvRealTime = uvIndexResponseData.result.sun_info.uv;
    print(uvRealTime);*/
    print("API data: ");
    print(JSON.stringify(uvResponseData, undefined, 2));
    image(mapImage, 1200,0);

}

function raffaellaDraw() {
    //print(uvResponseData.hourly.time);
    background(255);
    textSize(10);
    fill(255,100,34);
    //text(uvResponseData.latitude, 1700, 300);


    var time = uvResponseData.hourly.time;

    for(var i = 0; i < time.length; i++){

        fill(255,100,34);
        text(uvResponseData.hourly.time[i], 1200, 50 + i * 20);
    }
    var uvIndex = uvResponseData.hourly.uv_index;

    for(var i = 0; i < uvIndex.length; i++){

        fill(255,100,34);
        text(uvResponseData.hourly.uv_index[i], 1500, 50 + i * 20);
    }




}
