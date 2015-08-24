'use strict';

module.exports = function(app) {
	var questionnaires = require('../../server/controllers/questionnaires.ctrl.s');

	// Questionnaires Routes
	app.route('/questionnaires')
		.get(questionnaires.list)
		.post(questionnaires.create);

	app.route('/questionnaires/:questionnaireId')
		.get(questionnaires.read)
		.put(questionnaires.update)
		.delete(questionnaires.delete);

	// Finish by binding the Questionnaire middleware
	app.param('questionnaireId', questionnaires.questionnaireByID);
};
