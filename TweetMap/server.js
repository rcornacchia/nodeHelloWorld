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
twit.stream('statuses/filter', { track: ['the'] }, function(stream) {
    stream.on('data', function (data) {
        if (data.geo){
            console.log(data.id + data.text);
            client.create({
              index: 'index',
              type: 'mytype',
              id: data.id,
              body: {
                  text: data.text,
                  location: data.geo.coordinates
              }
            }, function (error, response) {
                console.log("inserted record");
            });
        }
    });
});
