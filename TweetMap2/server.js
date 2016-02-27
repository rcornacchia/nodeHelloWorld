var twitter = require('twitter'),
    express = require('express'),
    elasticSearch = require('elasticsearch'),
    app = express();

// Setup twitter api
var tClient = new twitter({
    consumer_key: 'fRT0vKluRXvF4biuL4f3u3aQH',
    consumer_secret: 'DI2Gkxma6IwYtzLC8qbIBY9ClfKxwliICAghkO3gXvL93OiAs7',
    access_token_key: '309561440-woeVVklGEKaTnx5jb2IzJ9ATuy1tAJpkimPRvI0v',
    access_token_secret: 'Kd9tLOi65pPcW4vqLC5X5UxbanzpHtMDi7jNAfS9uY5Rh'
});

// Set up elasticSearch client
var esClient = new elasticSearch.Client({
    host: 'search-tweetmapccbd-fbed2pdkzapesfu7nzk4fmtmsm.us-east-1.es.amazonaws.com',
    log: 'trace'
});

// Connect to twitter stream websocket
var keywords = [
    'deadpool',
    'kung fu panda',
    'the witch',
    'how to be single',
    'zoolander',
    'star wars',
    'the revenant',
    'hail caesar!'
];
var params = {track:keywords.join(', ') };
tClient.stream('statuses/filter', params, function(stream) {
    stream.on('data', function(tweet) {
        if (tweet.geo) { // tweet has location data
            console.log(tweet.id),
            console.log(tweet.text),
            console.log(tweet.coordinates),
            console.log("====\n");

            esClient.create({
                index: 'movies',
                type: 'geo_point',
                id: tweet.id,
                body: {
                    text: tweet.text,
                    location: {
                        'lat': tweet.coordinates[1],
                        'lon': tweet.coordinates[0]
                    }
                }
            }, function (error, response) {
                console.log("tweet inserted.")
            });
        }
    });
});
