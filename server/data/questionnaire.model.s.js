'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Question Choice Schema
 */
var QuestionChoiceSchema = new Schema({
	text: String,
	order: Number,
	chosenCount: {
		type: Number,
		default: 0
	},
	isCorrect: {
		type: Boolean,
		default: false
	}
});

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
	text: {
		type: String,
		default: '',
		required: 'Please fill question text',
		trim: true
	},
	order: Number,
	questionChoices: [QuestionChoiceSchema]
});

/**
 * Questionnaire Schema
 */
var QuestionnaireSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill questionnaire name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	questions: [QuestionSchema]
});

mongoose.model('Questionnaire', QuestionnaireSchema);
