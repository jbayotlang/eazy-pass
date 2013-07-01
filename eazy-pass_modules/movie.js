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
            sandbox.findById('movie', id, function(error, result) {
                if(error) {
                    callback(error);
                } else {
                   if(!result) {
                       callback(null, results);
                    } else {          1
                        callback(null, 'No movie for id: ' + id);
                    }
                }
            });
        },

        createNewMovie: function(movie) {
            return null;
        },

        getMovieGallery: function(id) {
            return null;
        },

        getMovieDetails: function(id) {
            return null;
        }
    }

}
