define(function ( require ) {

	var app = require('app'),
		$ = require('jquery'),
		_ = require('underscore'),
		moment = require('moment');
	
	require('services/tutorQFactory');
	
	
	app.register.controller('updateDayController' , [ '$scope', 'utilities', 'tutorQFactory' , function($scope , utilities, tutorQFactory) {
		var tutor,
			dayValue,
			day,
			hours,
			availabilities,
			handlers,
			dayAvail;
		
		
		
		function checkInterval(from , to) {
			var result = true;
			
			if(!(to.value > from.value) )
				return false;
			
			if(!dayAvail || dayAvail.length == 0)
				return true;
			
			for (var i = 0; i < dayAvail.length && result ; i++) {
				var _from = dayAvail[i].from,
					_to = dayAvail[i].to,
					cond1 = from.value < _from.value && to.value < _from.value,
					cond2 = from.value > _to.value;
				
				if(!(cond1 || cond2))
					result = false;

			}
			
			return result;
		}
		
		$('#modalUpdateDay').on('show.bs.modal', function (event) {
			  var currentLang = moment.locale();
			  moment.locale('en');
			  tutor = $scope.$parent.tutor;
			  dayValue = $(event.relatedTarget) .data('day');
			  hours = $scope.$parent.hours;
			  day = moment().isoWeekday(dayValue).format('dddd');
			  availabilities = $scope.$parent.tutor.availabilities;
			  dayAvail = $scope.availabilities = availabilities[dayValue].items  ;
			  
			  moment.locale(currentLang);
			  utilities.refreshScope();
		});
		

		handlers = {
				deleteAvailability : function(availability){
					tutorQFactory.deleteAvailability(tutor , availability)
					.then(function () {
						dayAvail = $scope.availabilities = availabilities[dayValue].items  = _.without(dayAvail , availability);
					});
				},
				
				addAvailability : function() {
					var fromId = JSON.parse( $('[name="from"]').val()),
						toId = JSON.parse( $('[name="to"]').val()),
						from = _.findWhere(hours , {id : fromId }),
						to = _.findWhere( hours , {id : toId}),
						newAvail = {
							from : from,
							to : to,
							day : day
					};
					
					if( checkInterval(from , to) )
						tutorQFactory.addAvailability(tutor , newAvail)
						.then(function (id) {
							newAvail.id = id;
							dayAvail.push(newAvail);
						});
					else
						window.sweetAlert('Error', '', 'error');

						
				}
		};
		
		_.extend($scope , handlers);
		
	}]);
});
	