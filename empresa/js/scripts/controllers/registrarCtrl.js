app.controller('registrarCtrl',  function($scope,registrarService){


	$scope.Profesionales = [];
	$scope.Profesional = {};



	$scope.Departamentos = [];

	loadDepartamentos();
	$scope.Departamento = {};
     
    $scope.Municipios = [];
    $scope.Municipio = {};

 
    $scope.buscarMunicipio = function  () {
    
    var promiseGet = registrarService.getMunicipio($scope.Profesional.idDepartamento );
        promiseGet.then(function (pl) {
            $scope.Municipios = pl.data;
        },
        function (errorPl) {
        	console.log('Error De Servidor Cv', errorPl);
        });	 

    }



	function loadDepartamentos () {
		var promiseGet = registrarService.getDepartamentos();
        promiseGet.then(function (pl) {
            $scope.Departamentos = pl.data;
        },
        function (errorPl) {
        	console.log('Error De Servidor Cv', errorPl);
        });
	}


	$scope.save = function  () {
		var datos = {
			razonSocial : $scope.Profesional.razonSocial,
			identificacion : $scope.Profesional.identificacion,
			correo :  $scope.Profesional.correo,
			telefono :  $scope.Profesional.telefono,
			idMunicipio : $scope.Profesional.idMunicipio,
			usuario : $scope.usuario,
			password : $scope.password
		};

		var promiseGet = registrarService.post(datos);
		promiseGet.then(function (pl) {
            alert(pl.data.message);
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos ', errorPl);
        });
	}

})
