app.controller('loginCtrl',  function($scope,loginService){
        

$scope.Profesionales = [];
$scope.Profesional= {};

  $scope.login = function  () {
                var data = {
                        user : $scope.user,
                        pass : $scope.pass
                 };
                 var promiseGet = loginService.login(data);
         promiseGet.then(function (pl) {
                
                 var status = pl.data.status;
                 if (status == 1) {

                         localStorage.setItem("idProfesional_br",pl.data.usuario.idProfesional);
                         localStorage.setItem("idPerfil_br",pl.data.usuario.idPerfil);
                         localStorage.setItem("idUsuario_br",pl.data.usuario.id);

                         window.location.href="./index.html";

                 }else{
                        alert(pl.data.message)
                 };

         },
         function (errorPl) {
                 console.log('Error Al Cargar Datos', errorPl);
          });
        }
   
})

