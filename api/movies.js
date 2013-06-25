MovieService = function(req, res, sandbox) {
	this.request = req,
	this.response = res,
	this.sandbox = sandbox
}

MovieService.prototype.GET= function() {
	var self = this;

	if (self.request.param('id')) {

	} else {

	}
};

MovieService.prototype.POST= function() {
	var self = this;

	self.response.send
};