<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_servicios extends CI_Model {

	public function __construct()
	{
		parent::__construct();
	}

	public function getServicios($id = null)
	{
		if ($id != null) {
			$query=$this->db
				->select('s.*,t.descripcion as sector, ps.porcentaje')
				->from('servicio s')

				->join('sector t', ' s.idSector = t.id', 'inner')
				->join('profesionalservicio ps', 'ps.idServicio = s.id', 'inner')
				->where('ps.idProfesional', $id)
				->get();
		}
		return $query->result();
	}

	public function save($datos = array())
	{
		$this->db->insert('servicio', $datos);
		return $this->db->insert_id();
	}

	public function saveProfesional($datos = array())
	{
		$this->db->insert('profesionalservicio', $datos);
		return true;
	}

	public function update($datos = array(), $id)
	{
		$this->db->where('id', $id);
		$this->db->update('servicio', $datos);
		return true;
	}

   public function delete($idServicio)
   {
   		$this->db->where('id', $idServicio);   		
   		$this->db->delete('profesionalservicio');
   		return true;
   }


	public function getProfesionales()
	{
		$query=$this->db
				->select('id, razonSocial')
				->from('profesional')
				->where('estado', 'Activo')
				->where('pago', 'Activo')
				->get();
		return $query->result();
	}

	public function getSectores()
	{
		$query=$this->db
				->select('id, descripcion')
				->from('sector')
				->where('estado', 'Activo')
				->get();
		return $query->result();
	}

	public function getMarca()
	{
		$query=$this->db
				->select('id, descripcion')
				->from('marca')
				->where('estado', 'Activo')
				->get();
		return $query->result();
	}

	public function getServicio()
	{
		$query=$this->db
				->select('id, descripcion')
				->from('servicio')
				->where('estado', 'Activo')
				->get();
		return $query->result();
	}

	public function getProducto()
	{
		$query=$this->db
				->select('id, descripcion')
				->from('producto')
				->where('estado', 'Activo')
				->get();
		return $query->result();
	}

}
