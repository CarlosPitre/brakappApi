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
				->select('s.descripcion as marca, ps.*')
				->from('marca s')
				->join('profesionalproducto ps', 'ps.idMarca = s.id', 'inner')
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