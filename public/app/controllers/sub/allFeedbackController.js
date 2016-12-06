define(function ( require ) {

	var app = require('app'),
		$ = require('jquery'),
		_ = require('underscore');
	
	require('services/tutorQFactory');
	

	
	app.register.controller('allFeedbackController' , [ '$scope', 'utilities', '$http' , function($scope , utilities, $http) {
		var windowLength = 2,
			i = 0,
			resources,
			feedbacks;
		
		
		function loadNexts(){
			var last = i + windowLength;
			for (; i < resources.length && i < last  ; i++) {
				$http.get(resources[i])
				.success(function(feedback) {
					utilities.formatFeedback(feedback);
					feedbacks.push(feedback);
				});
			}
		}
				
		
		$('#modalAllFeedback').on('show.bs.modal', function (event) {
			feedbacks = $scope.feedbacks = $scope.$parent.feedbacks.slice();
			resources = $scope.$parent.feedbackResources;
		});
		
		$scope.loadNexts = loadNexts;
			
	}]);
});