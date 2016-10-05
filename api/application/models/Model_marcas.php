<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_marcas extends CI_Model {

	public function __construct()
	{
		parent::__construct();
	}


    public function getMarcas($id = null)
	{
		if ($id == null) {
			$query=$this->db
				->select('*')
				->from('marca s')
				->get();
		}
		return $query->result();
	}


	public function saveMarcas($datos = array())
	{
		$this->db->insert('marca', $datos);
		return $this->db->insert_id();
	}
}