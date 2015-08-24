'use strict';

// Questionnaires controller
angular.module('questionnaires').controller('QuestionnaireStatisticsController', ['$scope', '$state', 'usSpinnerService', '$stateParams', '$location', 'Questionnaires',
	function($scope,$state, spinnerService, $stateParams, $location, Questionnaires) {

		spinnerService.spin('spinner-1');
		// Find existing Questionnaire
		$scope.findOne = function() {
			Questionnaires.get({
				questionnaireId: $stateParams.questionnaireId
			}, function (questionnaire) {
				spinnerService.stop('spinner-1');
				$scope.questionnaire = questionnaire;

				for (var i = 0, question; question = $scope.questionnaire.questions[i]; i++) {
					var questionAnswerCount = 0;

					for (var j = 0, questionChoice; questionChoice = question.questionChoices[j]; j++) {
						questionAnswerCount += questionChoice.answerCount;
					}

					for (var j = 0, questionChoice; questionChoice = question.questionChoices[j]; j++) {
						questionChoice.percentage = ((questionChoice.answerCount / questionAnswerCount) * 100).toFixed(1);
					}
				}
			}, function(err){
				spinnerService.stop('spinner-1');
				toastr.error('MCQ not found, redirected to home page');
				$state.go('listQuestionnaires');
			});
		};
	}
]);
