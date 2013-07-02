var EasyPassServices = { },
	MovieService = require('./movies'),
    AppUserService = require('./app_user');

EasyPassServices = {
		'movies': MovieService,
        'app_user': AppUserService
}

exports.router = function(req, res) {
	console.log('in router!', req.param('resource'));
	var resource = req.param('resource').toLowerCase(),
		id = req.param('id'),
		method = req.method,
		service = new EasyPassServices[resource](req, res);

	if(!service) {
        throw new Error('no service found for resource ' + resource);
	} else {

        service[method]();
	}
}