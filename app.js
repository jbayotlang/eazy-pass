
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , admin = require('./routes/dashboard')
  , movieModule = require('./routes/movie')
  , http = require('http')
  , path = require('path')
  , ID = require('mongodb').ObjectID
  , api = require('./api/api_router');


var app = express();

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
app.use('/static', express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*Pages*/
app.get('/', routes.index);
app.get('/admin/dashboard', admin.dashboard);

app.get('/admin/dashboard/movie', movieModule.movie);
app.get('/admin/dashboard/movie/create', movieModule.movieForm);
app.get('/admin/dashboard/movie/:id', movieModule.updateForm);


app.all('/v1/:resource/:id?', api.router);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
