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
    host: 'localhost:9200',
    log: 'trace'
});

client.create({
  index: 'myindex',
  type: 'mytype',
  id: '1',
  body: {
    title: 'Test 1',
    tags: ['y', 'z'],
    published: true,
    published_at: '2013-01-01',
    counter: 1
  }
}, function (error, response) {
    console.log("INSERT. Response: " + response); 
});

//Create web sockets connection.
twit.stream('statuses/filter', { track: ['the'] }, function(stream) {
    stream.on('data', function (data) {
        if (data.geo){
            console.log(data);
            client.bulk({
                body: [
                    { index: { _index: 'candidate', _type: 'geo_point'}}
                ]
            });
        }
    });
});
