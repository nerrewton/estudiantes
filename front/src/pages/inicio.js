import React, { Component } from 'react';
import {
    Card,
    CardBody
} from 'reactstrap';

class Inicio extends Component {
    state = {  }
    render() { 
        return ( 
            <Card>
                <CardBody className="text-center">
                    <h1>Bienvenido a la pagina de cursos</h1>
                </CardBody>
            </Card>
         );
    }
}
 
export default Inicio;