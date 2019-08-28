<?php
/**
 * Created by: Rene Arteaga
 * Date: 2019-08-26
 * Content: Modelo de la tabla notas
 */
include_once("Conexion.class.php");
class Nota extends Conexion{

    protected $tabla = "notas";
    protected $campos = array(
        'id',
        'id_estudiante',
        'id_curso',
        'nombre_evaluacion',
        'calificacion',
        'fecha_crea',
        'fecha_modifica'
    );

    public function obtener_todos()
    {
        return $this->ejecutar_select();
    }

    public function obtener_uno( $id = 0 )
    {
        $notas = $this->ejecutar_select("", array(
            "id = '{$id}'"
        ));

        return $this->obtener_objeto( $this, $notas );
    }

}