define(function ( require) {
	var contextPath = '',
		app;	
	
    app = angular.module('teachifyApp', ['routeResolverServices', 'ngRoute']);
    	
    
    app.constant('contextPath', contextPath);
    app.constant('partialsPath', contextPath + '/app/views/partials/');
    app.constant('urlGeo', "http://nominatim.openstreetmap.org/search/");
    
    
    
    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider',
                '$compileProvider', '$filterProvider', '$provide', '$locationProvider',
        function ($routeProvider, routeResolverProvider, $controllerProvider,
                  $compileProvider, $filterProvider, $provide, $locationProvider) {
    	    		
            //Change default views and controllers directory using the following:
            routeResolverProvider.routeConfig.setBaseDirectories(contextPath + '/app/views/', contextPath + '/app/controllers/');

            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $routeProvider
                .when (contextPath + '/', route.resolve('home'))
                .when(contextPath + '/search' , route.resolve('search'))
                .when(contextPath + '/register', route.resolve('register', 'auth/'))
                .when(contextPath + '/registertutor', route.resolve('registerTutor', 'auth/'))
                .when(contextPath + '/login', route.resolve('login', 'auth/'))
                .when(contextPath + '/profile', route.resolve('profile'))
                .when(contextPath + '/tutor/:id', route.resolve('tutor'))
                .when(contextPath + '/dashboard-tutor', route.resolve('dashboardTutor'))
                .when(contextPath + '/dashboard-student', route.resolve('dashboardStudent'))
                .otherwise({ redirectTo: '/' });

            $locationProvider.html5Mode(true);
            

        }]);

        return app;
});
