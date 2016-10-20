app.service('miperfilService', ['$http', function($http){
	
	this.getDatos = function  (idProfesional) {
		var req = $http.get(uri + '/app/profesionales/' + idProfesional );
		return req;
	}


	this.put = function  (object) {
		var req = $http.put(uri + '/app/profesionales', object );
		return req;
	}

	this.postImagen = function (formData,tipo,ext) {
	   var req = $http.post('../api/upload.php?n='+tipo+"&e="+ext, formData,{transformRequest: angular.identity,
	       headers: {'Content-Type': undefined}});
	   	console.log(req)
	   return req;
   	};



}])