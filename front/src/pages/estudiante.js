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

class Estudiante extends Component {
    state = { }
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
                                <Form>
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Label>Nombre</Label>
                                                <Input type="text" name="nombre"/>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Label>Edad</Label>
                                                <Input type="text" name="edad"/>
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