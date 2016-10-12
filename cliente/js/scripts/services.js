

app.service('menuService', function($http) {
  this.getJSON = function  () {
		var req = $http.get(uri + '/app/json');
		return req;
	}
  this.getMunicipios = function  () {
    var req = $http.get(uri + '/app/municipios');
    return req;
  }
})

app.service('solicitudService',function ($http) {
  this.getSolicitudes = function (idCliente) {
    var req = $http.get(uri + '/app/cliente/' + idCliente + '/solicitudes' );
    return req;
  }
})

app.service('profesionalService', function($http) {
  this.postJSON = function  (object) {
    var req = $http.post(uri + '/app/servicio/profesionales', object);
    return req;
  }

  this.getDatos = function  (idProfesional) {
    var req = $http.get(uri + '/app/profesionales/' + idProfesional );
    return req;
  }

  this.postJSONVisitados = function  (object) {
    var req = $http.post(uri + '/app/servicio/profesionales/visitados', object);
    return req;
  }

  this.postJSONDistancia = function  (object) {
    var req = $http.post(uri + '/app/servicio/profesionales/distancia', object);
    return req;
  }

  this.postSolicitud = function (object) {
    var req = $http.post(uri + '/app/solicitudes', object);
    return req;
  }
})

app.service('clienteService', function($http) {
  this.login = function (object) {
    var req = $http.post(uri + '/app/usuario/login', object);
    return req;
  }
  this.get = function (id) {
		var req = $http.get(uri + '/app/clientes/' + id);
		return req;
	}
  this.loginFaebook = function  (object) {
    var req = $http.post(uri + '/app/facebook', object);
    return req;
  }
  this.post = function  (object) {
    var req = $http.post(uri + '/app/usuario', object);
    return req;
  }
})
