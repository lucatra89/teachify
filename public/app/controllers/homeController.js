define( function (require) {

	var app = require('app'),
		_ = require('underscore'),
		$ = require('jquery'),
		L = require('leaflet'),
		//css  = require('text!/teachify/resources/css/home.css!strip'),
		lang = require('lang');
	debugger;

	require('services/educationQFactory');
	
    app.register.controller('homeController',
		['$scope','$location','$q','$timeout', '$compile', 'educationQFactory', 'contextPath','utilities',
		function ($scope, $location, $q, $timeout, $compile , educationQFactory , contextPath, utilities) {
			var style, promises;
			
			promises = [educationQFactory.findAllSubjects(), educationQFactory.findAllTypesOfEdu()];
			
			$q.all(promises).then(
					function(dataList){
						var args = _.union([$scope] ,dataList);
						_.extend.apply( _ ,args);
						utilities.refreshScope();
			});


			$scope.goToSearch = function (){

				var location = $('#location').val(),
					subject = $("#subject").val(),
					typeOfEducation = $("#typeOfEducation").val(),
					query;
				
				if(!location){
					window.sweetAlert("Ops..", 'Campo di ricerca vuoto', 'warning');
					return;
				}
					
				query = "?location=" + location;
				query += "&subject=" + subject;
				query += "&typeOfEducation=" + typeOfEducation;

				$location.url( contextPath + '/search' + query );
			};
			
			$scope.contextPath = contextPath;
			$scope.lang = lang;

	}]);
});
