app.controller('sectoresCtrl',  function($scope,sectorService,pluginsService){
	

	$scope.Sectores = [];

	loadSectores();
	$scope.Sector = {};

	$scope.openButton = true;
	
	function loadSectores () {
		var promiseGet = sectorService.getSectores(); 
        promiseGet.then(function (pl) {
            $scope.Sectores = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}



	$scope.nuevo = function  () {

		$scope.Sector = {};
		$scope.openButton = true;
		$('#modal-responsive').modal('show');

	}








	$scope.save = function  () {
		var datos = {
			descripcion : $scope.Sector.descripcion
		};
		var promiseGet = sectorService.post(datos); 
		promiseGet.then(function (pl) {
            alert(pl.data);
            loadSectores();
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

	$scope.update = function  () {
		var datos = {
			id : $scope.Sector.id,
			descripcion : $scope.Sector.descripcion
		};
		var promiseGet = sectorService.put(datos); 
		promiseGet.then(function (pl) {
            alert(pl.data);
            loadSectores();
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

	$scope.modificar = function  (sector) {
		$scope.Sector = sector;
		$scope.openButton = false;
	}

	$scope.delete = function  (id) {
		alert("message");
		var promiseGet = sectorService.delete(id); 
		promiseGet.then(function (pl) {
            alert(pl.data);
            loadSectores();
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

})