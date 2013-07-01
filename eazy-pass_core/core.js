/**
 * Created with JetBrains WebStorm.
 * User: jhudiel
 * Date: 6/26/13
 * Time: 10:59 PM
 * To change this template use File | Settings | File Templates.
 */

var Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , ObjectID = require('mongodb').ObjectID
  , globals = require('./globals')
  , dbHost = 'ds031988.mongolab.com'
  , dbPort = 31988
  , globals = require('./globals').globals;


var dbServer = new Server(dbHost, dbPort, {});
var EazyPassDB = new Db('eazy-pass', dbServer, {});

EazyPassDB.open(function(err, db) {
    EazyPassDB.authenticate('admin', 'admin', function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('Connection OK');
        }
    });
});

core = { };

core.findAll = function(collection, callback) {
      getCollection(collection, function(error, collection) {
        if(error) {
            console.log('Error: '+ error);
        } else {

          collection.find().toArray(function(error, results) {
              if (error) { callback(error); }
              else { callback(null, results); }
          })
        }
      })
};

core.findById = function(collection, id, callback) {
    getCollection(collection, function(error, collection) {
        collection.find({id: id}, function(error, result) {
            if (error) {
                callback(error);
            } else {
                callback(null, result);
            }
        });
    })
};

core.findByQuery = function(collection, filter, callback) {
      getCollection(collection, function(error, collection) {
          collection.find(filter, function(error, result) {
              if (error) callback(error);
              else callback(null, result);
          }).limit(1)
      })
}

core.save = function(entity, collection, callback) {
      getCollection(globals.collection[collection], function(error, collection) {
          collection.insert(entity, function(error) {
              if(error) callback(error);
              else callback(null);
          })
      })
}

core.delete = function(collection, callback) {
      getCollection(globals.collection[collection], function(error, collection) {
          collection.remove({}, function(error) {
              if (error) callback(error)
              else callback(null);
          })
      })
}

core.update = function(collection, callback) {
      getCollection(globals.collections[collection], function(error, collection) {
          collection.update({}, { $set: {}}, false, true, function(error) {
              if (error) callback(error);
              else callback(null);
          })
      })
}

core.GUID = function() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};

 function getCollection(collection, callback) {
    EazyPassDB.collection(collection, function(error, collection) {
        if (error) callback(error);
        else callback(null, collection);
    })
}

module.exports = core;
