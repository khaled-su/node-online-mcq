'use strict';

(function() {
	// Questionnaires Controller Spec
	describe('List Questionnaires Controller Tests', function() {
		// Initialize global variables
		var ListQuestionnairesController,
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
			ListQuestionnairesController = $controller('ListQuestionnairesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Questionnaire object fetched from XHR', inject(function(Questionnaires) {
			// Create sample Questionnaire using the Questionnaires service
			var sampleQuestionnaire = new Questionnaires({
				name: 'New Questionnaire'
			});

			// Create a sample Questionnaires array that includes the new Questionnaire
			var sampleQuestionnaires = {questionnaires: [sampleQuestionnaire], count:1};

			// Set GET response
			$httpBackend.expectGET('questionnaires?page=1&status=open').respond(sampleQuestionnaires);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.questionnaires[0].name).to.equal('New Questionnaire');
		}));
	});
}());
