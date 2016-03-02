// pull results from elasticsearch

var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
	host: 'search-tweetmapccbd-fbed2pdkzapesfu7nzk4fmtmsm.us-east-1.es.amazonaws.com',
	log: 'trace'
});

client.search({
	index: 'supertuesday',
	type: 'geo_point',
	body: {
		query: {
			"match_all": {}
			/*
			match: {
				text: 'trump'
			}*/
		}
	}
}).then(function(resp) {
	var hits = resp.hits.hits;

	//loop through returned tweets
	for(var i = 0; i < hits.length; i++) {
		var h = hits[i];
		var lat = h._source.location.lat;
		var lon = h._source.location.lon;
		console.log("text: " + h._source.text);
		console.log("latitude: " + lat + ", longitude: " + lon);
	}
}, function(err) {
	console.trace(err.message);
});