
var core = require('./core'),
    globals = require('./globals'),
    Sandbox = function() { };

Sandbox.prototype.getAll = function(collection, callback) {
    var self = this;

    return core.findAll(collection, function(error, results) {
        if(error) {
            callback(new Error('Error: ' + error));
        } else {
            callback(null, results);
        }
    });
}

Sandbox.prototype.findById = function(id, collection, callback) {

    return core.findById(id, collection, function(error, result) {
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

Sandbox.prototype.save = function(entity, collection, callback) {
    var self = this;

    return core.insert(entity, collection, function(error, result) {
        if(error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

Sandbox.prototype.deleteById = function(id, collection, callback) {
    var self = this;

    return core.deleteById(id, collection, function(error, result) {
        if(error) {
            callback(error);
        } else {
            callback(null, result);
        }
    })
}

Sandbox.prototype.GUID = function() {
    return core.GUID();
}

module.exports = Sandbox;
