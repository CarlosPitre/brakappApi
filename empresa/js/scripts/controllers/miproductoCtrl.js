app.controller('miproductoCtrl',  function($scope,productoService,pluginsService){


	$scope.Productos = [];
	loadProductos();
	$scope.Producto = {};
	$scope.openButton = true;
	$scope.Marcas = [];
	loadMarcas();
	//loadAllProductos()
	$scope.Marca = {};
	$scope.ProfesionalProducto = {};
	$scope.ProfesionalProducto.fotos = [];
	$scope.MisProductos = [];


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
		$scope.Producto.idProfesional = $scope.idProfesional;
		if ($scope.Producto.jsonProducto == null) {
			$scope.Producto.descripcion = $("#descripcion_value").val()
		}else{
			$scope.Producto.descripcion = $scope.Producto.jsonProducto.originalObject;
		}
		if ($scope.Producto.jsonProducto == null) {
			$scope.Producto.marca = $("#marca_value").val()
		}else{
			$scope.Producto.marca = $scope.Producto.jsonMarca.originalObject;
		}
		
		var promiseGet = productoService.post($scope.Producto);
		promiseGet.then(function (pl) {
            alert(pl.data.message);
            loadProductos();
            $scope.ProfesionalProducto.id = pl.data.idProfesionalProducto;
			$scope.guardarfoto($scope.idProfesional,pl.data.idProducto)
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

	$scope.guardarfoto = function(idProfesional,idProducto){
		var fileInput = document.getElementById("file");
		if (fileInput.multiple == true) {
			$scope.limite = fileInput.files.length - 1;
		    for (var i = 0; i <= $scope.limite; i++) {
				var file = fileInput.files.item(i);
				var formData = new FormData();
			    var fileName = file.name;
			    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
			    NomImg1 = "prof-"+idProfesional+"-prod-"+idProducto+"-"+i;
			    formData.append('imagen',file);
			  	var promisePost = productoService.postImagen(formData,NomImg1,fileExtension);
			    promisePost.then(function (d) {
					$scope.ProfesionalProducto.fotos.push({
						foto : d.data
					})
					GuardarFotos()
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
		    /*setTimeout(function  () {
		    	GuardarFotos()
		    },3000)*/
		} else {
		    var file = fileInput.files.item(0);
		    var formData = new FormData();
		    var fileName = file.name;
		    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
		    NomImg1 = "prof-"+idProfesional+"-prod-"+idProducto+"-"+i;
		    formData.append('imagen',file);
		  	var promisePost = productoService.postImagen(formData,NomImg1,fileExtension);
		    promisePost.then(function (d) {
				$scope.ProfesionalProducto.fotos.push({
					foto : d.data
				})
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
		
	}

	function GuardarFotos () {
		
		if (($scope.ProfesionalProducto.fotos.length - 1) == $scope.limite) {
			//console.log(JSON.stringify($scope.ProfesionalProducto));
			var promiseGet = productoService.postImagenes($scope.ProfesionalProducto);
			promiseGet.then(function (pl) {
	           
	            loadProductos();
	        },
	        function (errorPl) {
	        	console.log('Error Al Cargar Datos', errorPl);
	        });
		};
		

	}



	 $scope.delete = function  (producto) {
		var datos = {
			idProducto : producto.id,
		}
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
