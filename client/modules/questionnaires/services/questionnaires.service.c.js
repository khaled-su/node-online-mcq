'use strict';

//Questionnaires service used to communicate Questionnaires REST endpoints
angular.module('questionnaires').factory('Questionnaires', ['$resource',
	function($resource) {
		return $resource('questionnaires/:questionnaireId', { questionnaireId: '@_id'
		}, {
				query: { method: 'GET', isArray: false },
				update: { method: 'PUT'	}
		});
	}
]);
