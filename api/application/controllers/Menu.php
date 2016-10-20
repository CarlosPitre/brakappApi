<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Menu extends Rest_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('model_menu');
	}

	public function menu_get($id = null)
	{
		if ($id != null) {
			$menu = $this->model_menu->getMenu($id);
		}
		if ($menu) {
			$this->response($menu, REST_Controller::HTTP_OK);
		}else{
	        $this->response([
       			'status' => FALSE,
        		'message' => 'No users were found'
            ], REST_Controller::HTTP_NOT_FOUND); 
		};
	}

}

/* End of file menu.php */
/* Location: ./application/controllers/menu.php */