<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Solicitudes extends REST_Controller{

  public function __construct()
  {
    parent::__construct();
    $this->load->model('model_solicitudes');
    $this->load->model('model_respuestas');
  }



  public function solicitudes_get($id = null)
  {
    if ($id == null) {
      $Solicitudes = $this->model_solicitudes->getSolicitudes();
    }else{
      $Solicitudes = $this->model_solicitudes->getSolicitudes($id);
    }
    if ($Solicitudes) {
      $this->response($Solicitudes, REST_Controller::HTTP_OK);
    }else{
          $this->response([
            'status' => FALSE,
            'message' => 'No users were found'
            ], REST_Controller::HTTP_NOT_FOUND);
    };
  }

  public function solicitudesCliente_get($id)
  {
    $Solicitudes = $this->model_solicitudes->getSolicitudesCliente($id);
    if ($Solicitudes) {
      $this->response($Solicitudes, REST_Controller::HTTP_OK);
    }else{
          $this->response([
            'status' => FALSE,
            'message' => 'No Tienes Solicitudes'
          ], REST_Controller::HTTP_OK);
    };
  }


  public function respuestas_get($id = null)
  {
    if ($id == null) {
      $Respuestas = $this->model_respuestas->getRespuestas();
    }
    if ($Respuestas) {
      $this->response($Respuestas, REST_Controller::HTTP_OK);
    }else{
          $this->response([
            'status' => FALSE,
            'message' => 'No users were found'
            ], REST_Controller::HTTP_NOT_FOUND);
    };
  }


  public function respuestas_post()
  {
    $datos = array(
      "nombre" => $this->post("nombre")
    );
    $guardar= $this->model_respuestas->save($datos);
    if ($guardar) {
      $message = "Datos Guardados Correctamente";
      $this->response($message, REST_Controller::HTTP_CREATED);
    }else{
      $message = "Error";
      $this->response($message, REST_Controller::HTTP_BAD_REQUEST);
    };
  }

  public function delet_post()
  {
    $id= $this->post("id");
    $guardar= $this->model_respuestas->delete($id);
    if ($guardar) {
      $message = "Datos eliminado Correctamente";
      $this->response($message, REST_Controller::HTTP_CREATED);
    }else{
      $message = "Error";
      $this->response($message, REST_Controller::HTTP_BAD_REQUEST);
    };
  }
  



  public function solicitudes_put()
  {
    $datos = array(
     "idRespuesta" => $this->put("idRespuesta")
    );
    $guardar= $this->model_solicitudes->update($datos,$this->put("id"));
    if ($guardar) {
      $message = "Datos Guardados Correctamente";
      $this->response($message, REST_Controller::HTTP_CREATED);
    }else{
      $message = "Error";
      $this->response($message, REST_Controller::HTTP_BAD_REQUEST);
    };
  }

public function delete_post()
  {
    $id= $this->post("id");
    $guardar= $this->model_solicitudes->delete($id);
    if ($guardar) {
      $message = "Datos eliminado Correctamente";
      $this->response($message, REST_Controller::HTTP_CREATED);
    }else{
      $message = "Error";
      $this->response($message, REST_Controller::HTTP_BAD_REQUEST);
    };
  }



  public function solicitudes_post()
  {
    $idProducto = $this->post("idProducto");
    $idServicio = $this->post("idServicio");

    if ($idProducto == null) {
      $idProducto = 1 ;
    }
    if ($idServicio == null) {
      $idServicio = 1;
    }
    $datos = array(
      "idCliente" => $this->post("idCliente"),
      "idProfesional" => $this->post("idProfesional"),
      "idProducto" => $idProducto,
      "idServicio" => $idServicio
    );
    $guardar= $this->model_solicitudes->save($datos);
		if ($guardar) {
			$message = "Datos Guardados Correctamente";
			$this->response($message, REST_Controller::HTTP_CREATED);
		}else{
			$message = "Error";
			$this->response($message, REST_Controller::HTTP_BAD_REQUEST);
		};
  }

}
