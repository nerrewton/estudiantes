import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Form, 
    FormGroup,
    Input, 
    Label,
    Button
} from 'reactstrap';

import TablaEstudiantes from '../components/tablaEstudiantes';
import EstudianteModel from '../models/EstudianteModel';
import { guardarEstudiante } from '../services/estudianteService';

class Estudiante extends Component {
    state = {
        estudiante: EstudianteModel
    }

    constructor( props ){
        super( props );

        this.cambiaVariable = this.cambiaVariable.bind( this );
        this.guardarEstudiante = this.guardarEstudiante.bind( this );
    }

    cambiaVariable( element ){
        const variable = element.target.name;
        const valor = element.target.value;

        this.setState({
            estudiante: {
                ...this.state.estudiante,
                [variable]: valor
            }
        });
    }

    guardarEstudiante( event ){
        event.preventDefault();
        
        guardarEstudiante( this.state.estudiante )
        .then( response => {
            console.log( response );
        });
    }

    render() { 
        return ( 
            <div>
                <h1>Estudiantes</h1>
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">
                                    Crear un estudiante
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={ this.guardarEstudiante }>
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Label>Nombre</Label>
                                                <Input 
                                                type="text" 
                                                name="nombre"
                                                value={this.state.estudiante.nombre}
                                                onChange={ this.cambiaVariable }
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Label>Edad</Label>
                                                <Input 
                                                type="number" 
                                                name="edad"
                                                value={this.state.estudiante.edad}
                                                onChange={ this.cambiaVariable }
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Button color="success">
                                                Guardar
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6">
                        <TablaEstudiantes />
                    </Col>
                </Row>
            </div>
         );
    }
}
 
export default Estudiante;