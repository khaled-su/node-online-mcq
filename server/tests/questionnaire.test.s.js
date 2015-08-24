/* jshint -W079 */
'use strict';

var expect = require('chai').expect,
	request = require('supertest'),
	app = require('../../server'),
	questionnaireRepo = require('../data/questionnaire.repo.s'),
	agent = request.agent(app);

/**
 * Globals
 */
var questionnaireSample = {
	name: 'Questionnaire Name',
	questions:[
		{
			text: 'Q1',
			questionChoices: [
				{text: 'Q1C1', chosenCount:0, isCorrect:false},
				{text: 'Q1C2', chosenCount:0, isCorrect:false},
				{text: 'Q1C3', chosenCount:0, isCorrect:false}
			]
		},
		{
			text: 'Q1',
			questionChoices: [
				{text: 'Q2C1', chosenCount:0, isCorrect:false},
				{text: 'Q2C3', chosenCount:0, isCorrect:false}
			]
		}
	]
};

/**
 * Questionnaire routes tests
 */
describe('Questionnaire CRUD tests', function() {
	beforeEach(function(done) {
		questionnaireRepo.removeAll(function(err) {
			if (!err) {
				done();
			}
		});
	});

	it('should be able to save Questionnaire instance', function(done) {
		var questionnaire = questionnaireSample;
		// Save a new Questionnaire
		agent.post('/questionnaires')
			.send(questionnaire)
			.expect(200)
			.end(function(questionnaireSaveErr, questionnaireSaveRes) {
				// Handle Questionnaire save error
				if (questionnaireSaveErr) done(questionnaireSaveErr);

				// Get a list of Questionnaires
				agent.get('/questionnaires')
					.end(function(questionnairesGetErr, questionnairesGetRes) {
						// Handle Questionnaire save error
						if (questionnairesGetErr) done(questionnairesGetErr);

						// Get Questionnaires list
						var questionnaires = questionnairesGetRes.body.questionnaires;

						// Set assertions
						expect(questionnaires[0].name).to.equal('Questionnaire Name');
						expect(questionnaires[0].questions).to.have.length(2);
						expect(questionnaires[0].questions[0].questionChoices).to.have.length(3);
						expect(questionnaires[0].questions[1].questionChoices[0].text).to.equal('Q2C1');
						expect(questionnaires[0].questions[1].questionChoices[0].chosenCount).to.equal(0);
						expect(questionnaires[0].questions[1].questionChoices[0].isCorrect).to.equal(false);
						// Call the assertion callback
						done();
					});
			});
	});

	it('should be able to update Questionnaire instance', function(done) {
		var questionnaire = questionnaireSample;

		// Save a new Questionnaire
		agent.post('/questionnaires')
			.send(questionnaire)
			.expect(200)
			.end(function(questionnaireSaveErr, questionnaireSaveRes) {
				// Handle Questionnaire save error
				if (questionnaireSaveErr) done(questionnaireSaveErr);

				// Update Questionnaire name
				questionnaire.name = 'WHY YOU GOTTA BE SO MEAN?';
				expect(questionnaire.questions[1].questionChoices[0].chosenCount).to.equal(0);
				questionnaire.questions[1].questionChoices[0].chosenCount++;

				// Update existing Questionnaire
				agent.put('/questionnaires/' + questionnaireSaveRes.body._id)
					.send(questionnaire)
					.expect(200)
					.end(function(questionnaireUpdateErr, questionnaireUpdateRes) {
						// Handle Questionnaire update error
						if (questionnaireUpdateErr) done(questionnaireUpdateErr);

						var retQuestionnaire = questionnaireUpdateRes.body;
						// Set assertions
						expect(retQuestionnaire.name).to.equal('WHY YOU GOTTA BE SO MEAN?');
						expect(retQuestionnaire.questions[1].questionChoices[0].chosenCount).to.equal(1);
						// Call the assertion callback
						done();
					});
			});
	});

	it('should be able to get a list of Questionnaires', function(done) {
		var questionnaire = {
			name: 'Questionnaire Name'
		};
		// Save the Questionnaire
		questionnaireRepo.addQuestionnaire(questionnaire, function() {
			// Request Questionnaires
			request(app).get('/questionnaires')
				.end(function(req, res) {
					// Set assertion
					expect(res.body.questionnaires).to.have.length(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Questionnaire', function(done) {
		var questionnaire = {
			name: 'Questionnaire Name'
		};
		// Save the Questionnaire
		questionnaireRepo.addQuestionnaire(questionnaire, function() {
			request(app).get('/questionnaires/' + questionnaire._id)
				.end(function(req, res) {
					// Set assertion
					expect(res.body).to.have.property('name', questionnaire.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Questionnaire instance', function(done) {
		var questionnaire = {
			name: 'Questionnaire Name'
		};
		// Save a new Questionnaire
		agent.post('/questionnaires')
			.send(questionnaire)
			.expect(200)
			.end(function(questionnaireSaveErr, questionnaireSaveRes) {
				// Handle Questionnaire save error
				if (questionnaireSaveErr) done(questionnaireSaveErr);

				// Delete existing Questionnaire
				agent.delete('/questionnaires/' + questionnaireSaveRes.body._id)
					.send(questionnaire)
					.expect(200)
					.end(function(questionnaireDeleteErr, questionnaireDeleteRes) {
						// Handle Questionnaire error error
						if (questionnaireDeleteErr) done(questionnaireDeleteErr);

						// Set assertions
						expect(questionnaireDeleteRes.body._id).to.equal(questionnaireSaveRes.body._id);

						// Call the assertion callback
						done();
					});
			});
	});

	afterEach(function(done) {
		questionnaireRepo.removeAll(function(err) {
			if (!err) {
				done();
			}
		});
	});
});
