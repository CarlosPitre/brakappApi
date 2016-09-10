app.service('loginService', function($http){
	this.login = function  (object) {
		var req = $http.post(uri + '/app/usuario/login', object);
		return req;
	}
})