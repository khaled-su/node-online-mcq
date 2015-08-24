'use strict';

//Setting up route
angular.module('questionnaires').config(['$stateProvider',
	function($stateProvider) {
		// Questionnaires state routing
		$stateProvider.
		state('root', {
			url: '?page&status',
			templateUrl: 'modules/questionnaires/views/list-questionnaires.html'
		}).
		state('listQuestionnaires', {
			url: '/?page&status',
			templateUrl: 'modules/questionnaires/views/list-questionnaires.html'
		}).
		state('createQuestionnaire', {
			url: '/createQuestionnaire',
			templateUrl: 'modules/questionnaires/views/create-questionnaire.html'
		}).
		state('answerQuestionnaire', {
			url: '/answerQuestionnaire?questionnaireId',
			templateUrl: 'modules/questionnaires/views/answer-questionnaire.html'
		}).
		state('questionnaireStatistics', {
			url: '/questionnaireStatistics?questionnaireId',
			templateUrl: 'modules/questionnaires/views/questionnaire-statistics.html'
		});
	}
]);
