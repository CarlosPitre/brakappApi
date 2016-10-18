
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
  $scope.Municipios = [];
  $scope.idMunicipio = "0";
  loadServicio();
  loadMunicipios();
  function loadServicio() {
		var promiseGet = menuService.getJSON();
        promiseGet.then(function (pl) {
            $scope.Servicio = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}
  function loadMunicipios () {
    var promiseGet = menuService.getMunicipios();
    promiseGet.then(function (pl) {
        $scope.Municipios = pl.data;
    },
    function (errorPl) {
      console.log('Error Al Cargar Datos', errorPl);
    });
  }
  $scope.Buscar = function (json) {
    json.idMunicipio = $scope.idMunicipio;
    sessionStorage.setItem('json', JSON.stringify(json));
    console.log(JSON.stringify(json));
    window.location.href = "#/servicio/profesionales";
  }
})

app.controller('ProfesionalCtrl', function ($scope,profesionalService,clienteService,menuService) {
  $scope.idProfesional;
  $scope.open = true;
  $scope.Profesionales = [];
  $scope.ImagenesProductos = [];
  $scope.Profesional= {};
  $scope.filtro = "1";
  $scope.json = {};
  $scope.title = "Ver Mapa";
  $scope.loginData = {};
  $scope.disabledServicio = false;
  $scope.disabledProducto = false;
  $scope.Cliente = {};
  $scope.Solicitud = {};
  $scope.json = JSON.parse(sessionStorage.getItem('json'));
  $scope.Servicio = [];
  $scope.Municipios = [];
  $scope.idMunicipio = "0";
  loadServicio();
  loadMunicipios();
  function loadServicio() {
    var promiseGet = menuService.getJSON();
    promiseGet.then(function (pl) {
        $scope.Servicio = pl.data;
    },
    function (errorPl) {
      console.log('Error Al Cargar Datos', errorPl);
    });
  }
  function loadMunicipios () {
    var promiseGet = menuService.getMunicipios();
    promiseGet.then(function (pl) {
        $scope.Municipios = pl.data;
    },
    function (errorPl) {
      console.log('Error Al Cargar Datos', errorPl);
    });
  }
  $scope.Buscar = function (json) {
    json.idMunicipio = $scope.idMunicipio;
    sessionStorage.setItem('json', JSON.stringify(json));
    var promiseGet = profesionalService.postJSON(json);
    promiseGet.then(function (pl) {
        $scope.Profesionales = pl.data.profesionales;
    },
    function (errorPl) {
      console.log('Error Al Cargar Datos', errorPl);
    });
  }

  getProfesionales();

  function getProfesionales () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {  
          $scope.Latitud = position.coords.latitude;
          $scope.Longitud = position.coords.longitude;
          $scope.json.latitud = position.coords.latitude;
          $scope.json.longitud = position.coords.longitude;
      })
    };   
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
      $scope.title = "Ver Lista";
      setTimeout(function(){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 14,
              center: {lat: position.coords.latitude, lng:position.coords.longitude}
            });
            var marker = new google.maps.Marker({
              position: {lat: position.coords.latitude, lng:position.coords.longitude},
              map: map,
              animation: google.maps.Animation.DROP
            });
            var label = "Mi Posición";
            (function(marker, label) {
                    google.maps.event.addListener(marker, 'click', function() {
                      var infoWindow = new google.maps.InfoWindow({mapa: map});
                      infoWindow.setContent(label);
                      infoWindow.open(map, marker);
                  });
              })(marker, label);


            for (var i = 0; i < $scope.Profesionales.length; i++) {

              var image = {
                url:  $scope.Profesionales[i].foto,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };
              var marker = new google.maps.Marker({
                position: {lat: parseFloat($scope.Profesionales[i].latitud), lng: parseFloat($scope.Profesionales[i].longitud)},
                label : $scope.Profesionales[i].razonSocial,
                map: map,
                animation: google.maps.Animation.DROP
              });
              marker.setIcon(image);
              var label = $scope.Profesionales[i].razonSocial;
              (function(marker, label) {
                      google.maps.event.addListener(marker, 'click', function() {
                        var infoWindow = new google.maps.InfoWindow({mapa: map});
                        infoWindow.setContent(label);
                        infoWindow.open(map, marker);
                    });
                })(marker, label);
            };



            }, function() {

            });
        };
      }, 2000);
    }else{
      $scope.open = true;
      $scope.title = "Ver Mapa";
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
				getProfesionalesDistancia()
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
   setTimeout(function  () {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    },2000); 

  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay ) {
    
    var latitud = parseFloat($scope.Profesional.latitud);
    var longitud = parseFloat($scope.Profesional.longitud);
    console.log($scope.Latitud);
    directionsService.route({
      origin: {lat: parseFloat($scope.Latitud), lng: parseFloat($scope.Longitud)},
      destination: {lat: latitud, lng: longitud},
      travelMode: google.maps.TravelMode['DRIVING']
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
        $("#modalLogin").modal("hide");
        $scope.Solicitar();
    	}else{
        alert(pl.data.message)
    	};
    },
    function (errorPl) {
    	console.log('Error Al Cargar Datos', errorPl);
    });
  }

  $scope.Solicitar = function () {

    if (localStorage.getItem('idCliente') == null) {
      $("#modalLogin").modal("show");
    }else{
      var promiseGet = clienteService.get(localStorage.getItem("idCliente"));
      promiseGet.then(function (pl) {
        $scope.Cliente = pl.data;
        if ($scope.Profesional.servicios.length == 0) {
          $scope.disabledServicio = true;
        }
        if ($scope.Profesional.productos.length == 0) {
          $scope.disabledProducto = true;
        }
        $("#modalSolicitud").modal("show");
      },
      function (errorPl) {
        console.log('Error Al Cargar Datos', errorPl);
      });
    };   
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
      $("#modalSolicitud").modal("hide");
    },
    function (errorPl) {
      console.log('Error Al Cargar Datos', errorPl);
    });
  }

    var app_id = '1045182768850951';
    var scopes = "email,user_friends,read_custom_friendlists,public_profile";
    $scope.face;

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.8&appId=1045182768850951";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function() {
      FB.init({
        appId      : app_id,
        status     : true,
        cookie     : true,
        xfbml      : true,
        version    : 'v2.2'
      });

    };


    var  statusChangeCallback = function(response, callback)
    {
      console.log(response);
      if (response.status === 'connected') {
        getFacebookData();
      } else {
        callback(false);
      }
    }

    var  checkLoginState = function(callback)
    {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response,function(data){
            callback(data);
        });
      });
    }


    var getFacebookData =function()
    {
      FB.api('/me?fields=email,first_name,last_name,id,picture', function(response){
        //$scope.face = response
        registrarFacebook(response)
        console.log('http://graph.facebook.com/'+response.id+'/picture?type=large');
      });
    }

    function invitar_friends()
    {
      FB.ui({
          method: 'apprequests',
          message: 'Conoce BrakAPP Una Plataforma Novedosa'
      });
    }

    var friends = function(){
      FB.api("/me/friends", function (response) {
         console.log(response)
      });
    }

    var facebookLogin = function()
    {
      checkLoginState(function(response){
        if(!response){
          FB.login(function(response){
          if(response.status === 'connected')
            getFacebookData();
          },{scope:scopes});
        }
      })
    }

    $(document).on('click', '#facebookLogin', function(e){
      e.preventDefault();
      facebookLogin();
    })

    $(document).on('click', '#facebookInvitar', function(e){
      e.preventDefault();
      invitar_friends();
    })

    $(document).ready(function(){
      var contentHtml = [
      '<div>',
          '<div class="fb-share-button" data-href="https://brakapp.com" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore btn btn-primary" style = "width:150px;" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbrakapp.com%2F&amp;src=sdkpreparse">Facebook</a></div>',
      '</div>'].join('\n');
      $('[data-toggle="popover"]').popover({
        html: true,
        content: contentHtml,
      });
    });

    function registrarFacebook(response) {

      var promiseGet = clienteService.loginFaebook(response);
      promiseGet.then(function (pl) {
        var status = pl.data.status;
        console.log(pl.data);
        if (status == 1) {
          localStorage.setItem("idCliente",pl.data.usuario.idCliente);
          localStorage.setItem("idPerfil",pl.data.usuario.idPerfil);
          localStorage.setItem("idUsuario",pl.data.usuario.id);
          $("#modalLogin").modal("hide");
          $scope.Solicitar();
        }else{
          alert(pl.data.message)
        };
      },
      function (errorPl) {
        console.log('Error Al Cargar Datos', errorPl);
      });
    }

    $scope.registrar = function  () {
      var promiseGet = clienteService.post($scope.Cliente);
      promiseGet.then(function (pl) {
       var status = pl.data.status;
       if (status == 1) {
          localStorage.setItem("idCliente",pl.data.usuario.idCliente);
          localStorage.setItem("idPerfil",pl.data.usuario.idPerfil);
          localStorage.setItem("idUsuario",pl.data.usuario.id);
          $("#modalLogin").modal("hide");
          $scope.Solicitar();
        }else{
          alert(pl.data.message)
        };
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
