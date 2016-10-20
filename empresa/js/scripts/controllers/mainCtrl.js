app.controller('mainCtrl', function($scope,menuService){
	
	$scope.Menu = [];
	$scope.idPerfil = localStorage.getItem('idPerfil_br');

	loadMenu();

	function loadMenu () {
		var promiseGet = menuService.getMenu($scope.idPerfil); 
        promiseGet.then(function (pl) {
            $scope.Menu = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}


})