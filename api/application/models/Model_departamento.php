<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_departamento extends CI_Model {



	public function __construct()
	{
		parent::__construct();
	}

	public function getDepartamentos($id = null)
	{

         if ($id == null) {
			$query=$this->db
				->select('*')
				->from('departamento ')
				->get();
		}
		return $query->result();
		
    }
}

