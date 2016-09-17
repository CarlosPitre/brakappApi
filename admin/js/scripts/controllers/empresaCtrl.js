app.controller('empresaCtrl', function ($scope, empresaService) {

  $scope.Profesionales = [];
  loadProfesionales()

  function loadProfesionales() {
    var promiseGet = empresaService.getEmpresas();
    promiseGet.then(function (pl) {
        $scope.Profesionales = pl.data;

    },
    function (errorPl) {
    	console.log('Error Al Cargar Datos', errorPl);
    });
  }

  $scope.openModal = function  (profesional) {
    $scope.Profesional = profesional;
    $("#modalPago").modal("show");
  }

  $scope.savePago = function  () {
    var data = {
      id : $scope.Profesional.id,
      valorPago : $scope.Profesional.valorPago
    };
    var promiseGet = empresaService.postPago(data);
    promiseGet.then(function (pl) {
        loadProfesionales()
        alert(pl.data.msg);
        $("#modalPago").modal("hide");
    },
    function (errorPl) {
      console.log('Error Al Cargar Datos', errorPl);
    });
  }

})
