app.service('solicitudeService', ['$http', function($http){
	
	this.getSolicitudes = function  (id) {
		var req = $http.get(uri + '/app/solicitudes/' + id );
		return req;
	}


	this.getRespuestas = function  () {
		var req = $http.get(uri + '/app/respuestas');
		return req;
	}


    this.put = function  (object) {
		var req = $http.put(uri + '/app/solicitudes', object);
		return req;
	}

	this.delete = function  (object) {
		var req = $http.post(uri + '/app/solicitudes/delete/', object);
		return req;
	}

}])