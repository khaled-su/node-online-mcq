'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../server/controllers/core.ctrl.s');
	app.route('/').get(core.index);
};
