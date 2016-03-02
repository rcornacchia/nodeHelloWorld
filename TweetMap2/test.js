// test file for debugging

var twitter = require('twitter'),
    express = require('express'),
    elasticSearch = require('elasticsearch'),
    app = express(),
    util = require('util');

// Setup twitter api
var tClient = new twitter({
    consumer_key: 'fRT0vKluRXvF4biuL4f3u3aQH',
    consumer_secret: 'DI2Gkxma6IwYtzLC8qbIBY9ClfKxwliICAghkO3gXvL93OiAs7',
    access_token_key: '309561440-woeVVklGEKaTnx5jb2IzJ9ATuy1tAJpkimPRvI0v',
    access_token_secret: 'Kd9tLOi65pPcW4vqLC5X5UxbanzpHtMDi7jNAfS9uY5Rh'
});

// Connect to twitter stream websocket
var keywords = [
  'trump',
  'clinton',
  'GOP',
  'democratic',
  'republican',
  'primary'
];

var params = {track:keywords.join(', ') };
  
tClient.stream('statuses/filter', params,  function(stream){
  stream.on('data', function(tweet) {
    if(tweet.coordinates) {
      console.log("coordinates found");
      console.log(tweet.coordinates.coordinates[0]);
      console.log(tweet.coordinates.coordinates[1]);
    }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});