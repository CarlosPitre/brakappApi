app.controller('solicitudesCtrl',  function($scope,solicitudeService,pluginsService){
	

	$scope.Solicitudes = [];
    

	loadSolicitudes();
	$scope.Solicitud = {};

 
	$scope.Respuestas = [];

	loadRespuestas();
	$scope.Respuesta = {};
	
	


var myVar = setInterval(function(){ loadSolicitudes() }, 10000);


	function loadSolicitudes () {

	    $scope.idProfesional =  localStorage.getItem("idProfesional_br");
		var promiseGet = solicitudeService.getSolicitudes($scope.idProfesional); 
        promiseGet.then(function (pl) {
            $scope.Solicitudes = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}


	function loadRespuestas () {
		var promiseGet = solicitudeService.getRespuestas(); 
        promiseGet.then(function (pl) {
            $scope.Respuestas = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

    
    $scope.update = function  (respuesta) {
		
		var datos = {
			id : respuesta.id,
			idRespuesta : $scope.Solicitudes.idRespuesta
		};
		var promiseGet = solicitudeService.put(datos); 
		promiseGet.then(function (pl) {
            alert(pl.data);
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}


	 $scope.delete = function  (solicitud) {
		var datos = {
			id : solicitud.id
		};
		var promiseGet = solicitudeService.delete(datos); 
		promiseGet.then(function (pl) {
            alert(pl.data);
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

})