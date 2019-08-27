<?php
/**
 * Created by: Rene Arteaga
 * Date: 2019-08-26
 * Content: Controlador del modelo Curso
 */
ini_set("display_errors", true);
include_once('./models/Nota.class.php');
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

        if( !$nota ) return $this->devolver( 400, array("mensaje" => "No fue posible obtener resultados") );

        unset( $nota->conexion );
        return $this->devolver(200, $nota );
    }
}