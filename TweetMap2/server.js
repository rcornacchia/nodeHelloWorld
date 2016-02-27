// Setup web server and socket
var twitter = require('ntwitter'),
    express = require('express'),
    elasticSearch = require('elasticsearch'),
    app = express().createServer()

// Setup twitter stream api
var twit = new twitter({
    consumer_key: 'fRT0vKluRXvF4biuL4f3u3aQH',
    consumer_secret: 'DI2Gkxma6IwYtzLC8qbIBY9ClfKxwliICAghkO3gXvL93OiAs7',
    access_token_key: '309561440-woeVVklGEKaTnx5jb2IzJ9ATuy1tAJpkimPRvI0v',
    access_token_secret: 'Kd9tLOi65pPcW4vqLC5X5UxbanzpHtMDi7jNAfS9uY5Rh'
}),
stream = null;
