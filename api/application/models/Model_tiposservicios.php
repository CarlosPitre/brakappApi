<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_tiposservicios extends CI_Model {

	public function __construct()
	{
		parent::__construct();
	}

	public function getTiposservicios($id = null)
	{
		if ($id == null) {
			$query=$this->db
				->select('*')
				->from('tiposservicios')				
				->get();
		}
		return $query->result();
	}

	public function update($datos = array(), $id)
	{
		$this->db->where('id', $id);
		$this->db->update('tiposservicios', $datos);
		return true;
	}

}

/* End of file model_tiposservicios.php */
/* Location: ./application/models/model_tiposservicios.php */