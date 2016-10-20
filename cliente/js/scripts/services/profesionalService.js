app.service('profesionalService', function($http){
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
