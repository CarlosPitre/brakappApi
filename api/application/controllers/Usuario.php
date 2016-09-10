<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Usuario extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('model_usuario');
	}

	public function usuario_get($id = null)
	{

	}

	public function login_post()
	{
		$user = $this->post("user");
		$pass = sha1($this->post("pass"));

		$usuario = $this->model_usuario->getLogin($user,$pass);

		if ($usuario) {
			$this->response([
				'usuario' => $usuario,
       			'status' => 1,
        		'message' => 'Bienvenido'
            ], REST_Controller::HTTP_OK);
		}else{
			$this->response([
       			'status' => 0,
        		'message' => 'Usuario o Contraseña Incorrecto'
					], REST_Controller::HTTP_OK);
		}
	}

}

/* End of file usuario.php */
/* Location: ./application/controllers/usuario.php */
