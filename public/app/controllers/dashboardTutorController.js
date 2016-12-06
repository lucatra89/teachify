define(function ( require ) {

	var app = require('app'),
		$ = require('jquery'),
		_ = require('underscore'),
		lang = require('lang');
	
	require('services/tutorQFactory');
	require('services/educationQFactory');
	require('controllers/sub/addSubjectController');
	require('controllers/sub/updateSubjectController');
	require('controllers/sub/updateDayController');
	require('controllers/sub/allFeedbackController');
	require('controllers/sub/waitingRequestsController');
	

    app.register.controller('dashboardTutorController',
    	['$scope','$q','$http' ,'$location','$rootScope','tutorQFactory','educationQFactory','utilities','partialsPath','urlGeo',
    	function ($scope, $q, $http , $location, $rootScope, tutorQFactory, educationQFactory,  utilities, partialsPath, urlGeo) {
    	
    	var stop , tutor, feedbacks = $scope.feedbacks =[];
    	
    	
    	$scope.modalUpdateSubject = partialsPath + 'updateSubject.html';
    	$scope.modalAddSubject = partialsPath + 'addSubject.html';
    	$scope.modalUpdateDay = partialsPath + 'updateDay.html';
    	$scope.modalFeedback = partialsPath + 'allFeedback.html';
    	$scope.waitingsRequests = partialsPath + 'waitingsRequests.html';
    	$scope.modalPosition = partialsPath + 'insertPosition.html';

    	
    	//---------Load tutor info
    	function loadFeedback(uri) {
    		console.log(uri);
			$http.get(uri)
			.success(function(feedback) {
				debugger;
				utilities.formatFeedback(feedback);
				feedbacks.push(feedback);
			});
		}
    	
    	
    	
    	function findTutor() {
    		tutorQFactory.findTutorById($rootScope.authUser.id)
    			.then(function(data) {
    				_.extend($scope , data);
    				tutor = data['tutor'];
    				$scope.$emit('tutorLoaded');
    				
    		});    		 
		}
    	
    	$rootScope.userAuthLoaded
    	.then(function() {
    		tutor = { id : $rootScope.authUser.id};
    		findTutor();
			tutorQFactory.findFeedbackResources(tutor)
			.then(function(resources) {
				for (var i = 0; i < 3 && i < resources.length; i++) {
					loadFeedback(resources[i])
				}
				$scope.feedbackResources = resources.slice(3,resources.length);
				
			});
		});
    	
    	//----------End
    	
    	
    	//----Populate
		var promises = [
		                educationQFactory.findAllSubjects(),
		                educationQFactory.findAllTypesOfEdu(),
		                educationQFactory.findAllPrices(),
		                educationQFactory.findAllHours(),
		 ];
		
		$q.all(promises).then(
				function(dataList){
					var args = _.union([$scope] ,dataList);
					_.extend.apply( _ ,args);
					utilities.refreshScope();
    				if($scope.tutor){
   						selectPrice(tutor , $scope.prices);
    				}else{
						$scope.$on('tutorLoaded', function() {
							selectPrice(tutor , $scope.prices);
						});
    				}

		});
    	//----
    	
    	
    	//Modal change position
		debugger;
    	
    	$scope.savePosition = function() {
	    	var query = $('[name="queryLocation" ]').val(),
    		promise = $.getJSON(urlGeo + query + "?format=json");
    		
	    	promise.done(function(data) {
	    		var $el;
	    		debugger;
				if(data.length === 0){
					
		    		$el = $($("#alertFailed").html());
	    			$el.prependTo(".modal-body");
				}else{
					var lat = data[0].lat.substring(0 , data[0].lat.length - 2 ),
						lon = data[0].lon.substring(0 , data[0].lon.length - 2 );
					
					$el = $($("#alertSuccess").html());
					
					$el.find('#location_modal').text(data[0].display_name);
					$el.find('#saved').text(lang.saved);
					$el.find('#saved').after(lang.confirmPosition)

					tutor.location.latitude = lat;
					tutor.location.longitude = lon;
					tutor.location.name = data[0].display_name;
					utilities.refreshScope();

					
					tutorQFactory.updateTutorLocation(tutor)
					.then(function() {
						$el.prependTo(".modal-body"); 
					});
				}
	    	});
    	};
    	
    	//-----------End
   
    	//Change Description on blur
    	
    	function changeDescription() {
			tutorQFactory.updateTutorDescription(tutor)
				.then(function() {
					sweetAlert(lang.updated, '', 'success');
				});
		}
    	$scope.changeDescription = changeDescription;
    	
    	//Change price
    	function selectPrice(tutor , prices) {
			tutor.price = _.findWhere(prices , {id : tutor.price.id});
		}
    	
    	function changePrice() {
			tutorQFactory.updateTutorPrice(tutor)
			.then(function() {
				sweetAlert(lang.updated, '', 'success');
			});
			
		}
    	
    	
    	$scope.changePrice = changePrice;
    	
    	
    	//Change Contact
    	
    	function changeContact() {
			tutorQFactory.updateTutorContact(tutor)
			.then(function() {
				sweetAlert(lang.updated, '', 'success');
			});
		}
    	
    	$scope.changeContact = changeContact;
    	
    	$scope.lang = lang;
    	
    	
    
    }]);
    
    
});
