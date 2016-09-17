<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_menu extends CI_Model {

	public function __construct()
	{
		parent::__construct();	
	}

	public function getMenu($idPerfil)
	{
		$query=$this->db
				->select("m.*")
				->from("menu m")
				->join("menuPerfil mp","m.id = mp.idMenu","inner")
				->join("perfil p","mp.idPerfil = p.id","inner")
				->where(array("p.id" => $idPerfil))
				->order_by('m.descripcion', 'asc')
				->get();
		return $query->result();
	}

}

/* End of file model_menu.php */
/* Location: ./application/models/model_menu.php */