
function raffaellaPreload() {
    var myHeaders = new Headers();
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




}

function raffaellaSetup() {

}

function raffaellaDraw() {
}
