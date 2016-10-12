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

	public function getUsuario($email)
	{
		$query=$this->db
				->select('usuario.id,usuario.idCliente,usuario.idPerfil,usuario.idProfesional,usuario.idAdmin')
				->from("usuario")
				->join("cliente","cliente.id = usuario.idCliente","inner")
				->where("cliente.correo", $email)
				->get();
		return $query->row();
	}

	public function postCliente($datos = array())
	{
		$this->db->insert('cliente', $datos);
		return $this->db->insert_id();
	}

	public function postUsuario($datos = array())
	{
		$this->db->insert('usuario', $datos);
		$idUsuario = $this->db->insert_id();
		$query=$this->db
					->select('usuario.id,usuario.idCliente,usuario.idPerfil,usuario.idProfesional,usuario.idAdmin')
					->from("usuario")
					->where("id", $idUsuario)
					->get();
		return $query->row();
	}

	public function getUsuarioFacebook($id)
	{
		$query=$this->db
				->select('usuario.id,usuario.idCliente,usuario.idPerfil,usuario.idProfesional,usuario.idAdmin')
				->from("usuario")
				->join("cliente","cliente.id = usuario.idCliente","inner")
				->where("cliente.idFacebook", $id)
				->get();
		return $query->row();
	}


}

/* End of file model_usuario.php */
/* Location: ./application/models/model_usuario.php */