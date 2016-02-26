// Setup web server and socket
var twitter = require('twitter'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

// Setup twitter stream api
var twit = new twitter({
    consumer_key: 'cu607zV20zgS5deVCjJphwFfc',
    consumer_secret: 'niSiKTDe5b30XMshQMmwmLz2SqVfDsksxNIyyVjySALU6YfkYv',
    access_token_key: '2475805220-VabahyH70uVb5ypd3oI48iLYw1oQSlPIzwB0Yi0',
    access_token_secret: '3bSwrTiH5ukl3L3lXMfY1zFjB1x6GOUR9DIeLW0zb8vPQ'
}),
stream = null;

// Use the default port (for beanstalk) or default to 8081 locally
server.list(process.env.PORT || 8081);

// Setup routing for app
app.use(express.static(__dirname + '/public'));

// Create web sockets connection
io.sockets.on('connection', function(socket) {

});
