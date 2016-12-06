define(function ( require ) {

	var app = require('app'),
		_ = require('underscore');
	
	require('services/requestQFactory');
	


	
	app.register.controller('waitingRequestsController' , [ '$scope','$rootScope', 'utilities', 'requestQFactory' , function($scope ,$rootScope ,utilities, requestQFactory) {
		var requests,
			tutor;
		
		$rootScope.userAuthLoaded
		.then(function() {
			tutor = $rootScope.authUser;
			init();
		});
		
				
		function init() {
			debugger;
			console.log("Sending...");
			requestQFactory.findWaiting(tutor)
			.then(function(data) {
				_.extend($scope, data);
				requests = data.requests;
				utilities.refreshScope();
				console.log("Response processed...");
			});
		}
		
		function changeStatus(request, status) {
			
			requestQFactory.changeStatus(request, status)
			.then(function () {
				requests = $scope.requests = _.without(requests , request);
				window.swal( status , "", "success");
				utilities.refreshScope();
			});
		}
		
		$scope.changeStatus = changeStatus;
	
	}]);
});