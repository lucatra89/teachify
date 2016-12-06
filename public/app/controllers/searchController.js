
define(function (require) {
	var _ = require('underscore'),
		$ = require('jquery'),
		L = require('leaflet'),
		app = require('app'),
		lang = require('lang');

	require('services/tutorQFactory');
	require('services/educationQFactory');
	
	

    app.register.controller('searchController',
    	['$scope','$location', '$routeParams','$q', '$http' ,'$timeout', 'tutorQFactory','educationQFactory','urlGeo', 'utilities', 'contextPath',
		function ($scope, $location, $routeParams, $q,$http, $timeout , tutorQFactory, educationQFactory , urlGeo, utilities, contextPath) {

			var location = $scope.location = $routeParams.location,
				subject = JSON.parse($routeParams.subject),
				typeOfEducation = JSON.parse($routeParams.typeOfEducation),
				promises = [educationQFactory.findAllSubjects(), educationQFactory.findAllTypesOfEdu()],
				tutors = $scope.tutors = [],
				resources,
				index = 0,
				windowEnd = 20,
				map;
									
			
			function loadTutor(data) {
				var uri = data.uri,
					distance = data.distance,
					lat , lon;
				
				$http.get(uri)
				.success(function(tutor) {
					
					tutors.push(tutor);
					tutor.distance = utilities.metersToKm(distance);;
					lat = tutor.location.latitude,
					lon = tutor.location.longitude;	
					utilities.addMapMarker(map , lat , lon , tutor.name + " " + tutor.surname);
				});
			}
			
			function reload() {
				if(!$scope.location){
					window.sweetAlert("Ops...", "Inserisci un luogo!", "warning");
					return;
				}

				location = $scope.location;
				
				subject =JSON.parse( $("#subject").val() );
				typeOfEducation =JSON.parse( $("#typeOfEducation").val() );
				
				utilities.removeMap(map).then(search);
			}

			function search() {
				index = 0;
				windowEnd = 20;
				tutors = $scope.tutors = [];
					
				$.getJSON(urlGeo + location +"?format=json")
				.done(function(data){
					
					var latitude = (data[0]) ? utilities.convertGeoCod(data[0].lat) : 0,
						longitude =(data[0]) ? utilities.convertGeoCod(data[0].lon) : 0;
										
					var promise = tutorQFactory.findTutors(latitude , longitude , subject , typeOfEducation);
					promise.then(
						function(data){
							map = utilities.createMap(latitude , longitude);
							
							for (; index < data.length &&index<windowEnd ; index++) {
								loadTutor(data[index]);
							}
							windowEnd += index;
							resources = data;
						},
						function() {
							window.sweetAlert('Errore', '', 'error');
						}
					);
										
				});
			}
			
			$scope.goToTutor = function (tutorId){
				$location.url(contextPath +'/tutor/' + tutorId);
			};
			
			
			$scope.next = function() {
				for (; index < resources.length && index<windowEnd ; index++) {
					loadTutor(resources[index]);
				}
				windowEnd += index;
			}
			
			
				
				
			$("#location").keyup(function(e) {
				if(e.keyCode == 13)
					reload();
			});
			
			
			$("#subject").change(reload);
			$("#typeOfEducation").change(reload);
			
			
			
			$q.all(promises).then(
					function(dataList){
						var args = _.union([$scope] ,dataList);
						_.extend.apply( _ ,args);
						utilities.refreshScope();
			});
		
			search();
			$scope.lang = lang;



	}]);
});
