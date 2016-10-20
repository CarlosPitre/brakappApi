app.controller('respuestaCtrl',  function($scope,respuestaService,pluginsService){
	


	$scope.Respuestas = [];

	loadRespuestas();
	$scope.Respuesta = {};


	$scope.openButton = true;
	
     function loadRespuestas () {
		var promiseGet = respuestaService.getRespuestas(); 
        promiseGet.then(function (pl) {
            $scope.Respuestas = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}


	$scope.nuevo = function  () {
		$scope.openButton = true;
		$('#modal-responsive').modal('show');

	}



	$scope.save = function  () {
		var datos = {
			nombre : $scope.Respuesta.nombre
		};
		var promiseGet = respuestaService.post(datos);
		promiseGet.then(function (pl) {
            alert(pl.data);
            loadRespuestas();
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

	$scope.delete = function  (respuesta) {
		var datos = {
			id : respuesta.id
		}
        console.log(JSON.stringify(datos));
		var promiseGet = respuestaService.delete(datos); 
		promiseGet.then(function (pl) {
            alert(pl.data);
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}





})