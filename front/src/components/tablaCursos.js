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

import { obtenerCursos, eliminarCurso } from '../services/cursoService';

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
    }
];


class TablaCursos extends Component {
    state = { 
        cursos: []
    }

    componentDidMount(){
        this.obtenerCursos();
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

    obtenerCursos(){
        obtenerCursos()
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
                cursos: response
            });        
        });        
    }

    eliminar( id ){
        eliminarCurso( id )
        .then( response => {
            alert( response.mensaje );
            this.obtenerCursos();
        });
    }

    render() { 
        return ( 
            <Card>
                <CardHeader>
                    <CardTitle tag="h5">
                        Cursos Creados
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <BootstrapTable keyField='id' data={ this.state.cursos } columns={ columns } pagination={ paginationFactory() } />
                </CardBody>
            </Card>
         );
    }
}
 
export default TablaCursos;