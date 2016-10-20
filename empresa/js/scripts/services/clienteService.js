app.service('clienteService', ['$http', function($http){
	
	this.getClientes = function  () {
		var req = $http.get(uri + '/app/clientes');
		return req;
	}	
}])