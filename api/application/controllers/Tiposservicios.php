<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Tiposservicios extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Model_tiposservicios');
	}

	public function tiposservicios_get($id = null)
	{
		if ($id == null) {
			$Tiposservicios = $this->Model_tiposservicios->getTiposservicios();
		}
		if ($Tiposservicios) {
			$this->response($Tiposservicios, REST_Controller::HTTP_OK);
		}else{
	        $this->response([
       			'status' => FALSE,
        		'message' => 'No users were found'
            ], REST_Controller::HTTP_NOT_FOUND); 
		};
	}

}