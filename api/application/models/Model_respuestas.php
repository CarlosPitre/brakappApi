<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_respuestas extends CI_Model {

 public function __construct()
	{
		parent::__construct();
	}

	public function getRespuestas($id = null)
	{
		if ($id == null) {
			$query=$this->db
				->select("*")
				->from("respuestas")				
				->get();
		}
		return $query->result();
	}

	public function saveRespuestas($datos = array())
	{
		$this->db->insert('respuestas', $datos);
		return $this->db->insert_id();
	}

	public function save($datos = array())
	{
		$this->db->insert('respuestas', $datos);
		return true;
	}

	public function delete($id)
   {
   		$this->db->where('id', $id);
   		$this->db->delete('respuestas');
   		return true;
   }
}

/* End of file model_respuestas.php */
/* Location: ./application/models/model_respuestas.php */