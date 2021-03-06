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
		$this->db->insert('usuario', $datos);
		return true;
	}


	public function update($datos = array(), $id)
	{
		$this->db->where('id', $id);
		$this->db->update('profesional', $datos);
		return true;
	}

	public function getProfesionalesBySector($id,$idMunicipio)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, ps.porcentaje,pf.descripcion as profesion')
							->from('profesional p')
							->join('profesionalservicio ps', 'ps.idProfesional = p.id','inner')
							->join('servicio s', 's.id = ps.idServicio', 'inner')
							->join('sectorServicio ss','ss.idServicio = s.id')
							->join('profesiones pf','pf.id = p.idProfesion', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('ss.idSector', $id)
							->where('p.idMunicipio',$idMunicipio)
							->order_by('p.calificacion', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByProfesionales($id,$idMunicipio)
	{
		$query = $this->db->select('p.*, m.nombre as municipio,pf.descripcion as profesion')
							->from('profesional p')
							->join('profesiones pf','pf.id = p.idProfesion', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('p.id', $id)
							->where('p.idMunicipio',$idMunicipio)
							->order_by('p.calificacion', 'desc')
							->get();
		return $query->result();
	}
    
    public function pagos ($datos = array())
    {
        $this->db->insert('pagos', $datos);
		$id = $this->db->insert_id();
        $query = $this->db->select("*")->from('pagos')->where("id",$id)->get();
        return $query->row();
    }

	public function getProfesionalesByServicio($idServicio,$idMunicipio)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, ps.porcentaje,pf.descripcion as profesion')
							->from('profesional p')
							->join('profesionalservicio ps', 'ps.idProfesional = p.id','inner')
							->join('servicio s', 's.id = ps.idServicio', 'inner')
							->join('profesiones pf','pf.id = p.idProfesion', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('s.id', $idServicio)
							->where('p.idMunicipio',$idMunicipio)
							->order_by('p.calificacion', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByMarca($id,$idMunicipio)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, pp.porcentaje,pf.descripcion as profesion')
							->from('profesional p')
							->join('profesionalproducto pp', 'pp.idProfesional = p.id','inner')
							->join('producto pr', 'pr.id = pp.idProducto', 'inner')
							->join('profesiones pf','pf.id = p.idProfesion', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('pp.idMarca', $id)
							->where('p.idMunicipio',$idMunicipio)
							->order_by('p.calificacion', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByProducto($id,$idMunicipio)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, pp.porcentaje, pp.id as idprofesionalproducto,pf.descripcion as profesion')
							->from('profesional p')
							->join('profesionalproducto pp', 'pp.idProfesional = p.id','inner')
							->join('producto pr', 'pr.id = pp.idProducto', 'inner')
							->join('profesiones pf','pf.id = p.idProfesion', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('pp.idProducto', $id)
							->where('p.idMunicipio',$idMunicipio)
							->order_by('p.calificacion', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByProductoMarca($idProducto,$idMarca,$modelo,$idMunicipio)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, pp.porcentaje, pp.id as idprofesionalproducto,pf.descripcion as profesion')
							->from('profesional p')
							->join('profesionalproducto pp', 'pp.idProfesional = p.id','inner')
							->join('producto pr', 'pr.id = pp.idProducto', 'inner')
							->join('profesiones pf','pf.id = p.idProfesion', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('pp.idProducto', $idProducto)
							->where('pp.idMarca', $idMarca)
							->where('p.idMunicipio',$idMunicipio)
							->like('pp.modelo',$modelo)
							->order_by('p.calificacion', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByProfesion($id,$idMunicipio)
	{
		$query = $this->db->select('p.*, m.nombre as municipio,pf.descripcion as profesion')
							->from('profesional p')
							->join('profesiones pf','pf.id = p.idProfesion', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('p.idProfesion', $id)
							->where('p.idMunicipio',$idMunicipio)
							->order_by('p.calificacion', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesBySectorVisitados($id)
	{
		$query = $this->db->select('p.*, m.nombre as municipio, ps.porcentaje')
							->from('profesional p')
							->join('profesionalservicio ps', 'ps.idProfesional = p.id','inner')
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
							->join('profesionalservicio ps', 'ps.idProfesional = p.id','inner')
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
							->join('profesionalproducto pp', 'pp.idProfesional = p.id','inner')
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
							->join('profesionalproducto pp', 'pp.idProfesional = p.id','inner')
							->join('producto pr', 'pr.id = pp.idProducto', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('pp.idProducto', $id)
							->order_by('p.numeroPersonas', 'desc')
							->get();
		return $query->result();
	}

	public function getProfesionalesBySectorDistancia($id,$idMunicipio,$lat,$lng)
	{
		$query = $this->db->select("(6371 * ACOS( SIN(RADIANS(p.latitud)) * SIN(RADIANS('$lat')) + COS(RADIANS(p.longitud - '$lng')) * COS(RADIANS(p.latitud)) * COS(RADIANS('$lat')))) AS distancia,p.*, m.nombre as municipio, ps.porcentaje")
							->from('profesional p')
							->join('profesionalservicio ps', 'ps.idProfesional = p.id','inner')
							->join('servicio s', 's.id = ps.idServicio', 'inner')
							->join('sectorServicio ss','ss.idServicio = s.id')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('ss.idSector', $id)
							->having('distancia < 1')
							->order_by('distancia', 'asc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByServicioDistancia($idServicio,$idMunicipio,$lat,$lng)
	{
		$query = $this->db->select("(6371 * ACOS( SIN(RADIANS(p.latitud)) * SIN(RADIANS('$lat')) + COS(RADIANS(p.longitud - '$lng')) * COS(RADIANS(p.latitud)) * COS(RADIANS('$lat')))) AS distancia,p.*, m.nombre as municipio, ps.porcentaje,pf.descripcion as profesion")
							->from('profesional p')
							->join('profesionalservicio ps', 'ps.idProfesional = p.id','inner')
							->join('servicio s', 's.id = ps.idServicio', 'inner')
							->join('profesiones pf','pf.id = p.idProfesion', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('s.id', $idServicio)
							->where('p.idMunicipio',$idMunicipio)
							->having('distancia < 1')
							->order_by('distancia', 'asc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByMarcaDistancia($id,$idMunicipio,$lat,$lng)
	{
		$query = $this->db->select("(6371 * ACOS( SIN(RADIANS(p.latitud)) * SIN(RADIANS('$lat')) + COS(RADIANS(p.longitud - '$lng')) * COS(RADIANS(p.latitud)) * COS(RADIANS('$lat')))) AS distancia,p.*, m.nombre as municipio, pp.porcentaje,pf.descripcion as profesion")
							->from('profesional p')
							->join('profesionalproducto pp', 'pp.idProfesional = p.id','inner')
							->join('producto pr', 'pr.id = pp.idProducto', 'inner')
							->join('profesiones pf','pf.id = p.idProfesion', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('pp.idMarca', $id)
							->where('p.idMunicipio',$idMunicipio)
							->having('distancia < 1')
							->order_by('distancia', 'asc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByProductoDistancia($id,$idMunicipio,$lat,$lng)
	{
		$query = $this->db->select("(6371 * ACOS( SIN(RADIANS(p.latitud)) * SIN(RADIANS('$lat')) + COS(RADIANS(p.longitud - '$lng')) * COS(RADIANS(p.latitud)) * COS(RADIANS('$lat')))) AS distancia,p.*, m.nombre as municipio, pp.porcentaje, pp.id as idprofesionalproducto,pf.descripcion as profesion")
							->from('profesional p')
							->join('profesionalproducto pp', 'pp.idProfesional = p.id','inner')
							->join('producto pr', 'pr.id = pp.idProducto', 'inner')
							->join('profesiones pf','pf.id = p.idProfesion', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('pp.idProducto', $id)
							->where('p.idMunicipio',$idMunicipio)
							->having('distancia < 1')
							->order_by('distancia', 'asc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByProductoMarcaDistancia($idProducto,$idMarca,$modelo,$idMunicipio,$lat,$lng)
	{
		$query = $this->db->select("(6371 * ACOS( SIN(RADIANS(p.latitud)) * SIN(RADIANS('$lat')) + COS(RADIANS(p.longitud - '$lng')) * COS(RADIANS(p.latitud)) * COS(RADIANS('$lat')))) AS distancia,p.*, m.nombre as municipio, pp.porcentaje, pp.id as idprofesionalproducto,pf.descripcion as profesion")
							->from('profesional p')
							->join('profesionalproducto pp', 'pp.idProfesional = p.id','inner')
							->join('producto pr', 'pr.id = pp.idProducto', 'inner')
							->join('profesiones pf','pf.id = p.idProfesion', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('pp.idProducto', $idProducto)
							->where('pp.idMarca', $idMarca)
							->where('p.idMunicipio',$idMunicipio)
							->like('pp.modelo',$modelo)
							->having('distancia < 1')
							->order_by('distancia', 'asc')
							->get();
		return $query->result();
	}

	public function getProfesionalesByProfesionDistancia($id,$idMunicipio,$lat,$lng)
	{
		$query = $this->db->select("(6371 * ACOS( SIN(RADIANS(p.latitud)) * SIN(RADIANS('$lat')) + COS(RADIANS(p.longitud - '$lng')) * COS(RADIANS(p.latitud)) * COS(RADIANS('$lat')))) AS distancia,p.*, m.nombre as municipio,pf.descripcion as profesion")
							->from('profesional p')
							->join('profesiones pf','pf.id = p.idProfesion', 'inner')
							->join('municipio m', 'm.id = p.idMunicipio', 'inner')
							->where('p.idProfesion', $id)
							->where('p.idMunicipio',$idMunicipio)
							->having('distancia < 1')
							->order_by('distancia', 'asc')
							->get();
		return $query->result();
	}



	public function getServicios($idProfesional)
	{
		$query = $this->db->select('s.*')
			->from('servicio s')
			->join('profesionalservicio ps', 'ps.idServicio = s.id','inner')
			->where('ps.idProfesional', $idProfesional)
			->get();
		return $query->result();
	}

	public function getProductos($idProfesional)
	{
		$query = $this->db->select('pp.*,p.descripcion as producto, m.descripcion as marca')
			->from('profesionalproducto pp')
			->join('producto p', 'pp.idProducto = p.id','inner')
			->join('marca m', 'pp.idMarca = m.id','inner')
			->where('pp.idProfesional', $idProfesional)
			->get();
		return $query->result();
	}

	public function getImagenes($idprofesionalproducto)
	{
		$query = $this->db->select('imagen')
			->from('imagenesprofesionalproducto')
			->where('idprofesionalproducto',$idprofesionalproducto)
			->get();
		return $query->result();
	}




}

/* End of file model_profesional.php */
/* Location: ./application/models/model_profesional.php */
