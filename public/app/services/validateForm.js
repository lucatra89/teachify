define(function (require) {
	
	var app = require('app'),
		_ = require('underscore'),
		$ = require('jquery');
	
	
	app.register.factory('validateForm',function() {
		var valid = true,
		$form;
	
		 function isEmpty() {
			if(!this.value || this.value === ""){
				valid = false;
				debugger;
			}
		}
		 
		function checkPasswords() {
			var password = $form.find("[name='password']").val() ,
			match = $form.find("[name='matchpassword']").val();
			
			if(password !== match){
				valid = false;
				debugger;
			}
		}
		 
		function validate(event) {
			
			$form
				.find(".required")
				.each(isEmpty);
			
			checkPasswords();
			
			if(!valid){
				window.sweetAlert("Attenzione", "Campi Errati" , "error");
				valid = true;
				event.preventDefault();
			}
		}
		
		
		
		return function(form) {
			$form = $(form);
			$form.submit(validate);
		};
		
	});
	

});