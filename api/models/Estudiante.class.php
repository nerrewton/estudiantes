<?php
/**
 * Created by: Rene Arteaga
 * Date: 2019-08-26
 * Content: Modelo de la tabla estudiantes
 */
include_once("Conexion.class.php");
class Estudiante extends Conexion{

    protected $tabla = "estudiantes";
    protected $campos = array(
        'id',
        'nombre',
        'edad',
        'fecha_crea',
        'fecha_modifica'
    );

    public function obtener_todos()
    {
        return $this->ejecutar_select();
    }

    public function obtener_uno( $id = 0 )
    {
        $estudiantes = $this->ejecutar_select("", array(
            "id = '{$id}'"
        ));

        return $this->obtener_objeto( $estudiantes );
    }

}