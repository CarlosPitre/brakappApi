app.service('respuestaService', ['$http', function($http){
	
   this.post = function  (object) {
		var req = $http.post(uri + '/app/respuestas', object);
		return req;
	}

	this.getRespuestas = function  () {
		var req = $http.get(uri + '/app/respuestas');
		return req;
	}

	this.delete = function  (object) {
		var req = $http.post(uri + '/app/respuestas/delete/', object);
		return req;
	}

}])