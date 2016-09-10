angular.module('starter.services', [])

.service('menuService', function($http) {
  this.getJSON = function  () {
		var req = $http.get(uri + '/app/json');
		return req;
	}
})

.service('solicitudService',function ($http) {
  this.getSolicitudes = function (idCliente) {
    var req = $http.get(uri + '/app/cliente/' + idCliente + '/solicitudes' );
    return req;
  }
})

.service('profesionalService', function($http) {
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

.service('clienteService', function($http) {
  this.login = function (object) {
    var req = $http.post(uri + '/app/usuario/login', object);
    return req;
  }
  this.get = function (id) {
		var req = $http.get(uri + '/app/clientes/' + id);
		return req;
	}
})
