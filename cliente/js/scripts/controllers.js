
app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


app.controller('SearchCtrl',function ($scope,menuService) {
  $scope.Servicio = [];
  loadServicio();
  function loadServicio() {
		var promiseGet = menuService.getJSON();
        promiseGet.then(function (pl) {
            $scope.Servicio = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}
  $scope.Buscar = function (json) {
    sessionStorage.setItem('json', JSON.stringify(json));
    window.location.href = "#/servicio/profesionales";
  }
})

app.controller('ProfesionalCtrl', function ($scope,profesionalService,clienteService) {
  $scope.idProfesional;
  $scope.open = true;
  $scope.Profesionales = [];
  $scope.ImagenesProductos = [];
  $scope.Profesional= {};
  $scope.filtro = "1";
  $scope.json = {};
  $scope.title = "Mapa";
  $scope.loginData = {};
  $scope.disabledServicio = false;
  $scope.disabledProducto = false;
  $scope.Cliente = {};
  $scope.Solicitud = {};

  getProfesionales();

  function getProfesionales () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          console.log(position);
          $scope.Latitud = position.coords.latitude;
          $scope.Longitud = position.coords.longitude;
          console.log($scope.Latitud);
      })
    };
    $scope.json = JSON.parse(sessionStorage.getItem('json'));
    console.log(JSON.stringify($scope.json));
    var promiseGet = profesionalService.postJSON($scope.json);
    promiseGet.then(function (pl) {
        $scope.Profesionales = pl.data.profesionales;
        console.log(JSON.stringify($scope.Profesionales));
    },
    function (errorPl) {
      console.log('Error Al Cargar Datos', errorPl);
    });
  }

  $scope.Mapa = function () {
    if ($scope.open == true) {
      $scope.open = false;
      $scope.title = "Lista";
      setTimeout(function(){
        iniMap()
      }, 2000);
    }else{
      $scope.open = true;
      $scope.title = "Mapa";
    }
  }

  $scope.Imagenes = function  (profesional) {
    $('#modalFotos').modal("show")
  }

  $scope.Detalles = function (profesional) {
    
    $scope.Profesional = profesional
    if ($scope.Profesional.status == false) {
      $scope.Profesional.status = true;
      $scope.Profesional.button = "Ver Menos";
      if ($scope.Profesional.mapa == false) {
        $scope.Profesional.mapa = true;
        initMap($scope.Profesional.id);
      };

    }else{
      $scope.Profesional.status = false;
      $scope.Profesional.button = "Ver Mas";
    };
  }

  $scope.Filtro = function  () {
		switch($scope.filtro) {
			case "1":
				getProfesionales()
				break;
			case "3":
				getProfesionalesVisitados()
				break;
			case "4":
				//getProfesionalesDistancia()
				break;
		}
	}

  function getProfesionalesDistancia () {
		var promiseGet = profesionalService.postJSONDistancia($scope.json);
        promiseGet.then(function (pl) {
        	if (pl.data.profesionales.length > 0) {
        		$scope.Profesionales = pl.data.profesionales;
        	};
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

  function getProfesionalesVisitados () {
		var promiseGet = profesionalService.postJSONVisitados($scope.json);
    promiseGet.then(function (pl) {
        $scope.Profesionales = pl.data.profesionales;
    },
    function (errorPl) {
    	console.log('Error Al Cargar Datos', errorPl);
    });
	}

  function initMap(id) {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map' + id), {
      zoom: 14,
      center: {lat: 37.77, lng: -122.447}
    });

    directionsDisplay.setMap(map);

   /* setTimeout(function  () {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
      document.getElementById('mode').addEventListener('change', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      });
    },2000);   */

  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay ) {
    var selectedMode = document.getElementById('mode').value;
    var latitud = parseFloat($scope.Profesional.latitud);
    var longitud = parseFloat($scope.Profesional.longitud);
    console.log($scope.Latitud);
    directionsService.route({
      origin: {lat: parseFloat($scope.Latitud), lng: parseFloat($scope.Longitud)},
      destination: {lat: latitud, lng: longitud},
      travelMode: google.maps.TravelMode[selectedMode]
      }, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  $scope.iniciarSesion = function () {
		var promiseGet = clienteService.login($scope.Cliente);
    promiseGet.then(function (pl) {
    	var status = pl.data.status;
      console.log(pl.data);
    	if (status == 1) {
    		localStorage.setItem("idCliente",pl.data.usuario.idCliente);
    		localStorage.setItem("idPerfil",pl.data.usuario.idPerfil);
    		localStorage.setItem("idUsuario",pl.data.usuario.id);
    	}else{
        alert(pl.data.message)
    	};
    },
    function (errorPl) {
    	console.log('Error Al Cargar Datos', errorPl);
    });
  }

  $scope.Solicitar = function () {
    $("#modalLogin").modal("show");
    /*var promiseGet = clienteService.get(localStorage.getItem("idCliente"));
    promiseGet.then(function (pl) {
      $scope.Cliente = pl.data;
      if ($scope.Profesional.servicios.length == 0) {
        $scope.disabledServicio = true;
      }
      if ($scope.Profesional.productos.length == 0) {
        $scope.disabledProducto = true;
      }
      $scope.modalSolicitud.show();
    },
    function (errorPl) {
      console.log('Error Al Cargar Datos', errorPl);
    });*/
  }

  $scope.save = function () {
    var data = {
       idCliente : localStorage.getItem("idCliente"),
       idProfesional : $scope.Profesional.id,
       idServicio : $scope.Solicitud.idServicio,
       idProducto : $scope.Solicitud.idProducto
    }
    var promiseGet = profesionalService.postSolicitud(data);
    promiseGet.then(function (pl) {
      alert(pl.data)
    },
    function (errorPl) {
      console.log('Error Al Cargar Datos', errorPl);
    });
  }

})

app.controller('MapCtrl', function($scope, $state) {

  iniMap()
  function iniMap() {
    console.log("hola");
    $scope.Profesional = JSON.parse(sessionStorage.getItem('profesional'));
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var myLatLng = new google.maps.LatLng(10.473648,-73.2551835);
    var mapOption = {
      center : myLatLng,
      zoom : 16,
      mapTypeId : google.maps.MapTypeId.ROADMAP,
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOption);
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);

  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay ) {

      navigator.geolocation.getCurrentPosition(function(position) {
        var latitud = parseFloat($scope.Profesional.latitud);
        var longitud = parseFloat($scope.Profesional.longitud);
        directionsService.route({
          origin: {lat: position.coords.latitude, lng: position.coords.longitude},
          destination: {lat: latitud, lng: longitud},
          travelMode: google.maps.TravelMode['DRIVING']
        }, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }, function() {

      });
  }



})

app.controller('solicitudCtrl', function ($scope, solicitudService) {

  $scope.Solicitudes = [];
  loadSolicitudes()

  function loadSolicitudes() {
    var promiseGet = solicitudService.getSolicitudes(localStorage.getItem('idCliente_br'));
    promiseGet.then(function (pl) {
      $scope.Solicitudes = pl.data;
      console.log(JSON.stringify($scope.Solicitudes));
    },
    function (errorPl) {
    	console.log('Error Al Cargar Datos', errorPl);
    });
  }

})

;
