var EasyPassServices = { },
	MovieService = require('./movies');

EasyPassServices = {
		'movies': MovieService
}

exports.router = function(req, res) {
	console.log('in router!', req.params('resource'));
	var resource = req.param('resource').toLowerCase(),
		id = req.params('id'),
		method = req.method,
		service = new EasyPassServices[resource](req, res);

	if(service) {
		service[method]();
	} else {
		throw new Error('no service found for resource ' + resource);
	}
}