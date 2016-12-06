
var app = angular.module('backendApp', ['ngRoute']),
	contextPath = '';

app.constant('contextPath', contextPath);

app.config(['$routeProvider' , '$locationProvider' , function($routeProvider, $locationProvider) {

	$routeProvider
		.when( '/backend/administrators', 
				{ controller : "administratorsController",
				  templateUrl : contextPath + "/app/views/backend/administrators.html"
		})
		.when( '/backend/prices', 
				{ controller : "pricesController",
				  templateUrl : contextPath + "/app/views/backend/prices.html"
		})
		.when( '/backend/subjects', 
				{ controller : "subjectsController",
				  templateUrl : contextPath + "/app/views/backend/subjects.html"
		})
		.when( '/backend/typesofeducation', 
				{ controller : "typesOfEducationController",
				  templateUrl : contextPath + "/app/views/backend/typesOfEducation.html"
		})
		.when( '/backend/hours', 
				{ controller : "hoursController",
				  templateUrl : contextPath + "/app/views/backend/hours.html"
		})
		.otherwise({redirectTo : "/backend/administrators"});
	

	$locationProvider.html5Mode(true);
}]);

