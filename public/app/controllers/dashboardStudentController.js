define( function ( require ) {
	var app = require('app'),
		_ = require('underscore'),
		lang = require('lang');
	
	require('services/requestQFactory');

    app.register.controller('dashboardStudentController', ['$scope', '$rootScope','$location' ,'requestQFactory','contextPath',
		function ($scope, $rootScope ,$location, requestQFactory, contextPath) {
			
			$rootScope.userAuthLoaded
				.then(function () {
					$scope.user = $rootScope.authUser;
					init();
				});
			    	
			function filterWaiting(request) {
				return request.status === "Waiting";
			}
			function filterAccepted(request) {
				return request.status === "Accepted";
			}
    		
			function init() {
	    		requestQFactory.findByUser($rootScope.authUser)
    			.then(function(data) {
					$scope.waitings = _.filter(data.requests , filterWaiting);
					$scope.accepted = _.filter(data.requests , filterAccepted);
    			});
			}
    		
    		function goToTutor(tutor) {
				$location.url(contextPath + '/tutor/' + tutor.id);
			}
    		
    		$scope.accepted = [];
    		$scope.waitings = [];
    		$scope.user = {};
    		$scope.goToTutor = goToTutor;
    		$scope.lang = lang;
	}]);
});
