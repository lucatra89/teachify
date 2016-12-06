
define(function (require) {
	var app = require('app'),
		$ = require('jquery'),
		_ = require('underscore'),
		lang = require('lang');

	
	require('services/tutorQFactory');
	require('services/requestQFactory');
	require('controllers/sub/allFeedbackController');
	
    app.register.controller('tutorController', ['$scope','$location','$http','tutorQFactory','requestQFactory','$routeParams', 'utilities', 'partialsPath','$timeout','$window','$rootScope',
		function ($scope, $location,$http, tutorQFactory,requestQFactory,$routeParams ,utilities, partialsPath, $timeout, $window, $rootScope) {

			var feedback = $scope.feedback = {},
				feedbacks = $scope.feedbacks = [],
				request = $scope.request = {},
				tutor,
				statusReq = $scope.statusReq = {val : "Unrequested"},
				handlers = {
					addFeedback : function() {
						feedback.rating = $(".active [type='radio']").val();
						tutorQFactory.createFeedback(tutor , feedback)
							.then(function(id) {
								feedback.id = id;
								feedback.user = $rootScope.authUser;
								feedbacks.push(feedback)
								feedback = $scope.feedback = {};
								$('#modalFeedback').modal('hide');

								utilities.refreshScope();
								
						});
					},
					
					sendRequest : function() {
						requestQFactory.createRequest(request).then(
							function() {
								$('#modalRequest').modal('hide');
								statusReq.val = "Waiting";
								utilities.refreshScope();
							}
						);
					}
				},
				modals = {
					modalFeedback : partialsPath + 'addFeedback.html',
					modalRequest : partialsPath + 'sendRequest.html',
			    	modalAllFeedback : partialsPath + 'allFeedback.html'

				};
			
	    	function loadFeedback(uri) {
				$http.get(uri)
				.success(function(feedback) {
					utilities.formatFeedback(feedback);
					feedbacks.push(feedback);
				});
			}
    		
    		tutorQFactory.findTutorById($routeParams.id)
    			.then(function(data) {
    				var lat = data['tutor'].location.latitude,
    					lon = data['tutor'].location.longitude,
    					map = utilities.createMap(lat , lon);

    				tutor = data['tutor'];
    				request.tutor = {id : tutor.id};
    				_.extend($scope , data);
    				utilities.addMapMarker(map ,lat, lon);

    				requestQFactory.checkStatusRequest(tutor)
        			.then(function(status) {
    					statusReq.val = status;
        			});
    				
    				tutorQFactory.findFeedbackResources(tutor)
    				.then(function(resources) {
    					for (var i = 0; i < 3 && i < resources.length; i++) {
    						loadFeedback(resources[i])
						}
						$scope.feedbackResources = resources.slice(3,data.length);
						
					});
    				
    				
    				$timeout(initTooltip);

			});
    		
    		function initTooltip() {
				  $('[data-toggle="tooltip"]').tooltip();
			}
    		
    		function goBack() {
    			$window.history.back();
			}
    		
    		$scope.goBack = goBack;
    		
    		_.extend($scope , handlers , modals);
    		$scope.lang = lang;
    		
    	
	}]);
});
