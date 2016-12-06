define(['app', 'lang'], function (app, lang) {

    app.controller('headerGuestController',['$scope','$location','contextPath','utilities',
		function ($scope, $location , contextPath, utilities) {
			$scope.goToRegister = function(){
				$location.url(contextPath +'/register');
			};

			$scope.goToRegisterTutor = function(){
				$location.url(contextPath +'/registertutor');
			};

			$scope.goToLogin = function(){
				$location.url(contextPath +'/login');
			};

			$scope.goToHome= function(){
				$location.url(contextPath +'/');
			};
			
			debugger;
			document.getElementById("signup").innerHTML = lang.signup;
			document.getElementById("signin").innerHTML = lang.signin;
			document.getElementById("teachnow").innerHTML = lang.teachnow;
			document.getElementById("teachnow").style.visibility = "visible";
			
	}]);
});
