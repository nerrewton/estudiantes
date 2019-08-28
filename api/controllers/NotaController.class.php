<?php
/**
 * Created by: Rene Arteaga
 * Date: 2019-08-26
 * Content: Controlador del modelo Curso
 */
ini_set("display_errors", true);
include_once('./models/Nota.class.php');
include_once('./models/Estudiante.class.php');
include_once('./models/Curso.class.php');
include_once('./controllers/RespuestaHttpController.class.php');
class NotaController extends RespuestaHttpController
{
    public function obtener_notas( $req )
    {
        $objNota = new Nota();
        $notas = $objNota->obtener_todos();

        if( !isset($notas) ) $this->devolver( 400, array("mensaje" => "No fue posible obtener resultados") );

        $this->devolver( 200, $notas );
    }

    public function obtener_unico( $req )
    {
        $id = $req->id;

        $objNota = new Nota();
        $nota = $objNota->obtener_uno( $id );

        if( !$nota ) return $this->devolver( 200, array("mensaje" => "El registro no existe") );

        unset( $nota->conexion );
        return $this->devolver(200, $nota );
    }

    public function guardar( $req )
    {
        if( !$req ) return $this->devolver( 400, array("mensaje" => "No se enviaron los datos") );

        if( !isset($req->nombre_evaluacion) || !isset($req->id_estudiante) || !isset($req->id_curso) || !isset($req->calificacion) )
        {
            return $this->devolver( 400, array("mensaje" => "No se enviaron todos los datos") );
        }

        //Valida si el estudiante existe
        $objEstudiante = new Estudiante();
        if( !$objEstudiante->obtener_uno( $req->id_estudiante ) )
        {
            return $this->devolver( 400, array("mensaje" => "El estudiante no existe") );
        }
        

        //Valida si el curso existe
        $objNota = new Curso();
        if( !$objNota->obtener_uno( $req->id_curso ) )
        {
            return $this->devolver( 400, array("mensaje" => "El curso no existe") );
        }
        
        $objNota = new Nota();
        $objNota->nombre_evaluacion = $req->nombre_evaluacion;
        $objNota->id_estudiante = $req->id_estudiante;
        $objNota->id_curso = $req->id_curso;
        $objNota->calificacion = $req->calificacion;
        $objNota->crear();

        unset( $objNota->conexion );
        return $this->devolver(200, $objNota );
    }

    public function actualizar( $req )
    {
        if( !$req ) return $this->devolver( 400, array("mensaje" => "No se enviaron los datos") );

        if( !isset($req->id) || !isset($req->nombre_evaluacion) || !isset($req->id_estudiante) || !isset($req->id_curso) || !isset($req->calificacion) )
        {
            return $this->devolver( 400, array("mensaje" => "No se enviaron todos los datos") );
        }

        //Obtiene nota
        $id = $req->id;
        $objNota = new Nota();
        if( !$nota = $objNota->obtener_uno( $id ) )
        {
            return $this->devolver( 400, array("mensaje" => "La nota no existe") );
        }

        $nota->nombre_evaluacion = $req->nombre_evaluacion;
        $nota->id_estudiante = $req->id_estudiante;
        $nota->id_curso = $req->id_curso;
        $nota->calificacion = $req->calificacion;
        $nota->actualizar();

        unset( $nota->conexion );
        return $this->devolver( 200, $nota );
    }

    public function eliminar( $req )
    {
        if( !$req ) return $this->devolver( 400, array("mensaje" => "No se enviaron los datos") );

        if( !isset($req->id) )
        {
            return $this->devolver( 400, array("mensaje" => "No se enviaron todos los datos") );
        }

        //Obtiene nota
        $id = $req->id;
        $objNota = new Nota();
        if( !$nota = $objNota->obtener_uno( $id ) )
        {
            return $this->devolver( 400, array("mensaje" => "La nota no existe") );
        }

        $nota->eliminar();
        return $this->devolver( 200, array("mensaje" => "Nota eliminado") );
    }
}