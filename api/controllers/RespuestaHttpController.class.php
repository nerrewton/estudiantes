<?php
class RespuestaHttpController 
{
    public function devolver( $estado = 200, $datos = "" ){
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Allow: GET, POST, OPTIONS, PUT, DELETE");
        header("Content-Type: application/json");
        print_r( json_encode($datos) );
        http_response_code( 200 );
    }
}