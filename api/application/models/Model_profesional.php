<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Model_profesional extends CI_Model {

	public function __construct()
	{
		parent::__construct();
	}



	public function getprofesional($id = null)
	{
		if ($id != null) {
			$query=$this->db
						->select('p.*, m.nombre as municipio')
						->from("profesional p")
						->join('municipio m', 'm.id = p.idMunicipio', 'inner')
						->where("p.id",$id)
						->get();
			return $query->row();
		}else {
			$query=$this->db
						->select('p.*, m.nombre as municipio')
						->from("profesional p")
						->join('municipio m', 'm.id = p.idMunicipio', 'inner')
						->get();
			return $query->result();
		}

	}

	 public function getProfesionales($id = null)
	{
		if ($id == null) {
			$query=$this->db
				->select("*")
				->from("profesional")
				->get();
			return $query->result();
		}else{
			$query = $this->db
				->select("*")
				->from("profesional")
				->where("id",$id)
				->get();
			return $query->row();
		}
    }
    public function save($datos = array())
	{
		$this->db->insert('profesional', $datos);
		return $this->db->insert_id();
	}

	public function saveUsuario($datos = array())
	{
		$this->db->insert('Usuario', $datos);
		return true;
	}


	public function update($datos = array(), $id)
	{
		$this->db->where('id', $id);
		$this->db->update('profesional', $datos);
		return true;
	}

	public function getProfesionalesBySector($id)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, ps.porcentaje')
							->from('profesional p')
							->join('profesionalServicio ps', 'ps.idProfesional = p.id','inner')
							->join('servicio s', 's.id = ps.idServicio', 'inner')
							->join('sectorServicio ss','ss.idServicio = s.id')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('ss.idSector', $id)
							->order_by('p.calificacion', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByServicio($idServicio)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, ps.porcentaje')
							->from('profesional p')
							->join('profesionalServicio ps', 'ps.idProfesional = p.id','inner')
							->join('servicio s', 's.id = ps.idServicio', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('s.id', $idServicio)
							->order_by('p.calificacion', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByMarca($id)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, pp.porcentaje')
							->from('profesional p')
							->join('profesionalProducto pp', 'pp.idProfesional = p.id','inner')
							->join('producto pr', 'pr.id = pp.idProducto', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('pp.idMarca', $id)
							->order_by('p.calificacion', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByProducto($id)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, pp.porcentaje, pp.id as idProfesionalProducto')
							->from('profesional p')
							->join('profesionalProducto pp', 'pp.idProfesional = p.id','inner')
							->join('producto pr', 'pr.id = pp.idProducto', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('pp.idProducto', $id)
							->order_by('p.calificacion', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesBySectorVisitados($id)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, ps.porcentaje')
							->from('profesional p')
							->join('profesionalServicio ps', 'ps.idProfesional = p.id','inner')
							->join('servicio s', 's.id = ps.idServicio', 'inner')
							->join('sectorServicio ss','ss.idServicio = s.id')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('ss.idSector', $id)
							->order_by('p.numeroPersonas', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByServicioVisitados($idServicio)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, ps.porcentaje')
							->from('profesional p')
							->join('profesionalServicio ps', 'ps.idProfesional = p.id','inner')
							->join('servicio s', 's.id = ps.idServicio', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('s.id', $idServicio)
							->order_by('p.numeroPersonas', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByMarcaVisitados($id)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, pp.porcentaje')
							->from('profesional p')
							->join('profesionalProducto pp', 'pp.idProfesional = p.id','inner')
							->join('producto pr', 'pr.id = pp.idProducto', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('pp.idMarca', $id)
							->order_by('p.numeroPersonas', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByProductoVisitados($id)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, pp.porcentaje')
							->from('profesional p')
							->join('profesionalProducto pp', 'pp.idProfesional = p.id','inner')
							->join('producto pr', 'pr.id = pp.idProducto', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('pp.idProducto', $id)
							->order_by('p.numeroPersonas', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesBySectorDistancia($id,$lat,$lng)
	{
		$query = $this->db->select("(6371 * ACOS( SIN(RADIANS(p.latitud)) * SIN(RADIANS('$lat')) + COS(RADIANS(p.longitud - '$lng')) * COS(RADIANS(p.latitud)) * COS(RADIANS('$lat')))) AS distancia,p.*, m.nombre as municipio, ps.porcentaje")
							->from('profesional p')
							->join('profesionalServicio ps', 'ps.idProfesional = p.id','inner')
							->join('servicio s', 's.id = ps.idServicio', 'inner')
							->join('sectorServicio ss','ss.idServicio = s.id')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('ss.idSector', $id)
							->having('distancia < 1')
							->order_by('distancia', 'asc')
							->get();

		return $query->result();
	}

	public function getServicios($idProfesional)
	{
		$query = $this->db->select('s.*')
							->from('servicio s')
							->join('profesionalServicio ps', 'ps.idServicio = s.id','inner')
							->where('ps.idProfesional', $idProfesional)
							->get();
		return $query->result();
	}

	public function getProductos($idProfesional)
	{
		$query = $this->db->select('p.*')
							->from('producto p')
							->join('profesionalProducto pp', 'pp.idProducto = p.id','inner')
							->where('pp.idProfesional', $idProfesional)
							->get();
		return $query->result();
	}

	public function getImagenes($idProfesionalProducto)
	{
		$query = $this->db->select('imagen')
											->from('imagenesProfesionalProducto')
											->where('idProfesionalProducto',$idProfesionalProducto)
											->get();
		return $query->result();
	}




}

/* End of file model_profesional.php */
/* Location: ./application/models/model_profesional.php */
