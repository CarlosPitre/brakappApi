<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Productos extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('model_productos');
		$this->load->model('model_marcas');
	}

	public function productos_get($id = null)
	{
		if ($id == null) {
			$Productos = $this->model_productos->getProductos();
		}
		else{
			$Productos = $this->model_productos->getProductos($id);
		}
		if ($Productos) {
			$this->response([
				"productos" => $Productos,
				'status' => TRUE
			], REST_Controller::HTTP_OK);
		}else{
	        $this->response([
       			'status' => FALSE,
        		'message' => 'No users were found'
					], REST_Controller::HTTP_OK);
		};
	}


	public function marcas_get($id = null)
	{
		if ($id == null) {
			$Marcas = $this->model_marcas->getMarcas();
		}
		if ($Marcas) {
			$this->response($Marcas, REST_Controller::HTTP_OK);
		}else{
	        $this->response([
       			'status' => FALSE,
        		'message' => 'No users were found'
            ], REST_Controller::HTTP_NOT_FOUND);
		};
	}




	public function productos_post()
	{
		$datos = array(
			"descripcion" => $this->post("descripcion"),
			"estado" => "ACTIVO"
		);
		$idProducto= $this->model_productos->save($datos);

        $datosMarcas = array(
			"descripcion" => $this->post("marca"),
			"estado" => "ACTIVO"
		);
		$idMarca = $this->model_marcas->saveMarcas($datosMarcas);

          $datosProductos = array(
			"idProfesional" => $this->post("idProfesional"),
			"idProducto" => $idProducto,
			"idMarca" => $idMarca,
			"porcentaje" =>  $this->post("porcentaje")
		);
		$guardar = $this->model_productos->saveProfesional($datosProductos);
         if ($guardar) {
					 $this->response([
		 				'status' => TRUE,
		 				'message' => 'Datos Guardados Correctamente',
						'idProducto' => $idProducto
					], REST_Controller::HTTP_OK);
		}else{
			$message = "Error";
			$this->response($message, REST_Controller::HTTP_BAD_REQUEST);
		};
	}


	public function delete_post()
	{
		$idProducto = $this->post("idProducto");
		$guardar= $this->model_productos->delete($idProducto);
		if ($guardar) {
			$message = "Datos eliminado Correctamente";
			$this->response($message, REST_Controller::HTTP_CREATED);
		}else{
			$message = "Error";
			$this->response($message, REST_Controller::HTTP_BAD_REQUEST);
		};
	}
}
