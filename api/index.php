<?php
/**
 * Created by: Rene Arteaga
 * Date: 2019-08-26
 * Content: Enrutador de peticiones
 */
include_once('./controllers/EstudianteController.class.php');
include_once('./controllers/CursoController.class.php');
include_once('./controllers/NotaController.class.php');

try{
    $metodo = $_SERVER["REQUEST_METHOD"];
    $ruta = $_SERVER['REQUEST_URI'];
    $ruta = substr( $ruta, strpos( $ruta, "/api") +  4 );
    
    if( isset($metodo) )
    {
        $parametros = json_decode( file_get_contents("php://input") );
        switch ( $metodo ) 
        {
            case 'GET': //Rutas get
                //Rutas Estudiantes
                $EstudianteController = new EstudianteController();
                if( $ruta == "/estudiante" ){ //ruta: /estudiante/
                    return $EstudianteController->obtener_estudiantes( $parametros );
                }
                else if ( preg_match('/^\/(estudiante)\/[\d]+$/', $ruta) )//ruta: /estudiante/:id
                {
                    $arrayRuta = explode("/", $ruta);
                    $parametros->id = $arrayRuta[ count($arrayRuta) - 1 ];
                    return $EstudianteController->obtener_unico( $parametros );
                }

                //Rutas Cursos
                $CursoController = new CursoController();
                if( $ruta == "/curso" ){ //ruta: /curso/
                    return $CursoController->obtener_cursos( $parametros );
                }
                else if ( preg_match('/^\/(curso)\/[\d]+$/', $ruta) )//ruta: /curso/:id
                {
                    $arrayRuta = explode("/", $ruta);
                    $parametros->id = $arrayRuta[ count($arrayRuta) - 1 ];
                    return $CursoController->obtener_unico( $parametros );
                }

                //Rutas Notas
                //echo "get";
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
