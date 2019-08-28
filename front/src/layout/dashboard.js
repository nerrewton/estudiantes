import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    state = { 
        isOpen: false
    }

    constructor( props ){
        super( props );

        this.toggle = this.toggle.bind( this );
    }

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() { 
        const Children = this.props.children;
        return ( 
            <div>
                <Navbar color="light" light expand="md">
                    <Link to={"/"} className="navbar-brand">Administrador de cursos</Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>                        
                            <NavItem>
                                <Link to={"/estudiante"} className="nav-link">Estudiantes</Link>
                            </NavItem>
                            <NavItem>                                
                                <Link to={"/curso"} className="nav-link">Cursos</Link>                          
                            </NavItem>
                            <NavItem>
                                <Link to={"/nota"} className="nav-link">Notas</Link>                          
                            </NavItem> 
                        </Nav>
                    </Collapse>
                </Navbar>
                <Children />
            </div>
         );
    }
}
 
export default Dashboard;