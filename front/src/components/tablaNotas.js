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

import { obtenerNotas, eliminarNota } from '../services/notaService';

const columns = [
    {
        dataField: "tools",
        text: "Herramientas",
        sort: false
    },
    {
        dataField: 'id_estudiante',
        text: 'Código estudiante',
        sort: true
    }, 
    {
        dataField: 'nombre_estudiante',
        text: 'Nombre estudiante',
        sort: true
    },
    {
        dataField: 'id_curso',
        text: 'Código curso',
        sort: true
    }, 
    {
        dataField: 'nombre_curso',
        text: 'Nombre curso',
        sort: true
    },
    {
        dataField: 'nombre_evaluacion',
        text: 'Nombre evaluación',
        sort: true
    },
    {
        dataField: 'calificacion',
        text: 'Calificación',
        sort: true
    }
];


class TablaNotas extends Component {
    state = { 
        notas: []
    }

    componentDidMount(){
        this.obtenerNotas();
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

    obtenerNotas(){
        obtenerNotas()
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
        eliminarNota( id )
        .then( response => {
            this.obtenerNotas();
        });
    }

    render() { 
        return ( 
            <Card>
                <CardHeader>
                    <CardTitle tag="h5">
                        Notas registradas
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <BootstrapTable keyField='id' data={ this.state.notas } columns={ columns } pagination={ paginationFactory() } />
                </CardBody>
            </Card>
         );
    }
}
 
export default TablaNotas;