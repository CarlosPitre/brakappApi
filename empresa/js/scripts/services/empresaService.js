app.service('empresaService', function($http) {
  this.getEmpresas = function () {
    var req = $http.get(uri + '/app/profesionales');
    return req;
  }
  this.postPago = function  (data) {
  	var req = $http.post(uri + '/app/profesionales/pago', data);
    return req;
  }
})
