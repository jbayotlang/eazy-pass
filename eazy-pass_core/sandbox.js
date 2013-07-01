
var core = require('./core'),
    globals = require('./globals'),
    Sandbox = function() { };

Sandbox.prototype.getAll = function(collection, callback) {
    var self = this;

    return core.findAll(collection, function(error, results) {
        if(error) {
            callback(new Error('Error: ' + error));
        } else {
            callback(null, 'No saved movies');
        }
    });
}

Sandbox.prototype.findById = function(collection, id, callback) {

    return core.findById(collection, id, function(error, result) {
        if(error) {
            callback(new Error('Error: ' + error));
        } else {
            callback(null, result);
        }
    })
}

Sandbox.prototype.findByQuery = function(filter, collection, callback) {
    var self = this;

    return core.findOne(filter, collection, function(error, result) {
        if(error) {
            callback(new Error('Error: ' + error));
        } else {
             callback(null, result);

        }
    });
}

Sandbox.prototype.GUID = function() {
    return core.GUID();
}

module.exports = Sandbox;
