<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_usuario extends CI_Model {

	public function getLogin($user,$pass)
	{
		$query=$this->db
					->select('usuario.id,usuario.idCliente,usuario.idPerfil,usuario.idProfesional,usuario.idAdmin')
					->from("usuario")
					->where(array("usuario"=>$user,"password"=>$pass))
					->get();
		return $query->row();
	}

}

/* End of file model_usuario.php */
/* Location: ./application/models/model_usuario.php */