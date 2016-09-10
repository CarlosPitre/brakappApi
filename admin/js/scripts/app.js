var uri = "../api";
var app;
(function  () {
	app = angular.module("brackapp", ['ngRoute']);
	app.config(['$routeProvider', '$locationProvider',function AppConfig($routeProvider,$locationProvider) {
		$routeProvider
			.when("/inicio",{
                    templateUrl: 'pages/inicio.html',
                    controller : 'mainCtrl'
            	}				
			)
			.when("/admin/sectores",{
                    templateUrl: 'pages/sectores.html',
                    controller : 'sectoresCtrl'
            	}				
			)
			.when("/admin/clientes",{
                    templateUrl: 'pages/clientes.html',
                    controller : 'clienteCtrl'
            	}				
			)
            .otherwise({
                redirectTo:"/inicio"
            });
	}])
})()