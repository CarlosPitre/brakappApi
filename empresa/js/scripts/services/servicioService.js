app.service('servicioService', ['$http', function($http){
	this.post = function  (object) {
		var req = $http.post(uri + '/app/servicios', object);
		return req;
	}
	this.getServicios = function  (id) {
		console.log(id);
		var req = $http.get(uri + '/app/servicios/' + id );
		return req;
	}
	this.put = function  (object) {
		var req = $http.put(uri + '/app/servicios', object);
		return req;
	}

    this.delete = function  (object) {
		var req = $http.post(uri + '/app/servicios/delete', object);
		return req;
	}

	this.getSectores = function  () {
		var req = $http.get(uri + '/app/sectores');
		return req;
	}



}])