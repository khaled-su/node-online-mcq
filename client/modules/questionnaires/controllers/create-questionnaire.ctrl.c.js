'use strict';

// Questionnaires controller
angular.module('questionnaires').controller('CreateQuestionnaireController', ['$scope', 'usSpinnerService', '$stateParams', '$location', 'Questionnaires',
	function($scope, spinnerService, $stateParams, $location, Questionnaires) {

		$scope.questionnaire = {
			name: '',
			questions: []
		};

		var date = new Date();
		$scope.minDate = date.setDate((new Date()).getDate() + 1);

		$scope.datePickerOpen = function ($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.datePickerOpened = true;
		};

		$scope.addQuestion = function () {
			$scope.questionnaire.questions.push({
				text: '',
				questionChoices: []
			});
		};

		$scope.addQuestionChoice = function (question) {
			question.questionChoices.push({
				text: '',
				isCorrect: false
			});
		};

		$scope.choiceSelected = function(question, questionChoice) {
			if(!question.allowMultiple) {
				for (var i = 0; i < question.questionChoices.length; i++) {
					if(question.questionChoices[i].text !== questionChoice.text) {
						question.questionChoices[i].isCorrect = false;
					}
				}
			}
		};

		$scope.removeQuestion = function (questionIndex) {
			this.questionnaire.questions.splice(questionIndex, 1);
		};

		$scope.removeQuestionChoice = function (question, questionChoiceIndex) {
			question.questionChoices.splice(questionChoiceIndex, 1);
		};

		$scope.correctChoiceChanged = function (question, correctIndex) {
			for (var i = 0; i < question.questionChoices.length; i++) {
				if (i === correctIndex) {
					question.questionChoices[i].IsCorrect = true;
				} else {
					question.questionChoices[i].IsCorrect = false;
				}
			}
		};

		// Create new Questionnaire
		$scope.createQuestionnaire = function () {

			if ($scope.questionnaire.questions.length === 0) {
				toastr.error('There must be at least one question in your survey');
				return;
			}

			var validationError = false;
			$scope.questionnaire.questions.forEach(function(question) {
				//question must have at least 2 choices
				if(question.questionChoices && question.questionChoices.length < 2){
					toastr.error('Questions must have at least 2 choices');
					validationError = true;
					return;
				}

				// When you check the correctable box, you have to force the user (who's entering the question)
				// to select at least one correct answer for the concerned question.
				if(question.isCorrectable) {
					var correctChoicesCount = 0;

					question.questionChoices.forEach(function (questionChoice) {
						if (questionChoice.isCorrect) {
							correctChoicesCount++;
						}
					});

					if(!question.allowMultiple){
						if(correctChoicesCount == 0){
							toastr.error('Correctable questions must have a correct choice');
							validationError = true;
							return;
						}
					}
					// if you select multiple choices and correctable, you should force the user
					// (who's entering the question) to select more than one correct answer
					else {
						if(correctChoicesCount < 2){
							toastr.error('Correctable questions with multiple correct choices must have at least 2 correct choices');
							validationError = true;
							return;
						}
					}
				}
			});

			if(validationError){
				return;
			}

			var btn = $('#createMCQ');
			btn.button('loading');
			spinnerService.spin('spinner-1');

			$scope.questionnaire.created = new Date().getTime();
			$scope.questionnaire.answerCount = 0;
			$scope.questionnaire.closingDate = new Date($scope.questionnaire.closingDate).getTime();

			if(!$scope.questionnaire.maxAnswerCount){ //not entered
				$scope.questionnaire.maxAnswerCount = -1;
			}

			$scope.questionnaire.questions.forEach(function(question, i) {
				question.order = i;
				delete question.selectedIndex;

				question.questionChoices.forEach(function(questionChoice, j) {
					questionChoice.answerCount = 0;
					questionChoice.order = j;
				});
			});
			// Create new Questionnaire object
			var questionnaire = new Questionnaires($scope.questionnaire);

			// Redirect after save
			questionnaire.$save(function (response) {
				spinnerService.stop('spinner-1');
				toastr.info('MCQ created successfully!');
				$location.path('answerQuestionnaire');
				$location.search('questionnaireId', response._id)

				// Clear form fields
				$scope.name = '';
			}, function (errorResponse) {
				spinnerService.stop('spinner-1');
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
