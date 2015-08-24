'use strict';

/**
 * Module dependencies.
 */
var errorHandler = require('./errors.ctrl.s'),
	questionnaireRepo = require('../data/questionnaire.repo.s'),
	_ = require('lodash');

/**
 * Create a Questionnaire
 */
exports.create = function(req, res) {
	var questionnaire = req.body;

	questionnaireRepo.addQuestionnaire(questionnaire, function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(questionnaire);
		}
	});
};

/**
 * Show the current Questionnaire
 */
exports.read = function(req, res) {
	res.jsonp(req.questionnaire);
};

/**
 * Update a Questionnaire
 */
exports.update = function(req, res) {
	var questionnaire = req.questionnaire ;

	questionnaire = _.extend(questionnaire , req.body);

	questionnaireRepo.updateQuestionnaire(questionnaire, function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(questionnaire);
		}
	});
};

/**
 * Delete an Questionnaire
 */
exports.delete = function(req, res) {
	var questionnaire = req.questionnaire ;

	questionnaireRepo.removeById(questionnaire._id, function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(questionnaire);
		}
	});
};

/**
 * List of Questionnaires
 */
exports.list = function(req, res) {
	questionnaireRepo.listQuestionnaires(req.param('page'),req.param('status'), function(err, data) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(data);
		}
	});
};

/**
 * Questionnaire middleware
 */
exports.questionnaireByID = function(req, res, next, id) {
	questionnaireRepo.getQuestionnaire(id, function(err, questionnaire) {
		if (err) return next(err);
		if (! questionnaire) return next(new Error('Failed to load Questionnaire ' + id));
		req.questionnaire = questionnaire ;
		next();
	});
};
