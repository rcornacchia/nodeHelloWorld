// Setup web server and socket
var app = require('express').createServer(),
    twitter = require('ntwitter'),
    elasticSearch = require('elasticSearch');


app.listen(3000);
// Setup twitter stream api
var twit = new twitter({
    consumer_key: 'cu607zV20zgS5deVCjJphwFfc',
    consumer_secret: 'niSiKTDe5b30XMshQMmwmLz2SqVfDsksxNIyyVjySALU6YfkYv',
    access_token_key: '2475805220-VabahyH70uVb5ypd3oI48iLYw1oQSlPIzwB0Yi0',
    access_token_secret: '3bSwrTiH5ukl3L3lXMfY1zFjB1x6GOUR9DIeLW0zb8vPQ'
}),
stream = null;

var client = new elasticSearch.Client({
    host: 'search-candidates-cjppiuv3s4xsksv4prai7gcohm.us-west-2.es.amazonaws.com',
    log: 'trace'
});

//Create web sockets connection.
twit.stream('statuses/filter', { track: ['Trump', 'Clinton', 'Sanders', 'Ted Cruz', 'Marco Rubio', 'Ben Carson', 'Kasich', 'Jeb Bush', 'Carly Fiorina', 'Mike Huckabee'] }, function(stream) {
    stream.on('data', function (data) {
        if (data.geo){
            console.log(data.place.full_name, data.text, data.geo.coordinates[0], data.geo.coordinates[1]);
            client.create({
              index: 'candidates2',
              type: 'geo_point',
              id: data.id,
              body: {
                  text: data.text,
                  location: {
                      "lat": data.geo.coordinates[0],
                      "lon": data.geo.coordinates[1]
                  }
              }
            }, function (error, response) {
                console.log("inserted record");
            });
        }
    });
});

//TODO add get request
//get candidate_name, and query the elasticsearch db with candidate_name
//upon response return json to client

// TODO add get request
// get tweets within geolocation
