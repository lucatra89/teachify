 (function(require){

	var contextPath = '',
		requestLang = navigator.language,
		baseUrl = contextPath + "/app";

	require.config({
        baseUrl: baseUrl,
        paths: {
            jquery:  '../lib/jquery/jquery.min',
            underscore: '../lib/underscore/underscore',
            leaflet: '../lib/leaflet/leaflet',
            bootstrap: '../lib/bootstrap/js/bootstrap.min',
            text : '../lib/require/text',
            moment : '../lib/moment/moment.min',
            langConf : '../languages/lang-conf'
        },
        shim: {
            'jquery': {
            exports: '$'
            },
            'underscore': {
            exports: '_'
            },

            'leaflet': {
            exports: 'L'
            }
        }
});
	
require(['moment', 'langConf'], function(moment , langConf) {
	var langCod = (langConf[requestLang]) ? requestLang : langConf['default'],
		languageUri = contextPath + langConf[langCod];
	
    require([languageUri], function(lang) {
    	define('lang', lang);
    	moment.locale(langCod);
    	init();
    });
});
	


function init() {
	require(['jquery', 'services/routeResolver'],
	    function () {	
	        require(['bootstrap', 'app', 'controllers/headerGuestController', 'controllers/headerAuthController', 'services/utilities' ] ,
	         function(){
	            var appName = 'teachifyApp';
	            document.getElementsByTagName('html')[0].setAttribute('ng-app' , appName);
	            angular.bootstrap(document, [appName]);
	     });
    });
}
})(require);