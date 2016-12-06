define(function(require) {
	var app = require('app');
	
	require('services/validateForm');
	
	app.register.controller('registerController', [ '$scope', '$location','validateForm', 'contextPath', function($scope, $location, validateForm, contextPath) {
		$scope.contextPath = contextPath;
		validateForm(document.forms[0]);
		
	}]);
});
