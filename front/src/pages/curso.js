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

import TablaCursos from '../components/tablaCursos';
import CursoModel from '../models/CursoModel';
import { guardarCurso, obtenerCursos as obtenerCursoUnico } from '../services/cursoService';

class Curso extends Component {
    state = {
        textoForm: "Crear",
        curso: CursoModel
    }

    constructor( props ){
        super( props );

        this.cambiaVariable = this.cambiaVariable.bind( this );
        this.guardarCurso = this.guardarCurso.bind( this );
        this.obtenerCurso = this.obtenerCurso.bind( this );
        this.habilitarCrear = this.habilitarCrear.bind( this );
    }

    cambiaVariable( element ){
        const variable = element.target.name;
        const valor = element.target.value;

        this.setState({
            curso: {
                ...this.state.curso,
                [variable]: valor
            }
        });
    }

    guardarCurso( event ){
        event.preventDefault();
        
        guardarCurso( this.state.curso )
        .then( response => {
            this.refs.tablaE.obtenerCursos();
            this.setState({
                curso: CursoModel,
                textoForm: "Crear"
            });
        });
    }

    obtenerCurso( id ){
        obtenerCursoUnico( id )
        .then( response => {
            if( response && response.id ){
                const { id, nombre } = response;
                this.setState({
                    textoForm: "Editar",
                    curso: {
                        ...this.state.curso,
                        id,
                        nombre                   
                    }
                });

            }
        });
    }

    habilitarCrear(){
        this.setState({
            curso: CursoModel,
            textoForm: "Crear"
        });
    }

    render() { 
        return ( 
            <div>
                <h1>Cursos</h1>
                <Row>
                    <Col xs="12" sm="4">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">
                                    {this.state.textoForm} un curso
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
                                <Form onSubmit={ this.guardarCurso }>
                                    <Row>
                                        <Col xs="12">
                                            <FormGroup>
                                                <Label>Nombre</Label>
                                                <Input 
                                                type="text" 
                                                name="nombre"
                                                value={this.state.curso.nombre}
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
                        <TablaCursos ref="tablaE" editarE={ this.obtenerCurso }/>
                    </Col>
                </Row>
            </div>
         );
    }
}
 
export default Curso;