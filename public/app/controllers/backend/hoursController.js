app.controller('hoursController',[ '$scope', '$http','contextPath', function($scope, $http, contextPath) {
	
	var url = contextPath + "/rest/hours",
		handlers;
	
	handlers = {
			destroy : function(hour) {
				$http.delete(url + "/" + hour.id )
				.success(function() {
					$scope.hours = _.without($scope.hours ,hour);
				});
			},
			
			create : function(hour) {
				debugger;
				if(!hour.value || hour.value === "" || !_.isNumber(hour.value) || _.findWhere($scope.hours, {value : hour.value })){
					alert("Campo vuoto o errato");
					return;
				}
				$http.post(url , hour)
					.success(function(id) {
						hour.id = id;
						$scope.hours.push(hour);
						$scope.hour = {};
					});
			}
	};
	
	$http.get(url)
		.success(function(data) {
			$scope.hours = data;
		});
	
	$scope.hour = {};
	$scope.hours = [];
	_.extend($scope , handlers);
	$(".menu-nav li").removeClass('current');
	$("#hours").addClass('current');

}]);