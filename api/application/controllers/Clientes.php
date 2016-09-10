<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Clientes extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('model_cliente');
	}

	public function clientes_get($id = null)
	{
		if ($id == null) {
			$clientes = $this->model_cliente->getClientes();
		}else{
			$clientes = $this->model_cliente->getClientes($id);
		}
		if ($clientes) {
			$this->response($clientes, REST_Controller::HTTP_OK);
		}else{
	        $this->response([
       			'status' => FALSE,
        		'message' => 'No users were found'
            ], REST_Controller::HTTP_NOT_FOUND);
		};
	}

}

/* End of file clientes.php */
/* Location: ./application/controllers/clientes.php */
