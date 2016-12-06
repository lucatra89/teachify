define(function (require) {
	
	var app = require('app'),
		_ = require("underscore"),
		$ = require("jquery"),
		lang = require("lang");
	
    
	app.controller('headerAuthController', ['$scope','$location','contextPath','$rootScope','$http','$q',
		function ($scope, $location , contextPath , $rootScope, $http, $q) {
		
			var deferred = $q.defer(),
				handlers = {
					goToHome : function(){
						$location.url(contextPath +'/');
					},
					goToDashboardStudent : function(){
						$location.url(contextPath + '/dashboard-student');
					},
					goToDashboardTutor : function(){
						$location.url(contextPath + '/dashboard-tutor');
					},
					
					goToBackend : function() {
						window.location.assign( contextPath + "/backend/administrators");

					},
					
					goToUpgrade : function() {
						$location.url(contextPath + '/upgrade');
					},

					toggleTutorMode : function(){
						$('#tutorMode').toggleClass('active');
					},
					
					goToProfile : function() {
						$location.url( contextPath + '/profile');
					},
					
					logout : function() {
						window.location.assign(contextPath + "/logout");
					}
			};
			
			$rootScope.userAuthLoaded = deferred.promise;
			
			
			$http.get(contextPath +'/rest/profile')
				.success(function(data) {
					$rootScope.authUser = data;
					$rootScope.auth = true;
					deferred.resolve();
			});

			_.each( handlers , function(handler, key){
				$scope[key] = handler;
			});		
			
			$scope.lang = lang;
			
			
	}]);

});
