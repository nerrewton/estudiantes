<?php
class RespuestaHttpController 
{
    public function devolver( $estado = 200, $datos ){
        header("Access-Control-Allow-Cross-Origin: *");
        header("Content-Type: application/json");
        print_r( json_encode($datos) );
        http_response_code( $estado );
    }
}