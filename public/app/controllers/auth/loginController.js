define([ 'app' ], function(app) {

	app.register.controller('loginController', [ '$scope', '$location', 'contextPath', function($scope, $location, contextPath) {
		var form = document.forms[0], action = form.getAttribute('action');

		action = contextPath + action;
		form.setAttribute("action", action);

	} ]);
});
