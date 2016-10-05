app.controller('profesionalCtrl', function($scope,profesionalService,$routeParams,pluginsService,clienteService,serverData){

	$scope.rate = 2;
	$scope.max = 5;
	$scope.isReadonly = true;
	$scope.idProfesional;
	$scope.open = true;

	$scope.Profesionales = [];
	$scope.Profesional= {};
	$scope.filtro = "1";
	var json = {"id":0,"idSector":"1","descripcion":"Sistemas","tipo":"Sector"};

	getProfesionales();

	function getProfesionales () {
		console.log(JSON.stringify(json));
		var promiseGet = profesionalService.postJSON(json);
        promiseGet.then(function (pl) {
            $scope.Profesionales = pl.data.profesionales;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

	function getProfesionalesVisitados () {
		var promiseGet = profesionalService.postJSONVisitados(serverData.json);
        promiseGet.then(function (pl) {
            $scope.Profesionales = pl.data.profesionales;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
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
		var promiseGet = profesionalService.postJSONDistancia(serverData.json);
        promiseGet.then(function (pl) {
        	if (pl.data.profesionales.length > 0) {
        		$scope.Profesionales = pl.data.profesionales;
        	};
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

	$scope.Mapa = function  () {

		$scope.open = false;
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


	}

	$scope.Detalles = function  (profesional) {
		$scope.Profesional = profesional;
		$scope.tab1 = "active";
		$scope.showTab1 = true;
		$('#modalProfesional').modal('show');
		/*if (localStorage.getItem("idCliente_br") != null) {
			getDetalles();
		}else{
			$('#modalProfesional').modal('show');
		}*/


	}

	$scope.active = function (numero) {
		switch (numero) {
			case 1:
				$scope.tab1 = "active";
				$scope.showTab1 = true;
				$scope.tab2 = "";
				$scope.showTab2 = false;
				$scope.tab3 = "";
				$scope.showTab3 = false;
				break;
			case 2:
				$scope.tab1 = "";
				$scope.showTab1 = false;
				$scope.tab2 = "active";
				$scope.showTab2 = true;
				$scope.tab3 = "";
				$scope.showTab3 = false;
				break;
			case 3:
				$scope.tab1 = "";
				$scope.showTab1 = false;
				$scope.tab2 = "";
				$scope.showTab2 = false;
				$scope.tab3 = "active";
				$scope.showTab3 = true;
				break;
			default:

		}
	}

	function getDetalles () {

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


	function initMap(id) {

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

	$scope.login = function  () {
		var data = {
			user : $scope.user,
			pass : $scope.pass
		};
		var promiseGet = clienteService.login(data);
        promiseGet.then(function (pl) {
        	var status = pl.data.status;
        	if (status == 1) {
        		localStorage.setItem("idCliente_br",pl.data.usuario.idCliente);
        		localStorage.setItem("idPerfil_br",pl.data.usuario.idPerfil);
        		localStorage.setItem("idUsuario_br",pl.data.usuario.id);
        		$('#modalProfesional').modal('show');
        		getDetalles();

        	}else{
        		alert(pl.data.message)
        	};

        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

	function llamarVista () {
		window.location = "#/profesional/" + $scope.idProfesional;
	}

	var app_id = '1045182768850951';
	var scopes = "email,user_friends,read_custom_friendlists,public_profile";
	$scope.face;

    (function(d, s, id) {
    	var js, fjs = d.getElementsByTagName(s)[0];
    	if (d.getElementById(id)) return;
		    js = d.createElement(s); js.id = id;
		    js.src = "//connect.facebook.net/en_US/sdk.js";
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

  	function registrarFacebook(response) {
  		console.log(JSON.stringify(response));
  	}

  	$scope.Solicitar = function  (profesional) {
			var promiseGet = clienteService.get(localStorage.getItem("idCliente_br"));
      promiseGet.then(function (pl) {
				$scope.Cliente = pl.data;
				if ($scope.Profesional.servicios.length == 0) {
					$scope.disabledServicio = true;
				}
				if ($scope.Profesional.productos.length == 0) {
					$scope.disabledProducto = true;
				}
				$("#modalCliente").modal("show");
      },
      function (errorPl) {
      	console.log('Error Al Cargar Datos', errorPl);
      });
  	}

		$scope.save = function () {
			var data = {
				 idCliente : localStorage.getItem("idCliente_br"),
				 idProfesional : $scope.Profesional.id,
				 idServicio : $scope.Peticion.idServicio,
				 idProducto : $scope.Peticion.idProducto
			}
			var promiseGet = profesionalService.postSolicitud(data);
			promiseGet.then(function (pl) {
				alert(pl.data);
				$("#modalCliente").modal("hide");
      },
      function (errorPl) {
      	console.log('Error Al Cargar Datos', errorPl);
      });
		}



})
