define(function (require) {
	var app = require('app'),
		_ = require('underscore'),
		$ = require('jquery');
	

	app.register.factory('educationQFactory',['$q','contextPath', 
		function($q , contextPath){

			var rootPath = contextPath + "/rest",
			
			methods = {

				findAllSubjects: function() {
					var url = rootPath + "/subjects";

					return $q( function(resolve , reject){
						$.ajax({
								url :url,
								type: 'GET',
								dataType: 'json', 
								contentType: 'application/json',
								mimeType: 'application/json'
							})
							.done(function (data) {
								resolve({subjects : data});
							})
							.fail(function(){
								reject(300);
							});
					});
				},
				
				findAllTypesOfEdu : function() {
					var url = rootPath + "/typesofeducation";
					
					return $q( function(resolve , reject){
						$.ajax({
								url :url,
								type: 'GET',
								dataType: 'json', 
								contentType: 'application/json',
								mimeType: 'application/json'
							})
							.done(function (data) {
								resolve({typesOfEducation : data});
							})
							.fail(function(){
								reject();
							});
					});
				},
				
				findAllPrices : function() {
					var url = rootPath + "/prices";
					
					return $q( function(resolve , reject){
						$.getJSON(url)
							.done(function (data) {
								resolve({prices : data});
							})
							.fail(function(){
								reject();
							});
					});
				},
				
				findAllHours : function() {
					var url = rootPath + "/hours";
					
					return $q( function(resolve , reject){
						$.getJSON(url)
							.done(function (data) {
								resolve({hours : data});
							})
							.fail(function(){
								reject();
							});
					});
				}



		};


		return methods;
	}]);
});