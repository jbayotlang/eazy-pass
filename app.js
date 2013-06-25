
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , movie = require('./routes/movies')
  , http = require('http')
  , path = require('path')
  , Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , ObjectId = require('mongodb').ObjectID
  , MongoClient = require('mongodb').MongoClient;


var app = express();
var dbHost = "ds031988.mongolab.com";
var dbPort = 31988;

// var dbServer = new Server(dbHost, dbPort, {});
// var db = new Db('eazy_pass', dbServer, {});

// db.open(function(err, db) {
// 	db.authenticate('jhudiel.bayotlang', 'hcmBay01',  function(err) {
// 		if(err) {
// 			console.log(err);
// 		}
// 	})
// });

var mongo = require('mongodb');

var dbhost = 'ds031988.mongolab.com';
var dbport = 31988;

var dbserver = new mongo.Server(dbhost, dbport, {});
var dbconnector = new mongo.Db('eazy-pass', dbserver, {});

dbconnector.open(function(err,db) {
  db.authenticate('admin', 'admin', function(err, success) {
    if(err) {
      console.log(err);
    } else {
      console.log("OK");
    }
  });
});

var collection = function(callback) {
	db.collection('test', function(error, test) {
		if (error) callback(error);
		else callback(null, user);
	});
};

var save = function(test, callback) {
	collection(function(error, test) {
		if(error) callback(error);
		else {
			test.insert(test, function() {
				callback(null, test);
			});
		}
	});
};




// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/v1/movies', movie.movies);
app.get('/v1/movies/1/details', movie.details);
app.get('/v1/movies/1/trailers', movie.trailers);
app.get('/v1/movies/1/galleries', movie.galleries);

// app.post('/v1/movies', function(req, res) {
// 	var movie = { };
// 	var id = new ObjectID();

// 	movie = {

// 	}
// })

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
