app.controller('typesOfEducationController',[ '$scope', '$http','contextPath', function($scope, $http, contextPath) {
	
	var url = contextPath + "/rest/typesofeducation",
		handlers = {
			
			update : function(typeofeducation) {
				typeofeducation.toUpdate = !typeofeducation.toUpdate;
			},
			
			save : function(typeofeducation) {
				var data = angular.copy(typeofeducation);
				delete data.toUpdate;
				
				$http.put(url + "/" + typeofeducation.id , data)
					.success(function() {
						typeofeducation.toUpdate = !typeofeducation.toUpdate;
				});
			},
			
			destroy : function(typeofeducation) {
				$http.delete(url + "/" + typeofeducation.id )
					.success(function() {
						$scope.typesofeducation = _.without($scope.typesofeducation ,typeofeducation);
				});
			},
			create : function(typeofeducation) {
				if(!typeofeducation.name || typeofeducation.name === "" || _.findWhere($scope.typesofeducation,{name : typeofeducation.name} )){
					alert("Campo vuoto");
					return;
				}
				$http.post(url , typeofeducation)
					.success(function(id) {
						typeofeducation.id = id;
						$scope.typesofeducation.push(typeofeducation);
						$scope.typeofeducation = {};
					});
			}
	};
	
	
	$http.get(url)
		.success(function(data) {
			$scope.typesofeducation = data;
			debugger;
			for(var i = 0 ; i< data.length ; i++)
				data[i].toUpdate = false;
	});
	
	
	
	$scope.typesofeducation = [];
	$scope.typeofeducation = {};
	
	_.extend($scope , handlers);
	$(".menu-nav li").removeClass('current');
	$("#typesofeducation").addClass('current');
}]);