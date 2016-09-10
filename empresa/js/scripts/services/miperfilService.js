app.service('miperfilService', ['$http', function($http){
	
	this.getDatos = function  (idProfesional) {
		var req = $http.get(uri + '/app/profesionales/' + idProfesional );
		return req;
	}


	this.put = function  (object) {
		var req = $http.put(uri + '/app/profesionales', object );
		return req;
	}


}])