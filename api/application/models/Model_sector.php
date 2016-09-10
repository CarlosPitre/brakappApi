<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_sector extends CI_Model {

	public function __construct()
	{
		parent::__construct();
	}

	public function getSectores($id = null)
	{
		if ($id == null) {
			$query=$this->db
				->select("*")
				->from("sector")				
				->get();
		}
		return $query->result();
	}

	public function save($datos = array())
	{
		$this->db->insert('sector', $datos);
		return true;
	}

	public function update($datos = array(), $id)
	{
		$this->db->where('id', $id);
		$this->db->update('sector', $datos);
		return true;
	}

}

/* End of file model_sector.php */
/* Location: ./application/models/model_sector.php */