app.service('menuService', function($http){
	this.getMenu = function  (idPerfil) {
		var req = $http.get(uri + '/app/perfil/' + idPerfil + '/menu');
		return req;
	}
})