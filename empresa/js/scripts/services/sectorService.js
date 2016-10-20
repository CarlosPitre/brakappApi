app.service('sectorService', ['$http', function($http){
	this.post = function  (object) {
		var req = $http.post(uri + '/app/sectores', object);
		return req;
	}
	this.getSectores = function  () {
		var req = $http.get(uri + '/app/sectores');
		return req;
	}
	this.put = function  (object) {
		var req = $http.put(uri + '/app/sectores', object);
		return req;
	}

    this.delete = function  (id) {
		var req = $http.delete(uri + '/app/sectores/' + id);
		return req;
	}

}])