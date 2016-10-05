app.controller('detallesProfesionalCtrl', function($scope,$routeParams,profesionalService){
	
	$scope.Profesional = {};
	$scope.nombre = "Carlos Pitre";
	loadDatos();
	initMap();

	var lat;
	var lng;

	function loadDatos () {
		var promiseGet = profesionalService.getDatos($routeParams.idProfesional); 
        promiseGet.then(function (pl) {
            $scope.Profesional = pl.data;
            console.log(JSON.stringify($scope.Profesional));

        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

    function initMap() {
    	
      	var directionsDisplay = new google.maps.DirectionsRenderer;
		var directionsService = new google.maps.DirectionsService;
		var map = new google.maps.Map(document.getElementById('map' + id), {
			zoom: 14,
			center: {lat: 37.77, lng: -122.447}
		});

		directionsDisplay.setMap(map);

		calculateAndDisplayRoute(directionsService, directionsDisplay);
		document.getElementById('mode').addEventListener('change', function() {
			calculateAndDisplayRoute(directionsService, directionsDisplay);
		});

    }

	function calculateAndDisplayRoute(directionsService, directionsDisplay ) {

		var selectedMode = document.getElementById('mode').value;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {

				var latitud = parseFloat($scope.Profesional.latitud);
				var longitud = parseFloat($scope.Profesional.longitud);		  

		       directionsService.route({
					origin: {lat: position.coords.latitude, lng: position.coords.longitude},  
					destination: {lat: latitud, lng: longitud},  
					travelMode: google.maps.TravelMode[selectedMode]
					}, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
					  directionsDisplay.setDirections(response);
					} else {
					  window.alert('Directions request failed due to ' + status);
					}
				});

		    }, function() {
		      
		    });
		};

		
	}


})