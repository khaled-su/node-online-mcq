'use strict';

// Questionnaires controller
angular.module('questionnaires').controller('AnswerQuestionnaireController', ['$scope', 'usSpinnerService', '$state','$stateParams', '$location', 'Questionnaires',
	function($scope, spinnerService, $state, $stateParams, $location, Questionnaires) {

		spinnerService.spin('spinner-1');
		// Update existing Questionnaire
		$scope.answerQuestionnaire = function() {
			var questionnaireAnswered = true;
			$scope.questionnaire.questions.forEach(function(question) {
				var questionAnswered = false;
				question.questionChoices.forEach(function(questionChoice) {
					if(questionChoice.isChecked){
						questionAnswered = true;
					}
				});

				if(!questionAnswered){
					questionnaireAnswered = false;
				}
			});

			if(!questionnaireAnswered){
				toastr.error('You must answer all questions');
				return;
			}

			var btn = $('#submitAnswers');
			btn.button('loading');
			spinnerService.spin('spinner-1');
			var questionnaire = new Questionnaires($scope.questionnaire);

			questionnaire.$update(function() {
				spinnerService.stop('spinner-1');

				if($scope.questionnaire.answerCount == ($scope.questionnaire.maxAnswerCount - 1)){//last one to answer
					toastr.info('MCQ has been closed');
				}

				toastr.info('MCQ answered successfully!');

				$state.go('listQuestionnaires');
			}, function(errorResponse) {
				spinnerService.stop('spinner-1');
				$scope.error = errorResponse.data.message;
			});
		};

		// Find existing Questionnaire
		$scope.findOne = function() {
			Questionnaires.get({
				questionnaireId: $stateParams.questionnaireId
			}, function (data) {
				spinnerService.stop('spinner-1');
				$scope.questionnaire = data;
			}, function(err){
				spinnerService.stop('spinner-1');
				toastr.error('MCQ not found, redirected to home page');
				$state.go('listQuestionnaires');
			});
		};

		$scope.choiceSelected = function(question, questionChoice) {
			if(!question.allowMultiple) {
				for (var i = 0; i < question.questionChoices.length; i++) {
					if(question.questionChoices[i].text !== questionChoice.text) {
						question.questionChoices[i].isChecked = false;
					}
				}
			}
		};
	}
]);
