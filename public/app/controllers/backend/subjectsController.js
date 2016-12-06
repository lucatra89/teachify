app.controller('subjectsController',[ '$scope', '$http','contextPath', function($scope, $http, contextPath) {
	
	var url = contextPath + "/rest/subjects",
		handlers = {
			
			update : function(subject) {
				subject.toUpdate = !subject.toUpdate;
			},
			
			save : function(subject) {
				var data = angular.copy(subject);
				delete data.toUpdate;
				
				$http.put(url + "/" + subject.id , data)
					.success(function() {
						subject.toUpdate = !subject.toUpdate;
				});
			},
			
			destroy : function(subject) {
				$http.delete(url + "/" + subject.id )
					.success(function() {
						$scope.subjects = _.without($scope.subjects ,subject);
				});
			},
			
			create : function(subject) {
				if(!subject.name || subject.name === ""|| _.findWhere($scope.subjects , {name : subject.name})){
					alert("Campo vuoto");
					return;
				}
				$http.post(url , subject)
					.success(function(id) {
						subject.id = id;
						$scope.subjects.push(subject);
						$scope.subject = {};
					});
			}
	};
	
	$scope.subject = {};
	$scope.subjects = [];
	
	
	$http.get(url)
		.success(function(data) {
			$scope.subjects = data;
			debugger;
			for(var i = 0 ; i< data.length ; i++)
				data[i].toUpdate = false;
	});
	
	
	_.extend($scope , handlers);
	
	$(".menu-nav li").removeClass('current');
	$("#subjects").addClass('current');
	
}]);