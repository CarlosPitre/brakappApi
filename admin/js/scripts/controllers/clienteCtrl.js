app.controller('clienteCtrl',  function($scope,clienteService,pluginsService){
	


	$scope.Clientes = [];

	loadClientes();
	$scope.Cliente = {};

	$scope.openButton = true;
	
	function loadClientes () {
		var promiseGet = clienteService.getClientes(); 
        promiseGet.then(function (pl) {
            $scope.Clientes = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}
})