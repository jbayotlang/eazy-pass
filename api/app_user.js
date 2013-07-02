/**
 * Created with JetBrains WebStorm.
 * User: jhudiel
 * Date: 6/27/13
 * Time: 12:53 PM
 * To change this template use File | Settings | File Templates.
 */

var appUserModule = require('../eazy-pass_modules/app_user').AppUserModule();

AppUserService = function(req, res) {
    this.request = req,
        this.response = res

    var errorObj = {};
}

AppUserService.prototype.GET= function() {
    var self = this
        , id = self.request.param('id');

    if (self.request.param('id')) {

        movieModule.getUserById(id, function(error, result) {
            if(error) {
                self.response.json(error);
            } else {
                self.response.status(200);
                self.response.json(result);
            }
        })
    } else {
        movieModule.getAllUsers(function(error, results) {
            if (error) {
                self.response.json(error);
            } else {
                self.response.status(200);
                self.response.json(results);
            }
        });
    }
};

AppUserService.prototype.POST= function() {
    var self = this,
        app_user = self.request.body;

    movieModule.registerUser(app_user, function(error, result) {
        if(error) {
            self.response.json(error);
        } else {
            self.response.status(201);
            self.response.json(result);
        }
    });
};

AppUserService.prototype.PUT = function() {
    var self = this;

    var movie = self.request.body;

    console.log('PUT method invoked');
    console.log(movie);
}

AppUserService.prototype.DELETE = function() {
    var self = this,
        id = self.request.param('id');

    console.log('DELETE Method invoked!');
    console.log(id);

    appUserModule.deleteUserById(id, function(error, result) {
        if(error) {
            console.log(error);
            self.response.json(error);
        } else {
            console.log(result);
            self.response.json(result);
        }
    })


}

module.exports = AppUserService;