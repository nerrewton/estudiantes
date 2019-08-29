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
import TablaNotas from '../components/tablaNotas';
import NotaModel from '../models/NotaModel';
import { guardarNota, obtenerNotas as obtenerNotaUnico } from '../services/notaService';
import { obtenerEstudiantes } from '../services/estudianteService';
import { obtenerCursos } from '../services/cursoService';

class Nota extends Component {
    state = {
        textoForm: "Crear",
        nota: NotaModel,
        estudiantes: [],
        cursos: []
    }

    constructor( props ){
        super( props );

        this.cambiaVariable = this.cambiaVariable.bind( this );
        this.guardarNota = this.guardarNota.bind( this );
        this.obtenerNota = this.obtenerNota.bind( this );
        this.habilitarCrear = this.habilitarCrear.bind( this );
    }

    componentDidMount(){
        obtenerEstudiantes()
        .then( response => {
            if( response && response.length > 0 ){
                this.setState({
                    estudiantes: response
                });
            }
        });

        obtenerCursos()
        .then( response => {
            if( response && response.length > 0 ){
                this.setState({
                    cursos: response
                });
            }
        });
    }

    cambiaVariable( element ){
        const variable = element.target.name;
        const valor = element.target.value;

        this.setState({
            nota: {
                ...this.state.nota,
                [variable]: valor
            }
        });
    }

    guardarNota( event ){
        event.preventDefault();
        
        guardarNota( this.state.nota )
        .then( response => {
            this.refs.tablaE.obtenerNotas();
            this.setState({
                nota: NotaModel
            });
        });
    }

    obtenerNota( id ){
        obtenerNotaUnico( id )
        .then( response => {
            if( response && response.id ){
                const { id, nombre } = response;
                this.setState({
                    textoForm: "Editar",
                    nota: {
                        ...this.state.nota,
                        id,
                        nombre                   
                    }
                });

            }
        });
    }

    habilitarCrear(){
        this.setState({
            nota: NotaModel,
            textoForm: "Crear"
        });
    }

    render() { 
        return ( 
            <div>
                <h1>Notas</h1>
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">
                                    {this.state.textoForm} un nota
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
                                <Form onSubmit={ this.guardarNota }>
                                    <Row>
                                        <Col xs="12" sm="3">
                                            <FormGroup>
                                                <Label>Estudiante</Label>
                                                <Input 
                                                type="select" 
                                                name="id_estudiante"
                                                value={this.state.nota.id_estudiante}
                                                onChange={ this.cambiaVariable }
                                                >
                                                    <option value="">Seleccione...</option>
                                                    { this.state.estudiantes ? 
                                                    this.state.estudiantes.map( ( item, key ) => (
                                                        <option key={key} value={item.id}>{item.nombre}</option>
                                                    ))
                                                    : null }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="3">
                                            <FormGroup>
                                                <Label>Curso</Label>
                                                <Input 
                                                type="select" 
                                                name="id_curso"
                                                value={this.state.nota.id_curso}
                                                onChange={ this.cambiaVariable }
                                                >
                                                    <option value="">Seleccione...</option>
                                                    { this.state.cursos ? 
                                                    this.state.cursos.map( ( item, key ) => (
                                                        <option key={key} value={item.id}>{item.nombre}</option>
                                                    ))
                                                    : null }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="3">
                                            <FormGroup>
                                                <Label>Nombre evaluación</Label>
                                                <Input 
                                                type="text" 
                                                name="nombre_evaluacion"
                                                value={this.state.nota.nombre_evaluacion}
                                                onChange={ this.cambiaVariable }
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="3">
                                            <FormGroup>
                                                <Label>Calificación</Label>
                                                <Input 
                                                type="number" 
                                                name="calificacion"
                                                value={this.state.nota.calificacion}
                                                onChange={ this.cambiaVariable }
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm="12">
                                            <Button color="success">
                                                Guardar
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="12" className="mt-3">
                        <TablaNotas ref="tablaE" editarE={ this.obtenerNota }/>
                    </Col>
                </Row>
            </div>
         );
    }
}
 
export default Nota;