<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Municipio extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Model_municipio');
	}


    public function municipio_get($id = null)
	{
		if ($id != null) {
			$Municipios = $this->Model_municipio->getMunicipio($id);
		}
		if ($Municipios) {
			$this->response($Municipios, REST_Controller::HTTP_OK);
		}else{
	        $this->response([
       			'status' => FALSE,
        		'message' => 'No users were found'
            ], REST_Controller::HTTP_OK);
		};
		//echo "hola";
	}
}
