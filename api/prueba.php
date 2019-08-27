<?php
include_once './models/Estudiante.class.php';

$objEstudiante = new Estudiante();
//print_r( $objEstudiantes->obtener_todos() );
print_r( $objEstudiante->obtener_uno( 7 ) );

/*$objEstudiante->nombre = "Rene estudiante 8";
$objEstudiante->edad = 30;
$objEstudiante->crear();

$objEstudiante->nombre = "Rene estudiante 8 actualizado";

$objEstudiante->actualizar();
*/
//$objEstudiante->id = 8;
//$objEstudiante->eliminar();

//print_r( $objEstudiante );