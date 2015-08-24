'use strict';

// Questionnaires controller
angular.module('questionnaires').controller('ListQuestionnairesController', ['$scope','usSpinnerService', '$stateParams', '$location', 'Questionnaires',
	function($scope, spinnerService, $stateParams, $location, Questionnaires) {

		$scope.totalItems = 1000;
		$scope.currentPage = $stateParams.page || 1;
		$scope.status = $stateParams.status || 'open';

		if($scope.status === 'open'){
			$scope.isOpenTabActive = true;
		} else if($scope.status === 'closed'){
			$scope.isClosedTabActive = true;
		}

		spinnerService.spin('spinner-1');

		$scope.$watch('currentPage',function(value){
			if (value){
				$location.search("page", value);
			}
		});

		// Find a list of Questionnaires
		$scope.find = function() {

			Questionnaires.query({
				page: $scope.currentPage,
				status: $scope.status
			}, function (data) {
				spinnerService.stop('spinner-1');
				$scope.questionnaires = data.questionnaires;

				var urlPrefix = '';
				if($scope.status === 'open') {
					urlPrefix = '#!/answerQuestionnaire?questionnaireId=';
				}
				else if($scope.status === 'closed'){
					urlPrefix = '#!/questionnaireStatistics?questionnaireId=';
				}

				for (var i = 0; i < $scope.questionnaires.length; i++) {
					$scope.questionnaires[i].url = urlPrefix + $scope.questionnaires[i]._id;
				}

				$scope.totalItems = data.count;
			});
		};

		$scope.setStatus = function(status) {
			$location.search("status", status);
			$location.search("page", 1);
		};
	}
]);
