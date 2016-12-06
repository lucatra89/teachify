
<div class="row" ng-controller="headerGuestController">
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
      <li><a id="signup" ng-click="goToRegister()"></a></li>
      <li><a id="signin" ng-click="goToLogin()"></a></li>
      <li>
        <button style="visibility:hidden;" id="teachnow" type="button" class="btn btn-success" ng-click="goToRegisterTutor()"></button>
      </li>
    </ul>
  </div>
</div>