<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Profesionales extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('model_profesional');
	}

	public function profesionales_get($id = null)
	{
		if ($id != null) {
			$profesional = $this->model_profesional->getprofesional($id);
		}else {
			$profesional = $this->model_profesional->getprofesional();
		}
		if ($profesional) {
			$this->response($profesional, REST_Controller::HTTP_OK);
		}else{
	        $this->response([
       			'status' => FALSE,
        		'message' => 'No users were found'
            ], REST_Controller::HTTP_NOT_FOUND);
		};
	}



	public function profesionales_post()
	{
		$datos = array(
			"razonSocial" => $this->post("razonSocial"),
			"identificacion" => $this->post("identificacion"),
			"correo" => $this->post("correo"),
			"telefono" => $this->post("telefono"),
			"idMunicipio" => $this->post("idMunicipio"),
			"foto" => "../img/images.png",
			"estado" => "INACTIVO",
 
		);
		$idProfesional = $this->model_profesional->save($datos);

		$datosUsuario = array(
			"usuario" =>$this->post("usuario"),
			"password" =>sha1($this->post("password")),
			"idPerfil" => "3",
			"idProfesional" => $idProfesional
		);
		$guardar = $this->model_profesional->saveUsuario($datosUsuario);
		if ($guardar) {
			$this->response([
       			'status' => TRUE,
        		'message' => 'Datos Guardados Correctamente'
            ], REST_Controller::HTTP_CREATED);
		}else{
			$message = "Error";
			$this->response($message, REST_Controller::HTTP_BAD_REQUEST);
		};
	}

	/*

		Busqueda en todas las tablas de marca, sectores, servicios, profesionales y productos
		Recibo por json los parametros de busqueda, obtengo el campo tipo que es el que me va a
		ayudar a saber en que tabla debo buscar por medio de un switch, retorno el profesional final.

	*/


	public function busquedaGeneralProfesionales_post()
	{

		$tipo = $this->post("tipo");
		$idMunicipio = $this->post("idMunicipio");
		switch ($tipo) {
			case 'Sector':
				$id = $this->post("idSector");
				$profesionales = $this->model_profesional->getProfesionalesBySector($id,$idMunicipio);
				break;
			case 'Marca':
				$id = $this->post("idMarca");
				$profesionales = $this->model_profesional->getProfesionalesByMarca($id,$idMunicipio);
				break;
			case 'Servicio':
				$id = $this->post("idServicio");
				$profesionales = $this->model_profesional->getProfesionalesByServicio($id,$idMunicipio);
				break;
			case 'Empresa':
				$id = $this->post("idProfesional");
				$profesionales = $this->model_profesional->getProfesionalesByProfesionales($id,$idMunicipio);
				break;
			case 'Producto':
				$id = $this->post("idProducto");
				$profesionales = $this->model_profesional->getProfesionalesByProducto($id,$idMunicipio);
				for ($i=0; $i < count($profesionales); $i++) {
					$profesionales[$i]->imagenesProductos = $this->model_profesional->getImagenes($profesionales[$i]->idprofesionalproducto);
				}
				break;
			case 'Profesion':
				$id = $this->post("idProfesion");
				$profesionales = $this->model_profesional->getProfesionalesByProfesion($id,$idMunicipio);		
				break;
			case 'ProductoMarca':
				$idProducto = $this->post("idProducto");
				$idMarca = $this->post("idMarca");
				$modelo = $this->post("modelo");
				$profesionales = $this->model_profesional->getProfesionalesByProductoMarca($idProducto,$idMarca,$modelo,$idMunicipio);
				for ($i=0; $i < count($profesionales); $i++) {
					$profesionales[$i]->imagenesProductos = $this->model_profesional->getImagenes($profesionales[$i]->idprofesionalproducto);
				}
				break;
			default:
				# code...
				break;
		}

		for ($i=0; $i < count($profesionales); $i++) {
			$profesionales[$i]->status = FALSE;
			$profesionales[$i]->button = "Ver Mas";
			$profesionales[$i]->mapa = FALSE;
			$servicios = $this->model_profesional->getServicios($profesionales[$i]->id);
			$profesionales[$i]->servicios = $servicios;
			$productos = $this->model_profesional->getProductos($profesionales[$i]->id);
			for ($p=0; $p < count($productos); $p++) { 
			$productos[$p]->imagenes = $this->model_profesional->getImagenes($productos[$p]->id);
			}
			$profesionales[$i]->productos = $productos;
			$profesionales[$i]->open = FALSE;
		}

		if ($profesionales) {
			$this->response([
       			'status' => 1,
        		'profesionales' => $profesionales
            ], REST_Controller::HTTP_OK);
		}else{
	        $this->response([
       			'status' => 0,
        		'message' => 'No hay Empleados Con Ese Servicios',
        		'profesionales' => []
            ], REST_Controller::HTTP_OK);
		};
	}

	public function busquedaGeneralProfesionalesDistancia_post()
	{

		$tipo = $this->post("tipo");
		$lat = $this->post("latitud");
		$lgn = $this->post("longitud");
		$idMunicipio = $this->post("idMunicipio");

		switch ($tipo) {
			case 'Sector':
				$id = $this->post("idSector");
				$profesionales = $this->model_profesional->getProfesionalesBySectorDistancia($id,$idMunicipio,$lat,$lgn);
				break;
			case 'Marca':
				$id = $this->post("idMarca");
				$profesionales = $this->model_profesional->getProfesionalesByMarcaDistancia($id,$idMunicipio,$lat,$lgn);
				break;
			case 'Servicio':
				$id = $this->post("idServicio");
				$profesionales = $this->model_profesional->getProfesionalesByServicioDistancia($id,$idMunicipio,$lat,$lgn);
				break;
			case 'Empresa':
				$id = $this->post("idProfesional");
				$profesionales = $this->model_profesional->getProfesionalesByProfesionalDistancia($id,$idMunicipio,$lat,$lgn);
				break;
			case 'Producto':
				$id = $this->post("idProducto");
				$profesionales = $this->model_profesional->getProfesionalesByProductoDistancia($id,$idMunicipio,$lat,$lgn);
				break;
			case 'Profesion':
				$id = $this->post("idProfesion");
				$profesionales = $this->model_profesional->getProfesionalesByProfesionDistancia($id,$idMunicipio,$lat,$lgn);		
				break;
			case 'ProductoMarca':
				$idProducto = $this->post("idProducto");
				$idMarca = $this->post("idMarca");
				$modelo = $this->post("modelo");
				$profesionales = $this->model_profesional->getProfesionalesByProductoMarcaDistancia($idProducto,$idMarca,$modelo,$idMunicipio,$lat, $lgn);
				for ($i=0; $i < count($profesionales); $i++) {
					$profesionales[$i]->imagenesProductos = $this->model_profesional->getImagenes($profesionales[$i]->idprofesionalproducto);
				}
				break;
			default:
				# code...
				break;
		}

		for ($i=0; $i < count($profesionales); $i++) {
			$profesionales[$i]->status = FALSE;
			$profesionales[$i]->button = "Ver Mas";
			$profesionales[$i]->mapa = FALSE;
			$servicios = $this->model_profesional->getServicios($profesionales[$i]->id);
			$profesionales[$i]->servicios = $servicios;
			$productos = $this->model_profesional->getProductos($profesionales[$i]->id);
			$profesionales[$i]->productos = $productos;
			$profesionales[$i]->open = FALSE;
		}

		if ($profesionales) {
			$this->response([
       			'status' => 1,
        		'profesionales' => $profesionales
            ], REST_Controller::HTTP_OK);
		}else{
	        $this->response([
       			'status' => 0,
        		'message' => 'No hay Empleados Con Ese Servicios',
        		'profesionales' => []
            ], REST_Controller::HTTP_OK);
		};
	}




	public function busquedaGeneralProfesionalesVisitados_post()
	{

		$tipo = $this->post("tipo");

		switch ($tipo) {
			case 'Sector':
				$id = $this->post("idSector");
				$profesionales = $this->model_profesional->getProfesionalesBySectorVisitados($id);
				break;
			case 'Marca':
				$id = $this->post("idMarca");
				$profesionales = $this->model_profesional->getProfesionalesByMarcaVisitados($id);
				break;
			case 'Servicio':
				$id = $this->post("idServicio");
				$profesionales = $this->model_profesional->getProfesionalesByServicioVisitados($id);
				break;
			case 'Empresa':
				$id = $this->post("idProfesional");
				$profesionales = $this->model_profesional->getProfesionalesByProfesionalVisitados($id);
				break;
			case 'Producto':
				$id = $this->post("idProducto");
				$profesionales = $this->model_profesional->getProfesionalesByProductoVisitados($id);
				break;

			default:
				# code...
				break;
		}

		for ($i=0; $i < count($profesionales); $i++) {
			$profesionales[$i]->status = FALSE;
			$profesionales[$i]->button = "Ver Mas";
			$profesionales[$i]->mapa = FALSE;
			$servicios = $this->model_profesional->getServicios($profesionales[$i]->id);
			$profesionales[$i]->servicios = $servicios;
			$productos = $this->model_profesional->getProductos($profesionales[$i]->id);
			$profesionales[$i]->productos = $productos;
			$profesionales[$i]->open = FALSE;
		}

		if ($profesionales) {
			$this->response([
       			'status' => 1,
        		'profesionales' => $profesionales
            ], REST_Controller::HTTP_OK);
		}else{
	        $this->response([
       			'status' => 0,
        		'message' => 'No hay Empleados Con Ese Servicios',
        		'profesionales' => []
            ], REST_Controller::HTTP_OK);
		};
	}

	



	public function profesionales_put()
	{

		$imagen = $this->put("foto");
		$arrayImagen = explode("../api/img/", $imagen);
		
		if ($arrayImagen[0] == null) {
			$imagen = $arrayImagen[1];
		}else{
			$imagen = $arrayImagen[0];
		}		

		$datos = array(
			"razonSocial" => $this->put("razonSocial"),
			"identificacion"=>$this->put("identificacion"),
			"correo"=>$this->put("correo"),
			"telefono"=>$this->put("telefono"),
			"experiencia"=>$this->put("experiencia"),
			"direccion" => $this->put("direccion"),
			"latitud" => $this->put("latitud"),
			"longitud" => $this->put("longitud"),
			"foto" => "../api/img/".$imagen
		);
		$guardar= $this->model_profesional->update($datos,$this->put("id"));
		if ($guardar) {
			$message = "Datos Guardados Correctamente";
			$this->response($message, REST_Controller::HTTP_CREATED);
		}else{
			$message = "Error";
			$this->response($message, REST_Controller::HTTP_BAD_REQUEST);
		};
	}

	public function pagos_post()
	{
        $queryValores = $this->db->select('*')->from('valores')->where('id','1')->get();
		$valores = $queryValores->row();
        $id = $this->post("id");
        $queryProfesional = $this->db->select('diasRestantes')->from('profesional')->where('id',$id)->get();
		$profesional = $queryProfesional->row();
        $tipoPago = $this->post("tipoPago");
        $diasRestantes = 0;
        switch ($tipoPago)
        {
            case 'Año':
                $diasRestantes = $profesional->diasRestantes + $valores->diasAno;
                $valor = $valores->valorAno;
                $concepto = "Pago de Subcripción por un año";
                break;
            case 'Meses' :
                $numeroMeses = $this->post("numeroMeses");
                $diasRestantes = ($profesional->diasRestantes + $valores->diasMes) * $numeroMeses;
                $valor = $valores->valorMes;
                $concepto = "Pago de Subcripción por '$numeromeses' meses";
                break;
            case 'Quincena':
                $diasRestantes = intval($profesional->diasRestantes) + intval($valores->diasQuincena);
                $valor = $valores->valorQuincena;
                $concepto = "Pago de Subcripción por 15 Dias";
                break;
            case 'Recarga' :
                $valor = $this->post("valorPago");		
                $valormes = $valores->valorMes;
                $dias = $valores->diasMes;
                $diasMes = ($valor/$valormes)*$dias;
                $diasRestantes = $profesional->diasRestantes + $diasMes;
                $concepto = "Pago de Subcripción por '$diasMes' dias";
                break;
        }
        
        $datosPagos = array(
            "idProfesional" => $id,
            "concepto" => $concepto,
            "valor" => $valor
        );
		
		$datosProfesional = array('diasRestantes' => $diasRestantes, 'estado' => 'Activo');
        
		$updateProfesional = $this->model_profesional->update($datosProfesional,$this->post("id"));
		if ($updateProfesional) {
            $pagos = $this->model_profesional->pagos($datosPagos);
            if ($pagos)
            {
              $message = "Datos Guardados Correctamente";
              $this->response([
					'msg' => $message,
                    'pagos' => $pagos,
					'status' => 0
				], REST_Controller::HTTP_CREATED);  
            }
			
		}else{
			$message = "Error";
			$this->response([
					'msg' => $message,
					'status' => 0
				], REST_Controller::HTTP_BAD_REQUEST);
		}
	}


}

/* End of file profesionales.php */
/* Location: ./application/controllers/profesionales.php */
