'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Menus',
	function($scope, Menus) {

		toastr.options.timeOut = 5000;
		toastr.options.positionClass = 'toast-bottom-right';

		$scope.spinnerOptions = {
			color: '#ffffff', lines: 8, length: 0, width: 8, radius: 10, corners: 1.0, rotate: 0, trail: 100, speed: 1.0
		};

		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
