<div class="row" ng-controller="headerAuthController">
	<div class="col-md-6 nav-teachify">
		<a ng-click="goToHome()">
			<div class="brand-teachify">
				<i class="fa fa-graduation-cap"></i>
				<h1>teachify</h1>

			</div>
		</a>
	</div>

	<div class="col-md-6 nav-teachify">
		<ul class="nav navbar-nav navbar-right navbar-teachify">
				<li>
					<button type="button" class="btn btn-info btn-dashboard" ng-click="goToDashboardStudent()">Student Dashboard</button>
				</li>
				@foreach ($roles as $role)
					@if($role->name == 'tutor')
					<li>
						<button type="button" class="btn btn-primary btn-dashboard" ng-click="goToDashboardTutor()">Tutor Dashboard</button>
					</li>
            		@endif

            		@if($role->name == 'admin')
					<li>
						<button type="button" class="btn btn-danger btn-dashboard" ng-click="goToBackend()">Backend</button>
					</li>
            		@endif
        		@endforeach
				
				<li>
					<div class="tutor-img">
						<img ng-src="data:image/jpg;base64,@{{authUser.photo}}" onerror="this.remove()" />
					</div>
				</li>
		</ul>
	</div>
	<div class="btn-group">
		<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
			<span class="caret"></span> <span class="sr-only">Toggle Dropdown</span>
		</button>
		<ul class="dropdown-menu" role="menu">
			<li><a ng-click="goToProfile()"> @{{lang.profile}} </a></li>
			<li><a ng-click="logout()">Logout</a></li>
		</ul>
	</div>
</div>
