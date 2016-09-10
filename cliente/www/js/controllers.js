angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
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


.controller('SearchCtrl',function ($scope,menuService, $state) {
  $scope.Servicio = [];
  loadServicio();
  function loadServicio() {
		var promiseGet = menuService.getJSON();
        promiseGet.then(function (pl) {
            $scope.Servicio = pl.data;
            console.log(JSON.stringify($scope.Servicio));
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}
  $scope.Buscar = function (json) {
    sessionStorage.setItem('json', JSON.stringify(json));
    $state.go('app.browse');
  }
})

.controller('ProfesionalCtrl', function ($scope,profesionalService,$ionicModal,$state,$ionicPopup, clienteService) {
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

  $ionicModal.fromTemplateUrl('templates/modalFotos.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modalLogin.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogin = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modalSolicitud.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalSolicitud = modal;
  });

  function getProfesionales () {
    $scope.json = JSON.parse(sessionStorage.getItem('json'));
    console.log(JSON.stringify($scope.json));
    var promiseGet = profesionalService.postJSON($scope.json);
    promiseGet.then(function (pl) {
        $scope.Profesionales = pl.data.profesionales;
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

  $scope.Detalles = function (profesional) {
    console.log(localStorage.getItem('idCliente'));
    if (localStorage.getItem('idCliente') == null) {
      $scope.modalLogin.show();
    }else{
      $scope.ImagenesProductos = profesional.imagenesProductos;
      if (profesional.status == false) {
        profesional.status = true;
      }else {
        profesional.status = false;
      }
      $scope.Profesional = profesional;
    }
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

  $scope.openMapa = function (profesional) {
    sessionStorage.setItem('profesional', JSON.stringify(profesional));
    $state.go('app.map')
  }

  $scope.closeModelMapa = function () {
    $scope.modalMapa.hide();
  }

  $scope.openModal = function () {
    $scope.modal.show();
  }

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.closeModalLogin = function () {
    $scope.modalLogin.hide();
  }

  $scope.closeModalSolicitud = function () {
    $scope.modalSolicitud.hide();
  }

  function iniMap() {
    var myLatLng = new google.maps.LatLng(10.473648,-73.2551835);
    var mapOption = {
      center : myLatLng,
      zoom : 14,
      mapTypeId : google.maps.MapTypeId.ROADMAP,
    };
    var map = new google.maps.Map(document.getElementById("mapa"), mapOption);
    navigator.geolocation.getCurrentPosition(function(pos) {
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLocation = new google.maps.Marker({
          position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          map: map,
          title: "My Location",
          animation: google.maps.Animation.DROP
      });
      var label = "Yo";
      (function(myLocation, label) {
              google.maps.event.addListener(myLocation, 'click', function() {
                var infoWindow = new google.maps.InfoWindow({mapa: map});
                infoWindow.setContent(label);
                infoWindow.open(map, myLocation);
            });
        })(myLocation, label)
      for (profesional of $scope.Profesionales) {
        var marker = new google.maps.Marker({
          position: {lat: parseFloat(profesional.latitud), lng: parseFloat(profesional.longitud)},
          label : profesional.razonSocial,
          map: map,
          animation: google.maps.Animation.DROP
        });
        var label = profesional.razonSocial;
        (function(marker, label) {
                google.maps.event.addListener(marker, 'click', function() {
                  var infoWindow = new google.maps.InfoWindow({mapa: map});
                  infoWindow.setContent(label);
                  infoWindow.open(map, marker);
              });
          })(marker, label);
      }
    })
  }

  $scope.iniciarSesion = function () {
    var data = {
			user : $scope.loginData.username,
			pass : $scope.loginData.password
		};
		var promiseGet = clienteService.login(data);
    promiseGet.then(function (pl) {
    	var status = pl.data.status;
    	if (status == 1) {
    		localStorage.setItem("idCliente",pl.data.usuario.idCliente);
    		localStorage.setItem("idPerfil",pl.data.usuario.idPerfil);
    		localStorage.setItem("idUsuario",pl.data.usuario.id);
        $scope.modalLogin.hide();
    	}else{
        var alertPopup = $ionicPopup.alert({
           title: 'Mensaje de Información',
           template: pl.data.message
         });
         alertPopup.then(function(res) {
           console.log('Thank you for not eating my delicious ice cream cone');
         });
    	};
    },
    function (errorPl) {
    	console.log('Error Al Cargar Datos', errorPl);
    });
  }

  $scope.Solicitar = function () {
    var promiseGet = clienteService.get(localStorage.getItem("idCliente"));
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
    });
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
      var alertPopup = $ionicPopup.alert({
         title: 'Mensaje de Información',
         template: pl.data
       });
       alertPopup.then(function(res) {
         console.log('Thank you for not eating my delicious ice cream cone');
       });
      $scope.modalSolicitud.hide();
    },
    function (errorPl) {
      console.log('Error Al Cargar Datos', errorPl);
    });
  }

})

.controller('MapCtrl', function($scope, $state) {

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

.controller('solicitudCtrl', function ($scope, solicitudService) {

  $scope.Solicitudes = [];
  loadSolicitudes()

  function loadSolicitudes() {
    var promiseGet = solicitudService.getSolicitudes(localStorage.getItem('idCliente'));
    promiseGet.then(function (pl) {
      $scope.Solicitudes = pl.data;
    },
    function (errorPl) {
    	console.log('Error Al Cargar Datos', errorPl);
    });
  }

})

;
