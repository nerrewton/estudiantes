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

        if( !$curso ) return $this->devolver( 400, array("mensaje" => "No fue posible obtener resultados") );

        unset( $curso->conexion );
        return $this->devolver(200, $curso );
    }
}