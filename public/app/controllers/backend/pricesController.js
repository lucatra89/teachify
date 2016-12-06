app.controller('pricesController',[ '$scope', '$http','contextPath', function($scope, $http, contextPath) {
	
	var url = contextPath + "/rest/prices",
		handlers;
	
	handlers = {
			destroy : function(price) {
				$http.delete(url + "/" + price.id )
				.success(function() {
					$scope.prices = _.without($scope.prices ,price);
				});
			},
			
			create : function(price) {
				debugger;
				if(!price.value || price.value === "" || !_.isNumber(price.value) || _.findWhere($scope.prices, {value : price.value })){
					alert("Campo vuoto o errato");
					return;
				}
				$http.post(url , price)
					.success(function(id) {
						price.id = id;
						$scope.prices.push(price);
						$scope.price = {};
					});
			}
	};
	
	$http.get(url)
		.success(function(data) {
			$scope.prices = data;
		});
	
	$scope.price = {};
	$scope.prices = [];
	_.extend($scope , handlers);
	
	$(".menu-nav li").removeClass('current');
	$("#prices").addClass('current');
}]);