var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.less([
			"header.less",
            "body.less",
            "cerca.less",
            "tutor_profile.less",
            "home.less"], 'resources/css')
		.styles([
			"header.css",
            "body.css",
            "cerca.css",
            "tutor_profile.css"
            ], "public/css/style.css")
		.styles("home.css", "public/css/home.css");
});
