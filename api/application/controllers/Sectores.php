<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Sectores extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('model_sector');
	}

	public function sectores_get($id = null)
	{
		if ($id == null) {
			$sectores = $this->model_sector->getSectores();
		}
		if ($sectores) {
			$this->response($sectores, REST_Controller::HTTP_OK);
		}else{
	        $this->response([
       			'status' => FALSE,
        		'message' => 'No users were found'
            ], REST_Controller::HTTP_NOT_FOUND); 
		};
	}

	public function sectores_post()
	{
		$datos = array(
			"descripcion" => $this->post("descripcion"),
			"estado" => "ACTIVO"
		);
		$guardar= $this->model_sector->save($datos);
		if ($guardar) {
			$message = "Datos Guardados Correctamente";
			$this->response($message, REST_Controller::HTTP_CREATED);
		}else{
			$message = "Error";
			$this->response($message, REST_Controller::HTTP_BAD_REQUEST);
		};
	}

	public function sectores_put()
	{
		$datos = array(
			"descripcion" => $this->put("descripcion"),
		);
		$guardar= $this->model_sector->update($datos,$this->put("id"));
		if ($guardar) {
			$message = "Datos Guardados Correctamente";
			$this->response($message, REST_Controller::HTTP_CREATED);
		}else{
			$message = "Error";
			$this->response($message, REST_Controller::HTTP_BAD_REQUEST);
		};
	}

	public function sectores_delete($id)
	{
		$datos = array(
			"estado" => "Inactivo",
		);
		$guardar= $this->model_sector->update($datos,$id);
		if ($guardar) {
			$message = "Datos Guardados Correctamente";
			$this->response($message, REST_Controller::HTTP_CREATED);
		}else{
			$message = "Error";
			$this->response($message, REST_Controller::HTTP_BAD_REQUEST);
		};
	}

}

/* End of file sectores.php */
/* Location: ./application/controllers/sectores.php */