app.controller('menuController',[ '$scope', '$location', 'contextPath', function($scope, $location, contextPath) {
	var handlers ={
			goToAdministrators: function() {
				$location.url("/backend/administrators");
			},
			goToSubjects: function() {
				$location.url("/backend/subjects");
			},
			goToTypesOfEducation: function() {
				$location.url("/backend/typesofeducation");
			},
			goToPrices: function() {
				$location.url("/backend/prices");
			},
			goToHours: function() {
				$location.url("/backend/hours");
			}
	};
	
	
	for(key in handlers){
		if(handlers.hasOwnProperty(key))
			$scope[key] = handlers[key];
	}
	debugger;
}]);