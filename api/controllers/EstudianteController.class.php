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

        if( !$estudiante ) return $this->devolver( 200, array("mensaje" => "El registro no existe") );

        unset( $estudiante->conexion );
        return $this->devolver(200, $estudiante );
    }

    public function guardar( $req )
    {
        if( !$req ) return $this->devolver( 400, array("mensaje" => "No se enviaron los datos") );

        if( !isset($req->nombre) || !isset($req->edad) )
        {
            return $this->devolver( 400, array("mensaje" => "No se enviaron todos los datos") );
        }

        $objEstudiante = new Estudiante();
        $objEstudiante->nombre = $req->nombre;
        $objEstudiante->edad = $req->edad;
        $objEstudiante->crear();

        unset( $objEstudiante->conexion );
        return $this->devolver(200, $objEstudiante );
    }

    public function actualizar( $req )
    {
        if( !$req ) return $this->devolver( 400, array("mensaje" => "No se enviaron los datos") );

        if( !isset($req->id) || !isset($req->nombre) || !isset($req->edad) )
        {
            return $this->devolver( 400, array("mensaje" => "No se enviaron todos los datos") );
        }

        //Obtiene estudiante
        $id = $req->id;
        $objEstudiante = new Estudiante();
        if( !$estudiante = $objEstudiante->obtener_uno( $id ) )
        {
            return $this->devolver( 400, array("mensaje" => "El estudiante no existe") );
        }

        $estudiante->nombre = $req->nombre;
        $estudiante->edad = $req->edad;
        $estudiante->actualizar();

        unset( $estudiante->conexion );
        return $this->devolver( 200, $estudiante );
    }

    public function eliminar( $req )
    {
        if( !$req ) return $this->devolver( 400, array("mensaje" => "No se enviaron los datos") );

        if( !isset($req->id) )
        {
            return $this->devolver( 400, array("mensaje" => "No se enviaron todos los datos") );
        }

        //Obtiene estudiante
        $id = $req->id;
        $objEstudiante = new Estudiante();
        if( !$estudiante = $objEstudiante->obtener_uno( $id ) )
        {
            return $this->devolver( 400, array("mensaje" => "El estudiante no existe") );
        }

        $estudiante->eliminar();
        return $this->devolver( 200, array("mensaje" => "Estudiante eliminado") );
    }
}