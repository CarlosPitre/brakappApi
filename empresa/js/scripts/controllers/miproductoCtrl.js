app.controller('miproductoCtrl',  function($scope,productoService,pluginsService){


	$scope.Productos = [];


	loadProductos();
	$scope.Producto = {};

	$scope.openButton = true;



	$scope.Marcas = [];

	loadMarcas();
	$scope.Marca = {};






	function loadProductos () {

		$scope.idProfesional =  localStorage.getItem("idProfesional_br");
		var promiseGet = productoService.getProductos($scope.idProfesional);
        promiseGet.then(function (pl) {
					if (pl.data.status != false) {
						$scope.Productos = pl.data.productos;
					}else {
						$scope.Productos = [];
					}

        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}


	function loadMarcas () {
		var promiseGet = productoService.getMarcas();
        promiseGet.then(function (pl) {
            $scope.Marcas = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}



	$scope.nuevo = function  () {
		$scope.openButton = true;
		$('#modal-responsive').modal('show');

	}





	$scope.save = function  () {
		var datos = {
			descripcion : $scope.Productos.descripcion,
			marca : $scope.Productos.marca,
			porcentaje :  $scope.Productos.porcentaje,
			idProfesional : $scope.idProfesional
		};

		var promiseGet = productoService.post(datos);
		promiseGet.then(function (pl) {
            alert(pl.data.message);
            loadProductos();
						$scope.guardarfoto($scope.idProfesional,pl.data.idProducto)
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
			//$scope.guardarfoto($scope.idProfesional,2)
	}

	$scope.guardarfoto = function(idProfesional,idProducto){
		var fileInput = document.getElementById("file");
		if (fileInput.multiple == true) {

		    for (var i = 0, len = fileInput.files.length; i < len; i++) {
					var file = fileInput.files.item(i);
					console.log(file.name);
					var formData = new FormData();
			    var fileName = file.name;
			    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
			    NomImg1 = "prof-"+idProfesional+"-prod-"+idProducto+"-"+i;
			    formData.append('imagen',file);
			  	var promisePost = productoService.postImagen(formData,NomImg1,fileExtension);
			    promisePost.then(function (d) {
						console.log(d.data);
			    }, function (err) {
			        console.log(err)
			        if(err.status == 401){
			            alert(err.data.msg);
			            console.log(err.data.exception);
			        }else{
			            alert("Error Al procesar Solicitud");
			        }

			        console.log(err);
			    });
		    }

		// only one file available
		} else {
		    var file = fileInput.files.item(0);
		}

    /**/
	}



	 $scope.delete = function  (producto) {
		var datos = {
			idProducto : producto.id,
		}
		console.log(JSON.stringify(datos));
		var promiseGet = productoService.delete(datos);
		promiseGet.then(function (pl) {
        alert(pl.data);
        loadProductos();
    },
    function (errorPl) {
    	console.log('Error Al Cargar Datos', errorPl);
    });

	}

})
