<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_municipio extends CI_Model {



	public function __construct()
	{
		parent::__construct();
	}

	public function getMunicipio($id = null)
	{
        if ($id != null) {
			$query=$this->db
				->select('m.*')
				->from('municipio m')
				->where('m.idDepartamento', $id)
				->get();
		}else{
			$query = $this->db->select('m.*')
				->from('municipio m')						
				->join('profesional p', 'm.id = p.idMunicipio', 'inner')			
				->get();
		}
		return $query->result();
		
    }
}