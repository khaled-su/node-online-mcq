'use strict';

(function() {
	// Questionnaires Controller Spec
	describe('Answer Questionnaire Controller Tests', function() {
		// Initialize global variables
		var AnswerQuestionnaireController,
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
			AnswerQuestionnaireController = $controller('AnswerQuestionnaireController', {
				$scope: scope
			});
		}));

		it('$scope.answerQuestionnaire() should update a valid Questionnaire', inject(function(Questionnaires) {
			// Define a sample Questionnaire put data
			var sampleQuestionnairePutData = new Questionnaires({
				_id: '525cf20451979dea2c000001',
				name: 'New Questionnaire',
				questions: []
			});

			// Mock Questionnaire in scope
			scope.questionnaire = sampleQuestionnairePutData;

			// Set PUT response
			$httpBackend.expectPUT(/questionnaires\/([0-9a-fA-F]{24})$/).respond();
			$httpBackend.expectGET('modules/questionnaires/views/list-questionnaires.html').respond();

			// Run controller functionality
			scope.answerQuestionnaire();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).to.equal('/');
		}));
	});
}());
