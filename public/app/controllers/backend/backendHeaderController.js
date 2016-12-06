app.controller('backendHeaderController',[ '$scope', '$http','$rootScope','contextPath',
   function($scope, $http,$rootScope, contextPath) {
	
	var url = contextPath + "/rest/profile",
		handlers;
	
	handlers = {
			goToPublic : function() {
				window.location.assign(contextPath);
			},
			logout : function() {
				window.location.assign(contextPath + "/logout");
			}	
	};
	
	$http.get(url)
		.success(function(data) {
			$rootScope.authUser = data;
			$rootScope.auth = true;
		})
		.error(function(data , status) {
			if(status === 401){
				window.location.assign(contextPath);
			}
		})
		
	
	$scope.admin = {};
	$scope.admins = [];
	_.extend($scope , handlers);
	$(".menu-nav li").removeClass('current');
	$("#administrators").addClass('current');
	
}]);