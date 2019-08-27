<?php
/**
 * Created by: Rene Arteaga
 * Date: 2019-08-26
 * Content: Enrutador de peticiones
 */
define('BASE_URL', '/proyectos_react/estudiantes_app/api/index.php');
include_once './controllers/EstudianteController.class.php';
$rutas = array(
    '' => ''
);

try{
    $metodo = $_SERVER["REQUEST_METHOD"];
    $ruta = $_SERVER['REQUEST_URI'];
    $parametros = $_REQUEST;
    print_r( $ruta );
    echo "<br/>";
    print_r( $parametros );
    if( isset($metodo) )
    {
        switch ( $metodo ) 
        {
            case 'GET': //Rutas get
                //Rutas Estudiantes
                $EstudianteController = new EstudianteController();
                if( $ruta == BASE_URL . "/estudiante" ){
                    $EstudianteController->obtener_estudiantes( $parametros );
                }
                //Rutas Cursos

                //Rutas Notas
                echo "get";
                break;
            case 'POST': //Rutas post					
                echo "post";
                break;
            case 'PUT': //Rutas put					
                echo "put";
                break;
            case 'DELETE': //Rutas delete
                echo "delete";
                break;
            default:
                print_r(
                    json_encode( array(
                        "mensaje" => "No se enconto un metodo valido"
                    ))
                );
                break;
        }
    }else{
        $data=array("status"=>"error","message"=>"La peticion no contiene un metodo valido !! ");
        echo json_encode($data);
    }
    
}
catch(Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
