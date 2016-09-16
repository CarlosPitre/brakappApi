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
			$message = "Datos Guardados Correctamente";
			$this->response($message, REST_Controller::HTTP_CREATED);
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

		switch ($tipo) {
			case 'Sector':
				$id = $this->post("idSector");
				$profesionales = $this->model_profesional->getProfesionalesBySector($id);
				break;
			case 'Marca':
				$id = $this->post("idMarca");
				$profesionales = $this->model_profesional->getProfesionalesByMarca($id);
				break;
			case 'Servicio':
				$id = $this->post("idServicio");
				$profesionales = $this->model_profesional->getProfesionalesByServicio($id);
				break;
			case 'Empresa':
				$id = $this->post("idProfesional");
				$profesionales = $this->model_profesional->getProfesionalesByProfesional($id);
				break;
			case 'Producto':
				$id = $this->post("idProducto");
				$profesionales = $this->model_profesional->getProfesionalesByProducto($id);
				for ($i=0; $i < count($profesionales); $i++) {
					$profesionales[$i]->imagenesProductos = $this->model_profesional->getImagenes($profesionales[$i]->idProfesionalProducto);
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

	public function getProfesionalesBySectorDistancia_post()
	{

		$tipo = $this->post("tipo");
		$lat = $this->post("latitud");
		$lgn = $this->post("longitud");

		switch ($tipo) {
			case 'Sector':
				$id = $this->post("idSector");
				$profesionales = $this->model_profesional->getProfesionalesBySectorDistancia($id,$lat,$lgn);
				break;
			case 'Marca':
				$id = $this->post("idMarca");
				$profesionales = $this->model_profesional->getProfesionalesByMarcaVisitados($id,$lat,$lgn);
				break;
			case 'Servicio':
				$id = $this->post("idServicio");
				$profesionales = $this->model_profesional->getProfesionalesByServicioVisitados($id,$lat,$lgn);
				break;
			case 'Empresa':
				$id = $this->post("idProfesional");
				$profesionales = $this->model_profesional->getProfesionalesByProfesionalVisitados($id,$lat,$lgn);
				break;
			case 'Producto':
				$id = $this->post("idProducto");
				$profesionales = $this->model_profesional->getProfesionalesByProductoVisitados($id,$lat,$lgn);
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
		$datos = array(
			"razonSocial" => $this->put("razonSocial"),
			"identificacion"=>$this->put("identificacion"),
			"correo"=>$this->put("correo"),
			"telefono"=>$this->put("telefono"),
			"experiencia"=>$this->put("experiencia")
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
		$valor = $this->post("valorPago");
		$id = $this->post("id");
		$queryValores = $this->db->select('*')->from('valores')->where('id','1')->get();
		$valores = $queryValores->row();
		$queryProfesional = $this->db->select('diasRestantes')->from('profesional')->where('id',$id)->get();
		$profesional = $queryProfesional->row();
		$valormes = $valores->valor;
		$dias = $valores->dias;
		$diasMes = ($valor/$valormes)*$dias;
		$diasRestantes = $profesional->diasRestantes + $diasMes;
		
		$datosProfesional = array('diasRestantes' => $diasRestantes, 'estado' => 'Activo');
		$updateProfesional = $this->model_profesional->update($datosProfesional,$this->post("id"));
		if ($updateProfesional) {

			$message = "Datos Guardados Correctamente";
			$this->response([
					'msg' => $message,
					'status' => 0
				], REST_Controller::HTTP_CREATED);
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
