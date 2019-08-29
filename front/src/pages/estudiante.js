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
import { guardarEstudiante, obtenerEstudiantes as obtenerEstudianteUnico } from '../services/estudianteService';

class Estudiante extends Component {
    state = {
        textoForm: "Crear",
        estudiante: EstudianteModel
    }

    constructor( props ){
        super( props );

        this.cambiaVariable = this.cambiaVariable.bind( this );
        this.guardarEstudiante = this.guardarEstudiante.bind( this );
        this.obtenerEstudiante = this.obtenerEstudiante.bind( this );
        this.habilitarCrear = this.habilitarCrear.bind( this );
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
            this.refs.tablaE.obtenerEstudiantes();
            this.setState({
                estudiante: EstudianteModel,
                textoForm: "Crear"
            });
        });
    }

    obtenerEstudiante( id ){
        obtenerEstudianteUnico( id )
        .then( response => {
            if( response && response.id ){
                const { id, nombre, edad } = response;
                this.setState({
                    textoForm: "Editar",
                    estudiante: {
                        ...this.state.estudiante,
                        id,
                        nombre,
                        edad                        
                    }
                });

            }
        });
    }

    habilitarCrear(){
        this.setState({
            estudiante: EstudianteModel,
            textoForm: "Crear"
        });
    }

    render() { 
        return ( 
            <div>
                <h1>Estudiantes</h1>
                <Row>
                    <Col xs="12" sm="4">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">
                                    {this.state.textoForm} un estudiante
                                    {this.state.textoForm === "Editar" ? 
                                    <Button 
                                    color="warning" 
                                    className="float-right text-white"
                                    onClick={this.habilitarCrear}
                                    >Crear nuevo</Button>
                                    : null}
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={ this.guardarEstudiante }>
                                    <Row>
                                        <Col xs="12">
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
                                        <Col xs="12">
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
                    <Col xs="12" sm="8">
                        <TablaEstudiantes ref="tablaE" editarE={ this.obtenerEstudiante }/>
                    </Col>
                </Row>
            </div>
         );
    }
}
 
export default Estudiante;