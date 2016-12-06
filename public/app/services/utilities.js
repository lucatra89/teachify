define(function (require) {
	
	var app = require('app'),
		L = require('leaflet'),
		_ = require('underscore'),
		moment = require('moment'),
	
		cssMap = {
			'Elementari' : 'primary',
			'Medie' : 'secondary',
			'Superiori' : 'high',
			'Universita' : 'uni',
			'Extra' : 'extra'
		},
	
		dayMap = {		
			'Monday' : 1,
			'Tuesday' : 2,
			'Wednesday' : 3,
			'Thursday' : 4,
			'Friday' : 5,
			'Saturday' : 6,
			'Sunday' : 7
		};
	
	app.factory('utilities',['contextPath' , '$q', '$timeout', function(contextPath , $q, $timeout) {
		return {
			
			convertGeoCod: function(cod) {
				return JSON.parse(cod.substring(0 , cod.length - 2 ));
			}, 
			
			createMap : function(lat , long){
				var map = L.map('map').setView([lat, long], 9),
			      layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			          attribution: 'Map data &copy; OpenStreetMap',
			          maxZoom: 20,
			        });

				map.addLayer(layer);
				return map;
			},
			
			addMapMarker: function(map , lat , long, message) {
			    var positionIcon = L.icon({
			        iconUrl: contextPath +'/img/flatMarker3.png',
			        iconSize: [22, 26],
			      }),
			      marker = L.marker([lat , long], {
				        	icon: positionIcon
			      }).addTo(map);
			    
			    if(message)
			    	marker.bindPopup(message);
			      
			},
			
			metersToKm: function(meters){
			  return Math.floor(meters/1000);
			},
			
			
			removeMap: function(map){
				
				var promise  = $q( function(resolve){
					map.on('unload', function() {
						resolve();
					});
				});
				
				map.remove();
				
				return promise;

				
			},
			
			
			formatLessons: function(lessons){
				var result,
					self = this;
				
				result = _.groupBy(lessons , function(lesson) {
					return lesson.subject.name;
				});

				result =  _.each(result, function(_lessons) {
					for (var i = 0 ; i < _lessons.length; i++){
						_lessons[i] = self.formatLesson(_lessons[i])
					}
				});
				return result;
				
			},
			
			formatLesson: function(lesson){
				
				lesson.typeOfEducation = lesson.typeOfEducation || lesson.type_of_education;
				delete lesson.type_of_education;
				lesson.typeOfEducation.css = cssMap[lesson.typeOfEducation.name] || 'extra';
				lesson.typeOfEducation.cssBig = (cssMap[lesson.typeOfEducation.name] || 'extra') + '-big';
				return lesson;
			},
			
			formatAvailabilities: function(availabilities){
				var result = {},
					rough,
					dayWeek,
					newKey;				
				

				rough = _.groupBy(availabilities , function(availability) {
					return availability.day;
				});
				
				for( key in dayMap){
					if(_.has(dayMap , key)){
						dayWeek = dayMap[key];
						dayName = moment().isoWeekday(dayWeek).format('dddd');
						result[dayWeek] = {dayName : dayName};
						result[dayWeek].items = rough[key] || [];
					}
				}
				
				return result;
				
			},
			
			
			
			formatFeedback : function(feedback){
				debugger;
				feedback.displayTime = moment(feedback.created_at).fromNow();
				feedback.createdAt = moment(feedback.created_at).unix();
				return feedback;
			},
			
			
			refreshScope: function(){
				$timeout(function(){});
			}
			
		};
	}]);
	

});