/**
 * Created with JetBrains WebStorm.
 * User: jhudiel
 * Date: 7/2/13
 * Time: 7:19 AM
 * To change this template use File | Settings | File Templates.
 */

var Sandbox = require('../eazy-pass_core/sandbox');
sandbox = new Sandbox();

exports.AppUserModule = function() {

    return {
        getAllUsers: function(callback) {
            sandbox.getAll('app_user', function(error, results) {
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

        getUserById: function(id, callback) {
            sandbox.findById(id, 'app_user', function(error, result) {
                if(error) {
                    callback(error);
                } else {
                    if(result.length <= 0) {

                        callback(null, 'No movie for id: ' + id);
                    } else {          1
                        callback(null, result);
                    }
                }
            });
        },

        registerUser: function(user, callback) {
            var id = sandbox.GUID();
            movie['id'] = id;
            console.log(movie);

            sandbox.save(movie, 'app_user', function(error, result) {
                if(error) {
                    callback(error);
                } else {
                    console.log(result);
                    callback(null, result);
                }
            });
        },

        getTransactions: function(id) {
            return null;
        }

    }

}