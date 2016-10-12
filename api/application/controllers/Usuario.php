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

	public function facebook_post()
	{
		$email = $this->post("email");
		$nombres = $this->post("first_name");
		$apellidos = $this->post("last_name");
		$idFacebook = $this->post("id");

		$usuarioFacebook = $this->model_usuario->getUsuarioFacebook($idFacebook);

		if ($usuarioFacebook) {
			$this->response([
				'usuario' => $usuarioFacebook,
       			'status' => 1,
        		'message' => 'Bienvenido'
            ], REST_Controller::HTTP_OK);
		}else{
			$usuario = $this->model_usuario->getUsuario($email);
			if ($usuario) {
				$this->response([
					'usuario' => $usuario,
	       			'status' => 1,
	        		'message' => 'Bienvenido'
	            ], REST_Controller::HTTP_OK);
			}else{
				$datosCliente = array(
					"correo" => $email,
					"nombres" => $nombres,
					"apellidos" => $apellidos,
					"idFacebook" => $idFacebook
				);
				$cliente = $this->model_usuario->postCliente($datosCliente);
				$datosUsuario = array(
					"usuario" => $email,
					"password" => sha1($idFacebook),
					"idPerfil" => "2",
					"idCliente" => $cliente
				);
				$usuario = $this->model_usuario->postUsuario($datosUsuario);
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
	}

	public function restaurarpass_post()
	{
		$this->load->library('email');

		 $configGmail = array(
			 'protocol' => 'smtp',
			 'smtp_host' => 'brakapp.com',
			 'smtp_port' => 465,
			 'smtp_user' => 'soporte@brakapp.com',
			 'smtp_pass' => 'Soporte@2016',
			 'mailtype' => 'html',
			 'charset' => 'utf-8',
			 'newline' => "\r\n"
		 );    
 
		$this->email->initialize($configGmail);
		
		$this->email->from('soporte@brakapp.com', 'Soporte Brakapp');
		$this->email->to('carlosjpitre@gmail.com');
		
		$this->email->subject('prueba');
		$this->email->message('<h2>pruebassss</h2>');
		
		$this->email->send();
		
		var_dump($this->email->print_debugger());
	}

	public function usuario_post()
	{
		$datosCliente = array(
			"correo" => $this->post("correo"),
			"nombres" => $this->post("nombres"),
			"apellidos" => $this->post("apellidos"),
			"direccion" => $this->post("direccion"),
			"telefono" => $this->post("telefono")
		);
		$cliente = $this->model_usuario->postCliente($datosCliente);
		$datosUsuario = array(
			"usuario" => $this->post("correo"),
			"password" => sha1($this->post("correo")),
			"idPerfil" => "2",
			"idCliente" => $cliente
		);
		$usuario = $this->model_usuario->postUsuario($datosUsuario);
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
