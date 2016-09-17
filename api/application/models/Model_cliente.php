<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_cliente extends CI_Model {

	public function __construct()
	{
		parent::__construct();
	}

	public function getClientes($id = null)
	{
		if ($id == null) {
			$query=$this->db
				->select("*")
				->from("cliente")
				->get();
			return $query->result();
		}else{
			$query = $this->db
				->select("*")
				->from("cliente")
				->where("id",$id)
				->get();
			return $query->row();
		}
    }
    
    }
