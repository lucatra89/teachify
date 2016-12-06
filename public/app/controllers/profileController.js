define( function ( require ) {
	
	var app = require('app'),
		$ = require('jquery'),
		_ = require('underscore'),
		lang = require('lang');
	
	require('services/userQFactory');
	

    app.register.controller('profileController', ['$scope','userQFactory','$rootScope',
		function ($scope, userQFactory, $rootScope) {
    	
	    	function updateImg(file) {
    				var reader = new FileReader(),
    				preview = document.getElementById("profile");
  	    			
  	    			//Se non c'è la preview vuol dire che è stata eliminata (onerror)
	    			//Quindi creo di nuovo l'elemento
  	    			if(!preview){
  	    				preview = document.createElement('img');
    					preview.id = "profile";
    					$(preview).appendTo("#tutor-profile");
  	    			}
    			
  	    			reader.onloadend = function() {
  	    				preview.src = reader.result;
  	    				$scope.profile.photo = reader.result.split('base64,')[1];
  	    			};
    			
  	    			if (file) {
  	    				reader.readAsDataURL(file);
  	    			} else {
  	    				preview.src = "";
  	    			}					
			}
    	
    		function onChangeImg() {
	  	    		var ext = this.value.split('.').pop().toLowerCase(),
	    			isImg = _.contains(['jpg', 'jpeg', 'gif', 'png'], ext);
	  	    		if(!isImg){
	  	    			alert('Formato non valido');
	  	    			this.value = null;
	  	    		}else{
	  	    			updateImg(this.files[0]);
	  	    		}
	    		
	    	}

    		
			$scope.updateProfile = function() {
				debugger;
				userQFactory.updateUser($scope.profile)
					.then(function(data) {
						$rootScope.authUser = $scope.profile;
						window.sweetAlert("ok!", lang.saveSuccess, "success");
					});
			}
			
			userQFactory.findProfile()
				.then(function(data){
					debugger;
					_.extend($scope , data);
				});
    		
			
    		$('#photo').change(onChangeImg);
    		
    		
    		$scope.lang = lang;
       	
	}]);
});
