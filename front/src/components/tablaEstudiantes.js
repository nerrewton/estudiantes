import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle
} from 'reactstrap';

import { obtenerEstudiantes } from '../services/estudianteService';

const columns = [{
    dataField: 'id',
    text: 'Código',
    sort: true
  }, {
    dataField: 'nombre',
    text: 'Nombre',
    sort: true
  }, {
    dataField: 'edad',
    text: 'Edad',
    sort: true
  }];


class TablaEstudiantes extends Component {
    state = { 
        estudiantes: []
    }

    componentDidMount(){
        this.obtenerEstudiantes();
    }

    obtenerEstudiantes(){
        obtenerEstudiantes()
        .then( response => {
            this.setState({
                estudiantes: response
            });
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