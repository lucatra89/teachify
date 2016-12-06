define(function (require) {
	var app = require('app'),
		_ = require('underscore'),
		$ = require('jquery');


	app.register.factory('userQFactory',[ '$q','contextPath','utilities',
	    function($q, contextPath, utilities){
			
			function unauthorizedHandler(){
				window.location.assign(contextPath + "/accessdenied");
			}
			
			return {
				findProfile : function(id) {
					var url = contextPath + '/rest/profile';
					
					return $q(function(resolve, reject) {
						$.ajax({
								url :url,
								type: 'GET',
								dataType: 'json',
								  statusCode: {
								    404: unauthorizedHandler
								  }
							})
							.done(function(data){
								resolve({profile : data});
							})
							.fail(reject);
					});
				},
				
				updateUser : function(user) {
					
					var url = contextPath + '/rest/profile/' + user.id;
					
					return $q(function(resolve, reject) {
						var promise =$.ajax({
							url : url,
							type : 'PUT',
							dataType : 'json',
							contentType: 'application/json',
							mimeType: 'application/json',
							data : JSON.stringify(user)
						});
						
						promise.done(function(data){
									resolve({profile : data});
						});
						
						promise.fail(reject);
					});
					
				}
					
				
			};
		}
	]);
});