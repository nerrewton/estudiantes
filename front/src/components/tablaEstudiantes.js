import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle
} from 'reactstrap';

import { obtenerEstudiantes } from '../services/estudianteService';

const columns = [{
    dataField: 'id',
    text: 'Código'
  }, {
    dataField: 'nombre',
    text: 'Nombre'
  }, {
    dataField: 'edad',
    text: 'Edad'
  }];


class TablaEstudiantes extends Component {
    state = { 
        estudiantes: []
    }

    componentDidMount(){
        this.obtenerEstudiantes();
    }

    obtenerEstudiantes(){
        obtenerEstudiantes();
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
                    <BootstrapTable keyField='id' data={ this.state.estudiantes } columns={ columns } />
                </CardBody>
            </Card>
         );
    }
}
 
export default TablaEstudiantes;