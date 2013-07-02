var movieModule = require('../eazy-pass_modules/movie').MovieModule();


MovieService = function(req, res) {
	this.request = req,
	this.response = res

    var errorObj = {};
}

MovieService.prototype.GET= function() {
	var self = this
        , id = self.request.param('id');

	if (self.request.param('id')) {

        movieModule.getMovieById(id, function(error, result) {
            if(error) {
                self.response.json(error);
            } else {
                self.response.status(200);
                self.response.json(result);
            }
        })
	} else {
        movieModule.getAllMovies(function(error, results) {
           if (error) {
               self.response.json(error);
           } else {
               self.response.status(200);
               self.response.json(results);
           }
        });
	}
};

MovieService.prototype.POST= function() {
	var self = this,
        movie = self.request.body;

	movieModule.createNewMovieEntry(movie, function(error, result) {
        if(error) {
            self.response.json(error);
        } else {
            self.response.status(201);
            self.response.json(result);
        }
    });
};

MovieService.prototype.PUT = function() {
    var self = this;

    var movie = self.request.body;

    console.log('PUT method invoked');
    console.log(movie);
}

MovieService.prototype.DELETE = function() {
    var self = this,
        id = self.request.param('id');

    console.log('DELETE Method invoked!');
    console.log(id);

    movieModule.deleteMovieById(id, function(error, result) {
        if(error) {
            console.log(error);
            self.response.json(error);
        } else {
            console.log(result);
            self.response.json(result);
        }
    })


}

module.exports = MovieService;