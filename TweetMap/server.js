// Setup web server and socket
var app = require('express').createServer(),
    twitter = require('ntwitter');

app.listen(3000);
// Setup twitter stream api
var twit = new twitter({
    consumer_key: 'cu607zV20zgS5deVCjJphwFfc',
    consumer_secret: 'niSiKTDe5b30XMshQMmwmLz2SqVfDsksxNIyyVjySALU6YfkYv',
    access_token_key: '2475805220-VabahyH70uVb5ypd3oI48iLYw1oQSlPIzwB0Yi0',
    access_token_secret: '3bSwrTiH5ukl3L3lXMfY1zFjB1x6GOUR9DIeLW0zb8vPQ'
}),
stream = null;

//Create web sockets connection.
twit.stream('statuses/filter', { track: ['Trump'] }, function(stream) {
    stream.on('data', function (data) {
        // if (data.coordinates){
                console.log(data);
        // }
    });
});
