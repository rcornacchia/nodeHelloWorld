// initialize elastic search connection
// var elasticsearch = require('elasticsearch');
// var client = new elasticsearch.Client({
//     host: 'search-candidates-cjppiuv3s4xsksv4prai7gcohm.us-west-2.es.amazonaws.com',
//     log: 'trace'
// });
var map;
var tweets = [];

// var client = new elasticsearch.Client({
//     hosts: 'search-candidates-cjppiuv3s4xsksv4prai7gcohm.us-west-2.es.amazonaws.com'
// });

function myCallback(data) {
    // console.log(data);
    var obj = JSON.parse(data);
    for(var i=0; i<obj.hits.hits.length; i++){
        tweets.push([obj.hits.hits[i]._source.location, obj.hits.hits[i]._source.text]);
    }
    // console.log(tweets);

    console.log("test");
    tweets.forEach(function(tweet) {
        console.log(tweet);

        var position_options = {
            lat: parseFloat(tweet[0][0]),
            lng: parseFloat(tweet[0][1])
        };

        var infowindow = new google.maps.InfoWindow({
            content: tweet[1]
        });

        var marker = new google.maps.Marker({
            // color marker according to candidates party
            position: position_options,
            map: map
        });
        google.maps.event.addListener(marker, 'click', (function () {
            infowindow.open(map, marker);
        }));
    });

}

function httpGetAsync(theUrl, callback)
{
    theUrl = "http://search-candidates-cjppiuv3s4xsksv4prai7gcohm.us-west-2.es.amazonaws.com/index/_search?pretty=true";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function initMap() {

    httpGetAsync("test", myCallback);
    // requirejs.config({
    //     //By default load any module IDs from js/lib
    //     baseUrl: 'js/lib',
    //     //except, if the module ID starts with "app",
    //     //load it from the js/app directory. paths
    //     //config is relative to the baseUrl, and
    //     //never includes a ".js" extension since
    //     //the paths config could be for a directory.
    //     paths: {
    //         app: '../app'
    //     }
    // });
    // requirejs(['jquery', 'canvas', 'app/sub'],
    // function   ($,        canvas,   sub) {
    //     //jQuery, canvas and the app/sub module are all
    //     //loaded and can be used here now.
    //     var client = new $.es.Client({
    //         hosts: 'localhost:9200'
    //     });
    // });



    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38, lng: -97},
        zoom: 5
    });

    // // fetch all tweets from elastic search
    // client.search({
    //     index: 'twitter',
    //     type: 'tweets',
    //     body: {
    //         query: {
    //             match: {
    //                 body: 'elasticsearch'
    //             }
    //         }
    //     }
    // }).then(function (resp) {
    //     var candidates = resp.hits.hits;
    //     console.log(candidates);
    // }, function (err) {
    //     console.trace(err.message);
    // });

    // dropdown starts with All Candidates
    // The value of the dropdown determines what's inside the candidates array


}
