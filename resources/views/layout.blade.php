<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}" />
  <base href="/">
  <title>Home</title>
  <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="lib/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="lib/leaflet/leaflet.css" rel="stylesheet">
  <link href="lib/sweetalert/sweetalert.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">
</head>

<body>
	<header>
    @if(Auth::check())
      @include('header.auth')
    @else
		  @include('header.guest')
    @endif

	</header>

  <div ng-view class="content"></div>
    <script src="./lib/sweetalert/sweetalert.min.js"></script>
    <script src="./lib/angular/angular.min.js"></script>
    <script src="./lib/angular/angular-route.min.js"></script>
    <script data-main="js/main" src="./lib/require/require.js"></script>
</body>

</html>
