app.controller('administratorsController',[ '$scope', '$http','contextPath', function($scope, $http, contextPath) {
	
	var url = contextPath + "/rest/admins",
		handlers;
	
	handlers = {
			destroy : function(admin) {
				$http.delete(url + "/" + admin.id )
				.success(function() {
					$scope.admins = _.without($scope.admins ,admin);
				});
			},
			
			create : function(admin) {
				if(!admin.email || admin.email === "" || _.findWhere($scope.admins, {email :admin.email }) ){
					alert("Campo errato");
					return;
				}
				$http.post(url , admin)
					.success(function(id) {
						admin.id = id;
						$scope.admins.push(admin);
						$scope.admin = {};
					})
					.error(function() {
						alert("L'utente potrebbe non essere registrato al sistema");
					})
			}
	};
	
	$http.get(url)
		.success(function(data) {
			$scope.admins = data;
		});
	
	$scope.admin = {};
	$scope.admins = [];
	_.extend($scope , handlers);
	$(".menu-nav li").removeClass('current');
	$("#administrators").addClass('current');
	
}]);