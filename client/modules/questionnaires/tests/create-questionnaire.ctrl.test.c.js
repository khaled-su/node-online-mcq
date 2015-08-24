'use strict';

(function() {
	// Questionnaires Controller Spec
	describe('Questionnaires Controller Tests', function() {
		// Initialize global variables
		var CreateQuestionnaireController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {

		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Questionnaires controller.
			CreateQuestionnaireController = $controller('CreateQuestionnaireController', {
				$scope: scope
			});
		}));

		it('$scope.createQuestionnaire() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Questionnaires) {
			// Create a sample Questionnaire object
			var sampleQuestionnairePostData = new Questionnaires({
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
			});

			// Create a sample Questionnaire response
			var sampleQuestionnaireResponse = new Questionnaires({
				_id: '525cf20451979dea2c000001',
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
			});

			// Fixture mock form input values
			scope.questionnaire = sampleQuestionnairePostData;

			// Set POST response
			$httpBackend.expectPOST('questionnaires', sampleQuestionnairePostData).respond(sampleQuestionnaireResponse);

			// Run controller functionality
			scope.createQuestionnaire();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.questionnaire.name).to.equal('Questionnaire Name');

			// Test URL redirection after the Questionnaire was created
			expect($location.path()).to.equal('/answerQuestionnaire');
		}));

	});
}());
