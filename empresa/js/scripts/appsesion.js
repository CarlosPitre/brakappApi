var uri = "../api/index.php";
var app;
(function  () {
	app = angular.module("empresasesion", ['ngRoute']);
	app.config(['$routeProvider', '$locationProvider',function AppConfig($routeProvider,$locationProvider) {
		$routeProvider
			.when("/inicio",{
                    templateUrl: '/sesion.html',
                    controller : 'loginCtrl'
            	}				
			)
			.when("/inicio",{
                    templateUrl: '/registrar.html',
                    controller : 'registrarCtrl'
            	}				
			)
			.otherwise({
                redirectTo:"/inicio"
            });
	}])
})()