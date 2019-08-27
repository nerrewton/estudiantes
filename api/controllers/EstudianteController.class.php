<?php
/**
 * Created by: Rene Arteaga
 * Date: 2019-08-26
 * Content: Controlador del modelo Estudiante
 */
ini_set("display_errors", true);
include_once('./models/Estudiante.class.php');
include_once('./controllers/RespuestaHttpController.class.php');
class EstudianteController extends RespuestaHttpController
{
    public function obtener_estudiantes( $req )
    {
        $objEstudiante = new Estudiante();
        $estudiantes = $objEstudiante->obtener_todos();

        if( !isset($estudiantes) ) $this->devolver( 400, array("mensaje" => "No fue posible obtener resultados") );

        $this->devolver( 200, $estudiantes );
    }

    public function obtener_unico( $req )
    {
        $id = $req->id;

        $objEstudiante = new Estudiante();
        $estudiante = $objEstudiante->obtener_uno( $id );

        if( !$estudiante ) return $this->devolver( 400, array("mensaje" => "No fue posible obtener resultados") );

        unset( $estudiante->conexion );
        return $this->devolver(200, $estudiante );
    }
}