
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , passwordHandler = require('./utilities/password-handler');

var app = express();

var db = new Db('sprint1', new Server("127.0.0.1", 27017, {safe: false}, {}));

db.open(function (err) {
    if(!err) {
        console.log('Connection successful');
    }
});

var collection = function(callback) {
    db.collection('users', function(error, user) {
        if( error ) callback(error);
        else callback(null, user);
    });
};
/****  functions to be used ****/
var findAll = function(callback) {

   collection(function(error, users) {
        if( error ) callback(error)
        else {
            users.find().toArray(function(error, results) {
                if( error ) callback(error)
                else callback(null, results)
            });
        }
    });
};

var findByUsername = function(filter, callback) {

    collection(function(error, users) {
        if(error) callback(error);
        else {
            var username = filter.username;
            var condition = {username: username};
            users.findOne(condition,{_id: 0, password: 1, salt: 1}, function(err, property) {

//                console.log(property);

                var formPassword = filter.password;
                var dbPassword = property.password;
                var dbSalt = property.salt

//                console.log(formPassword);
//                console.log('outside: ' + dbPassword);
//                console.log(dbSalt)

                var isVerified = passwordHandler.isPasswordValid(formPassword, dbSalt, dbPassword);
//
//
                console.log(isVerified);

            });
        }
    })
}

var save = function(users, callback) {
    collection(function(error, user) {
        if(error) callback(error);
        else {
            user.insert(users, function() {
                callback(null, user);
            })
        }
    })
}

var update = function(filter, uuser, callback) {
    collection(function(error, user) {
        if(error) callback(error);

        else {

            var cond = {email: filter};
            var password = uuser.password;
            uuser.salt = passwordHandler.generateSalt();
            uuser.password = passwordHandler.hashPassword(password, uuser.salt);

            console.log(cond);
            console.log(uuser);
            console.log(password)
            console.log(uuser.salt);
            console.log(uuser.password);
            user.update(cond, { $set: uuser}, false, true);
        }
    })
};



/****  end functions to be used ****/

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

app.get('/v1/users', function(req, res) {
  findAll(function(error, user) {
        res.render('users', {
            title: 'User List',
            users: user
        });
    });
});

app.get('/register', function(req, res) {
    res.render('register', {
        title: 'Registration'
    });
});

app.post('/v1/users', function(req,res) {
    var user = req.body;
    save(user, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('Success');
        }
    });
});

app.get('/accept', function(req, res) {
    res.render('register2', {
        title: 'Second Level of Registration'
    });
});

app.post('/accept', function(req, res) {
    var user = req.body;
    var filter = 'philip.fabela@yahoo.com';
    update(filter, user, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('Success');
        }
    });
});

app.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login'
    })
});

app.post('/login', function(req, res) {
      var credentials = req.body;
    console.log(credentials);
       findByUsername(credentials, function(err) {
        if(!err) {
            console.log('Found');
        } else {
            console.log(err);
        }
    })

});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
