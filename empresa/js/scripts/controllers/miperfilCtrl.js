app.controller('miperfilCtrl', function($scope,miperfilService,$routeParams,pluginsService){
	


	$scope.Profesionales = [];
	$scope.Profesional = {};
   


	loadDatos();
	

function initMap() {
    	
var myLatlng = new google.maps.LatLng(parseFloat($scope.Profesional.latitud),parseFloat($scope.Profesional.longitud));
var mapOptions = {
  zoom: 4,
  center: myLatlng
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);

// Place a draggable marker on the map
var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    draggable:true,
    title:"Drag me!"
 });
 }

	
	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};


	function loadDatos () {
		$scope.idProfesional =  localStorage.getItem("idProfesional_br");
		var promiseGet = miperfilService.getDatos($scope.idProfesional); 
        promiseGet.then(function (pl) {
            $scope.Profesional = pl.data;
            initMap();
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}



	$scope.update = function  () {
		var datos = { 
			id: $scope.Profesional.id,
			razonSocial : $scope.Profesional.razonSocial,
			identificacion : $scope.Profesional.identificacion,
			correo : $scope.Profesional.correo,
			telefono : $scope.Profesional.telefono,
			experiencia : $scope.Profesional.experiencia

		};
		var promiseGet = miperfilService.put(datos); 
		promiseGet.then(function (pl) {
            alert(pl.data);
            loadDatos();
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

	

})