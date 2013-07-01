/**
 * Created with JetBrains WebStorm.
 * User: jhudiel
 * Date: 7/2/13
 * Time: 3:17 AM
 * To change this template use File | Settings | File Templates.
 */

var movieModule = require('../eazy-pass_modules/movie').MovieModule();

exports.movie = function(req, res) {
    res.render('movie', { title: 'Eazy Pass' });
}

exports.movieForm = function(req, res) {
    res.render('createMovie', {title: 'Create new movie - Eazy Pass'});
}

//exports.create = function(req, res) {
//
//    var movie = req.body;
//    console.log(movie);
//    movieModule.createNewMovieEntry(movie, function(error, result) {
//        if(error) {
//            self.response.json(error);
//        } else {
//            self.response.status(201);
//            console.log(result);
//            self.response.json(result);
//        }
//    });
//}