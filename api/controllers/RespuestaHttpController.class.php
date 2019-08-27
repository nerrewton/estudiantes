<?php
class RespuestaHttpController 
{
    public function devolver( $estado = 200, $datos ){
        header('status', $estado );
        print_r( json_encode($datos) );
    }
}