var twitter = require('twitter'),
    express = require('express'),
    elasticSearch = require('elasticsearch'),
    swig = require('swig'),
    path = require('path'),
    morgan = require('morgan'),
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
    'super tuesday',
    'trump',
    'clinton',
    'GOP',
    'democratic',
    'republican',
    'primary'
];
var params = {track:keywords.join(', ') };
tClient.stream('statuses/filter', params, function(stream) {
    stream.on('data', function(tweet) {
        if (tweet.coordinates) { // tweet has location data
            console.log(tweet.id),
            console.log(tweet.text),
            console.log(tweet.coordinates),
            console.log("====\n");

            esClient.create({
                index: 'supertuesday',
                type: 'geo_point',
                id: tweet.id,
                body: {
                    text: tweet.text,
                    location: {
                        'lat': tweet.coordinates.coordinates[1],
                        'lon': tweet.coordinates.coordinates[0]
                    }
                }
            }, function (error, response) {
                console.log("tweet inserted.")
            });

        }

    });
});

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.use(morgan('dev'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.listen(3000)

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/search', function(req, res) {
    var keywords = req.query.q;
    res.send("Searched for: " + keywords);
});
