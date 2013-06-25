var data = require('../sample_data/movies'),
	details = require('../sample_data/movie_details'),
	youtube = require('../sample_data/trailer'),
	images = require('../sample_data/gallery');
	
exports.movies = function(req, res) {
	res.json(data.movies);
}

exports.details = function(req, res) {
	res.json(details.movieDetails);
}

exports.trailers = function(req, res) {
	res.json(youtube.trailers);
}

exports.galleries = function(req, res) {
	res.json(images.movieStills);
}