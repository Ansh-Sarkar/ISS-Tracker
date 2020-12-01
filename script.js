let latitudeText = document.querySelector('.latitude');
let longitudeText = document.querySelector('.longitude');
let timeText = document.querySelector('.time');
let speedText = document.querySelector('.speed');
let altitudeText = document.querySelector('.altitude');
let visibilityText = document.querySelector('.visibility');
/*default <lat,long> set for London*/
let lat = 51.505;
let long = -0.09;
let zoomLevel = 3;
/* png marker setup
const icon = L.icon({
  iconUrl: './img/iss.png',
  iconSize: [90, 45],
  iconAnchor: [25, 94],
  popupAnchor: [20, -86]
});
*/
// drawing map interface on #map-div
const map = L.map('map-div').setView([lat, long], zoomLevel);
/*Mapbox API accessToken --> https://account.mapbox.com/access-tokens/*/
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWsyOCIsImEiOiJjazl6YTJrZ2gwN2Z6M21wYWhqbHV1dXFhIn0.2s7LanKmroqsWPY2q2pQfQ'
}).addTo(map);
const marker = L.circleMarker([lat, long]).addTo(map);
function findISS() {
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
        .then(response => response.json())
        .then(data => {
            lat = data.latitude.toFixed(2);
            long = data.longitude.toFixed(2);
            // convert seconds to milliseconds, then to UTC format
            const timestamp = new Date(data.timestamp * 1000).toUTCString();
            const speed = data.velocity.toFixed(2);
            const altitude = data.altitude.toFixed(2);
            const visibility = data.visibility;
            // update properties
            updateISS(lat, long, timestamp, speed, altitude, visibility);
        })
        .catch(e => console.log(e));
}
function updateISS(lat, long, timestamp, speed, altitude, visibility) {
    marker.setLatLng([lat, long]);
    map.setView([lat, long]);
    // updates other element's value
    latitudeText.innerText = lat;
    longitudeText.innerText = long;
    timeText.innerText = timestamp;
    speedText.innerText = `${speed} km/hr`;
    altitudeText.innerText = `${altitude} km`;
    visibilityText.innerText = visibility;
}
var toog_flag = 0;
function toogle() {
    var toog = document.getElementById("toogl");
    if (toog_flag == 0) {
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/satellite-v9',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYWsyOCIsImEiOiJjazl6YTJrZ2gwN2Z6M21wYWhqbHV1dXFhIn0.2s7LanKmroqsWPY2q2pQfQ'
        }).addTo(map);
        toog_flag = 1;
        toog.innerHTML="Go To Street View";
    }
    else {
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYWsyOCIsImEiOiJjazl6YTJrZ2gwN2Z6M21wYWhqbHV1dXFhIn0.2s7LanKmroqsWPY2q2pQfQ'
        }).addTo(map);
        toog_flag = 0;
        toog.innerHTML="Go To Satellite View"
    }
}
findISS();
// call findISS() for every 2 seconds
setInterval(findISS, 2000);