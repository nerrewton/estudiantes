<?php
/**
 * Created by: Rene Arteaga
 * Date: 2019-08-26
 * Content: Controlador del modelo Curso
 */
ini_set("display_errors", true);
include_once('./models/Curso.class.php');
include_once('./controllers/RespuestaHttpController.class.php');
class CursoController extends RespuestaHttpController
{
    public function obtener_cursos( $req )
    {
        $objCurso = new Curso();
        $cursos = $objCurso->obtener_todos();

        if( !isset($cursos) ) $this->devolver( 400, array("mensaje" => "No fue posible obtener resultados") );
 
        $this->devolver( 200, $cursos );
    }

    public function obtener_unico( $req )
    {
        $id = $req->id;

        $objCurso = new Curso();
        $curso = $objCurso->obtener_uno( $id );

        if( !$curso ) return $this->devolver( 200, array("mensaje" => "El registro no existe") );

        unset( $curso->conexion );
        return $this->devolver(200, $curso );
    }

    public function guardar( $req )
    {
        if( !$req ) return $this->devolver( 400, array("mensaje" => "No se enviaron los datos") );

        if( !isset($req->nombre) )
        {
            return $this->devolver( 400, array("mensaje" => "No se enviaron todos los datos") );
        }

        $objCurso = new Curso();
        $objCurso->nombre = $req->nombre;
        $objCurso->crear();

        unset( $objCurso->conexion );
        return $this->devolver(200, $objCurso );
    }

    public function actualizar( $req )
    {
        if( !$req ) return $this->devolver( 400, array("mensaje" => "No se enviaron los datos") );

        if( !isset($req->id) || !isset($req->nombre) )
        {
            return $this->devolver( 400, array("mensaje" => "No se enviaron todos los datos") );
        }

        //Obtiene curso
        $id = $req->id;
        $objCurso = new Curso();
        if( !$curso = $objCurso->obtener_uno( $id ) )
        {
            return $this->devolver( 400, array("mensaje" => "El curso no existe") );
        }

        $curso->nombre = $req->nombre;
        $curso->actualizar();

        unset( $curso->conexion );
        return $this->devolver( 200, $curso );
    }

    public function eliminar( $req )
    {
        if( !$req ) return $this->devolver( 400, array("mensaje" => "No se enviaron los datos") );

        if( !isset($req->id) )
        {
            return $this->devolver( 400, array("mensaje" => "No se enviaron todos los datos") );
        }

        //Obtiene curso
        $id = $req->id;
        $objCurso = new Curso();
        if( !$curso = $objCurso->obtener_uno( $id ) )
        {
            return $this->devolver( 400, array("mensaje" => "El curso no existe") );
        }

        $curso->eliminar();
        return $this->devolver( 200, array("mensaje" => "Curso eliminado") );
    }
}