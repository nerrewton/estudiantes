<?php
//Parametros de la base de datos
define('DATABASE_HOST', 'localhost');
define('DATABASE_SCHEMA', 'estudiantes_db');
define('DATABASE_USER', 'root');
define('DATABASE_PASSWORD', '');
date_default_timezone_set('America/Bogota');

/**
 * Created by: Rene Arteaga
 * Date: 2019-08-26
 * Content: Clase que maneja las conexiones
 */
class Conexion 
{
    public $conexion;

    public function __construct()
    {
        $this->conexion = null;
        //Inicializa los campos del objeto si los hay
        if( isset( $this->campos ))
        {
            foreach( $this->campos as $nombreCampo )
            {
                $this->{$nombreCampo} = null;
            }
        }
    }

    /**
     * Created by: Rene Arteaga
     * Date: 2019-08-26
     * Content: Realiza la conexion a la base de datos 
     * @return $conexion
     */
    private function conectarse()
    {
        $this->conexion = new mysqli(
            DATABASE_HOST, 
            DATABASE_USER, 
            DATABASE_PASSWORD, 
            DATABASE_SCHEMA
        );

        if( $error = mysqli_connect_error() ){
            die("Fallo la conexion " . $error );
        }

        return isset( $this->connection );
    }

    /**
     * Created by: Rene Arteaga
     * Date: 2019-08-26
     * Content: Cierra la conexion a la base de datos 
     */
    private function desconectarse()
    {
        $this->conexion->close();
    }

    /**
     * Created by: Rene Arteaga
     * Date: 2019-08-26
     * Content: Realiza select en base de datos 
     * @param string $query consulta
     * @param mixed $where condicionales de la consulta, las condiciones deben ir separadas por coma
     * @return mixed $datos
     */
    public function ejecutar_select( $query = "", $where = array() )
    {
        $this->conectarse();
        $datos = array();

        if( isset( $this->conexion ) && isset( $this->tabla ) )
        {
            try{
                //Revisa si se para una consulta en particular
                if( $query == "" )
                {
                    $query = "select * from {$this->tabla}";
                }

                //Revisa si hay condicionales
                if( count( $where) > 0 )
                {
                    $query .= " where " . join( " and ", $where );
                }

                $consulta = $this->conexion->query( $query );                
                while( $element = $consulta->fetch_assoc() ){
                    $datos[] = $element;
                }

                $consulta->free();
            }catch( Exception $e ){
                $datos = $e->getMessage();
            }
        }else{
            $datos = 'La conexion no se establecio o no se ha definido la variable $tabla';
        }
        
        $this->desconectarse();

        return $datos;
    }

    /**
     * Created by: Rene Arteaga
     * Date: 2019-08-26
     * Content: Inserta un nuevo elemento en la la tabla del modelo
     * @return boolean
     */
    public function crear()
    {
        if( !isset($this->tabla ) ) return false;

        $query = "insert into {$this->tabla}";

        $this->conectarse();
        if( isset( $this->campos ) && count( $this->campos ) > 0 )
        {
            try{

                $query .= " ( ". join(",", $this->campos ) ." ) ";
                $valores = array();
                foreach( $this->campos as $campo ){
                    if( $campo == "fecha_crea" || $campo == "fecha_modifica")
                    {
                        $valores[] = "'". date('Y-m-d H:i:s') . "'";
                        $this->{$campo} = date('Y-m-d H:i:s');
                    }else{
                        if( isset($this->{$campo}) ){
                            $valores[] = "'" . $this->{$campo} . "'";
                        }else{
                            $valores[] = 'null';
                        }
                    }
                }

                $query .= "values (" . join(",", $valores ) . ") ";
                
                if( $this->conexion->query( $query ) === true )
                {
                    $this->id = $this->conexion->insert_id;
                }

                return true;

            }catch( Exception $e ){
                echo "Error: " . $e->getMessage();
                return false;
            }
            
        }

        $this->desconectarse();
    }

    /**
     * Created by: Rene Arteaga
     * Date: 2019-08-26
     * Content: Actualiza un elemento en la la tabla del modelo
     * @return boolean
     */
    public function actualizar()
    {
        if( !isset($this->tabla ) ) return false;

        $query = "update {$this->tabla} set ";

        $this->conectarse();
        if( isset( $this->campos ) && count( $this->campos ) > 0 )
        {
            try{
                $valores = array();
                foreach( $this->campos as $campo ){
                    if( $campo == "fecha_modifica" )
                    {
                        $valores[] = $campo . " = '". date('Y-m-d H:i:s') . "' ";
                    }elseif( $campo != 'id' ){
                        if( isset($this->{$campo}) ){
                            $valores[] = $campo . " = '" . $this->{$campo} . "' ";
                        }else{
                            $valores[] = $campo . "= null";
                        }
                    }
                }

                $query .= join(",", $valores );
                $query .= " where id = '{$this->id}'";
                
                if( $this->conexion->query( $query ) === true )
                {
                    return true;
                }else{
                    echo "No se pudo actualizar el registro";
                    return false;
                }                

            }catch( Exception $e ){
                echo "Error: " . $e->getMessage();
                return false;
            }
            
        }
        $this->desconectarse();
    }

    /**
     * Created by: Rene Arteaga
     * Date: 2019-08-26
     * Content: Elimina un elemento en la la tabla del modelo
     * @return boolean
     */
    public function eliminar()
    {
        if( !isset($this->tabla ) || !isset($this->id) ) return false;

        $query = "delete from {$this->tabla} where id = {$this->id}";
        $this->conectarse();

        if( $this->conexion->query( $query ) === true ){
            return true;
        }else{
            echo "No se pudo eliminar el registro";
            return false;
        }

        $this->desconectarse();        
    }

    /**
     * Created by: Rene Arteaga
     * Date: 2019-08-26
     * Content: convierte un arreglo en un objeto del modelo
     * @return object
     */
    public static function obtener_objeto( $model, $parametros = array() ){
        $obj = $model;
        if( count( $parametros ) > 0 )
        {
            foreach( $parametros[0] as $llave => $valor ){
                $obj->{$llave} = $valor;
            }

            return $obj;
        }else{
            return null;
        }
    }
}
