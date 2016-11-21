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
  
  $scope.changeTipoPago = function () {
      
      switch($scope.Profesional.tipoPago) {
          case "Meses":
              $scope.openMeses = true;
              $scope.openRecarga = false;              
              break;
          case "Recarga":
              $scope.openMeses = false;
              $scope.openRecarga = true;
              break;
          default:
              $scope.openMeses = false;
              $scope.openRecarga = false;
              break;
      }
  }

  $scope.savePago = function  () {
      console.log(JSON.stringify($scope.Profesional));
    var promiseGet = empresaService.postPago($scope.Profesional);
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
