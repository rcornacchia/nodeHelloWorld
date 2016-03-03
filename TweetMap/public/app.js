// TODO
// dropdown starts with All Candidates
// The value of the dropdown should determine what's inside the candidates array
// Bonus

var map;
var tweets = [];
var gMarkers = [];

function removeMarkers(gMarkers){
    // for (var i = 0; i < gMarkers.length; i++ ) {
    //     marker = gMarkers[i];
    //
    //     // marker = null;
    //     gMarkers[i].setMap(null);
    //     // gMarkers.splice(i, 1);
    // }
    for (var i = 0; i < gMarkers.length; i++) {
        gMarkers[i].setMap(null);
    }
    gMarkers = [];
}




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

function initMap() {
    // httpGetAsync("test", myCallback);
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

    google.maps.Map.prototype.clearOverlays = function() {
      for (var i = 0; i < gMarkers.length; i++ ) {
        gMarkers[i].setMap(null);
      }
      gMarkers.length = 0;
    }
}

$(document).ready(function(){

    $(document.body).on('click', '.dropdown li a', function (e) {
        console.log($(this).text());
        // delete existing markers
        // removeMarkers(gMarkers);
        map.clearOverlays();
        gMarkers = [];
        var candidate = $(this).text();
        $.post("http://localhost:3000/getTweets",{candidate: candidate}, function(data){
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
        });
    });
});
