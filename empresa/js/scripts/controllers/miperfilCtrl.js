app.controller('miperfilCtrl', function($scope,miperfilService,$routeParams,pluginsService){
	


	$scope.Profesionales = [];
	$scope.Profesional = {};
   


	loadDatos();

	function cargarMapa() {
        setTimeout(function () {
            var mapa = document.getElementById('map');
            var inputSearch = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(inputSearch);
            var map = new google.maps.Map(mapa, {
              center: {lat: -33.8688, lng: 151.2195},
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            $scope.map = map;

            if ($scope.Profesional.latitud == null || $scope.Profesional.longitud == null) {
              navigator.geolocation.getCurrentPosition(function(pos) {
                map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                var myLocation = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude),
                    map: map,
                    title: "My Location",
                    animation: google.maps.Animation.DROP,
                    draggable: true,
                });
              });
            }else{
              navigator.geolocation.getCurrentPosition(function(pos) {
                map.setCenter(new google.maps.LatLng(parseFloat($scope.Profesional.latitud), parseFloat($scope.Profesional.longitud)));
                var myLocation = new google.maps.Marker({
                    position: new google.maps.LatLng(parseFloat($scope.Profesional.latitud), parseFloat($scope.Profesional.longitud)),
                    map: map,
                    title: "My Location",
                    animation: google.maps.Animation.DROP,
                    draggable: true,
                });
              });
            };

            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });
            var markers = [];
            searchBox.addListener('places_changed', function() {
              var places = searchBox.getPlaces();
              if (places.length == 0) {
                return;
              }
              markers.forEach(function(marker) {
                marker.setMap(null);
              });
              markers = [];
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                var icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };
                markers.push(new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location,
                  draggable: true,
                }));
                $scope.Profesional.latitud = place.geometry.location.lat();
                $scope.Profesional.longitud = place.geometry.location.lng();
                if (place.geometry.viewport) {
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              markers.forEach(function(marker) {
                google.maps.event.addListener(marker, 'dragend', function(){
                  var markerLatLng = marker.getPosition();
                  var geocoder = new google.maps.Geocoder();
                  var yourLocation = new google.maps.LatLng(markerLatLng.lat(), markerLatLng.lng());
                  geocoder.geocode({ 'latLng': yourLocation },function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                      if (results[0]) {
                         $("#pac-input").val(results[0].formatted_address);
                      } else {
                        error('Google no retorno resultado alguno.');
                      }
                      } else {
                        error("Geocoding fallo debido a : " + status);
                      }
                  });
                });
              });
              map.fitBounds(bounds);
            });
        }, 1000)
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
            cargarMapa();
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

	$scope.update = function  () {
    $scope.Profesional.direccion = $("#pac-input").val();
    console.log(JSON.stringify($scope.Profesional));
		var promiseGet = miperfilService.put($scope.Profesional); 
		promiseGet.then(function (pl) {
        alert(pl.data);
        loadDatos();
    },
    function (errorPl) {
    	console.log('Error Al Cargar Datos', errorPl);
    });
	}

  $scope.save = function  () {
    var fileInput = document.getElementById("files");
    var file = fileInput.files.item(0);
    if (file != null) {
      var formData = new FormData();
      var fileName = file.name;
      fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
      NomImg1 = "Profesional-"+$scope.Profesional.id;
      formData.append('imagen',file);
      $scope.Profesional.extencion = fileExtension;
      var promisePost = miperfilService.postImagen(formData,NomImg1,fileExtension);
      promisePost.then(function (d) {
        $scope.Profesional.foto = d.data;
        $scope.update();
      }, function (err) {
          console.log(err)
          if(err.status == 401){
              alert(err.data.msg);
              console.log(err.data.exception);
          }else{
              alert("Error Al procesar Solicitud");
          }

          console.log(err);
      });
    }else{
      $scope.update();
    };
    
  }

	

})