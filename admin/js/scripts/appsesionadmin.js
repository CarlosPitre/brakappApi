var uri = "../api";
var app;
(function  () {
	app = angular.module("adminbrackp", ['ngRoute']);
	app.config(['$routeProvider', '$locationProvider',function AppConfig($routeProvider,$locationProvider) {
		$routeProvider
			.when("/inicio",{
                    templateUrl: '/sesionadmin.html',
                    controller : 'loginCtrl'
            	}				
			)
		
			.otherwise({
                redirectTo:"/inicio"
            });
	}])
})()