/**
 * Created with JetBrains WebStorm.
 * User: jhudiel
 * Date: 6/30/13
 * Time: 3:13 PM
 * To change this template use File | Settings | File Templates.
 */


var Sandbox = require('../eazy-pass_core/sandbox');
    sandbox = new Sandbox();

exports.MovieModule = function() {

    return {
        getAllMovies: function(callback) {
            sandbox.getAll('movie', function(error, results) {
                if(error) {
                    callback(error);
                } else {
                    if (results.length <= 0) {
                        callback(null, 'No saved movies');
                    } else {
                        callback(null, results);
                    }
                }
            });
        },

        getMovieById: function(id, callback) {
            sandbox.findById(id, 'movie', function(error, result) {
                if(error) {
                    callback(error);
                } else {
                   if(result.length <= 0) {

                       callback(null, 'No movie for id: ' + id);
                    } else {
                       callback(null, result);
                    }
                }
            });
        },

        createNewMovieEntry: function(movie, callback) {
            var id = sandbox.GUID();
            movie['id'] = id;

            sandbox.save(movie, 'movie', function(error, result) {
               if(error) {
                   callback(error);
               } else {
                   console.log(result);
                   callback(null, result);
               }
            });
        },

        getMovieGallery: function(id) {
            return null;
        },

        getMovieDetails: function(id) {
            return null;
        }
    }

}
