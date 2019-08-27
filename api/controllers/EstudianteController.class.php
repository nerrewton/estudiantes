<?php
/**
 * Created by: Rene Arteaga
 * Date: 2019-08-26
 * Content: Controlador del modelo Estudiante
 */
include_once '../models/Estudiante.class.php';
include_once './RespuestaHttpController.class.php';
class EstudianteController extends RespuestaHttpController
{
    public function obtener_estudiantes( $req )
    {
        $objEstudiante = new Estudiante();
        $estudiantes = $objEstudiante->obtener_todos();
        
        if( !isset($estudiantes) ) return $this->devolver( 400, array("mensaje" => "No fue posible obtener resultados") );

        return $this->devolver( $estudiantes );
    }

    public function obtener_unico( $req )
    {
        $id = $req->id;

        $objEstudiante = new Estudiante();
        $estudiante = $objEstudiante->obtener_uno( $id );

        if( !isset($estudiante) ) return $this->devolver( 400, array("mensaje" => "No fue posible obtener resultados") );

        return $this->devolver( $estudiante );
    }
}