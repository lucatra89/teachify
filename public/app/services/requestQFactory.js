define(function (require) {
	var app = require('app'),
		_ = require('underscore'),
		$ = require('jquery');


	app.register.factory('requestQFactory',[ '$q','contextPath', 'utilities',
	    function($q, contextPath, utilities){
		
			var url = contextPath + "/rest/requests";
			
			
			return {
				createRequest: function(request) {
					return $q(function (resolve , reject) {
						$.ajax({
							url :url,
							type: 'POST',
							data : JSON.stringify(request),
							dataType: 'json', 
							contentType: 'application/json',
							mimeType: 'application/json'
						})
						.success(function(id) {
							resolve(id);
						});
					});
				},
				
				
				checkStatusRequest: function(tutor) {
					return $q(function (resolve , reject) {
						$.ajax({
							url :url + '/isrequested',
							type: 'POST',
							data : JSON.stringify({id : tutor.id}),
							contentType: 'application/json'
						})
						.done(function(id, textStatus , jqXHR) {
							if(jqXHR.status == 200){
								resolve(id);
							}
							if(jqXHR.status == 204)
								resolve("Unrequested");
							utilities.refreshScope();
						});
					});
				},
				
				findWaiting: function (tutor) {
					return $q(function (resolve , reject) {
						$.ajax({
							url :url + '?tutor=' + tutor.id + "&status=Waiting",
							type: 'GET'
						})
						.done(function(requests){
							console.log("Response received...");
							resolve({requests : requests});
						});
					});
				},
				
				findByUser : function(user) {
					return $q(function (resolve , reject) {
						$.ajax({
							url :url + '?user=' + user.id,
							type: 'GET',
							dataType: 'json', 
							contentType: 'application/json',
							mimeType: 'application/json',
						})
						.done(function(requests) {
							resolve({requests : requests});
						});
					});
				},
				
				changeStatus : function (request, status) {
					return $q(function (resolve , reject) {
						$.ajax({
							url :url + '/' + request.id + '/status' ,
							type: 'PUT',
							data : JSON.stringify({status : status}),
							dataType: 'json', 
							contentType: 'application/json',
							mimeType: 'application/json'
						})
						.done(function() {
							resolve();
						});
					});
				}
			};
			
	}]);
});
