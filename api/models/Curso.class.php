<?php
/**
 * Created by: Rene Arteaga
 * Date: 2019-08-26
 * Content: Modelo de la tabla cursos
 */
include_once("Conexion.class.php");
class Curso extends Conexion{

    protected $tabla = "cursos";
    protected $campos = array(
        'id',
        'nombre',
        'fecha_crea',
        'fecha_modifica'
    );

    public function obtener_todos()
    {
        return $this->ejecutar_select();
    }

    public function obtener_uno( $id = 0 )
    {
        $cursos = $this->ejecutar_select("", array(
            "id = '{$id}'"
        ));

        return $this->obtener_objeto( $cursos );
    }

}