app.service('clienteService', function($http){
	this.login = function  (object) {
		var req = $http.post(uri + '/app/usuario/login', object);
		return req;
	}
	this.get = function (id) {
		var req = $http.get(uri + '/app/clientes/' + id);
		return req;
	}
})
