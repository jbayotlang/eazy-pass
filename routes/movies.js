var data = require('../sample_data/movies');
var details = require('../sample_data/movie_details');

console.log(details.movieDetails);

exports.movies = function(req, res) {
	res.json(data.movies);
}

exports.details = function(req, res) {
	res.json(details.movieDetails);
}