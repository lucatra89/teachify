define(function (require) {
	var app = require('app'),
		_ = require('underscore'),
		$ = require('jquery');


	app.register.factory('tutorQFactory',[ '$q','contextPath', 'utilities',
	    function($q, contextPath, utilities){
		
			var tutorPath = contextPath + "/rest/tutors/";

			return {
							
				findTutors : function(latitude , longitude , subjectId , typeOfEduId){
					
					var url = tutorPath + "search",
						data = {
							latitude :latitude,
							longitude : longitude,
							subjectId : subjectId,
							typeOfEducationId : typeOfEduId
					};
					
					
	
					return $q( function(resolve , reject){
						$.ajax({
								url :url,
								type: 'POST',
								data : JSON.stringify(data),
								dataType: 'json', 
								contentType: 'application/json',
								mimeType: 'application/json'
							})
							.done(function (tutorInfos) {
								resolve(tutorInfos);
							})
							.fail(function(){
								reject();
							});
					});
				},
				
				
				findTutorById : function(id){
					var url = tutorPath + id;
					
					return $q( function(resolve , reject){

						$.ajax({
								url :url,
								type: 'GET',
								dataType: 'json'
							})
							.done(function (tutor) {
								tutor.rating = tutor.rating.toFixed(1).replace(".0", "");
								tutor.lessons = utilities.formatLessons(tutor.lessons);
								tutor.availabilities = utilities.formatAvailabilities(tutor.availabilities);
								resolve({tutor : tutor});
							})
							.fail(function(){
								reject();
							});
					});
				},
				
				
				createFeedback: function(tutor , feedback){
					var url = tutorPath + tutor.id +'/feedback';
					
					return $q( function(resolve , reject){

						$.ajax({
								url :url,
								type: 'POST',
								data : JSON.stringify(feedback),
								dataType: 'json', 
								contentType: 'application/json',
								mimeType: 'application/json'
							})
							.done(function(data) {
								resolve(data);
							});
					});
				},
				findFeedbackResources : function(tutor){
					var url = tutorPath + tutor.id + '/feedback';
					return $q( function(resolve , reject){
						$.ajax({
							url :url,
							type: 'GET',
							dataType: 'json', 
							contentType: 'application/json',
							mimeType: 'application/json',
						})
						.done(function(data) {
							resolve(data);
						});
					});
					
				},
								
				
				updateTutorDescription : function(tutor) {
					return $q(function(resolve , reject) {
						$.ajax({
							url :tutorPath + tutor.id + "/description",
							type: 'PUT',
							data :JSON.stringify({"description":tutor.description}),
							dataType: 'json', 
							contentType: 'application/json',
							mimeType: 'application/json'
						})
						.done(function() {
							resolve();
						});
					});
				},
				
				updateTutorLocation : function(tutor) {
					return $q(function(resolve , reject) {
						$.ajax({
							url :tutorPath + tutor.id + "/location",
							type: 'PUT',
							data : JSON.stringify(tutor.location),
							dataType: 'json', 
							contentType: 'application/json',
							mimeType: 'application/json'
						})
						.done(function() {
							resolve();
						});
					});
				},
				
				updateTutorPrice : function(tutor) {
					return $q(function(resolve , reject) {
						$.ajax({
							url :tutorPath + tutor.id + "/price",
							type: 'PUT',
							data : JSON.stringify(tutor.price),
							dataType: 'json', 
							contentType: 'application/json',
							mimeType: 'application/json'
						})
						.done(function() {
							resolve();
						});
					});
				},
				updateTutorContact : function(tutor) {
					return $q(function(resolve , reject) {
						$.ajax({
							url :tutorPath + tutor.id + "/contact",
							type: 'PUT',
							data : JSON.stringify(tutor.contact),
							dataType: 'json', 
							contentType: 'application/json',
							mimeType: 'application/json'
						})
						.done(function() {
							resolve();
						});
					});
				},
				
				addLesson : function(tutor , lesson){
					return $q(function(resolve , reject) {
						$.ajax({
							url :tutorPath + tutor.id + "/lessons",
							type: 'POST',
							data : JSON.stringify(lesson),
							dataType: 'json', 
							contentType: 'application/json',
							mimeType: 'application/json'
						})
						.done(function(id) {
							resolve(id);
						});
					});
				
				},
				deleteLesson : function(tutor , lesson){
					return $q(function(resolve , reject) {
						$.ajax({
							url :tutorPath + tutor.id + "/lessons/" + lesson.id ,
							type: 'DELETE',
							dataType: 'json', 
							contentType: 'application/json',
							mimeType: 'application/json'
						})
						.done(function() {
							resolve();
						});
					});
				
				},
				addAvailability : function(tutor , availability){
					return $q(function(resolve , reject) {
						$.ajax({
							url :tutorPath + tutor.id + "/availabilities",
							type: 'POST',
							data : JSON.stringify(availability),
							dataType: 'json', 
							contentType: 'application/json',
							mimeType: 'application/json'
						})
						.done(function(id) {
							resolve(id);
						});
					});
				
				},
				deleteAvailability : function(tutor , availability){
					return $q(function(resolve , reject) {
						$.ajax({
							url :tutorPath + tutor.id + "/availabilities/" + availability.id ,
							type: 'DELETE',
							dataType: 'json', 
							contentType: 'application/json',
							mimeType: 'application/json'
						})
						.done(function() {
							resolve();
						});
					});
				
				},	
				
		};
	}]);
});