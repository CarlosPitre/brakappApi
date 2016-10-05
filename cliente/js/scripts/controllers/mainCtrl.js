app.controller('mainCtrl', function($scope,menuService,serverData){



	$scope.Servicio = [];
	$scope.idPerfil = "1";
	$scope.busca = "hola";
	loadServicio();

	function loadServicio () {

		var promiseGet = menuService.getJSON();
        promiseGet.then(function (pl) {
            $scope.Servicio = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });

	}

	$scope.Buscar = function  (filtro) {

		serverData.json = filtro;
		window.location = '#/servicio/profesionales';


		//alert(JSON.stringify(filtro));

		/*
		if (id == null) {
			alert("Por Escribe Un Servicio")
		}else{
			window.location = '#/servicio/' + id + '/profesionales';
		};*/
	}




})
