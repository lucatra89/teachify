define(function (require) {
	
	var app = require('app'),
		$ = require('jquery'),
		L = require('leaflet'),
		_ = require('underscore'),
		lang = require('lang');
	require('services/validateForm');

	app.register.controller('registerTutorController',
    		['$scope','$location','$compile', 'partialsPath','contextPath','urlGeo', 'utilities','validateForm',
		function ($scope, $location, $compile ,partialsPath,contextPath, urlGeo, utilities, validateForm) {
			var form = document.forms[0];
    		$scope.modal = partialsPath + 'insertPosition.html';
    	
    		var handlers = {
    				savePosition : function() {
    	    	    	var query = $('[name="queryLocation" ]').val(),
    		    		promise = $.getJSON(urlGeo + query + "?format=json");
    		    		
    			    	promise.done(function(data) {
    			    		var $el;
    			    		
    						if(data.length === 0){
    							
    				    		$el = $($("#alertFailed").html());
    			    			$el.prependTo(".modal-body");
    						}else{
    							var lat = utilities.convertGeoCod(data[0].lat),
    								lon = utilities.convertGeoCod(data[0].lon);
    							
    							$el = $($("#alertSuccess").html());
    							
    							$el.find('#location_modal').text(data[0].display_name);
    							$('[name="location_name"]').val(data[0].display_name);
    							debugger;
    							
    							$('[name="location_latitude"]').val(lat);
    							$('[name="location_longitude"]').val(lon);
    							$el.find("#saved").text(lang.saved);
    			    			$el.prependTo(".modal-body"); 
    			    			
    						}
    							
    					});
    				}
    				
    		};
    		
    		validateForm(form);  	
    		$scope.lang = lang;
    		$scope.contextPath = contextPath;
    		_.extend($scope , handlers);
    		    	

	}]);
});
