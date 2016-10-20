app.controller('miservicioCtrl',  function($scope,servicioService,pluginsService){


	$scope.Servicios = [];



	loadServicios();
	$scope.Servicio = {};

	$scope.openButton = true;



	$scope.Sectores = [];
	loadSectores();
	$scope.Sectores = {};



	function loadServicios () {
		$scope.idProfesional =  localStorage.getItem("idProfesional_br");
		var promiseGet = servicioService.getServicios($scope.idProfesional);
        promiseGet.then(function (pl) {
					if (pl.data.status != false) {
						$scope.Servicios = pl.data.servicios;
					}else {
						$scope.Servicios = [];
					}

        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}



	$scope.nuevo = function  () {

		$scope.Servicio = {};
		$scope.openButton = true;
		$('#modal-responsive').modal('show');

	}


	function loadSectores () {
		var promiseGet = servicioService.getSectores();
        promiseGet.then(function (pl) {
            $scope.Sectores = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

	$scope.save = function  () {
		var datos = {
			descripcion : $scope.Servicio.descripcion,
			idSector : $scope.Servicio.idSector,
			porcentaje :  $scope.Servicio.porcentaje,
			idProfesional : $scope.idProfesional
		};
		var promiseGet = servicioService.post(datos);
		promiseGet.then(function (pl) {
            alert(pl.data);
            loadServicios();
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}




	$scope.modificar = function  (servicio) {
		$scope.Servicio = servicio;
		$scope.openButton = false;
	}

	$scope.delete = function  (servicio) {
		var datos = {
			idServicio : servicio.id,
			idProfesional : $scope.idProfesional,
			idServicio : servicio.id
		}
		var promiseGet = servicioService.delete(datos);
		promiseGet.then(function (pl) {
            alert(pl.data);
            loadServicios();
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

})
