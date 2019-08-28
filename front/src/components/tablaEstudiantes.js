import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Button
} from 'reactstrap';

import { obtenerEstudiantes, eliminarEstudiante } from '../services/estudianteService';

const columns = [
    {
        dataField: "tools",
        text: "Herramientas",
        sort: false
    },
    {
        dataField: 'id',
        text: 'Código',
        sort: true
    }, 
    {
        dataField: 'nombre',
        text: 'Nombre',
        sort: true
    }, 
    {
        dataField: 'edad',
        text: 'Edad',
        sort: true
    }
];


class TablaEstudiantes extends Component {
    state = { 
        estudiantes: []
    }

    componentDidMount(){
        this.obtenerEstudiantes();
    }

    obtenerHerramientas( id ){
        return (
            <div>
                <Button color="info" onClick={ () => this.props.editarE( id ) }>Editar</Button>
                {' '}
                <Button color="danger" onClick={ () => this.eliminar( id ) }>Eliminar</Button>
            </div>
        );
    }

    obtenerEstudiantes(){
        obtenerEstudiantes()
        .then( response => {
            if( response && response.length > 0 )
            {
                response = response.map( item => ({
                    ...item,
                    tools: this.obtenerHerramientas(item.id)
                }));
            }else
            {
                response = [];
            }

            this.setState({
                estudiantes: response
            });        
        });        
    }

    eliminar( id ){
        eliminarEstudiante( id )
        .then( response => {
            this.obtenerEstudiantes();
        });
    }

    render() { 
        return ( 
            <Card>
                <CardHeader>
                    <CardTitle tag="h5">
                        Estudiantes Creados
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <BootstrapTable keyField='id' data={ this.state.estudiantes } columns={ columns } pagination={ paginationFactory() } />
                </CardBody>
            </Card>
         );
    }
}
 
export default TablaEstudiantes;