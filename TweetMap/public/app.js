// TODO
// dropdown starts with All Candidates
// The value of the dropdown should determine what's inside the candidates array
// Bonus

var map;
var tweets = [];
var gMarkers = [];

// function myCallback(data) {
//     // console.log(data);
//     var obj = JSON.parse(data);
//     for(var i=0; i<obj.hits.hits.length; i++){
//         tweets.push([obj.hits.hits[i]._source.location, obj.hits.hits[i]._source.text]);
//     }
//     tweets.forEach(function(tweet) {
//         var position_options = {
//             lat: parseFloat(tweet[0].lat),
//             lng: parseFloat(tweet[0].lon)
//         };
//         var infowindow = new google.maps.InfoWindow({
//             content: tweet[1]
//         });
//         var marker = new google.maps.Marker({
//             position: position_options,
//             map: map
//         });
        // gMarkers.push(marker);
//
//         google.maps.event.addListener(marker, 'click', (function () {
//             infowindow.open(map, marker);
//         }));
//     });
// }

// function httpGetAsync(theUrl, callback)
// {
//     theUrl = "http://search-candidates-cjppiuv3s4xsksv4prai7gcohm.us-west-2.es.amazonaws.com/candidates2/_search?size=200";
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() {
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText);
//     };
//     xmlHttp.open("GET", theUrl, true); // true for asynchronous
//     xmlHttp.send(null);
// }
function mapTweets(data) {
    console.log(data);
    tweets = [];
    obj = data;
    for(var i=0; i<obj.hits.hits.length; i++){
        tweets.push([obj.hits.hits[i]._source.location, obj.hits.hits[i]._source.text]);
    }
    tweets.forEach(function(tweet) {
        var position_options = {
            lat: parseFloat(tweet[0].lat),
            lng: parseFloat(tweet[0].lon)
        };
        var infowindow = new google.maps.InfoWindow({
            content: tweet[1]
        });
        var marker = new google.maps.Marker({
            position: position_options,
            map: map
        });
        gMarkers.push(marker);

        google.maps.event.addListener(marker, 'click', (function () {
            infowindow.open(map, marker);
        }));
    });
}

function initMap() {
    $(function(){
       $(".dropdown-menu li a").click(function(){
         $(".btn:first-child").text($(this).text());
         $(".btn:first-child").val($(this).text());
      });
    });
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38, lng: -97},
        zoom: 5
    });
    var marker = new google.maps.Marker({
        // position: position_options,
        // map: map
    });
    // google.maps.event.addListener(marker, "click", function (event) {
    //     console.log('test');
    //     var latitude = event.latLng.lat();
    //     var longitude = event.latLng.lng();
    //     console.log( latitude + ', ' + longitude );
    // });
    google.maps.event.addListener(map, "click", function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        // populate yor box/field with lat, lng
        console.log("Lat=" + lat + "; Lng=" + lng);
    });
    // fetch all tweets
    var candidate = "All Candidates";
    $.post("http://localhost:3000/getTweets",{candidate: candidate}, function(data){
        mapTweets(data);
    });
    // delete marker function
    google.maps.Map.prototype.clearOverlays = function() {
      for (var i = 0; i < gMarkers.length; i++ ) {
        gMarkers[i].setMap(null);
      }
      gMarkers = [];
    }
}

$(document).ready(function(){
    $(document.body).on('click', '.dropdown li a', function (e) {
        // delete existing markers
        map.clearOverlays();
        var candidate = $(this).text();
        $.post("http://localhost:3000/getTweets",{candidate: candidate}, function(data){
            mapTweets(data);
        });
    });
});
