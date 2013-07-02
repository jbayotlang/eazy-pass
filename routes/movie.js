/**
 * Created with JetBrains WebStorm.
 * User: jhudiel
 * Date: 7/2/13
 * Time: 3:17 AM
 * To change this template use File | Settings | File Templates.
 */

var movieModule = require('../eazy-pass_modules/movie').MovieModule();

exports.movie = function(req, res) {
     movieModule.getAllMovies(function(error, results) {
        if (error) {
            res.render(error);
        } else {
            res.render('movie', {movies: results, counter: 1});
        }
     });

}

exports.movieForm = function(req, res) {
    res.render('createMovie', {title: 'Create new movie - Eazy Pass'});
}

exports.updateForm = function(req, res){
   var id = req.params.id;

   movieModule.getMovieById(id, function(error, result) {
       if (error) {
           res.render(error);
       } else {
           res.render('updateForm', {movie: result, title: 'Update - Eazy Pass'});
       }
   })


}