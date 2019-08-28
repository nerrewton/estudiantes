<?php
/**
 * Created by: Rene Arteaga
 * Date: 2019-08-26
 * Content: Enrutador de peticiones
 */
include_once('./controllers/EstudianteController.class.php');
include_once('./controllers/CursoController.class.php');
include_once('./controllers/NotaController.class.php');
include_once('./controllers/RespuestaHttpController.class.php');

$RespuestaHttpController = new RespuestaHttpController();

try{
    $metodo = $_SERVER["REQUEST_METHOD"];
    $ruta = $_SERVER['REQUEST_URI'];
    $ruta = substr( $ruta, strpos( $ruta, "/api") +  4 );
    
    if( isset($metodo) )
    {
        $parametros = json_decode( file_get_contents("php://input") );
        if( !$parametros ) $parametros = new stdClass();
        $EstudianteController = new EstudianteController();
        $CursoController = new CursoController();
        $NotaController = new NotaController();

        switch ( $metodo ) 
        {
            case 'GET': //Rutas get
                $arrayRuta = explode("/", $ruta);
                $parametros->id = $arrayRuta[ count($arrayRuta) - 1 ];

                //Rutas Estudiantes
                if( $ruta == "/estudiante" ){ //ruta: /estudiante/
                    return $EstudianteController->obtener_estudiantes( $parametros );
                }
                else if ( preg_match('/^\/(estudiante)\/[\d]+$/', $ruta) )//ruta: /estudiante/:id
                {                    
                    return $EstudianteController->obtener_unico( $parametros );
                }

                //Rutas Cursos
                if( $ruta == "/curso" ){ //ruta: /curso/
                    return $CursoController->obtener_cursos( $parametros );
                }
                else if ( preg_match('/^\/(curso)\/[\d]+$/', $ruta) )//ruta: /curso/:id
                {
                    return $CursoController->obtener_unico( $parametros );
                }

                //Rutas Notas
                if( $ruta == "/nota" ){ //ruta: /nota/
                    return $NotaController->obtener_notas( $parametros );
                }
                else if ( preg_match('/^\/(nota)\/[\d]+$/', $ruta) )//ruta: /nota/:id
                {
                    return $NotaController->obtener_unico( $parametros );
                }

                break;
            case 'POST': //Rutas post	
                //Rutas Estudiantes
                if( $ruta == "/estudiante" ){ //ruta: /estudiante/
                    return $EstudianteController->guardar( $parametros );
                }

                //Rutas Cursos
                if( $ruta == "/curso" ){ //ruta: /curso/
                    return $CursoController->guardar( $parametros );
                }
                
                //Rutas Notas
                if( $ruta == "/nota" ){ //ruta: /nota/
                    return $NotaController->guardar( $parametros );
                }

                break;
            case 'PUT': //Rutas put					
                //Rutas Estudiantes
                if( $ruta == "/estudiante" ){ //ruta: /estudiante/
                    return $EstudianteController->actualizar( $parametros );
                }

                //Rutas Cursos
                if( $ruta == "/curso" ){ //ruta: /curso/
                    return $CursoController->actualizar( $parametros );
                }
                
                //Rutas Notas
                if( $ruta == "/nota" ){ //ruta: /nota/
                    return $NotaController->actualizar( $parametros );
                }
                break;
            case 'DELETE': //Rutas delete
                //Rutas Estudiantes
                if( $ruta == "/estudiante" ){ //ruta: /estudiante/
                    return $EstudianteController->eliminar( $parametros );
                }

                //Rutas Cursos
                if( $ruta == "/curso" ){ //ruta: /curso/
                    return $CursoController->eliminar( $parametros );
                }
                
                //Rutas Notas
                if( $ruta == "/nota" ){ //ruta: /nota/
                    return $NotaController->eliminar( $parametros );
                }
                break;
            case 'OPTIONS':
                return $RespuestaHttpController->devolver(200, null );
                break;
            default:
                return $RespuestaHttpController->devolver(404, array("mensaje" => "Metodo no valido"));
                break;
        }

        return $RespuestaHttpController->devolver(404, array("mensaje" => "Ruta no valida"));
    }else{
        return $RespuestaHttpController->devolver(404, array("mensaje" => "Error, pagina no encontrada"));
    }
    
}
catch(Exception $e) {
    return $RespuestaHttpController->devolver(500, array("mensaje" => "Error en el servidor"));
}
