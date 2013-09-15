
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
  , api = require('./api/api_router')
    , Sandbox = require('./eazy-pass_core/sandbox')
    , sandbox = new Sandbox();


var app = express();
var allowCrosDomain = function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if('OPTIONS' == req.method){
    res.send(200);
  } else {
    next();
  }

}
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(allowCrosDomain);
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
app.get('/admin/dashboard/movie/:id/update', movieModule.updateForm);
app.get('/admin/dashboard/movie/:id/delete', movieModule.updateForm);


app.all('/v1/:resource/:id?', api.router);
sandbox.getAll('movie', function(error, results) {
    if(!error) {
        console.log(results);
    } else {
        console.log(error);
    }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
